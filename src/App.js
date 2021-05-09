import './App.css';
import Market from './Market';

function App(props) {

	return (
		<div className="App">
			<Market drift={0.15} volatility={0.1}/>
			<Market drift={0.35} volatility={0.22}/>
		</div>
	);
}

export default App;
