import './App.css';
import Market from './Market';

function App() {

	let data = require("./products.json")

	console.log(data)

	let products = localStorage.getItem("products")

	console.log(JSON.parse(products))

	return (
		<div className="App">
			<Market/>
		</div>
	);
}

export default App;
