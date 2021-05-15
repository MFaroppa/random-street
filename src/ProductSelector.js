import { IconButton, List, ListItem, ListItemSecondaryAction, ListItemText } from "@material-ui/core";
import EditIcon from '@material-ui/icons/Edit';
import { useState } from "react";

export default function ProductSelector(props) {

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

    let products = props.products;

    return (
        <div className="product-selector-container">
            <List>
                {products.map(product => {
                    return (
                        <ListItem button
                            key={product.name}
                            selected={selectedProduct === product}
                            onClick={ev => onSelected(ev, product)}
                        >
                            <ListItemText primary={product.name}/>
                            <ListItemText primary={"$" + product.currentPrice}/>
                            <ListItemText primary={getProductVariation(product)} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="edit">
                                    <EditIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    )
                })}
            </List>
        </div>
    )
}