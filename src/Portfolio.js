export default function Portfolio(props) {

    let stocks = props.stocks

    return (
        <div className="portfolio-container">
                {
                    stocks === undefined || stocks.length === 0 ?
                        <span>You have no products in your portfolio</span>
                    :
                    stocks.map(stock => {
                        return (
                            <div key={stock.product} className="portfolio-list">
                                <span>{stock.product}</span>
                                <span>{stock.amount.toFixed(5)}</span>
                            </div>
                        )
                    })
                }
        </div>
    )
}