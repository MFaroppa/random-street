import { useState } from 'react';
import './App.css';
import Market from './Market';
import SessionSetup from './SessionSetup';

function App() {
	
	const [userData, setUserData] = useState(undefined)
	const [loadingUsername, setLoading] = useState(true)

	const difficultyOptions = require("./difficulties.json")
	const products = require("./products.json")

	let saveOptions = (newUsername, difficultyLevel) => {
		const difficulty = difficultyOptions.find(difficulty => difficulty.level === parseInt(difficultyLevel))
		const userData = {
			currentUser: newUsername,
			difficulty: difficulty
		}
		localStorage.setItem('currentUser', JSON.stringify(userData))
		if (localStorage.getItem('historicalData') === null)
			localStorage.setItem('historicalData', JSON.stringify([]))
		setUserData(userData)
		setLoading(false)
	}

	return (
		<div className="App">
			{
				loadingUsername || userData === undefined ?
					<SessionSetup saveOptions={saveOptions} difficulties={difficultyOptions}/>
				:
					<Market products={products} difficulty={userData.difficulty}/>
			}
			
		</div>
	);
}

export default App;