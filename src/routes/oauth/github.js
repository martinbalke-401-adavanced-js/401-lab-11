'use strict';

const express = require('express');

const githubMW = require('../../middleware/oauth/github-mw.js');
const router = express.Router();

/**
 * Get route for the google path. Allows user to log in to their Google account through Google Oauth
 * @route GET /github
 * @param {Object} res - The response from the server sent back to the client
 * @returns {Object} 200 - The fully fleshed out URL for Github Oauth requests
 */
router.get('/github', (req, res, next) => {
  let githubOAuthURL = process.env.GITHUB_AUTH_SERVICE;
  
  let options = {
    client_id: process.env.GITHUB_CLIENT_ID,
    redirect_uri: process.env.HOME_URL + '/github-oauth',
    scope: 'user',
    state: 'haha',
  };

  // Turning the url in to a query
  githubOAuthURL += '?';

  // Looping over the options object and adding it on to our query string
  Object.keys(options).forEach((key, indx) => {
    githubOAuthURL += key + '=' + encodeURIComponent(options[key]);
    githubOAuthURL += '&';
  });

  // Sending back the Oauth url as a response so that we can continue the auth process
  res.status(200).json({ url: githubOAuthURL });
});

/**
 * @route GET /github-oauth
 * @returns {Object} 200 - The response from google containing information about the user
 */
router.get('/github-oauth', async (req, res, next) => {
  let data = await githubMW(req);

  // Sending our server back the authenticated users information
  res.status(200).json({ name: data.name, email: data.email });
});

module.exports = router;
