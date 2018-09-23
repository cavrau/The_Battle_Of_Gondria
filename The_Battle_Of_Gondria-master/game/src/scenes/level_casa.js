import Player from "../sprites/player.js";
import Moeda from "../sprites/objects/Moeda.js";

class Level_casa extends Phaser.Scene {

  constructor(test) {
    super({
      key: 'Level_casa'
    });
  }

  init(data) {
    this.player = data.player;
    // this.player.oldScene = data.scene_level;
  }

  create() {
    // this.scene.bringToTop()

    // console.log(this.player.oldScene);
    //Cria o mapa apartir do arquivos JSON que veio do Tiled
    const map = this.make.tilemap({ key: "map_casa" });

    /* Parametros para tileset: const blocos = map.addTilesetImage("nome do tileset que está no tiled", "nome da key que foi carregada no phaser");*/
    let tilesetCasa = map.addTilesetImage("fase_casa", "fase_casa");

    //Cria layers não colidivel
    map.createDynamicLayer('background', tilesetCasa, 0, 0);
    map.createDynamicLayer('middleground', tilesetCasa, 0, 0);

    //Cria e seta os blocos do tileset da layer 1
    this.layer1 = map.createDynamicLayer("foreground", tilesetCasa);

    //Seta os blocos que serão colidiveis na layer 1
    this.layer1.setCollision([3, 4, 5]);

    // /*INICIO - Debug para colisão */
    const debugGraphics = this.add.graphics().setAlpha(0.75);

    // this.layer1.renderDebug(debugGraphics, {
    //   tileColor: null, // Color of non-colliding tiles
    //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //   faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });

    /*FIM - Debug para colisão */

    //Seta cena do player
    this.player.setScene(this);

    //Cria um player dentro da cena da fase, com coordenadas x e y
    this.player.spawnPlayer(864, 244);

    //Seta o bounce do player
    this.player.criaKeys();
    this.player.sprite.setBounce(0.1);
    this.player.sprite.setScale(0.5);

    
    //Seta a colisão do player com a layer 1
    this.physics.add.collider(this.player.sprite, this.layer1);
    
    //Cria uma camera que seguira o player
    this.cameras.main.startFollow(this.player.sprite);
    
    //Seta os limites do mapa que a camera acompanhará
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    /*Cria as moedas */
    let coinLayer = map.getObjectLayer("moedas");
    this.moedasObjetos = coinLayer.objects;
    
    for (let i = 0; i < this.moedasObjetos.length; i++) {
      this.moeda = new Moeda(this, this.moedasObjetos[i].x, this.moedasObjetos[i].y);
      this.moeda.sprite.anims.play('giraMoeda');
    }
    
    //Cria o hud do jogador
    this.player.createHUD();

    this.colisao = false;

  }

  update() {
    this.player.update(null, this, null, null, null, null, null);
    this.player.updateHUD();
    this.secs = this.player.mins * 60 + this.player.timersecs;
  }

}
export default Level_casa;
