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

const admin = require('firebase-admin');
admin.initializeApp();

const now = new Date();
const pattern = date.compile('DD MMMM YYYY');
 
const currentDate = date.format(now, pattern);

const app = express();

const runtimeOpts = {
    timeoutSeconds: 300,
    memory: '1GB'
}

async function getTemplateHtml() {
    console.log("Loading template file in memory")
    try {
        const quotationPath = path.resolve("./quotation.html");
        return await readFile(quotationPath, 'utf8');
    } catch (err) {
        return Promise.reject("Could not load html template");
    }
}

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

exports.makePdf = functions.runWith(runtimeOpts).https.onRequest(app);


