import { List, ListItem, ListItemText } from "@material-ui/core";

export default function Portfolio(props) {

    let stocks = props.stocks

    return (
        <div className="portfolio-container">
            <List>
                {
                    stocks.map(stock => {
                        return (
                            <ListItem key={stock.product}>
                                <ListItemText primary={stock.product}/>
                                <ListItemText primary={stock.amount}/>
                                <ListItemText primary={(stock.spent).toFixed(2)}/>
                            </ListItem>
                        )
                    })
                }
            </List>
        </div>
    )
}