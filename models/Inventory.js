'use strict';

const Product = require('../models/Product.js');
let _instance = null;

class Inventory {
	constructor() {
		if(!_instance) {
			this._inventory = new Map([
				['101', {product: new Product('101', 'p1', 20), quantity: 100}],
				['102', {product: new Product('102', 'p2', 20), quantity: 100}],
				['103', {product: new Product('103', 'p3', 20), quantity: 100}],
				['104', {product: new Product('104', 'p4', 20), quantity: 100}],
				['105', {product: new Product('105', 'p5', 20), quantity: 100}]
			]);

			_instance = this;
		}
		return _instance;
	}

	get inventory(){
		return this._inventory;
	}
/*
	get products() {
		return this._products;
	}
	set products(value) {
		this._products = value;
	}
*/
	getProduct(productId) {
		return this._inventory.get(productId).product;
	}

	getQuantity(productId){
		return this._inventory.get(productId).quantity;
	}

	setQuantity(productId, quantity){
		let invRow = this._inventory.get(productId);
		invRow.quantity = invRow.quantity + quantity;
	}
}

module.exports = Inventory;