import { Item } from './Item';

export class File extends Item {
	private _type: string = 'text';
	private _mimeType: string = 'txt';
	private _textContext: string = '';
	private _source = null;

	constructor(name: string = '', textContent: string = '', source = null) {
		super(name);
		this._textContext = textContent;
		this._source = source;
	}

	get type() {
		return this._type;
	}

	get mimeType() {
		return this._mimeType;
	}

	get textContent() {
		return this._textContext;
	}

	get source() {
		return this._source;
	}

	set textContent(content: string) {
		this.textContent = content;
	}
}
