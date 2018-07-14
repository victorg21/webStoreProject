'use strict';

const Product = require('../models/Product.js');
const ShoppingCartLine = require('../models/ShoppingCartLine.js');

class ShoppingCart {
	constructor() {
		this.lines = new Map();
	}

	addProduct(product, quantity){
		let productId = product.id;
		if(productId in this.lines){
			let inCartLine = this.lines.get(productId);
			let inQuantity = inCartLine.quantity;
			let newQuantity = parseInt(inQuantity) + parseInt(cartLine.quantity);
			cartLine.quantity = newQuantity;
			this.lines.set(productId, cartLine);
		}else{
			this.lines.set(productId, cartLine);
		}
	}

	addShoppingCartLine(cartLine) {
		let product = cartLine.product;
		let productId = product.id;
		if(productId in this.lines){
			let inCartLine = this.lines.get(productId);
			let inQuantity = inCartLine.quantity;
			let newQuantity = parseInt(inQuantity) + parseInt(cartLine.quantity);
			cartLine.quantity = newQuantity;
			this.lines.set(productId, cartLine);
		}else{
			this.lines.set(productId, cartLine);
		}
	}

	getLines(){
		return this.lines;
	}

	get total(){
		let total = 0;
		for (let [productId, shoppingCartLine] of this.lines) {
			let product = shoppingCartLine.product;
			let quantity = shoppingCartLine.quantity;
			total += parseFloat(product._price) * parseInt(quantity);
		}
		return total;
	}

	toJson(){
		return JSON.stringify([...this.lines]);
	}

	fromJson(jsonString){
		this.lines = new Map();
		let jsonObjects = JSON.parse(jsonString);
		for(let i=0; i<jsonObjects.length; i++){
			let jsonObj = jsonObjects[i];
			for(let j=0; j<jsonObj.length; j=j+2){
				let pId = jsonObj[j];
				let pCartLine = jsonObj[j+1];
				let pName = pCartLine._product._name;
				let pPrice = pCartLine._product._price;
				let product = new Product(pId, pPrice, pName);
				let quantity = pCartLine._quantity;
				let shoppingCartLine = new ShoppingCartLine(product, quantity);
				this.addShoppingCartLine(shoppingCartLine);
			}
		}
	}
}

module.exports = ShoppingCart;