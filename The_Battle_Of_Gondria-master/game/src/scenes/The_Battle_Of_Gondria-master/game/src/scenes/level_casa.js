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

  init(data) {
    this.player = data.player;
  }

  create() {
    //Cria o mapa apartir do arquivos JSON que veio do Tiled
    const map = this.make.tilemap({ key: "map_casa" });

    /* Parametros para tileset: const blocos = map.addTilesetImage("nome do tileset que está no tiled", "nome da key que foi carregada no phaser");*/
    let tilesetCasa = map.addTilesetImage("fase_casa", "fase_casa");

    //Cria layers não colidivel
    map.createDynamicLayer('background', tilesetCasa, 0, 0);
    map.createDynamicLayer('middleground', tilesetCasa, 0, 0);
    this.collideLayer = map.createDynamicLayer('foreground', tilesetCasa, 0, 0);

    this.player.setPlayerScene(this);
    this.player.createMove();
    this.player.spawnPlayer(864, 224);

    //Seta os blocos que serão colidiveis na layer 1
    this.collideLayer.setCollision([3, 4, 5]);

    //Cria uma camera que seguira o player
    this.cameras.main.startFollow(this.player.sprite);

    //Seta os limites do mapa que a camera acompanhará
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //Seta o bounce do player
    this.player.sprite.setBounce(0.1);
    this.player.sprite.setScale(0.5);

    //Seta a colisão do player com a layer 1
    this.physics.add.collider(this.player.sprite, this.collideLayer);

    this.c_layer2 = null;
    
    /*Cria as moedas */
    let coinLayer = map.getObjectLayer("moedas");
    this.moedasObjetos = coinLayer.objects;
    
    for (let i = 0; i < this.moedasObjetos.length; i++) {
      this.moeda = new Moeda(this, this.moedasObjetos[i].x, this.moedasObjetos[i].y);
      this.moeda.sprite.anims.play('giraMoeda');
    }
    
    this.player.createHUD();

  }

  update() {
    this.player.update(null, this, null, null, null, null, null);
    this.player.updateHUD();
    // this.slimes.update(this.player.sprite, this.slimes);
    this.secs = this.player.mins * 60 + this.player.timersecs;
    // console.log(this.player.Keys);
  }
}
export default Level_casa;
