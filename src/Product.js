import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';
import Transaction from './Transaction';


export default function Product(props) {
    let money = props.money
    let product = props.product;

    return (
        <div>
            <ResponsiveContainer width="100%" aspect={16.0/9.0}>
                <LineChart data={product.historicalPrices}>
                    <YAxis/>
                    <Line type="monotone" dataKey="price" isAnimationActive={false} dot={false} stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
            <div className="options">
                <Transaction product={product} money={money} transactionType="Buy" transactionMethod={props.buyProduct}/>
                <Transaction product={product} money={money} transactionMethod={props.sellProduct}/>
            </div>
        </div>
    )
}