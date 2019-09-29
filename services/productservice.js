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

var AWS = require('aws-sdk');
var bucketName = "imageawsfaegwalter";
var bucketRegion = "us-east-2";

AWS.config.update({
  region: bucketRegion
});

var s3 = new AWS.S3({
  apiVersion: "2006-03-01",
  params: { Bucket: bucketName }
});

class ProductService{
    async uploadImageS3(image){
        var filename = (uuidv4() + image.name);
        const params = {
          Bucket: bucketName,
          Key: filename,
          ACL: 'public-read',
          Body: image.data
        };

        await s3.putObject(params, function (err, data) {
          if (err) {
            console.log("Error: ", err);
          } else {
            console.log("Sucesso: " + filename);
          }
        });
        return filename;
    }
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
            var params = {Bucket: bucketName, Key: item.filename};
            s3.getSignedUrl('getObject', params, function (err, url) {
              if(err){
                  item.urls3 = "images/items/2.jpg"; 
              }else{
                  item.urls3 = url;
              }
              list.push(item);
            });
        }
        return list;
   }
   async getAll(){
        var list = [];

        var result = await mapper.scan(Product,{limit:5});
        for await (const item of result) {
            var params = {Bucket: bucketName, Key: item.filename};
            s3.getSignedUrl('getObject', params, function (err, url) {
              if(err){
                  item.urls3 = "images/items/2.jpg"; 
              }else{
                  item.urls3 = url;
              }
              list.push(item);
            });
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
