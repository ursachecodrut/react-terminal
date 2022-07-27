import { Item } from './Item';

export class Directory extends Item {
	private _children: Map<string, Item> = new Map<string, Item>();

	constructor(name: string = '') {
		super(name);
	}

	get content() {
		return Array.from(this._children.values());
	}

	hasItem(itemName: string) {
		return this._children.has(itemName);
	}

	getItem(itemName: string) {
		return this._children.get(itemName) || null;
	}

	getDirectory(dirName: string) {
		return this._children.get(dirName) instanceof Directory
			? (this._children.get(dirName) as Directory)
			: null;
	}

	removeItem(itemName: string) {
		const item = this.getItem(itemName);

		if (item) {
			this._children.delete(itemName);
			item.parent = null;
		}

		return !this.hasItem(itemName);
	}

	insertItem(item: Item) {
		if (this.hasItem(item.name)) return true;

		if (item === this) {
			throw new Error('Directory cannot contain itself');
		}

		let parent = this.parent;

		while (parent !== null) {
			if (parent === item) {
				throw new Error('Directory cannot contain itself');
			}
			parent = parent.parent;
		}

		this._children.set(item.name, item);
		item.parent = this;

		return this.hasItem(item.name);
	}
}
