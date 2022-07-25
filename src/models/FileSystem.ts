import { Directory } from './Directory';
import { File } from './File';
import { Item } from './Item';

export class FileSystem {
	private readonly _root: Directory;
	private _currentDirectory;
	private _currentPathArray;

	constructor(rootName: string = '~') {
		this._root = new Directory(rootName);
		this._currentDirectory = this._root;
		this._currentPathArray = [this._currentDirectory];
	}

	get root() {
		return this._root;
	}

	get currentDirectory() {
		return this._currentDirectory;
	}

	get currentPathArray() {
		return this._currentPathArray;
	}

	get name() {
		return this.root.name;
	}

	get content() {
		return this.currentDirectory.content;
	}

	insertItem(item: Item) {
		return this.currentDirectory.insertItem(item);
	}

	getItem(itemName: string) {
		return this.currentDirectory.getItem(itemName);
	}

	hasItem(itemName: string) {
		return this.currentDirectory.hasItem(itemName);
	}

	removeItem(itemName: string) {
		return this.currentDirectory.removeItem(itemName);
	}

	createFile(fileName: string, ...options: [string, any]) {
		const newFile = new File(fileName, ...options);

		const inserted = this.insertItem(newFile);

		return inserted ? newFile : null;
	}

	createDirectory(dirName: string) {
		const newDir = new Directory(dirName);

		const inserted = this.currentDirectory.insertItem(newDir);

		return inserted ? newDir : null;
	}

	currentPathString() {
		return this._currentPathArray.map((e) => e.name).join('/');
	}

	printCurrentDirectory() {
		console.log(
			`\n[${this.currentPathArray.join('/')}]:` +
				(this.currentDirectory.content
					.map(
						(item) =>
							`\n[${item.constructor.name.substring(0, 1)}]-> ${
								item.name
							}`
					)
					.join('') || '\n(empty)')
		);
	}

	getCurrentDirContent(asStringArr: boolean = true) {
		const content = this.currentDirectory.content;
		if (!asStringArr) {
			return content;
		}
		return content.map((c) => c.name);
	}

	changeCurrentDir(path: string) {
		if (!path) {
			return null;
		}

		let dir = this.getDirFromPathString(path);
		if (!dir) {
			return null;
		}

		const dirPathArray = [dir];
		let parent = dir.parent;

		while (parent) {
			dirPathArray.unshift(parent);
			parent = parent.parent;
		}

		this._currentDirectory = dir;
		this._currentPathArray = dirPathArray;

		return dir;
	}

	goBack() {
		this._currentPathArray.pop();
		this._currentDirectory =
			this._currentPathArray[this._currentPathArray.length - 1];
	}

	reducePath(paths: string[], isAbsolutePath: boolean) {
		let stack: string[];
		if (isAbsolutePath) {
			stack = [];
		} else {
			stack = [...this.currentPathArray.map((e) => e.name)];
			stack.shift();
		}
		for (let i = 0; i < paths.length; i++) {
			if (paths[i] === '..') {
				stack.pop();
			} else {
				stack.push(paths[i]);
			}
		}
		return stack;
	}

	// TODO: dynamic regex based on root name
	getDirFromPathString(dirPath: string) {
		// root dir
		if (dirPath.match(/^(~\/?|\/)$/g)) {
			return this.root;
		}

		// current dir
		if (dirPath.match(/^\.\/?$/g)) {
			return this.currentDirectory;
		}

		let dir = this._root;
		const paths = dirPath.replace(/^(\.\/|~\/)|\/+$/g, '').split('/');
		const isAbsolutePath = dirPath.match(/^(~\/?)/g) ? true : false;
		const stack = this.reducePath(paths, isAbsolutePath);

		while (stack.length) {
			dir = dir.getItem(stack.shift()!) as Directory;
		}

		if (stack.length === 0) {
			return dir;
		}

		return null;
	}
}
