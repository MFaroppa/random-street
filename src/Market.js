import { useEffect, useState } from 'react';
import { LineChart, Line, YAxis } from 'recharts';

const PRICE_CALCULATION_TIME = 500;
const PRICES_LENGTH = 365;
const TIME_PERIOD = 1/365;
const STANDARD_DEVIATION = Math.sqrt(TIME_PERIOD)

export default function Market(props) {

	let [products, setProducts] = useState([
		{
			name: "Bytecoin",
			drift: 0.15,
			volatility: 0.1,
			owned: 0,
			currentPrice: 50000,
			historialPrices: [{
				time: 0,
				price: 500000
			}]
		},
		{
			name: "Soybean",
			drift: 0.1,
			volatility: 0.05,
			owned: 0,
			currentPrice: 600,
			historialPrices: [{
				time: 0,
				price: 600
			}]
		}
	])

	let [time, setTime] = useState(0)

	function generateGaussian(mean, std) {
		var u1 = Math.random();
		var u2 = Math.random();
		var z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(Math.PI * 2 * u2);
		return z * std + mean;
	}

	let generatePrice = (product, n = 5) => {
		let lastPrice = product.historialPrices[product.historialPrices.length - 1].price
		let tempPrices = []

		if (product.historialPrices.length < PRICES_LENGTH)
			n = PRICES_LENGTH

		for (let x = 0; x < n; x++) {
			const variation = lastPrice * TIME_PERIOD * product.drift + lastPrice * product.volatility * generateGaussian(0, STANDARD_DEVIATION);
			lastPrice += variation;

			tempPrices.push({
				time: time + TIME_PERIOD,
				price: lastPrice
			})
		}

		product.historialPrices = [...product.historialPrices.slice(Math.max(product.historialPrices.length - PRICES_LENGTH-1 + n, 0)), ...tempPrices]
		product.currentPrice = lastPrice

		return product;
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

	return (
		<div className="market">
			<LineChart width={1000} height={300} data={products[0].historialPrices}>
				<YAxis/>
				<Line type="monotone" dataKey="price" isAnimationActive={false} dot={false} stroke="#8884d8" />
			</LineChart>
			<LineChart width={1000} height={300} data={products[1].historialPrices}>
				<YAxis/>
				<Line type="monotone" dataKey="price" isAnimationActive={false} dot={false} stroke="#8884d8" />
			</LineChart>
		</div>
	);
}