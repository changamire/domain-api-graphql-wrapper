const utils = require('../util/utils.js');
const axios = require('axios');

const apiUrl = process.env.API_URL;

const handle = async(event) => {
  console.log(event);
  const {postCode} = event.arguments;

  const token = await utils.getAccessToken(process.env.CLIENT_ID,
    process.env.SECRET);

  console.log(`Token ${token}`);

  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const bodyParameters = {
    listingType: 'Sale',
    locations: [
      {
        postCode: postCode
      }
    ]
  };

  const response = await axios.post(
    apiUrl,
    bodyParameters,
    config
  );

  console.log(response.data);

  const result = [];
  response.data.forEach(item => {
    if (item.type === 'PropertyListing') {
      result.push(
        {
          id: item.listing.id
        }
      );
    }
  });

  return result;

};

module.exports.handle = handle;