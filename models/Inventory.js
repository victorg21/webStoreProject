'use strict';

const Product = require('../models/Product.js');

Inventory.Inventory = new Map([
	['101', {quantity: 100}],
	['102', {quantity: 100}],
	['103', {quantity: 100}],
	['104', {quantity: 100}],
	['105', {quantity: 100}]
]);

class Inventory {
	constructor() {
		this._products = new Map([
			['101', new Product('101', 'p1', 20)],
			['102', new Product('102', 'p2', 20)],
			['103', new Product('103', 'p3', 20)],
			['104', new Product('104', 'p4', 20)],
			['105', new Product('105', 'p5', 20)]
		]);
	}

	get products() {
		return this._products;
	}
	set products(value) {
		this._products = value;
	}

	getProduct(id) {
		return this.getProducts(id);
	}

	static getQuantity(id){
		return Inventory.Inventory.get(id);
	}

	static setQuantity(id, quantity){
		let invRow = Inventory.Inventory.get(id);
		invRow.quantity = qRec.quantity + quantity;
	}
}

module.exports = Inventory;