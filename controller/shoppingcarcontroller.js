var ProductService = require("../services/productservice");
var productService = new ProductService();
var Product = require("../models/product");

var ShoppingCarService = require("../services/shoppingcarservice");
var shoppingCarService = new ShoppingCarService();
var ShoppingCar = require("../models/shoppingcar");


class ShoppingCarController{
    async addProduct(req,res,next){
        var idproduct = req.query.productid; 
        var sessionid = req.sessionID; 
        
        await shoppingCarService.getById(sessionid).then((shoppingcar)=>{
            if(shoppingcar == null){
                shoppingcar = new ShoppingCar();
                shoppingcar.id = sessionid;
                shoppingcar.expiration = Math.floor( Date.now() / 1000 ) + 60;
                shoppingcar.itens = new Array();
            }
            //console.log(JSON.stringify(shoppingcar, null, 10));
            shoppingcar.itens.push({id:idproduct,quantity:1});
            shoppingCarService.save(shoppingcar);
        });

        
        res.redirect("/");
    }
}
module.exports = ShoppingCarController;    