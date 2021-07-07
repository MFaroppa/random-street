/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Modal, Paper, Slider } from '@material-ui/core';
import { useEffect, useState } from 'react';
import Credits from './Credits';
import FinishPage from './FinishPage';
import './Market.css';
import PricesChart from './PricesChart';
import Products from './Products';
import ProductSelector from './ProductSelector';
import TransactionHistory from './TransactionHistory';

const PRICE_CALCULATION_TIME = 500;
const PRICES_LENGTH = 365;
const TIME_PERIOD = 1/365;
const STANDARD_DEVIATION = Math.sqrt(TIME_PERIOD)

export default function Market(props) {

	let [money, setMoney] = useState(props.difficulty.initialMoney)
	let [time, setTime] = useState(0)
	let [products, setProducts] = useState(props.products)
	let [showProducts, setShowProducts] = useState(false)
	let [showCredits, setShowCredits] = useState(false)
	let [credit, setCredit] = useState(undefined)
	let [counter, setCounter] = useState(0)
	let [visibleProduct, setVisibleProduct] = useState(products[0])
	let [stock] = useState([])
	let [marketTrend, setMarketTrend] = useState(0)
	let [newTransaction, setNewTransaction] = useState(undefined)
	let [priceCalculationTime, setPriceCalculationTime] = useState(PRICE_CALCULATION_TIME)
	let [finished, setFinished] = useState(false)

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
				time: time,
				price: lastPrice
			})
		}

		product.historicalPrices = [...product.historicalPrices.slice(Math.max(product.historicalPrices.length - PRICES_LENGTH-1 + n, 0)), ...tempPrices]
		product.currentPrice = lastPrice.toFixed(2)

		return product;
	}

	let buyProduct = (product, amount) => {
		const index = products.indexOf(product);
		if (amount > 0 && amount <= money && index !== undefined) {
			let productUnits = amount / product.currentPrice;

			product.owned += productUnits
			products[index] = product

			setMoney(money - amount)

			let productStock = stock.indexOf(stock.find(auxStock => auxStock.product === product.name))
			let newAmount = productStock !== -1 ? stock[productStock].amount + productUnits : productUnits

			let newStock = {
				product: product.name,
				amount: newAmount,
			}

			setNewTransaction({
				id: newTransaction === undefined ? 1 : newTransaction.id + 1,
				type: 'Comprar',
				product: product.name,
				amount: productUnits,
				price: product.currentPrice
			})

			if (productStock !== -1)
				stock[productStock] = newStock
			else
				stock.push(newStock)
		}
	}

	let sellProduct = (product, amount) => {
		const index = products.indexOf(product)
		if (index !== undefined) {
			product = products[index]
			let productStock = stock.indexOf(stock.find(auxStock => auxStock.product === product.name))

			if (amount <= product.owned && productStock !== -1) {
				let newAmount = stock[productStock].amount - amount

				product.owned -= amount
				products[index] = product

				setMoney(money + amount * product.currentPrice)

				setNewTransaction({
					id: newTransaction === undefined ? 1 : newTransaction.id + 1,
					type: 'Vender',
					product: product.name,
					amount: amount,
					price: product.currentPrice
				})
				
				if (newAmount === 0)
					stock.splice(productStock, 1)
				else
					stock[productStock].amount = newAmount
			}
		}
	}

	let handleClose = () => {
		setShowProducts(false);
		setShowCredits(false);
	}

	let editProducts = editedProducts => {
		setProducts(editedProducts);
	}

	let handleCredit = credit => {
		setCredit(credit);
	}

	useEffect(() => {
		if (credit) {
			setMoney(actualMoney => actualMoney + credit.amount)
			setCounter(credit.time)

			setTimeout(() => {
				setMoney(actualMoney => actualMoney - credit.return)
				setCredit(undefined)
			}, credit.time*1000)
		}
	}, [credit])

	useEffect(() => {
		const timer = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
		return () => clearInterval(timer);
	  }, [counter]);

	//timer for new price calculation
	useEffect(() => {
		if (!finished) {
			let interval = setInterval(() => {
				setTime(time + 1)
				let editedProducts = []
				for (let product of products) {
					editedProducts.push(generatePrice(product))
				}

				if (props.difficulty.bankrupcy && (time+1) % 30 === 0) {
					setMoney(money - props.difficulty.annualCost)
				}
				
				setProducts(editedProducts)

			}, priceCalculationTime)

			return () => {
				clearInterval(interval);
			}
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

	const finishSession = () => {
		const currentSession = JSON.parse(localStorage.getItem('currentUser'))
		let historicalData = JSON.parse(localStorage.getItem('historicalData'))
		historicalData.push({user: currentSession.currentUser, score: money, date: new Intl.DateTimeFormat('es-ES').format(new Date()), difficulty: currentSession.difficulty})
		localStorage.setItem('historicalData', JSON.stringify(historicalData))
		
		setFinished(true)
	}

	useEffect(() => {
		const currentSession = JSON.parse(localStorage.getItem('currentUser'))
		if (money <= 0 && currentSession.difficulty.bankrupcy)
			finishSession()
	}, [money])


	return (
		<div className="market-container">
			<div className="menu">
				<div className="options">
					<Button style={{color: "gray", width: "150px"}} onClick={() => setShowProducts(true)}>
						Productos
					</Button>
					<Button style={credit && counter > 0 ? {color: "darkgray", width: "150px"} : {color: "gray", width: "150px"}} onClick={() => setShowCredits(true)} disabled={!!credit}>
						Créditos {counter > 0 && <span>&#8287;({counter})</span>}
					</Button>
					<span style={{color: "gray", display: "flex", alignItems: "center", gap: "12px", fontWeight: "500"}}>
						<Slider
							style={{color: "gray", width: "100px"}}
							defaultValue={500}
							value={priceCalculationTime}
							onChange={(ev, value) => {
								setPriceCalculationTime(value)
							}}
							aria-labelledby="discrete-slider"
							valueLabelDisplay="off"
							step={100}
							min={100}
							max={1000}
						/>
						{priceCalculationTime} ms
					</span>
				</div>
				<div style={{display: 'flex'}}>
					<div className="actual-money">
						${money.toFixed(2)}
					</div>
					<Button style={{color: "gray", width: "150px"}} onClick={() => finishSession()}>
						Finalizar
					</Button>
				</div>
				
			</div>
			{products.length > 0 && (
				<div className="market">
					<div className="selector">
						<ProductSelector products={products} selectProduct={setVisibleProduct} money={money} buyProduct={buyProduct} sellProduct={sellProduct}/>
					</div>
					<div className="prices-chart">
						<PricesChart key={visibleProduct.id} product={visibleProduct}/>
					</div>
					<div className="history">
						<TransactionHistory newTransaction={newTransaction}/>
					</div>
				</div>
			)}
			<Modal
				open={showProducts}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
			>
					<Paper elevation={3} style={{width: 'auto', height: 'auto', padding: '48px'}}>
						<Products products={products} editProducts={editProducts} handleClose={handleClose}/>
					</Paper>
			</Modal>
			<Modal
				open={showCredits}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
			>
					<Paper elevation={3} style={{width: 'auto', height: 'auto', padding: '48px'}}>
						<Credits handleClose={() => setShowCredits(false)} concreteCredit={handleCredit}/>
					</Paper>
			</Modal>
			<Modal
				open={finished}
				onClose={() => window.location.reload()}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
				style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
			>
					<Paper elevation={3} style={{width: 'auto', height: 'auto', padding: '48px'}}>
						<FinishPage money={money}/>
					</Paper>
			</Modal>
		</div>
	);
}