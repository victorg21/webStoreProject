'use strict';

const Product = require('../models/Product.js');
let _instance = null;

class Inventory {
	constructor() {
		if(!_instance) {
			this._products = new Map([
				['101', new Product('101', 'p1', 20)],
				['102', new Product('102', 'p2', 20)],
				['103', new Product('103', 'p3', 20)],
				['104', new Product('104', 'p4', 20)],
				['105', new Product('105', 'p5', 20)]
			]);

			this._inventory = new Map([
				['101', {quantity: 100}],
				['102', {quantity: 100}],
				['103', {quantity: 100}],
				['104', {quantity: 100}],
				['105', {quantity: 100}]
			]);

			_instance = this;
		}
		return _instance;
	}

	getInventory(){
		return this._inventory;
	}

	get products() {
		return this._products;
	}
	set products(value) {
		this._products = value;
	}

	getProduct(productId) {
		return this.getProducts(productId);
	}

	getQuantity(productId){
		return this._inventory.get(productId);
	}

	setQuantity(productId, quantity){
		let invRow = this._inventory.get(productId);
		invRow.quantity = invRow.quantity + quantity;
	}
}

module.exports = Inventory;