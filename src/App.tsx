import { useState } from 'react';
import Terminal from './Terminal/Terminal';

function App() {
	return (
		<div className="App">
			<Terminal userName="codrut" hostName="portfolio" rootName="~" />
		</div>
	);
}

export default App;
