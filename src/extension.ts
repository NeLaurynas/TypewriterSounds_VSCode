import * as vscode from 'vscode';
import typewriterSounds from './typewriterSounds';

export function activate(context: vscode.ExtensionContext) {
	// console.log((vscode.window as any).AudioContext);
	// console.log((vscode.window as any).webkitAudioContext);
	// :(
	const settings = vscode.workspace.getConfiguration('typewritersounds');
	if (settings.enabled) {
		typewriterSounds.enable();
	}

	const disposable1 = vscode.commands.registerCommand('typewritersounds.enable', () => {
		settings.update('enabled', true, true);
		typewriterSounds.enable();
	});

	const disposable2 = vscode.commands.registerCommand('typewritersounds.disable', () => {
		settings.update('enabled', false, true);
		typewriterSounds.disable();
	});

	const disposable3 = vscode.workspace.onDidChangeConfiguration(typewriterSounds.reloadConfig);

	context.subscriptions.push(disposable1, disposable2, disposable3);

	//todo: disposable4 lol
	vscode.workspace.onDidChangeTextDocument(typewriterSounds.onTextDocumentChange);
}

export function deactivate() {

}
