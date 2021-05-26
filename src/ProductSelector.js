import { Button, Card, CardActionArea, CardActions, CardHeader, makeStyles, Modal, Paper, Tooltip } from "@material-ui/core";
import { useState } from "react";
import Transaction from "./Transaction";

const cardStyle = makeStyles(theme => ({
    selectedCard: {
        boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.4)'
    }
}))

export default function ProductSelector(props) {

    const classes = cardStyle();

    let [showBuyModal, setShowBuyModal] = useState(false)
    let [showSellModal, setShowSellModal] = useState(false)
    let [selectedProduct, setSelectedProduct] = useState(props.products[0])

    let onSelected = (ev, product) => {
        setSelectedProduct(product)
        props.selectProduct(product)
    }

    let getProductVariation = product => {
        const firstValue = product.historicalPrices[0];
        const lastValue = product.historicalPrices[product.historicalPrices.length-1];

        const variation = ((lastValue.price/firstValue.price)-1)*100;

        return <span style={{color: variation >= 0 ? "green" : "red"}}>{variation.toFixed(2)}%</span>
    }

    let showTransaction = (transactionType, product) => {
        setSelectedProduct(product)
        props.selectProduct(product)
        if (transactionType === 'Comprar')
            setShowBuyModal(true)
        else
            setShowSellModal(true)
    }

    let handleClose = () => {
        setShowSellModal(false)
        setShowBuyModal(false)
    }

    function formatPrice(price) {
        let str = price.toString().replace(".", ",")
        return str.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }

    let products = props.products;

    return (
        <div className="product-selector-container">
            {products.map(product => {
                return (
                    <div key={product.id} style={{marginBottom: 12, width: '400px'}}>
                        <Card classes={selectedProduct === product ? {root: classes.selectedCard} : null} variant="outlined">
                            <CardActionArea onClick={ev => onSelected(ev, product)}>
                                <CardHeader title={product.name} subheader={<Tooltip title="Last year variation">{getProductVariation(product)}</Tooltip>}/>
                            </CardActionArea>
                            <CardActions style={{display: 'flex', justifyContent: 'space-between'}}>
                                <div style={{fontWeight: "500", fontSize: '16px', paddingLeft: '8px'}}>
                                    <Tooltip title="Current price"><span>{"$" + formatPrice(product.currentPrice)}</span></Tooltip>
                                </div>
                                <div>
                                    <Button color='primary' onClick={() => showTransaction('Comprar', product)} disabled={props.money === 0}>Comprar</Button>
                                    <Button color='secondary' onClick={() => showTransaction('Vender', product)} disabled={product.owned === 0}>Vender</Button>
                                </div>
                            </CardActions>
                        </Card>
                    </div>
                )
            })}
            <Modal
                open={showBuyModal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                    <Paper elevation={3} style={{width: '600px', height: '200px', padding: '24px'}}>
                        <Transaction product={selectedProduct} money={props.money} handleClose={handleClose} transactionType="Comprar" transactionMethod={props.buyProduct}/>
                    </Paper>
            </Modal>
            <Modal
                open={showSellModal}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            >
                    <Paper elevation={3} style={{width: '600px', height: '200px', padding: '24px'}}>
                        <Transaction product={selectedProduct} money={props.money} handleClose={handleClose} transactionType="Vender" transactionMethod={props.sellProduct}/>
                    </Paper>
            </Modal>
        </div>
    )
}