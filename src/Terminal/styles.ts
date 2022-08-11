import styled from 'styled-components';
import { Theme } from '../models/Theme';

interface Props {
	theme: Theme;
	color?: string;
}

const TerminalWrapper = styled.main`
	background: ${(props: Props) => props.theme.primaryBackground};
	height: 500px;
	min-width: 300px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
`;

const TerminalHeader = styled.section`
	background: ${(props: Props) => props.theme.secondaryBackground};
	border-radius: 10px 10px 0 0;
	height: 2rem;
	flex-shrink: 0;
	display: flex;
	justify-items: start;
	align-items: center;
	padding: 0 1rem;
`;

const TerminalBody = styled.section`
	padding: 1rem 0.5rem;
	overflow-y: scroll;
`;

const Circle = styled.div`
	background: ${(props: Props) => props.color};
	border-radius: 50%;
	width: 1rem;
	height: 1rem;
`;

const TerminalInput = styled.input`
	background-color: ${(props: Props) => props.theme.primaryBackground};
	border: none;
	color: ${(props: Props) => props.theme.foreground};
	display: block;
	width: 100%;
`;

export { TerminalWrapper, TerminalHeader, TerminalBody, Circle, TerminalInput };
