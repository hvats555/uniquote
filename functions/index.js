const functions = require('firebase-functions');
const express = require('express');

const admin = require('firebase-admin');
admin.initializeApp();

const app = express();

app.get('/quotation/:id/pdf', (req, res) => {
    let firebaseRes = admin.firestore().collection('quotations').doc('zdsFSgVzK2m0BL5IFJDS');
    res.send(firebaseRes);
});

exports.makePdf = functions.https.onRequest(app);


