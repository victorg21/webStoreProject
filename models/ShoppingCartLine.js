'use strict';

class ShoppingCartLine {
	constructor(product, quantity) {
		this._product = product;
		this._quantity = quantity;
	}

	get product() {
		return this._product;
	}

	set product(value) {
		this._product = value;
	}

	get quantity() {
		return this._quantity;
	}

	set quantity(value) {
		this._quantity = value;
	}
}

module.exports = ShoppingCartLine;