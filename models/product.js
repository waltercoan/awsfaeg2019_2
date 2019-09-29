var {
  DataMapper, DynamoDbSchema, DynamoDbTable
} = require('@aws/dynamodb-data-mapper');
class Product{
    
}
Object.defineProperties(Product.prototype, {
    [DynamoDbTable]: {
        value: 'product'
    },
    [DynamoDbSchema]: {
        value: {
            id: {
                type: 'String',
                keyType: 'HASH'
            },
            description: {type: 'String'},
            name: {type: 'String'},
            price: {type: 'Number'},
            filename: {type: 'String'},
            urls3: {type: 'String'}
        },
    },
});
module.exports = Product;