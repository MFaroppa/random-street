import { LineChart, Line, YAxis, ResponsiveContainer, Tooltip } from 'recharts';


export default function PricesChart(props) {
    let product = props.product;

    return (
        <div>
            <ResponsiveContainer width="100%" aspect={3.0/1.0}>
                <LineChart data={product.historicalPrices}>
                    <YAxis/>
                    <Line type="monotone" dataKey="price" isAnimationActive={false} dot={false} stroke="red" />
                    <Tooltip/>
                </LineChart>
            </ResponsiveContainer>
        </div>
    )
}