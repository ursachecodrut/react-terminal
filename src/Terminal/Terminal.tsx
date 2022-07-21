import React, { useState } from 'react';
import { HistoryItem } from '../models';
import './terminal.css';

const Terminal = () => {
	const [history, setHistory] = useState<HistoryItem[]>([]);

	const addToHistory = (newElem: HistoryItem) =>
		setHistory((state) => [...state, newElem]);

	const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
		e.preventDefault();
		// addToHistory({
		// 	command: e.target.value,
		// 	path: '.',
		// 	output: '',
		// });
	};

	return (
		<main id="terminal">
			<section id="terminal-header">
				<div className="header-buttons">
					<div className="circle bg-red"></div>
					<div className="circle bg-orange"></div>
					<div className="circle bg-green"></div>
				</div>
			</section>
			<section id="terminal-body">
				{history.map((item, index) => (
					<div key={index} className="history-item">
						<div className="terminal-line">
							<div className="host">
								codrut@portfolio
								<span className="text-foreground">:</span>
							</div>
							<div className="path">{item.path}</div>
							<div className="text-foreground">$</div>
							<div className="command">{item.command}</div>
						</div>
						<div className="output">{item.output}</div>
					</div>
				))}
				<div className="terminal-line">
					<div className="host">
						codrut@portfolio
						<span className="text-foreground">:</span>
					</div>
					<div className="path">~</div>
					<div className="text-foreground">$</div>
					<input
						type="text"
						id="terminal-input"
						onKeyDown={(e) => {
							if (e.key === 'Enter') {
								handleEnterKeyPress(e);
							}
						}}
						autoFocus
					/>
				</div>
			</section>
		</main>
	);
};

export default Terminal;
