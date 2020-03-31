import { TextDocumentChangeEvent, workspace } from 'vscode';
import SoundCollection from './soundCollection';
import player from './player';

class TypewriterSounds {
	private _sounds: Map<string, SoundCollection>;
	private _collection?: string;
	private _enabled: boolean = false;
	private _activeCollection?: SoundCollection;
	private _enterMode?: string;
	private _deleteMode?: string;

	constructor() {
		this.onTextDocumentChange = this.onTextDocumentChange.bind(this);
		this.reloadConfig = this.reloadConfig.bind(this);

		this._sounds = new Map<string, SoundCollection>();

		this._sounds.set('default', new SoundCollection(
			'default',
			['1', '2', '3', '4', '5', '6', '7', '8'],
			'enter_short',
			'space',
			'delete_short',
			'delete_long',
			'enter_long'
		));

		this.reloadConfig();
	}

	reloadConfig() {
		const settings =  workspace.getConfiguration('typewritersounds');
		this._collection = settings.theme;
		this._activeCollection = this._sounds.get(this._collection!)!;

		this._enterMode = settings.longEnterSound;
		this._deleteMode = settings.longDeleteSound;

		if (settings.enabled) {
			this.enable();
		} else {
			this.disable();
		}
	}

	enable() {
		this._enabled = true;
	}

	disable() {
		this._enabled = false;
	}

	onTextDocumentChange(evt: TextDocumentChangeEvent) {
		//todo: well this is fucking dumb, unregister handler
		if (!this._enabled) {
			return;
		}

		if (evt.contentChanges?.length !== 1) {
			return;
		}

		const text = evt.contentChanges[0].text;

		if (text === '') {
			player.play(this._activeCollection!.getDeleteSound(this._deleteMode!));
		} else if (text === ' ') {
			player.play(this._activeCollection!.getSpaceSound());
		} else if (text.indexOf('\n') !== -1) {
			player.play(this._activeCollection!.getEnterSound(this._enterMode!));
		} else {
			player.play(this._activeCollection!.getKeySound());
		}
	}
}

const typewriterSounds = new TypewriterSounds();

export default typewriterSounds;
