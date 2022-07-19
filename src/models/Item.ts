import { Directory } from './Directory';

export abstract class Item {
	private _name: string;
	private _parent: Directory | null = null;

	constructor(name: string) {
		if (!name) {
			throw new Error('Name must be a non empty string.');
		}
		this._name = name;
	}

	get name() {
		return this._name;
	}

	get parent() {
		return this._parent;
	}

	get path(): string {
		if (this.parent) {
			return `${this.parent.path}/${this.name}`;
		}

		return this.name;
	}

	set name(newName: string) {
		// empty string
		if (!newName) {
			console.log('asda');
			throw new Error('Name must be a non empty string.');
		}

		// invalid characters
		if (newName.includes('/')) {
			throw new Error('Name contains invalid charactes');
		}

		// TODO: already exists

		this.name = newName.trim();
	}

	set parent(newParent: Directory | null) {
		if (newParent !== this._parent) {
			const oldParent = this._parent;
			this._parent = newParent;

			if (oldParent) {
				oldParent.removeItem(this.name);
			}

			// newParent insert
		}
	}
}
