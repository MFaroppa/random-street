import { TablePagination } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useEffect, useState } from 'react';

export default function TransactionHistory(props) {

    let [rowsPerPage, setRowsPerPage] = useState(10);
    let [page, setPage] = useState(0);
    let [history] = useState([])

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    useEffect(() => {
        if (props.newTransaction) {
            let transaction = props.newTransaction;

            history.unshift({
                id: transaction.id,
                type: transaction.type,
                product: transaction.product,
                quantity: transaction.amount,
                price: transaction.price,
                total: (transaction.price * transaction.amount).toFixed(2)
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    {history.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(transaction => (
                        <TableRow key={transaction.id}>
                            <TableCell align="center" style={transaction.type === 'Comprar' ? {color: 'green'} : {color: 'red'}}>{transaction.product}</TableCell>
                            <TableCell align="center" style={transaction.type === 'Comprar' ? {color: 'green'} : {color: 'red'}}>{transaction.quantity}</TableCell>
                            <TableCell align="center" style={transaction.type === 'Comprar' ? {color: 'green'} : {color: 'red'}}>{transaction.price}</TableCell>
                            <TableCell align="center" style={transaction.type === 'Comprar' ? {color: 'green'} : {color: 'red'}}>{transaction.total}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={history.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    )
}