import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useEffect, useState } from 'react';

export default function TransactionHistory(props) {

    let [history] = useState([])

    useEffect(() => {
        debugger
        if (props.newTransaction) {
            let transaction = props.newTransaction;

            history.unshift({
                type: transaction.type,
                product: transaction.product,
                quantity: transaction.amount.toFixed(4),
                price: transaction.price,
                total: (transaction.price * transaction.amount).toFixed(2)
            })
        }
    }, [props.newTransaction])

    return (
        <div className="history-container">
            <TableContainer >
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Product</TableCell>
                        <TableCell align="center">Quantity</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Total</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {history.map(transaction => (
                        <TableRow key={transaction.product}>
                            <TableCell align="center" style={transaction.type === 'buy' ? {color: 'green'} : {color: 'red'}}>{transaction.product}</TableCell>
                            <TableCell align="center" style={transaction.type === 'buy' ? {color: 'green'} : {color: 'red'}}>{transaction.quantity}</TableCell>
                            <TableCell align="center" style={transaction.type === 'buy' ? {color: 'green'} : {color: 'red'}}>{transaction.price}</TableCell>
                            <TableCell align="center" style={transaction.type === 'buy' ? {color: 'green'} : {color: 'red'}}>{transaction.total}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}