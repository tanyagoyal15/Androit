import React, { Component } from 'react';
import { storeProducts } from './data';
import fire from './config/FirebaseConfig'

const ProductContext = React.createContext();

class ProductProvider extends Component {
constructor(props) {
		super(props)
		this.state = {
			user : {},
			products: [],
			cart: [],
			cartSubTotal: 0,
			cartTax: 0,
			cartTotal:0
		}
	}

	componentDidMount() {
		this.authListener();
		this.setProducts();
		if(localStorage.getItem('cartItems')) {
	    	this.setState({cart : JSON.parse(localStorage.getItem('cartItems'))});
	    }
	}

	authListener() {
		fire.auth().onAuthStateChanged((user) => {
			if(user) {
				this.setState({ user });
				// console.log(this.state);
			} else {
				this.setState({ user : null });
				// console.log(this.state);
			}
		})
	}

	setProducts = () => {
		let tempProducts = [];
		storeProducts.forEach(item => {
			const singleItem = {...item};
			tempProducts = [...tempProducts, singleItem];
		});
		this.setState(() => {
			return { products: tempProducts };
		});
	};

	getItem = id => {
		const product = this.state.products.find(item => item.id === id);
		return product;
	}

	addToCart = id => {
		let tempProducts = [...this.state.products];
		const index = tempProducts.indexOf(this.getItem(id));
		const product = tempProducts[index];
		product.inCart = true;
		product.count = 1;
		const price = product.price;
		product.total = price;
		this.setState(() => {
			return { products: tempProducts, cart: [...this.state.cart, product] };
		}, () => {
			this.addTotals();
			localStorage.setItem("cartItems" ,JSON.stringify(this.state.cart));
	     	return this.state.cart;	
	    });
	}; 
	
	increment = id => {
		let tempCart = [...this.state.cart];
		const selectedProduct = tempCart.find(item => item.id === id);

		const index = tempCart.indexOf(selectedProduct);
		const product = tempCart[index];

		product.count = product.count + 1;
		product.total = product.count * product.price;

		this.setState(
			() => {
			return {cart: [...tempCart]}
		}, 
		() => {
			this.addTotals();
		})
	}

	decrement = id => {
		let tempCart = [...this.state.cart];
		const selectedProduct = tempCart.find(item => item.id === id);

		const index = tempCart.indexOf(selectedProduct);
		const product = tempCart[index];

		product.count = product.count - 1;
		if(product.count === 0) {
			this.removeItem(id);
		}
		else {
			product.total = product.count * product.price;
			this.setState(
			() => {
			return {cart: [...tempCart]}
		}, 
		() => {
			this.addTotals();
		}
		);
		}
	}

	removeItem = id => {
		let tempProducts = [...this.state.products];
		let tempCart = [...this.state.cart];

		tempCart = tempCart.filter(item => item.id !== id);

		const index = tempProducts.indexOf(this.getItem(id));
		let removedProduct = tempProducts[index];
		removedProduct.inCart = false;
		removedProduct.count = 0;
		removedProduct.total = 0;

		this.setState(
			() => {
			return {
				cart: [...tempCart],
				product: [...tempProducts]
			};
		},
		() => {
			this.addTotals();
		}
		);
	}

	clearCart = () => {
		this.setState(() => {
			localStorage.setItem("cartItems" ,JSON.stringify(this.state.cart));
			return {cart:[]};
		}, () => {
			this.setProducts();
			this.addTotals();
		});
	}

	addTotals = () => {
		let subTotal = 0;
		this.state.cart.map(item => (subTotal += item.total));
		const tempTax = subTotal * 0.1;
		const tax = parseFloat(tempTax.toFixed(2));
		const total = subTotal + tax;
		this.setState(() => {
			return {
				cartSubTotal: subTotal,
				cartTax: tax,
				cartTotal: total
			}
		})
	}

	checkout = () => {
		if(this.state.user) {
		 	{alert('checkout needs to be implemented')}
		} else {
			{alert('Please Login to Checkout')}
		}
	}
	
	render() {
		return (
			<ProductContext.Provider 
			value={{
				...this.state,
				authListener: this.authListener,
				addToCart:this.addToCart,
				increment: this.increment,
				decrement: this.decrement,
				removeItem: this.removeItem,
				clearCart: this.clearCart,
				checkout: this.checkout
			}}>
			{this.props.children}
			</ProductContext.Provider>
		)
	}
}

const ProductConsumer = ProductContext.Consumer;

export { ProductProvider, ProductConsumer };
