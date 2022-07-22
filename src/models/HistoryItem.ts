export interface HistoryItem {
	path?: string;
	command?: string;
	output: JSX.Element | string;
}
