import { useState } from 'react';
import Terminal from './Terminal/Terminal';
import myFs from './Terminal/my-fs';

function App() {
	return (
		<div className="App">
			<Terminal userName="codrut" hostName="portfolio" fs={myFs} />
		</div>
	);
}

export default App;
