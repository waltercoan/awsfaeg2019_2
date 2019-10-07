var ProductService = require("../services/productservice");
var productService = new ProductService();

var ShoppingCarService = require("../services/shoppingcarservice");
var shoppingCarService = new ShoppingCarService();
var ShoppingCar = require("../models/shoppingcar");

class IndexController{
    async index(req,res,next){
        var listProduct  = await productService.getAll();
        var numitens = 0;
        await shoppingCarService.getById(req.sessionID).then((shoppingcar)=>{
            if(shoppingcar != null)
                numitens = shoppingcar.itens.length;
        });
        //console.log(JSON.stringify(listProduct, null, 4));
        res.render('index/index2', { listProduct: listProduct, numitensshoppingcar:numitens });
    }
    
    async search(req,res,next){
        var search = req.body.search;
        var listProduct  = null;
        if(search ===""){
            listProduct  = await productService.getAll();
        }else{
            listProduct  = await productService.getAllBySearch(search);
        }
        res.render('index/index2', { listProduct: listProduct });
    }
}
module.exports = IndexController;