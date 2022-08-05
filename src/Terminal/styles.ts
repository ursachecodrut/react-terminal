import styled from 'styled-components';

const TerminalWrapper = styled.main`
	background: ${(props) => props.theme.primaryBackground};
	height: 500px;
	min-width: 300px;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
`;

export { TerminalWrapper };
