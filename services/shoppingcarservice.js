var {
  DataMapper, DynamoDbSchema, DynamoDbTable
} = require('@aws/dynamodb-data-mapper');
var ConditionExpression = require('@aws/dynamodb-expressions');
var {contains} = require('@aws/dynamodb-expressions');
var DynamoDB = require('aws-sdk/clients/dynamodb');

const client = new DynamoDB({region: 'us-east-2'});
const mapper = new DataMapper({client});
const Product = require("../models/product");
const ShoppingCar = require("../models/shoppingcar");

class ShoppingCarService{
    async save(shoppingCar){
        if(shoppingCar.id == null || shoppingCar.id === ""){
            throw Error("Todo carrinho de compras deve ter um ID");
        }
        mapper.put({item: shoppingCar}).then(() => {
            return shoppingCar;
        });
    }
    
    async getById(idshoppingcar){
        var resultado = mapper.get(Object.assign(new ShoppingCar(), {id: idshoppingcar}))
        .catch(err => {
            return null;
        });
        return resultado;
    }
}
module.exports = ShoppingCarService;