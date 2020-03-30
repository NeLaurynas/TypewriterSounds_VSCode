var path = require('path');

export default class SoundCollection {
	private _category: string;
	private _keySounds: string[];
	private _enterSound: string;
	private _enterSoundLong?: string;
	private _spaceSound: string;
	private _deleteSoundLong?: string;
	private _deleteSound: string;

	constructor(category: string, keySounds: string[], enterSound: string, spaceSound: string,
		deleteSound: string, deleteSoundLong?: string, enterSoundLong?: string) {
		this._mapPath = this._mapPath.bind(this);

		this._category = category;
		this._keySounds = keySounds.map(this._mapPath);
		this._enterSound = this._mapPath(enterSound);
		this._spaceSound = this._mapPath(spaceSound);
		this._deleteSound = this._mapPath(deleteSound);

		if (deleteSoundLong) {
			this._deleteSoundLong = this._mapPath(deleteSoundLong);
		}
		if (enterSoundLong) {
			this._enterSoundLong = this._mapPath(enterSoundLong);
		}
	}

	getKeySound(): string {
		return this._keySounds[this._getRandom(this._keySounds.length)];
	}

	getSpaceSound(): string {
		return this._spaceSound;
	}

	getEnterSound(): string {
		if (!this._enterSoundLong) {
			return this._enterSound;
		} else {
			// todo: settings for enabling long sounds
			if (this._getRandom(2) === 1) {
				return this._enterSound;
			} else {
				return this._enterSoundLong;
			}
		}
	}

	getDeleteSound(): string {
		if (!this._deleteSoundLong) {
			return this._deleteSound;
		} else {
			// todo: settings for enabling long sounds
			if (this._getRandom(2) === 1) {
				return this._deleteSound;
			} else {
				return this._deleteSoundLong;
			}
		}
	}

	// from 0 (inclusive) to upper (exclusive)
	private _getRandom(upper: number): number {
		return Math.floor(Math.random() * upper);
	}

	private _mapPath(fileName: string): string {
		return path.join(__dirname, '..', 'files', this._category, `${fileName}.mp3`);
	}
}
