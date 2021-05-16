import { List, ListItem, ListItemText} from "@material-ui/core";

export default function Portfolio(props) {

    let stocks = props.stocks

    return (
        <div className="portfolio-container">
            <List>
                {
                    stocks === undefined || stocks.length === 0 ?
                    <ListItem>
                        <ListItemText primary={"You have no products in your portfolio"}/>
                    </ListItem>
                    :
                    stocks.map(stock => {
                        return (
                            <ListItem key={stock.product}>
                                <ListItemText primary={stock.product}/>
                                <ListItemText primary={stock.amount.toFixed(5)}/>
                                <ListItemText primary={"$" + stock.meanPrice}/>
                            </ListItem>
                        )
                    })
                }
            </List>
        </div>
    )
}