var {
  DataMapper, DynamoDbSchema, DynamoDbTable
} = require('@aws/dynamodb-data-mapper');
class ShoppingCar{
    
}
Object.defineProperties(ShoppingCar.prototype, {
    [DynamoDbTable]: {
        value: 'shoppingcar'
        
    },
    [DynamoDbSchema]: {
        value: {
            id: {
                type: 'String',
                keyType: 'HASH'
            },
            expiration: {type: 'Number'},
            itens: {
                type: 'Collection'
            }
        },
    },
});
module.exports = ShoppingCar;