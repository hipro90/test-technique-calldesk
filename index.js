// @flow
const https = require('https');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const url /*: string */ = 'https://the-one-api.herokuapp.com/v1';
const options = {
  headers: { Authorization: 'Bearer ' },
};

// Get the number of characters
const getCharacters = () => new Promise((resolve, reject) => {
  // Call the lord of ring API
  const request = https.get(`${url}/character`, options, (res) => {
    let rawData /*: string */ = '';

    // Retrieves data and stocks in 'rawData'
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parsedData = JSON.parse(rawData);
        // Retrieve the necessary data
        const numberOfCharacters /*: number */= parsedData.items.total;
        // Create response
        const response = { fulfillmentText: `There are ${numberOfCharacters} characters in Lord of the Rings.` };
        resolve(response);
      } catch (e) {
        console.error('error', e.message);
        reject();
      }
    });
    res.on('error', () => {
      reject();
    });
    request.end();
  });
});

// Get the titles of the books
const getMovies = (parameters) => new Promise((resolve, reject) => {
  // Call the lord of ring API
  const request = https.get(`${url}/movie`, options, (res) => {
    let rawData /*: string */ = '';

    // Retrieves data and stocks in 'rawData'.
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        const parameter /*: string */ = parameters.chapter ? parameters.chapter : parameters.movie;
        const parsedData = JSON.parse(rawData);
        // Retrieve the necessary data
        const data = parsedData.docs;
        const moviesList = data.filter((movie) => movie.name === 'The Fellowship of the Ring' || movie.name === 'The Two Towers ' || movie.name === 'The Return of the King').map((name) => name.name);
        // Create response
        const response = { fulfillmentText: `the name of the three ${parameter} are ${moviesList.map((movie) => movie)}` };
        resolve(response);
      } catch (e) {
        console.error(e.message);
        reject();
      }
    });
    res.on('error', () => {
      reject();
    });
    request.end();
  });
});

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((req, res) => {
  // Get the parameters of the query
  const { parameters } = req.body.queryResult;

  // If the quantity parameter is provided
  if (parameters.quantity) {
    getCharacters()
      .then((response) => res.json(response))
      .catch(() => {
        res.json({ fulfillmentText: 'Unfortunately, I don\'t have access to that information.' });
      });

    // If the title parameter is provided
  } else if (parameters.title) {
    getMovies(parameters)
      .then((response) => res.json(response))
      .catch(() => {
        res.json({ fulfillmentText: 'Unfortunately, I don\'t have access to that information.' });
      });
  }
});
