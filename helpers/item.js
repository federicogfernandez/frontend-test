const ItemFormatter = {

  format: (item) => {
    let amount = Math.floor(item.price);
    let decimals = item.price % amount;
    let address;

    if(item.address) {
      address = item.address.state_name;
    } else if (item.seller_address) {
      address = item.seller_address.state.name;
    }

    let formatted = {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount: amount,
        decimals: decimals
      },
      picture: item.thumbnail,
      condition: item.condition,
      address: address,
      free_shipping: item.shipping.free_shipping
    };

    return formatted;
  },

  formatExtended: (item, description) => {
    let formattedItem = ItemFormatter.format(item);
    formattedItem.soldQuantity = item.sold_quantity;
    formattedItem.description = description.plain_text;

    return formattedItem;
  }

};

module.exports = ItemFormatter;