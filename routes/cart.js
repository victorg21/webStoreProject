const express = require('express');
const router = express.Router();
//const bodyParser = require("body-parser");
const Inventory = require('../models/Inventory.js');
const ShoppingCart = require('../models/ShoppingCart.js');
const ShoppingCartLine = require('../models/ShoppingCartLine.js');
const Product = require('../models/Product.js');
const session = require('express-session');

/* GET users listing. */
router.get('/', function(req, res, next) {
	let shoppingCart;

	if (!req.session.shoppingCart) {
		shoppingCart = new ShoppingCart();
		req.session.shoppingCart = shoppingCart;
		//req.session.save();
	}else{
		shoppingCart = req.session.shoppingCart;
		//let ttt = sss.getTotal();
		console.log("shoppingCart=" +shoppingCart);
	}
	let pId = req.query.productId;
	let pName = req.query.productName;
	let pPrice = req.query.productPrice;
	let pAmountLeft = req.query.productAmountLeft;
	let pQuantity = req.query.quantity;
	//for (var property in req.body) {Object.keys(req.body).length;
	//Model[property] = req.body[property];
	//console.log("property=" + property + " && req.body[property] = " + req.body[property]);
	//let pNum = Object.keys(req.body[property]).length;
	//res.write("property=" +property +" && req.body[property] = " +req.body[property]);
	//}
	console.log("pId="+pId +" pName=" +pName +" pPrice=" +pPrice);
	let product = new Product(pId, pName, pPrice);
	let shoppingCartLine = new ShoppingCartLine(product, pQuantity);
	if(shoppingCart instanceof ShoppingCart){
		console.log("sc= instanceof ssssssssss");
		shoppingCart.addShoppingCartLine(shoppingCartLine);
		req.session.shoppingCart = shoppingCart;
		req.session.save();
		res.write('<p>Total=' +shoppingCart.total +'</p>');
		res.write('<p>Total=' +shoppingCart +'</p>');
		res.write('<p><a href="http://localhost:3000/store">Return to Store</a></p>');
		res.end();
	}else{
		console.log("wwwwwwwwwwwwwww");
		//for (let [productId, productObj] of shoppingCart) {
		console.log("shoppingCart=" +shoppingCart.name);
		//}
	}

	res.end();
});

router.post('/', function(req, res, next) {
	let shoppingCartObj = new ShoppingCart();

	if (req.session.shoppingCart) {
		let jsonStr = req.session.shoppingCart;
		shoppingCartObj.fromJson(jsonStr);
		console.log(shoppingCartObj);
	}

	let pId = req.body["productId"];
	let pName = req.body["productName"];
	let pPrice = req.body["productPrice"];
	let pAmountLeft = req.body["productAmountLeft"];
	let pQuantity = req.body["quantity"];

	console.log("pId=" +pId +" pName=" +pName +" pPrice=" +pPrice +" pQuantity=" +pQuantity);
	let product = new Product(pId, pName, pPrice);
	let shoppingCartLine = new ShoppingCartLine(product, pQuantity);
	shoppingCartObj.addShoppingCartLine(shoppingCartLine);

	let jsonString = shoppingCartObj.toJson();
	console.log("jsonString = " +jsonString);
	req.session.shoppingCart = jsonString;
	//req.session.save();
	let inv = Inventory.Inventory;
	console.log("inv = " +inv);
	Inventory.setQuantity(pId, (parseInt(pQuantity) * -1));
	console.log("Inventory.sInventory = " +Inventory.sInventory);

	renderCart(res);

	res.end();

	function renderCart(res) {
		res.write('<!DOCTYPE html>\n' +
			'<html>\n' +
			'<header>\n' +
			' <script type="text/javascript">\n' +
			'</script>\n' +
			'</header>\n' +
			'<body>\n' +
			'<h1>Shopping Cart list</h1>\n');

		res.write('<p>Total=' + shoppingCartObj.total + '</p>');
		res.write('<p><a href="http://localhost:3000/store">Return to Store</a></p>');
		res.write('<table border="1"><tr><th>Prodect Id</th><th>Quantity</th></tr> \n');

		let jsonObjects = JSON.parse(jsonString);
		for (let i = 0; i < jsonObjects.length; i++) {
			let jsonObj = jsonObjects[i];
			for (let j = 0; j < jsonObj.length; j = j + 2) {
				let pId = jsonObj[j];
				let pCartLine = jsonObj[j + 1];
				let quantity = pCartLine._quantity;
				res.write('' +
					'	<tr> \n' +
					'		<td>' + pId + '</td> \n' +
					'		<td>' + quantity + '</td> \n' +
					'	</tr> \n');
			}
		}
		res.write('</table> \n');
		res.write('</body></html>');
	}
});

module.exports = router;
