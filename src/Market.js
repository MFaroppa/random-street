/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Portfolio from './Portfolio';
import Product from './Product';

const PRICE_CALCULATION_TIME = 200;
const PRICES_LENGTH = 365;
const TIME_PERIOD = 1/365;
const STANDARD_DEVIATION = Math.sqrt(TIME_PERIOD)

export default function Market(props) {

	let [money, setMoney] = useState(props.money)
	let [time, setTime] = useState(0)
	let [products, setProducts] = useState(props.products)
	let [visibleProduct, setVisibleProduct] = useState(products[0])
	let [stock] = useState([])

	function generateGaussian(mean, std) {
		var u1 = Math.random();
		var u2 = Math.random();
		var z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(Math.PI * 2 * u2);
		return z * std + mean;
	}

	let generatePrice = (product, n = 5) => {
		let lastPrice = product.historicalPrices[product.historicalPrices.length - 1].price
		let tempPrices = []

		if (product.historicalPrices.length < PRICES_LENGTH)
			n = PRICES_LENGTH

		for (let x = 0; x < n; x++) {
			const variation = lastPrice * TIME_PERIOD * product.drift + lastPrice * product.volatility * generateGaussian(0, STANDARD_DEVIATION);
			lastPrice += variation;

			tempPrices.push({
				time: time + TIME_PERIOD,
				price: lastPrice
			})
		}

		product.historicalPrices = [...product.historicalPrices.slice(Math.max(product.historicalPrices.length - PRICES_LENGTH-1 + n, 0)), ...tempPrices]
		product.currentPrice = lastPrice

		return product;
	}

	let buyProduct = (product, amount) => {
		const index = products.indexOf(product)
		if (amount * product.currentPrice <= money && index !== undefined) {
			product.owned += amount
			products[index] = product

			setMoney(money - amount * product.currentPrice)

			let commonStock = stock.indexOf(stock.find(auxStock => auxStock.product === product.name))
			let newAmount = commonStock !== -1 ? stock[commonStock].amount + amount : amount
			let meanPrice = commonStock !== -1 ? ((stock[commonStock].spent*stock[commonStock].amount) + product.currentPrice)/newAmount : product.currentPrice

			let newStock = {
				product: product.name,
				amount: newAmount,
				spent: meanPrice
			}

			if (commonStock !== -1)
				stock[commonStock] = newStock
			else
				stock.push(newStock)
		}
	}

	let sellProduct = (product, amount) => {
		const index = products.indexOf(product)
		if (amount <= product.owned && index !== undefined) {
			let commonStock = stock.indexOf(stock.find(auxStock => auxStock.product === product.name))
			let newAmount = stock[commonStock].amount - amount

			product.owned -= amount
			products[index] = product

			setMoney(money + amount * product.currentPrice)
			
			if (newAmount === 0)
				stock.splice(commonStock, 1)
			else
				stock[commonStock].amount = newAmount
		}
	}

	//timer for new price calculation
	useEffect(() => {
		let interval = setInterval(() => {
			setTime(time + TIME_PERIOD)
			let editedProducts = []
			for (let product of products) {
				editedProducts.push(generatePrice(product))
			}
			
			setProducts(editedProducts)

		}, PRICE_CALCULATION_TIME)

		return () => {
			clearInterval(interval);
		}
	}, [products])

	//backup
	useEffect(() => {
		let interval = setInterval(() => {
			localStorage.setItem("products", JSON.stringify(products))
			localStorage.setItem("money", money)
		}, 5000)

		return () => {
			clearInterval(interval)
		}
	}, [])

	return (
		<div className="market-container">
			<h3>You have ${money.toFixed(2)}</h3>
			<span>
				{
					products.map(product => {
						return <Button size="small" color={product.id === visibleProduct.id ? "primary" : "default"} variant="contained" key={product.id} onClick={() => setVisibleProduct(product)}>{product.name}</Button>
					})
				}
				{visibleProduct.currentPrice > 0 ? ("Current price: " + visibleProduct.currentPrice.toFixed(2)) : null}
			</span>

			<Product className="product" key={visibleProduct.id} product={visibleProduct} buyProduct={buyProduct} sellProduct={sellProduct}/>
			<Portfolio stocks={stock} />
		</div>
	);
}