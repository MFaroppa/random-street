import { Button, FormControl, FormControlLabel, FormLabel, InputAdornment, Radio, RadioGroup, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";

export default function Credits(props) {

    let [amount, setAmount] = useState(0);
    let [total, setTotal] = useState(0);
    let [interest, setInterest] = useState(10.0);
    let [time, setTime] = useState("1");

    let handleTimeChange = (ev, time) => {
        setTime(time);
        switch (time) {
            case '1':
                setInterest(10.0);
                break;
            case '2':
                setInterest(15.0);
                break;
            case '5':
                setInterest(30.0);
                break;
            default:
                setInterest(50.0);
                break;
        }
    }

    let doCredit = () => {
        let credit = {
            amount: amount,
            return: total,
            time: time
        }

        props.concreteCredit(credit);
        props.handleClose();
    }

    useEffect(() => {
        if (amount) {
            let tempTotal = amount*((interest/100)+1)
            setTotal(Math.round(tempTotal));
        }
    }, [amount, interest, time])

    return (
        <div className="credits-container">
            <TextField
                id="number"
                label="Monto"
                variant="filled"
                type="number"
                value={amount}
                placeholder="Monto del crédito"
                onChange={ev => setAmount(Number(ev.target.value))}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                }}
            />
            <FormControl component="fieldset">
                <FormLabel component="legend">Tiempo (minutos)</FormLabel>
                <RadioGroup row aria-label="time" name="time1" value={time} onChange={handleTimeChange}>
                    <FormControlLabel value="60" control={<Radio />} label="1" />
                    <FormControlLabel value="120" control={<Radio />} label="2" />
                    <FormControlLabel value="300" control={<Radio />} label="5" />
                    <FormControlLabel value="600" control={<Radio />} label="10" />
                </RadioGroup>
            </FormControl>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <div>
                    <div style={{marginBottom: "12px"}}>
                        Interés: <span className="money">{(interest)}%</span>
                    </div>
                    <div>
                        Monto a devolver: <span className="money">${total ? total : 0}</span>
                    </div>
                </div>
                <Button
                    color='primary'
                    variant="contained"
                    disabled={amount <= 0 && !interest && !time}
                    onClick={() => doCredit()}>
                    Sacar crédito
                </Button>
            </div>
            
        </div>
    )

}