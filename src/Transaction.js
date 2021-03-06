import { Button, TextField } from "@material-ui/core";
import { useState } from "react";

export default function Transaction(props) {
    let product = props.product;
    let money = props.money;
    let transactionType = props.transactionType;

    let [amount, setAmount] = useState(transactionType === 'Comprar' ? money : product.owned)
    const [step] = useState(amount*0.01)

    let handleAmountChange = ev => {
        setAmount(ev.target.value);
    }

    let doTransaction = useAll => {
        if (useAll === true) {
            let allAmount;
            if (transactionType === 'Comprar')
                allAmount = money;
            else
                allAmount = product.owned
            props.transactionMethod(product, allAmount);
        } else {
            props.transactionMethod(product, amount)
        }

        props.handleClose();
    }

    const numberSteps = {
        step: step,
    };

    return (
        <div>
            <div style={{display: 'flex', flexDirection: 'column', gap: '24px'}}>
                <TextField
                    id="number"
                    label="Pesos"
                    type="number"
                    variant="filled"
                    inputProps={numberSteps}
                    value={transactionType === 'Comprar' ? amount : amount * product.currentPrice}
                    onChange={handleAmountChange}
                    disabled={transactionType === 'Vender'}
                    error={transactionType === 'Comprar' && amount > money}
                />
                <TextField
                    id="number"
                    label={product.name}
                    type="number"
                    variant="filled"
                    inputProps={numberSteps}
                    value={transactionType === 'Comprar' ? (amount/product.currentPrice).toFixed(5) : amount}
                    onChange={handleAmountChange}
                    disabled={transactionType === 'Comprar'}
                    error={transactionType === 'Vender' && amount > product.owned}
                />
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div>
                        {
                            transactionType === 'Comprar' ?
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
                    <div style={{display: "flex", gap: "12px"}}>
                        <Button 
                            onClick={() => doTransaction(true)}
                            color={transactionType === 'Comprar' ? 'primary' : 'secondary'}>
                            {transactionType === 'Comprar' ? 'Comprar todo' : 'Vender todo'}
                        </Button>
                        <Button 
                            onClick={() => doTransaction(false)}
                            color={transactionType === 'Comprar' ? 'primary' : 'secondary'}
                            variant="contained"
                            disabled={amount < 0 || (transactionType === 'Comprar' ? money === 0 || amount > money : product.owned === 0 || amount > product.owned)}>
                            {transactionType}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}