'use strict';

const superagent = require('superagent');
const Users = require('../users-model.js');

const API = 'http://localhost:3002';
// const LTS = 'https://developer.linkedin.com/docs/oauth2';
// const LTS = "https://www.linkedin.com/oauth/v2/authorization"
const LTS = 'https://www.linkedin.com/oauth/v2/accessToken';
// const SERVICE = '';

const SERVICE = 'https://api.linkedin.com/v1/people/~?format=json';

let authorize = (request) => {
  
  console.log('(1)', request.query.code);
  // post request, sent after the code is received, should return us a token

  let options = {
    grant_type: 'authorization_code',
    code: request.query.code,
    redirect_uri: `${API}/oauth`,
    client_id: process.env.LINKEDIN_CLIENT_ID,
    client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  };
  
  let QueryString = Object.keys(options).map( (key,i) => {
    return `${key}=` + encodeURIComponent(options[key]);
  }).join("&");

  return superagent.post(LTS)
    .send(QueryString)
    .then( res => {
        console.log(' 🔥 ');
        let access_token = res.body.access_token;
        return access_token;
    })
    .then(token =>{
        console.log(`⭐️   ${SERVICE}  ⭐️  ${token}   ⭐️`);
        return superagent.get(SERVICE)
        .set('Authorization', `Bearer ${token}`)
        .then( response => {
          let user = response.body;
          console.log('(3️⃣)', user);
          return user;
        });
    })
    // .then( () => {
    //   // create the user in our database      
    // })    
    .catch(err => console.log(err));
  
        //   return superagent.get(SERVICE)

  
  // return superagent.post(GTS)
  //   .send({
    //   .type('form')
  //     code: request.query.code,
  //     client_id: process.env.LINKEDIN_CLIENT_ID,
  //     client_secret: process.env.LINKEDIN_CLIENT_SECRET,
  //     redirect_uri: `${API}/oauth`,
  //     grant_type: 'authorization_code',
  //   })
  //   .then( response => {
  //     let access_token = response.body.access_token;
  //     console.log('(2)', access_token);
  //     return access_token;
  //   })
  //   .then(token => {
  //     console.log(SERVICE, token);
  //     return superagent.get(SERVICE)
  //       .set('Authorization', `Bearer ${token}`)
  //       .then( response => {
  //         let user = response.body;
  //         console.log('(3)', user);
  //         return user;
  //       });
  //   })
  //   .then( oauthUser => {
  //     console.log('(4) Create Our Account');
  //     return Users.createFromOauth(oauthUser.email);
  //   })
  //   .then( actualUser => {
  //     return actualUser.generateToken(); 
  //   })
  //   .catch( error => error );
};


module.exports = authorize;