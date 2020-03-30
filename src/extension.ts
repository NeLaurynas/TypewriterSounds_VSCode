import * as vscode from 'vscode';
import typewriterSounds from './typewriterSounds';

export function activate(context: vscode.ExtensionContext) {
	// console.log((vscode.window as any).AudioContext);
	// console.log((vscode.window as any).webkitAudioContext);
	// :(

	const disposable1 = vscode.commands.registerCommand('typewritersounds.enable', () => {
		typewriterSounds.enable();
	});

	const disposable2 = vscode.commands.registerCommand('typewritersounds.disable', () => {
		typewriterSounds.disable();
	});

	context.subscriptions.push(disposable1, disposable2);

	vscode.workspace.onDidChangeTextDocument(typewriterSounds.onTextDocumentChange);
}

export function deactivate() {

}
