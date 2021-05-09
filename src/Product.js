import { LineChart, Line, YAxis } from 'recharts';

export default function Product(props) {

    return (
        <div className="product-container">
            <LineChart width={1000} height={300} data={props.product.historicalPrices}>
				<YAxis/>
				<Line type="monotone" dataKey="price" isAnimationActive={false} dot={false} stroke="#8884d8" />
			</LineChart>
            <div className="options">
                {props.product.owned} units.
                <button onClick={() => props.buyProduct(props.product, 1)}>Buy 1 unit</button>
                <button onClick={() => props.sellProduct(props.product, 1)}>Sell 1 unit</button>
            </div>
        </div>
    )
}