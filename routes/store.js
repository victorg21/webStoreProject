const express = require('express');
const router = express.Router();
//const session = require('express-session');
const Inventory = require('../models/Inventory.js');

/* GET users listing. */
router.get('/', function(req, res, next) {

	res.header("Content-Type", "text/html; charset=utf-8");
	
	let inventory = new Inventory();
	renderStore(res, inventory);

	res.end()


	function renderStore(res, inventory){
		let products = inventory.inventory;

		res.write('<!DOCTYPE html>\n' +
			'<html>\n' +
			'<header>\n' +
			' <script type="text/javascript">\n' +
			'</script>\n' +
			'</header>\n' +
			'<body>\n' +
			'<h1>Products list</h1>\n' +
			'<table border="1">\n' +
			'<tr><th>id</th><th>name</th><th>Price</th><th>left</th><th></th><th>quantity</th></tr>\n'
		);

		for (let [productId, productLine] of products) {
			//strMap.set(k, obj[k]);
			res.write("<tr>");
			res.write('<td>' +productId +'</td><td>' +productLine.product.name +'</td><td>' +productLine.product.price +'</td><td>' +productLine.quantity +'</td>');
			res.write('<td width="100px;"></td>');
			res.write('<td>' +
				'<form style="display:inline-block;float:left;" method="POST" action="http://localhost:3000/cart" accept-charset="utf-8">\n' +
				'<input type="hidden" name="productId" ' +'value="' +productId +'" />' +
				'<input type="hidden" name="productName" ' +'value="' +productLine.product.name +'" />' +
				'<input type="hidden" name="productPrice" ' +'value="' +productLine.product.price +'" />' +
				'<input type="hidden" name="productAmountLeft"' +'value="' +productLine.quantity +'" />' +
				'<input type="text" name="quantity"/>' +
				'<button style="float:right;" type="submit">Add to cart</button>' +
				'</form >\n' +
				'</td>');
			res.write("</tr>");
		}
		//req.session.views++
		res.write('</table>');
		res.write('<div style="display:inline-block;float:left;margin-left:20px;">\n<button onclick="location.href=\'http://localhost:3000/cart\'">Show Cart</button>\n</div>\n');
		res.write('</body></html>');
	}
});

module.exports = router;
