const request = require('request-promise-native');
const itemHelper = require('../helpers/item');
const _ = require('lodash');

const API_URL = 'https://api.mercadolibre.com';

function formatResults (results) {
  let formatted = [];
  
  results.forEach((result, i) => {
    formatted.push(itemHelper.format(result));
  });

  return formatted;
}

async function getCategories (results) {
  let categoriesCount = _.countBy(results, 'category_id');
  let topCategoryId =  _.maxBy(Object.keys(categoriesCount), (o) => { return categoriesCount[o]; });

  let categoryRequestOptions = {
    uri: `${API_URL}/categories/${topCategoryId}`,
    json: true
  };

  try {
    let response = await request(categoryRequestOptions);
    let categories = response.path_from_root.map((category) => category.name);

    return categories;
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
}

const search = {
  get: async (req, res) => {
    let options = {
      uri: `${API_URL}/sites/MLA/search`,
      qs: {
        q: req.query.q
      },
      json: true
    };

    try {
      let response = await request(options);
      let categories = await getCategories(response.results);

      let endpointResponse = {
        author: {
          name: 'Federico',
          lastname: 'Fernandez'
        },
        categories: categories,
        items: formatResults(response.results)
      };

      res.send(endpointResponse);
    } catch (e) {
      console.log(e);
      res.status(500);
      res.send();
    }
  }
};

module.exports = search;