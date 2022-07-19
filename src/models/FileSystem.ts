import { Directory } from './Directory';
import { File } from './File';
import { Item } from './Item';

export class FileSystem {
	private readonly _root: Directory = new Directory('root');
	private _currentDirectory = this._root;
	private _currentPathArray: Directory[] = [this._currentDirectory];

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
		return this.currentPathArray.join('/');
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
		console.log(this._currentPathArray);
		console.log(this._currentDirectory);
	}

	private getDirFromPathString(dirPath: string) {
		// root dir
		if (dirPath.match(/^(root\/?|\/)$/g)) {
			return this.root;
		}

		if (dirPath.match(/^\.\/?$/g)) {
			return this.currentDirectory;
		}

		let dir = dirPath.match(/^(root\/?|\/)/g)
			? this.root
			: this.currentDirectory;

		const paths = dirPath
			.replace(/^(root\/|.root\/|\.\/|\/)|\/$/g, '')
			.split('/');

		while (paths.length) {
			dir = dir.getItem(paths.shift()!) as Directory;
		}

		if (paths.length === 0) {
			return dir;
		}

		return null;
	}
}
