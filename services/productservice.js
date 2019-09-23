var {
  DataMapper, DynamoDbSchema, DynamoDbTable
} = require('@aws/dynamodb-data-mapper');
var ConditionExpression = require('@aws/dynamodb-expressions');
var {contains} = require('@aws/dynamodb-expressions');
var DynamoDB = require('aws-sdk/clients/dynamodb');

const client = new DynamoDB({region: 'us-east-2'});
const mapper = new DataMapper({client});
const Product = require("../models/product");
const uuidv4 = require('uuid/v4');

class ProductService{
    async save(product){
        if(product.id == null || product.id === ""){
            product.id = uuidv4();
        }
        mapper.put({item: product}).then(() => {
            return product;
        });
    }
    
    async getAllBySearch(search){
        var list = [];
        var result = await mapper.scan(Product,{limit:5, filter: {
                                                ...contains(search),
                                                subject: 'name'
                                            }});
        for await (const item of result) {
            list.push(item);
        }
        return list;
   }
   async getAll(){
        var list = [];

        var result = await mapper.scan(Product,{limit:5});
        for await (const item of result) {
            list.push(item);
        }
        return list;

   } 
   
}
module.exports = ProductService;
/*colinha
        mapper.get(Object.assign(new Product(), {id: '1'}))
        .then(myItem => {
            console.log(JSON.stringify(myItem, null, 4));
        })
        .catch(err => {
            console.log(err);
        })
*/
