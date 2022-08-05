import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Directory, File, FileSystem, HistoryElement } from '../models';
import { TerminalWrapper } from './styles';
import './terminal.css';
import { dracula } from './themes';

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
	const [history, setHistory] = useState<HistoryElement[]>([]);
	const inputRef = useRef<HTMLInputElement | null>(null);
	const scrollRef = useRef<HTMLInputElement | null>(null);

	const addToHistory = ({
		command = inputRef.current?.value,
		path = currentPath,
		output,
	}: HistoryElement) =>
		setHistory((state) => [...state, { command, path, output }]);

	const handleEnterKeyPress = (e: KeyboardEvent<HTMLElement>) => {
		const target = e.target as HTMLInputElement;
		e.preventDefault();
		runCommand(target.value);
		target.value = '';
	};

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [history]);

	const runCommand = (input: string) => {
		if (input === '') {
			addToHistory({ output: '' });
			return;
		}

		const words = input.replace(/ +/g, ' ').trim().split(' ');

		if (words.length > 2) {
			addToHistory({ output: 'Too many arguments' });
			return;
		}

		let output: string | JSX.Element = '';
		const [command, ...args] = words;
		switch (command) {
			case 'clear':
				setHistory([]);
				return;
			case 'ls':
				console.log('alo');
				const content =
					args.length === 0
						? fs.getCurrentDirContent()
						: fs.getDirContent(args[0])!;
				if (content) {
					output = (
						<span>
							{content.map((item, idx) => {
								if (item instanceof File) {
									return (
										<span
											key={idx}
											className="text-foreground mr-xs"
										>
											{`${item.name}.${item.mimeType}`}
										</span>
									);
								} else if (item instanceof Directory) {
									return (
										<span
											key={idx}
											className="text-purple mr-xs"
										>
											{item.name}
										</span>
									);
								}
								return;
							})}
						</span>
					);
				} else {
					output = 'No such directory';
				}

				break;
			case 'cd':
				if (args.length === 0) {
					output = 'Please provide a path';
				} else if (args.length === 1) {
					let dir = fs.changeCurrentDir(args[0]);
					if (dir) {
						setCurrentPath(fs.currentPathString());
					} else {
						output = 'No such directory';
					}
				}
				break;
			case 'cat':
				if (args.length !== 1) {
					output = 'Please provide a path';
				} else {
					const fileContent = fs.getFileContent(args[0]);
					if (fileContent) {
						output = fileContent;
					} else {
						output = 'No such file';
					}
				}

				break;
			default:
				output = 'Unknown command';

				break;
		}
		addToHistory({ output });
	};

	return (
		<ThemeProvider theme={dracula}>
			<TerminalWrapper>
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
					<div ref={scrollRef} />
				</section>
			</TerminalWrapper>
		</ThemeProvider>
	);
};

export default Terminal;
