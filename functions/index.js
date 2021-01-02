const functions = require('firebase-functions');
const express = require('express');
const fs = require('fs');
const path = require('path');
const utils = require('util');
const puppeteer = require('puppeteer');
const hb = require('handlebars');
const date = require('date-and-time');
const rupeesIntoWords = require('convert-rupees-into-words');
const readFile = utils.promisify(fs.readFile);

const cookieParser = require('cookie-parser')();
const cors = require('cors')({origin: true});

const admin = require('firebase-admin');
admin.initializeApp();

const now = new Date();
const pattern = date.compile('DD MMMM YYYY');
 
const currentDate = date.format(now, pattern);

const app = express();


const validateFirebaseIdToken = async (req, res, next) => {
    console.log('Check if request is authorized with Firebase ID token');
  
    if ((!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) &&
        !(req.cookies && req.cookies.__session)) {
      console.error('No Firebase ID token was passed as a Bearer token in the Authorization header.',
          'Make sure you authorize your request by providing the following HTTP header:',
          'Authorization: Bearer <Firebase ID Token>',
          'or by passing a "__session" cookie.');
      res.status(403).send('Unauthorized');
      return;
    }
  
    let idToken;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
      console.log('Found "Authorization" header');
      // Read the ID Token from the Authorization header.
      idToken = req.headers.authorization.split('Bearer ')[1];
    } else if(req.cookies) {
      console.log('Found "__session" cookie');
      // Read the ID Token from cookie.
      idToken = req.cookies.__session;
    } else {
      // No cookie
      res.status(403).send('Unauthorized');
      return;
    }
  
    try {
      const decodedIdToken = await admin.auth().verifyIdToken(idToken);
      console.log('ID Token correctly decoded', decodedIdToken);
      req.user = decodedIdToken;
      next();
      return;
    } catch (error) {
      console.error('Error while verifying Firebase ID token:', error);
      res.status(403).send('Unauthorized');
      return;
    }
};

const runtimeOpts = {
    timeoutSeconds: 300,
    memory: '1GB'
}

async function getTemplateHtml() {
    console.log("Loading template file in memory")
    try {
        const quotationPath = path.resolve("./template/quotation.html");
        return await readFile(quotationPath, 'utf8');
    } catch (err) {
        return Promise.reject("Could not load html template");
    }
}

// app.use(cors);
// app.use(cookieParser);
// app.use(validateFirebaseIdToken);

app.get('/quotations/:id/pdf', async (req, res) => {
    await admin.firestore().collection('quotations').doc(req.params.id).get().then(async function(data) {
        getTemplateHtml().then(async (file) => {
            const template = hb.compile(file, { strict: true });

            const newDoc = data.data();
            newDoc['date'] = currentDate;
            newDoc['rupeesIntoWords'] = rupeesIntoWords(newDoc.totalPricing.grandTotal);
            
            const result = template(newDoc);
            const html = result;
            const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
            const page = await browser.newPage();
            await page.setContent(html);

            const buffer = await page.pdf({format: 'A4' });
            await browser.close();
            res.header('Content-Type', 'application/pdf;charset=utf-8');
            res.header('Content-Disposition', 'attachment; filename=quotation.pdf');
            res.type('application/pdf').send(buffer);
            return buffer;
        }).catch(err => {
            console.error(err)
        });
    })
    .catch(function(error) {
        console.error("getDocument(): Error fetching document from firebase: ", error);
    });
});

exports.incrementQuotationNumber = functions.firestore.document("quotations/{id}").onCreate((snap, context) => {
  let quotationNumber = 0;

  admin.firestore().collection("/quotationRef").get().then((snapshot) => {
    quotationNumber = snapshot.docs[0].data().value;
    quotationNumber++;

    admin.firestore().collection("/quotationRef").doc(snapshot.docs[0].id).update({
      value: quotationNumber
    });
  });

  return 0
})

exports.makePdf = functions.runWith(runtimeOpts).https.onRequest(app);





