import React, { useRef, useState } from 'react';
import { FileSystem, HistoryItem } from '../models';
import './terminal.css';

interface TerminalProps {
	userName?: string;
	hostName?: string;
	fs: FileSystem;
}

const Terminal = ({
	userName = 'codrut',
	hostName = 'portfolio',
	fs,
}: TerminalProps) => {
	const [currentPath, setCurrentPath] = useState(fs.root.name);
	const [history, setHistory] = useState<HistoryItem[]>([]);
	const inputRef = useRef<HTMLInputElement | null>(null);

	const addToHistory = ({
		command = inputRef.current!.value,
		path = currentPath,
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

		let output = '';
		const [command, ...args] = words;
		switch (command) {
			case 'clear':
				setHistory([]);
				break;
			case 'ls':
				if (args.length === 0) {
					output = fs.getCurrentDirContent().join(' ');
				} else if (args.length === 1) {
					const content = fs.getDirFromPathString(args[0])?.content;
					if (content) {
						output = content.map((item) => item.name).join(' ');
					} else {
						output = 'No such directory';
					}
				}
				break;
			case 'cd':
				if (args.length === 0) {
					output = 'Please provide a path';
				} else if (args.length === 1) {
				} else {
					output = 'Too many arguments';
				}

				break;
			default:
				output = 'Unknown command';
				break;
		}

		addToHistory({ output });
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
					<div className="path">{currentPath}</div>
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
