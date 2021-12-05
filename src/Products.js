import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@material-ui/core";


export default function Products(props) {

    let products = props.products;

    const numberSteps = { step: 0.01, };

    let changeName = (ev, index) => {
        let name = ev.target.value
        products[index].name = name
    }

    let changeDrift = (ev, index) => {
        let drift = ev.target.value;
        products[index].drift = drift;
    }

    let changeVolatility = (ev, index) => {
        let volatility = ev.target.value;
        products[index].volatility = volatility;
    }

    return (
        <div className="products-container">
            <TableContainer >
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Nombre</TableCell>
                        <TableCell align="center">Tendencia</TableCell>
                        <TableCell align="center">Volatilidad</TableCell>
                        <TableCell align="center">Stock</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {products.map((product, index) => (
                        <TableRow key={product.id}>
                            <TableCell align="center">#{product.id}</TableCell>
                            <TableCell align="center">
                                <TextField
                                    id={`product-name-${product.id}`}
                                    defaultValue={product.name}
                                    onChange={(ev) => {
                                        changeName(ev, index)
                                    }}
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    id={`product-drift-${product.id}`}
                                    type="number"
                                    inputProps={numberSteps}
                                    defaultValue={product.drift}
                                    onChange={(ev) => {
                                        changeDrift(ev, index)
                                    }}
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    id={`product-volatility-${product.id}`}
                                    type="number"
                                    inputProps={numberSteps}
                                    defaultValue={product.volatility}
                                    onChange={(ev) => {
                                        changeVolatility(ev, index)
                                    }}
                                    variant="outlined"
                                />
                            </TableCell>
                            <TableCell align="center">{product.owned}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <div style={{marginTop: "48px", float: "right"}}>
                {/* <Button color="primary" variant="contained" style={{marginRight: "12px"}} onClick={() => editProducts(products)}>
                    Guardar
                </Button> */}
                <Button color="primary" onClick={() => props.handleClose()}>
                    Cerrar
                </Button>
            </div>
        </div>
    )
}
