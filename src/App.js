import { useEffect, useState } from 'react';
import { LineChart, Line, YAxis } from 'recharts';
import './App.css';

const PRICE_CALCULATION_TIME = 500;
const PRICES_LENGTH = 365;
const TIME_PERIOD = 1/365;
const STANDARD_DEVIATION = Math.sqrt(TIME_PERIOD)

function App(props) {

	let [time, setTime] = useState(0)
	let [currentPrice, setCurrentPrice] = useState(500)
	let [prices, setPrices] = useState([{
		time: 0,
		price: 500
	}])

	function generateGaussian(mean, std) {
		var u1 = Math.random();
		var u2 = Math.random();
		var z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(Math.PI * 2 * u2);
		return z * std + mean;
	}

	let generatePrice = () => {
		const lastPrice = prices[prices.length - 1].price
		const variation = lastPrice * TIME_PERIOD * props.drift + lastPrice * props.volatility * generateGaussian(0, STANDARD_DEVIATION);
		setPrices(oldPrices => [...oldPrices.slice(Math.max(oldPrices.length - PRICES_LENGTH-1, 0)), {
			time: time + TIME_PERIOD,
			price: lastPrice + variation
		}])
	}

	useEffect(() => {
		setCurrentPrice(prices[prices.length - 1].price)
	}, [prices])

	//timer for new price calculation
	useEffect(() => {
		let interval = setInterval(() => {
			setTime(time + TIME_PERIOD)
			generatePrice()
		}, PRICE_CALCULATION_TIME)

		return () => {
			clearInterval(interval);
		}
	}, [prices])

	return (
		<div className="App">
			{currentPrice}
			<LineChart width={1000} height={300} data={prices}>
				<YAxis/>
				<Line type="monotone" dataKey="price" isAnimationActive={false} dot={false} stroke="#8884d8" />
			</LineChart>
		</div>
	);
}

export default App;
