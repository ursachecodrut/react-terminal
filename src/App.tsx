import myFs from './Terminal/my-fs';
import Terminal from './Terminal/Terminal';
import { dracula } from './Terminal/themes';

function App() {
	return (
		<div className="App">
			<Terminal
				userName="codrut"
				hostName="portfolio"
				fs={myFs}
				theme={dracula}
			/>
		</div>
	);
}

export default App;
