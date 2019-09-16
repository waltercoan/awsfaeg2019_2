var {
  DataMapper, DynamoDbSchema, DynamoDbTable
} = require('@aws/dynamodb-data-mapper');
var DynamoDB = require('aws-sdk/clients/dynamodb');

const client = new DynamoDB({region: 'us-east-2'});
const mapper = new DataMapper({client});
const Product = require("../models/product");

class ProductService{
   async getAll(){
        var list = [];
        var result = await mapper.scan(Product);
        for await (const item of result) {
            list.push(item);
        }
        return list;

   } 
}
module.exports = ProductService;