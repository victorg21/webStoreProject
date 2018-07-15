const express = require('express');
const router = express.Router();

const session = require('express-session');
const Inventory = require('../models/Inventory.js');
const Users = require('../models/Users.js');
const ShoppingCart = require('../models/ShoppingCart.js');
const ShoppingCartLine = require('../models/ShoppingCartLine.js');
const Product = require('../models/Product.js');

router.post('/', function(req, res, next) {
	if (req.session.id) {
		let pId = req.body["productId"];
		let pName = req.body["productName"];
		let pPrice = req.body["productPrice"];
		let pAmountLeft = req.body["productAmountLeft"];
		let pQuantity = req.body["quantity"];

		console.log("pId=" + pId + " pName=" + pName + " pPrice=" + pPrice + " pQuantity=" + pQuantity);
		let product = new Product(pId, pName, pPrice);
		let shoppingCartLine = new ShoppingCartLine(product, pQuantity);

		let userId = req.session.id;
		let users = new Users();
		let shoppingCartObj = users.getShoppingCart(userId);
		console.log("userId=" +userId, " shoppingCartObj=" +shoppingCartObj);

		shoppingCartObj.addShoppingCartLine(shoppingCartLine);
		users.addShoppingCart(userId, shoppingCartObj);

		let inventory = new Inventory();
		inventory.setQuantity(pId, (parseInt(pQuantity) * -1));
		//console.log("Inventory.sInventory = " + inventory.getInventory());

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
		for (let [productId, shoppingCartLine] of lines) {
			let pName = shoppingCartLine["_product"]._name;
			let quantity = shoppingCartLine._quantity;
			res.write('' +
				'	<tr> \n' +
				'		<td>' + productId + '</td> \n' +
				'		<td>' + pName + '</td> \n' +
				'		<td>' + quantity + '</td> \n' +
				'	</tr> \n');
		};

		res.write('</table> \n');
		res.write('</body></html>');
	}
});

module.exports = router;
