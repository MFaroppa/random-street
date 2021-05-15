import { Button, makeStyles, Slider } from '@material-ui/core';
import { useState } from 'react';
import { LineChart, Line, YAxis } from 'recharts';

const useStyles = makeStyles({
    root: {
      width: 500,
    },

    slider: {
        width: 200
    }
  });

export default function Product(props) {
    const classes = useStyles();
    let [buyPercentage, setBuyPercentage] = useState(50)
    let [sellPercentage, setSellPercentage] = useState(50)

    const handleBuyChange = (event, newValue) => {
        setBuyPercentage(newValue);
    };

    const handleSellChange = (event, newValue) => {
        setSellPercentage(newValue);
    };

    let money = props.money
    let product = props.product;

    return (
        <div className={classes.root}>
            <LineChart width={1000} height={300} data={product.historicalPrices}>
				<YAxis/>
				<Line type="monotone" dataKey="price" isAnimationActive={false} dot={false} stroke="#8884d8" />
			</LineChart>
            <div className="options">
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Slider value={buyPercentage} onChange={handleBuyChange} aria-labelledby="continuous-slider" className={classes.slider} />
                    <span>${(money*buyPercentage/100).toFixed(2)}</span>
                    <Button onClick={() => props.buyProduct(product, (money*buyPercentage/100)/product.currentPrice)} color="primary" variant="contained">Buy</Button>
                </div>
                <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <Slider value={sellPercentage} onChange={handleSellChange} aria-labelledby="continuous-slider" className={classes.slider} />
                    <span>${(product.currentPrice*product.owned*sellPercentage/100).toFixed(2)}</span>
                    <Button onClick={() => props.sellProduct(product, product.owned*sellPercentage/100)} color="secondary" variant="contained">Sell</Button>
                </div>
            </div>
        </div>
    )
}