import React from 'react';
import './terminal.css';

const Terminal = () => {
	return (
		<main id="terminal">
			<section id="terminal-header">
				<div className="header-buttons">
					<div className="circle red"></div>
					<div className="circle orange"></div>
					<div className="circle green"></div>
				</div>
			</section>
			<section id="terminal-body">
				<div></div>
			</section>
		</main>
	);
};

export default Terminal;
