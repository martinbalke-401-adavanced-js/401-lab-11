const superagent = require('superagent');

let getUserData = async request => {
  let authCode = request.query.code;

  // TODO: Comment
  let githubRes = await superagent
    .post(process.env.GITHUB_TOKEN_SERVICE)
    .type('form')
    .send({
      code: authCode,
      client_id: process.env.GITHUB_CLIENT_ID,
      client_secret: process.env.GITHUB_CLIENT_SECRET,
      state: 'haha',
      redirect_uri: `${process.env.HOME_URL}/github-oauth`,
    });

  // TODO: Comment
  let access_token = githubRes.body.access_token;

  // TODO: Comment
  githubRes = await superagent
    .get(process.env.GITHUB_API)
    .set('Authorization', `Bearer ${access_token}`);

  // TODO: Comment
  let userData = githubRes.body;
  return userData;
};

module.exports = getUserData;
