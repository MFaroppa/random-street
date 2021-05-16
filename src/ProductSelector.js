import { Card, CardActions, CardContent, CardHeader, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";
import CheckIcon from '@material-ui/icons/Check';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from "react";

const cardStyle = makeStyles(theme => ({
    card: {
        "&:hover": {
            cursor: "pointer",
            backgroundColor: "#fafafa"
        },
        "&:active": {
            cursor: "pointer",
            backgroundColor: "#f4f4f4"
        },
        marginBottom: 12
    },
    content: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "2em"
    }
}))

export default function ProductSelector(props) {

    const classes = cardStyle();

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

    let editProduct = product => {

    }

    let products = props.products;

    return (
        <div className="product-selector-container">
            {products.map(product => {
                return (
                    <div>
                        <Card 
                            classes={{root: classes.card}}
                            onClick={ev => onSelected(ev, product)}
                            variant="outlined"
                        >
                            <CardHeader 
                                title={product.name} 
                                subheader={getProductVariation(product)}
                            />
                            <CardContent>
                                <div className={classes.content}>
                                    <div style={{fontWeight: "500"}}>{"$" + product.currentPrice}</div>
                                    {
                                        selectedProduct === product && <div style={{color: "green"}}><CheckIcon fontSize="small"/></div>
                                    }
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                )
            })}
        </div>
    )
}