const request = require('request-promise-native');
const itemHelper = require('../helpers/item');
const API_URL = 'https://api.mercadolibre.com';

async function getCategories (categoryId) {
  let categoryRequestOptions = {
    uri: `${API_URL}/categories/${categoryId}`,
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

const items = {
  get: async (req, res) => {
    let itemRequestOptions = {
      uri: `${API_URL}/items/${req.params.id}`,
      json: true
    };

    let itemDescriptionRequestOptions = {
      uri: `${API_URL}/items/${req.params.id}/description`,
      json: true
    };

    try {
      let item = await request(itemRequestOptions);
      let itemDescription = await request(itemDescriptionRequestOptions);
      let categories = await getCategories(item.category_id);

      let endpointResponse = {
        author: {
          name: 'Federico',
          lastname: 'Fernandez'
        },
        item: itemHelper.formatExtended(item, itemDescription),
        categories
      };

      res.send(endpointResponse);
    } catch (e) {
      console.log(e);
      res.status(500);
      res.send();
    }
  }
};

module.exports = items;