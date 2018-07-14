'use strict';

const ShoppingCart = require('../models/ShoppingCart.js');
let _instance = null;

class Users {
	constructor() {
		if(!_instance){
			this._shoppingCarts = new Map();
			_instance = this;
		}
		return _instance;
	}

	addShoppingCart(userId, shoppingCart) {
		this.shoppingCarts.set(userId, shoppingCart);
	}

	getShoppingCart(userId){
		if(userId in this._shoppingCarts){
			return this._shoppingCarts.get(userId);
		}else{
			//Add new shoppingCart into map
			let shoppingCart = new ShoppingCart();
			this._shoppingCarts.set(userId, shoppingCart);
			return shoppingCart;
		}
	}
}

module.exports = Users;