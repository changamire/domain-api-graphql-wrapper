const axios = require('axios')
const querystring = require('querystring')

const getAccessToken = async (clientId, secret) => {
  const data = querystring.stringify({
    grant_type: 'client_credentials',
    scope: 'api_agencies_read api_listings_read'
  });

  const result = await axios.post('https://auth.domain.com.au/v1/connect/token', data, {
    headers: {
      'Authorization': `Basic ${base64(`${clientId}:${secret}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    }
  });

  console.log(JSON.stringify(result.data));
  return result.data.access_token;
};

const base64 = (str) => {
  return Buffer.from(str).toString('base64')
};

let service = {
  getAccessToken
};

module.exports = service;