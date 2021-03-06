import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useState } from 'react';

function FinishPage(props) {

    const [historicalData] = useState(JSON.parse(localStorage.getItem('historicalData')))

    const {
        money
    } = props

    return (
        <div className="finish-container">
            <div>
                <div style={{fontSize: '24px', fontWeight: 'bold', marginBottom: '12px'}}>
                    {money <= 0 ? 'Bancarrota' : 'Sesion finalizada'}
                </div>
                {money > 0 && <div>Monto final: ${money.toFixed(2)}</div>}
            </div>
            <TableContainer >
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">Usuario</TableCell>
                        <TableCell align="center">Dinero</TableCell>
                        <TableCell align="center">Fecha</TableCell>
                        <TableCell align="center">Dificultad</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {historicalData.sort((a, b) => b.score - a.score).map((data, index) => (
                        <TableRow key={index}>
                            <TableCell align="center" >{data.user}</TableCell>
                            <TableCell align="center" style={data.score <= 0 ? {color: 'red'} : {color: 'green'}} >${data.score.toFixed(2)}</TableCell>
                            <TableCell align="center" >{data.date}</TableCell>
                            <TableCell align="center" >{data.difficulty.display}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default FinishPage;