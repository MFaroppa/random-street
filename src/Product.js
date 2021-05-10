import { LineChart, Line, YAxis } from 'recharts';

export default function Product(props) {

    let product = props.product;

    return (
        <div className="product-container">
            <LineChart width={1000} height={300} data={product.historicalPrices}>
				<YAxis/>
				<Line type="monotone" dataKey="price" isAnimationActive={false} dot={false} stroke="#8884d8" />
			</LineChart>
            <div className="options">
                <button onClick={() => props.buyProduct(product, 1)}>Buy 1 unit</button>
                <button onClick={() => props.sellProduct(product, 1)}>Sell 1 unit</button>
            </div>
        </div>
    )
}