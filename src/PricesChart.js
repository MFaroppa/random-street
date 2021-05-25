import { LineChart, Line, YAxis, ResponsiveContainer } from 'recharts';


export default function PricesChart(props) {
    let product = props.product;

    return (
        <div>
            <ResponsiveContainer width="100%" aspect={16.0/9.0}>
                <LineChart data={product.historicalPrices}>
                    <YAxis/>
                    <Line type="monotone" dataKey="price" isAnimationActive={false} dot={false} stroke="#556b2f" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}