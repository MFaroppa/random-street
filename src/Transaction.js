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

    const handleBuyChange = (event, newValue) => {
        setPercentage(newValue);
    };

    return (
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
            <Slider 
                value={percentage} 
                onChange={handleBuyChange} 
                aria-labelledby="continuous-slider" 
                className={classes.slider} 
            />
            <span>
                ${transactionType === "Buy" ?
                    (money*percentage/100).toFixed(2)
                : 
                    (product.currentPrice*product.owned*percentage/100).toFixed(2)}
            </span>
            {transactionType === "Buy" ?
                <Button 
                    onClick={() => props.transactionMethod(product, percentage/100)} 
                    color="primary" 
                    variant="contained">
                    Buy
                </Button>
            :
                <Button 
                    onClick={() => {
                        props.transactionMethod(product, percentage/100)
                    }} 
                    color="secondary" 
                    variant="contained">
                    Sell
                </Button>
            }  
        </div>
    )
}