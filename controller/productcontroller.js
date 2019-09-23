var ProductService = require("../services/productservice");
var productService = new ProductService();
const Product = require("../models/product");

class ProductController{
    async form(req,res,next){
        res.render('product/form');
    }
    async save(req,res,next){
        var product = new Product();
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = parseFloat(req.body.price);
        
        productService.save(product);
        
        res.redirect('/');
    }
}
module.exports = ProductController;