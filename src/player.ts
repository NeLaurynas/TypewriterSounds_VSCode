// well it appears we cannot access AudioBuffer from visual studio code...
const play_sound = require('play-sound')();

class Player {
	play(path: string) {
		play_sound.play(path);
	}
}

const player = new Player();

export default player;
