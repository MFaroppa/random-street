import './App.css';
import Market from './Market';

function App() {

	const products = require("./products.json")
	const money = 5000

	return (
		<div className="App">
			<Market money={money} products={products}/>
		</div>
	);
}

export default App;