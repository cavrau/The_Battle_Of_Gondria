import Player from "../sprites/player.js";
import Slimes from "../sprites/enemies/slimes.js";
import Bandeira from "../sprites/objects/bandeira.js";
class Level_1_boss extends Phaser.Scene {

  constructor() {
    super({
      key: 'Level_1_boss'
    });
  }

  init(player){
    this.player = player;
<<<<<<< HEAD
    this.player.setScene(this);
    console.log(this.player);
=======
    // this.player.setScene(this);
    console.log(this.player)
>>>>>>> c409483ee282403cab689975a61c08ad3e39c800
  }
  preload() {
    this.load.tilemapTiledJSON("map_1_boss", "assets/tilemap/map_fase_1_boss.json");
  }


  create() {
    //Cria o mapa apartir do arquivos JSON que veio do Tiled
    const mapBoss = this.make.tilemap({ key: "map_1_boss" });

    /* Parametros para tileset: const blocos = map.addTilesetImage("nome do tileset que está no tiled", "nome da key que foi carregada no phaser");*/
    let tilesetBlocos = mapBoss.addTilesetImage("fase_1_tileset", "fase_1_tileset");
    let background = mapBoss.addTilesetImage('fase_1_sky', 'fase_1_sky');
    let middleground = mapBoss.addTilesetImage('fase_1_montanhas', 'fase_1_montanhas');

    //Cria layers não colidivel
    mapBoss.createDynamicLayer('background_boss', background, 0, 0);
    mapBoss.createDynamicLayer('middleground_boss', middleground, 0, 0);

    //Cria e seta os blocos do tileset da layer 1
    let layer1 = mapBoss.createStaticLayer("foreground_1_boss", tilesetBlocos,0,0);

    //Cria e seta os blocos do tileset da layer 2
    let layer2 = mapBoss.createStaticLayer("foreground_2_boss", tilesetBlocos, 0, 0);

    
    //Seta os blocos que serão colidiveis na layer 1
    // layer1.setCollisionBetween(1, 6);
    layer1.forEachTile(tile => {
      // alert('oieeeee');
      if(tile.index != -1){
        // console.log(tile);
        tile.collideDown = true;
        tile.collideUp = true;
        tile.collideLeft = true;
        tile.collideRight = true;
      }

    });
    console.log(layer1);
    layer1.setCollisionByProperty({ collides: true });
    // console.log(layer1.setCollisionByProperty({ collides: true }));
    //Seta os blocos que serão colidiveis na layer 2
    // layer2.setCollisionBetween(1, 6);

    //Cria um player dentro da cena da fase, com coordenadas x e y
    this.player.spawnPlayer(30, 90);
    
    //Seta o bounce do player
    this.player.sprite.setBounce(0.1);
    this.player.sprite.setScale(0.5);
    this.player.criaKeys(this);
    this.player.createHUD();
    this.player.criaIntervalo();

    //Seta a colisão do player com a layer 1
    this.physics.add.collider(this.player.sprite, layer1);
    console.log(this.physics.add.collider(this.player.sprite, layer1));
    // Cria e seta os blocos do tileset da layer 2
    this.c_layer2 = this.physics.add.collider(this.player.sprite, layer2);

    /*Desativa a colisão temporáriamente, pois o player poderá passar
    entre os blocos dessa layer sem precisar pular, mas caso seja sua 
    preferencia pular em cima a colisão é ativada no update() */
    // this.c_layer2.active = false;

    // /*INICIO - Debug para colisão */
    // const debugGraphics = this.add.graphics().setAlpha(0.75);

    // layer1.renderDebug(debugGraphics, {
    //     tileColor: null, // Color of non-colliding tiles
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // });

    this.colisao= false;
    // // layer2.renderDebug(debugGraphics, {
    // //     tileColor: null, // Color of non-colliding tiles
    // //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    // //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    // // });
    // /*FIM - Debug para colisão */

    //Cria uma camera que seguira o player
    this.cameras.main.startFollow(this.player.sprite);

    //Seta os limites do mapa que a camera acompanhará

    this.cameras.main.setBounds(0, 0, 2592, 480);
    
    // this.cameras.main.width= 964;
    let spawnLayer = mapBoss.getObjectLayer("spawns");
    this.spawns = spawnLayer.objects;

    this.parado = true;
    this.slimes = new Slimes(this, layer1);
    this.slime_sound = this.sound.add('slime_jump');
    this.slime_sound.setVolume(0.3);
    // //Criação da alavanca
    // this.alavanca = map.createFromObjects('itensInteracao', 'alavanca', { key: 'sprite_alavanca' });

    // /*this.ponte recebe a layer que ficará a ponte e também as
    // coordenas de onde a ponte começa e termina*/
    // this.ponte = {
    //   layer: camada1,
    //   pXi: 145,
    //   pXf: 151,
    //   pYcollision: 12,
    //   pYnCollision: 11
    // };

    // /*Cria as moedas */
    // let coinLayer = map.getObjectLayer("moedas");
    // this.moedasObjetos = coinLayer.objects;

    // for (let i = 0; i < this.moedasObjetos.length; i++) {
    //   this.moeda = new Moeda(this, this.moedasObjetos[i].x, this.moedasObjetos[i].y);
    //   this.moeda.sprite.anims.play('giraMoeda');
    // }

    // /*Cria a chave */
    // this.layerObjetos = map.getObjectLayer('itensInteracao');
    // this.chave;

    // for (let i = 0; i < this.layerObjetos.objects.length; i++) {
    //   if (this.layerObjetos.objects[i].name == 'chave') {
    //     this.chave = new Chave(this, this.layerObjetos.objects[i].x, this.layerObjetos.objects[i].y);
    //   }
    // }

    // /*Criação da interação da casa*/

    // /*Coordenadas da porta da casa que o jogador
    // terá que interagir */
    // this.casa = {
    //   x: 3200,
    //   y: 352,
    // };

    // // Chama o método que cria o hud do player
    // this.player.createHUD();
    // this.player.criaIntervalo();
    this.cameras.main.backgroundColor.r=100;
  }
  
  update() {
    this.player.update(this.slimes, this, this.alavanca, this.ponte, this.aldeao, this.casa, this.moedas);
    // this.player.updateHUD();
    this.slimes.update(this.player.sprite, this.slimes);
    this.secs = this.player.mins * 60 + this.player.timersecs;

  }

} export default Level_1_boss;
