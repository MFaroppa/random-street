import { Button, TextField } from "@material-ui/core";
import { useState } from "react";

export default function Transaction(props) {
    let product = props.product;
    let money = props.money;
    let transactionType = props.transactionType;

    let [amount, setAmount] = useState(transactionType === 'Buy' ? money : product.owned)

    let handleAmountChange = ev => {
        setAmount(ev.target.value);
    }

    let doTransaction = useAll => {
        if (useAll === true) {
            let allAmount;
            if (transactionType === 'Buy')
                allAmount = money;
            else
                allAmount = product.owned
            props.transactionMethod(product, allAmount);
        } else {
            props.transactionMethod(product, amount)
        }
    }

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                <TextField
                    id="number"
                    label="Pesos"
                    type="number"
                    variant="filled"
                    value={transactionType === 'Buy' ? amount : amount * product.currentPrice}
                    onChange={handleAmountChange}
                    disabled={transactionType === 'Sell'}
                />
                <TextField
                    id="number"
                    label={product.name}
                    type="number"
                    variant="filled"
                    value={transactionType === 'Buy' ? (amount/product.currentPrice).toFixed(5) : amount}
                    onChange={handleAmountChange}
                    disabled={transactionType === 'Buy'}
                />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        {
                            transactionType === 'Buy' ?
                                amount > money && (
                                    <span>
                                        No tiene el dinero suficiente.
                                    </span>
                                )
                            :
                                amount > product.owned && (
                                    <span>
                                        No tiene la cantidad de {product.name} suficiente.
                                    </span>
                                )  
                        }
                    </div>
                    <div>
                    <Button 
                        onClick={() => doTransaction(true)}
                        color={transactionType === 'Buy' ? 'primary' : 'secondary'}>
                        {transactionType === 'Buy' ? 'Comprar todo' : 'Vender todo'}
                    </Button>
                    <Button 
                        onClick={() => doTransaction(false)}
                        color={transactionType === 'Buy' ? 'primary' : 'secondary'}
                        variant="contained"
                        disabled={amount < 0 || (transactionType === 'Buy' ? money === 0 || amount > money : product.owned === 0 || amount > product.owned)}>
                        {transactionType}
                    </Button>
                    
                    </div>
                </div>
            </div>
        </div>
    )
}