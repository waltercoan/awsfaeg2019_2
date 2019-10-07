var express = require('express');
var router = express.Router();

var ShoppingCarController = require("../controller/shoppingcarcontroller");
var shoppingCarController = new ShoppingCarController();

router.get('/addproduct', function(req, res, next) {
    shoppingCarController.addProduct(req,res,next);
});

module.exports = router;
