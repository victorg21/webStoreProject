'use strict';

const Product = require('../models/Product.js');
const ShoppingCartLine = require('../models/ShoppingCartLine.js');

class ShoppingCart {
	constructor() {
		this._lines = new Map();
	}

	addProduct(product, quantity){
		let productId = product.id;
		if(productId in this._lines){
			let inCartLine = this._lines.get(productId);
			let inQuantity = inCartLine.quantity;
			let newQuantity = parseInt(inQuantity) + parseInt(cartLine.quantity);
			cartLine.quantity = newQuantity;
			this._lines.set(productId, cartLine);
		}else{
			this._lines.set(productId, cartLine);
		}
	}

	addShoppingCartLine(cartLine) {
		let product = cartLine.product;
		let productId = product.id;
		if(this._lines.has(productId)){
			let inCartLine = this._lines.get(productId);
			let inQuantity = inCartLine.quantity;
			let newQuantity = parseInt(inQuantity) + parseInt(cartLine.quantity);
			cartLine.quantity = newQuantity;
			this._lines.set(productId, cartLine);
		}else{
			this._lines.set(productId, cartLine);
		}
	}

	getLines(){
		return this._lines;
	}

	get total(){
		let total = 0;
		for (let [productId, shoppingCartLine] of this._lines) {
			let product = shoppingCartLine.product;
			let quantity = shoppingCartLine.quantity;
			total += parseFloat(product._price) * parseInt(quantity);
		}
		return total;
	}
}

module.exports = ShoppingCart;