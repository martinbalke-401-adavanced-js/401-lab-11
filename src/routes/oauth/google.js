'use strict';

const express = require('express');

const googleMW = require('../../middleware/oauth/google-mw.js');
const router = express.Router();

/**
 * Get route for the google path. Allows user to log in to their Google account through Google Oauth
 * @route GET /google
 * @param {Object} res - The response from the server sent back to the client
 * @returns {Object} 200 - The fully fleshed out URL for Google Oauth requests 
 */
router.get('/google', (req, res, next) => {
  //Declaring the start of the Oauth URL
  let googleOAuthURL = process.env.GOOGLE_AUTH_SERVICE;
  //Setting the options necessary for Google to parse Oauth requests
  let options = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.HOME_URL + '/google-oauth',
    scope: 'email openid profile',
    prompt: 'consent',
    response_type: 'code',
  };

  //Setting up our URL to use query paramaters
  googleOAuthURL += '?';

  //Iterating through our options object and adding each key value pair to the URL as a parameter
  Object.keys(options).forEach((key, indx) => {
    googleOAuthURL += key + '=' + encodeURIComponent(options[key]);
    googleOAuthURL += '&';
  });

  //Sending back the fully set up Google URL which redirects us to the Google sign in page
  res.status(200).json({ url: googleOAuthURL });
});

// TODO: Swagger Comment
router.get('/google-oauth', async (req, res, next) => {
  let data = await googleMW(req);

  // TODO: Comment
  res.status(200).json({ name: data.name, email: data.email });

  // TODO: README Question:
  // Now that we have some data about the user, how would we go about
  // adding this user to our database?
  // What data should we save?
  // What data is missing?
  // What considerations about storing this data do we need to take?
});

module.exports = router;
