/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Portfolio from './Portfolio';
import Product from './Product';
import ProductSelector from './ProductSelector';
import './Market.css';

const PRICE_CALCULATION_TIME = 1000;
const PRICES_LENGTH = 365;
const TIME_PERIOD = 1/365;
const STANDARD_DEVIATION = Math.sqrt(TIME_PERIOD)

export default function Market(props) {

	let [money, setMoney] = useState(props.money)
	let [time, setTime] = useState(0)
	let [products, setProducts] = useState(props.products)
	let [visibleProduct, setVisibleProduct] = useState(products[0])
	let [stock] = useState([])
	let [marketTrend, setMarketTrend] = useState(0)

	function generateRandom(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	function generateGaussianRandom(mean, std) {
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
			const variation = lastPrice * TIME_PERIOD * product.drift + lastPrice * product.volatility * generateGaussianRandom(marketTrend, STANDARD_DEVIATION);
			lastPrice += variation;

			tempPrices.push({
				time: time + TIME_PERIOD,
				price: lastPrice
			})
		}

		product.historicalPrices = [...product.historicalPrices.slice(Math.max(product.historicalPrices.length - PRICES_LENGTH-1 + n, 0)), ...tempPrices]
		product.currentPrice = lastPrice.toFixed(2)

		return product;
	}

	let buyProduct = (product, amount) => {
		const index = products.indexOf(product)
		if (amount > 0 && amount * product.currentPrice <= money && index !== undefined) {
			product.owned += amount
			products[index] = product

			setMoney(money - amount * product.currentPrice)

			let productStock = stock.indexOf(stock.find(auxStock => auxStock.product === product.name))
			let newAmount = productStock !== -1 ? stock[productStock].amount + amount : amount
			let meanPrice = productStock !== -1 ? (stock[productStock].meanPrice*stock[productStock].amount + product.currentPrice*amount)/newAmount : product.currentPrice

			let newStock = {
				product: product.name,
				amount: newAmount,
				meanPrice: meanPrice
			}

			if (productStock !== -1)
				stock[productStock] = newStock
			else
				stock.push(newStock)
		}
	}

	let sellProduct = (product, amount) => {
		const index = products.indexOf(product)
		let productStock = stock.indexOf(stock.find(auxStock => auxStock.product === product.name))
		if (amount <= product.owned && index !== undefined && productStock !== -1) {
			let newAmount = stock[productStock].amount - amount

			product.owned -= amount
			products[index] = product

			setMoney(money + amount * product.currentPrice)
			
			if (newAmount === 0)
				stock.splice(productStock, 1)
			else
				stock[productStock].amount = newAmount
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

	let trendLoop = () => {
		setTimeout(() => {
			setMarketTrend(generateGaussianRandom(0, 0.01))
			trendLoop()
		}, generateRandom(5000, 60000))
	}

	useEffect(() => {
		trendLoop()
	}, [])


	return (
		<div className="market-container">
			{products.length > 0 && (
				<div>
					<h3>You have ${money.toFixed(2)}</h3>
					<div className="selector">
						<ProductSelector products={products} selectProduct={setVisibleProduct}/>
					</div>
					<div className="prices-chart">
						<Product className="product" key={visibleProduct.id} product={visibleProduct} money={money} buyProduct={buyProduct} sellProduct={sellProduct}/>
					</div>
					<div className="portfolio">
						<Portfolio stocks={stock} />
					</div>
				</div>
			)}
		</div>
	);
}