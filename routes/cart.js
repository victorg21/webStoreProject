const express = require('express');
const router = express.Router();
const session = require('express-session');
//const bodyParser = require("body-parser");

const Inventory = require('../models/Inventory.js');
const Users = require('../models/Users.js');
const ShoppingCart = require('../models/ShoppingCart.js');
const ShoppingCartLine = require('../models/ShoppingCartLine.js');
const Product = require('../models/Product.js');

router.post('/', function(req, res, next) {
	if (req.session.id) {
		let userId = req.session.id;
		let users = new Users();
		let shoppingCartObj = users.getShoppingCart(userId);
		console.log("userId=" +userId, " shoppingCartObj=" +shoppingCartObj);


		let pId = req.body["productId"];
		let pName = req.body["productName"];
		let pPrice = req.body["productPrice"];
		let pAmountLeft = req.body["productAmountLeft"];
		let pQuantity = req.body["quantity"];

		console.log("pId=" + pId + " pName=" + pName + " pPrice=" + pPrice + " pQuantity=" + pQuantity);
		let product = new Product(pId, pName, pPrice);
		let shoppingCartLine = new ShoppingCartLine(product, pQuantity);
		shoppingCartObj.addShoppingCartLine(shoppingCartLine);

		//let jsonString = shoppingCartObj.toJson();
		//console.log("jsonString = " +jsonString);
		//req.session.sessionId = jsonString;
		//req.session.save();

		let inventory = new Inventory();
		//console.log("inv = " + inv);
		inventory.setQuantity(pId, (parseInt(pQuantity) * -1));
		console.log("Inventory.sInventory = " + inventory.getInventory());

		renderCart(res, shoppingCartObj);
	}
	res.end();

	function renderCart(res, shoppingCartObj) {
		res.write('<!DOCTYPE html>\n' +
			'<html>\n' +
			'<header>\n' +
			' <script type="text/javascript">\n' +
			'</script>\n' +
			'</header>\n' +
			'<body>\n' +
			'<h1>Shopping Cart list</h1>\n');

		res.write('<p>Total price =' + shoppingCartObj.total + '</p>');
		res.write('<p><a href="http://localhost:3000/store">Back to Store</a></p>');
		res.write('<table border="1"><tr><th>Prodect Id</th><th>Prodect Name</th><th>Quantity</th></tr> \n');

		let lines = shoppingCartObj.getLines();
		//Object.keys(lines).forEach(function(productId) {
		for (let [productId, shoppingCartLine] of lines) {
			//let shoppingCartLine = lines[productId];
			let pName = shoppingCartLine["_product"]._name;
			let quantity = shoppingCartLine._quantity;
			res.write('' +
				'	<tr> \n' +
				'		<td>' + productId + '</td> \n' +
				'		<td>' + pName + '</td> \n' +
				'		<td>' + quantity + '</td> \n' +
				'	</tr> \n');
		};

/*
		let jsonObjects = JSON.parse(jsonString);
		for (let i = 0; i < jsonObjects.length; i++) {
			let jsonObj = jsonObjects[i];
			for (let j = 0; j < jsonObj.length; j = j + 2) {
				let pId = jsonObj[j];
				let pCartLine = jsonObj[j + 1];
				let pName = pCartLine["_product"]._name;
				let quantity = pCartLine._quantity;
				res.write('' +
					'	<tr> \n' +
					'		<td>' + pId + '</td> \n' +
					'		<td>' + pName + '</td> \n' +
					'		<td>' + quantity + '</td> \n' +
					'	</tr> \n');
			}
		}
*/
		res.write('</table> \n');
		res.write('</body></html>');
	}
});

module.exports = router;
