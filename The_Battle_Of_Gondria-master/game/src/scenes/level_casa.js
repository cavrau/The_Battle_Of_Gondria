import Player from "../sprites/player.js";
import Slimes from "../sprites/enemies/slimes.js";
import Bandeira from "../sprites/objects/bandeira.js";
import Moeda from "../sprites/objects/Moeda.js";
import Chave from "../sprites/objects/Chave.js";

class Level_casa extends Phaser.Scene {

  constructor(test) {
    super({
      key: 'Level_casa'
    });
  }
  // initialize() {
  //   alert('oieeee');
  //   console.log(this);
  //   this.call(this, { key: 'level_casa' });
  // }

  init(data) {
    alert('oieeee-222222222222');
    console.log(data);
  }
}
export default Level_casa;
