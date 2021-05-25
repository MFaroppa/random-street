import { Button, makeStyles, Slider } from "@material-ui/core";
import { useState } from "react";


const useStyles = makeStyles({
    slider: {
        width: 200
    }
});

export default function Transaction(props) {
    const classes = useStyles();

    let [percentage, setPercentage] = useState(50)

    let product = props.product;
    let money = props.money;
    let transactionType = props.transactionType;

    const handleChange = (event, newValue) => {
        setPercentage(newValue);
    };

    return (
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Slider 
                value={percentage} 
                onChange={handleChange} 
                aria-labelledby="continuous-slider" 
                className={classes.slider} 
            />
            
            {transactionType === "Buy" ?
                <div>
                    <span style={{marginRight: '24px'}}>{((money*percentage/100)/product.currentPrice).toFixed(4)}</span>
                    <span>${(money*percentage/100)} </span>
                </div>
            : 
                <div>
                    <span style={{marginRight: '24px'}}>{(product.owned*percentage/100).toFixed(2)}</span>
                    <span>${(product.currentPrice * product.owned * percentage/100).toFixed(2)}</span>
                </div>
            }
            {transactionType === "Buy" ?
                <Button 
                    onClick={() => props.transactionMethod(product, ((money*percentage/100)/product.currentPrice))} 
                    color="primary" 
                    variant="contained"
                    disabled={money === 0}>
                    Buy
                </Button>
            :
                <Button 
                    onClick={() => {
                        props.transactionMethod(product, (product.owned*percentage/100))
                    }} 
                    color="secondary" 
                    variant="contained"
                    disabled={product.owned === 0}>
                    Sell
                </Button>
            }  
        </div>
    )
}