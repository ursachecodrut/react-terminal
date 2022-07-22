import React, { useRef, useState } from 'react';
import { FileSystem, HistoryItem } from '../models';
import myFs from './my-fs';
import './terminal.css';

interface TerminalProps {
	userName?: string;
	hostName?: string;
	rootName?: string;
}

const Terminal = ({
	userName = 'codrut',
	hostName = 'portfolio',
	rootName = '~',
}: TerminalProps) => {
	const [path, setPath] = useState(myFs.root.name);
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const addToHistory = ({
		command = inputRef.current!.value,
		path,
		output,
	}: HistoryItem) =>
		setHistory((state) => [...state, { command, path, output }]);

	const handleEnterKeyPress = (e: React.KeyboardEvent<HTMLElement>) => {
		const target = e.target as HTMLInputElement;
		e.preventDefault();
		// run command
		runCommand(target.value);
		target.value = '';
	};

	const runCommand = (input: string) => {
		const words = input.replace(/ +/g, ' ').trim().split(' ');
		if (words.length > 2) {
			return;
		}

		const [command, arg] = words;
		switch (command) {
			case 'clear':
				setHistory([]);
				break;
			case 'ls':
				addToHistory({ output: 'test' });
			default:
				break;
		}
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
								{userName}@{hostName}
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
						{userName}@{hostName}
						<span className="text-foreground">:</span>
					</div>
					<div className="path">{path}</div>
					<div className="text-foreground">$</div>
					<input
						ref={inputRef}
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
