import Player from "../sprites/player.js";
import Slimes from "../sprites/enemies/slimes.js";
import Bandeira from "../sprites/objects/bandeira.js";
import Moeda from "../sprites/objects/Moeda.js";
import Chave from "../sprites/objects/Chave.js";
import Pocao from "../sprites/objects/pocao.js";
import Aldeao from "../sprites/Aldeao.js";
class Level_1 extends Phaser.Scene {

    constructor() {
        super({
            key: 'Level_1'
        });
    }

    preload() {
        this.secs = 0;
        this.load.tilemapTiledJSON("map_fase_1", "assets/tilemap/map_fase_1.json");
        this.load.audio('music_1_1', 'assets/musics/music_level_1.mp3');
        this.load.audio('slime_jump', 'assets/sounds/slime_jump.mp3');
    }


    create() {
        this.ended = false;
        let music = this.sound.add('music_1_1');
        music.setLoop(true);
        music.play();
        music.setVolume(0.5);
        this.slime_sound = this.sound.add('slime_jump');
        this.slime_sound.setVolume(0.3);

        //Cria o mapa apartir do arquivos JSON que veio do Tiled
        const map = this.make.tilemap({
            key: "map_fase_1"
        });

        /* Parametros para tileset: const blocos = map.addTilesetImage("nome do tileset que está no tiled", "nome da key que foi carregada no phaser");*/
        let blocos = map.addTilesetImage("blocos", "fase_1_tileset");
        let background = map.addTilesetImage('ceu', 'fase_1_sky');
        let midground = map.addTilesetImage('montanhas', 'fase_1_montanhas');
        let itensCenario = map.addTilesetImage('itensDeCenario', 'itensCenario');
        let casa = map.addTilesetImage('casa', 'fase_casa');

        //Cria layers não colidivel
        map.createDynamicLayer('background', background, 0, 0);
        map.createDynamicLayer('midground', midground, 0, 0);

        //Cria a layer da casa do aldeão
        this.hauseLayer = map.createDynamicLayer('casa', casa);

        map.createDynamicLayer('midground_2', itensCenario);
        map.createDynamicLayer('midground_3', itensCenario);

        //Cria e seta os blocos do tileset da layer 1
        let layer1 = map.createDynamicLayer("foreground_1", blocos);

        //Cria e seta os blocos do tileset da layer 2
        let layer2 = map.createStaticLayer("foreground_2", blocos);


        //Seta os blocos que serão colidiveis na layer 1
        layer1.setCollision([1, 2, 3, 4, 5, 6, 10]);

        //Seta os blocos que serão colidiveis na layer 2
        layer2.setCollisionBetween(1, 6);

        layer2.forEachTile(tile => {
            // alert('oieeeee');
            if (tile.index != -1) {
                // console.log(tile);
                tile.collideDown = false;
                tile.collideUp = true;
                tile.collideLeft = false;
                tile.collideRight = false;
            }

        });

        //Cria um player dentro da cena da fase, com coordenadas x e y
        this.player = new Player(this);
        this.player.spawnPlayer(3055, 352);

        //Seta o bounce do player
        this.player.sprite.setBounce(0.1);
        this.player.sprite.setScale(0.5);
        this.player.criaKeys();
        //Seta a colisão do player com a layer 1
        this.physics.add.collider(this.player.sprite, layer1);

        //Cria e seta os blocos do tileset da layer 2
        this.physics.add.collider(this.player.sprite, layer2);
        console.log(this.cameras.main);

        // /*INICIO - Debug para colisão */
        // const debugGraphics = this.add.graphics().setAlpha(0.75);

        // camada1.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });

        // layer2.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        /*FIM - Debug para colisão */

        //Cria uma camera que seguira o player
        this.cameras.main.startFollow(this.player.sprite);

        //Seta os limites do mapa que a camera acompanhará
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        let spawnLayer = map.getObjectLayer("spawns");
        this.spawns = spawnLayer.objects;

        this.parado = true;
        this.slimes = new Slimes(this, layer1);
        for (let i = 0; i < this.spawns.length; i++) {
            if (this.spawns[i].name === "Spawn_Flag") {
                this.bandeira = new Bandeira(this, this.spawns[i].x, this.spawns[i].y);
            }
            if (this.spawns[i].name === "Spawn_aldeao") {
                this.aldeao = new Aldeao(this, this.spawns[i].x, this.spawns[i].y);
                this.aldeao.sprite.play('aldeaoMove');
            }
        }
        this.physics.add.collider(this.bandeira.sprite, layer1);
        this.physics.add.collider(this.aldeao.sprite, layer1);


        //Criação da alavanca
        this.alavanca = map.createFromObjects('itensInteracao', 'alavanca', {
            key: 'sprite_alavanca'
        });

        /*this.ponte recebe a layer que ficará a ponte e também as
        coordenas de onde a ponte começa e termina*/
        this.ponte = {
            layer: layer1,
            pXi: 145,
            pXf: 151,
            pYcollision: 12,
            pYnCollision: 11
        };

        /*Cria as moedas */
        let coinLayer = map.getObjectLayer("moedas");
        this.moedasObjetos = coinLayer.objects;

        for (let i = 0; i < this.moedasObjetos.length; i++) {
            this.moeda = new Moeda(this, this.moedasObjetos[i].x, this.moedasObjetos[i].y);
            this.moeda.sprite.anims.play('giraMoeda');
        }

        /*Cria as Poções */
        let PotionLayer = map.getObjectLayer("pocoes");
        this.pocoesObjetos = PotionLayer.objects;

        for (let i = 0; i < this.pocoesObjetos.length; i++) {
            this.pocao = new Pocao(this, this.pocoesObjetos[i].x, this.pocoesObjetos[i].y);
            this.pocao.sprite.anims.play('potionEffect');
        }

        /*Cria a chave */
        this.layerObjetos = map.getObjectLayer('itensInteracao');
        this.chave = null;

        for (let i = 0; i < this.layerObjetos.objects.length; i++) {
            if (this.layerObjetos.objects[i].name == 'chave') {
                this.chave = new Chave(this, this.layerObjetos.objects[i].x, this.layerObjetos.objects[i].y, this.player);
            }
        }

        /*Criação da interação da casa*/
        this.moved = false;
        /*Coordenadas da porta da casa que o jogador
        terá que interagir */
        this.casa = {
            x: 3200,
            y: 352,
        };

        /*Manda a msg para aldeão */
        // this.msg = 'Aldeao:\n'
        // +' Voce so podera entrar na casa \n'
        // +' quando tiver chave consigo.';

        this.msg = 'Aldeao:\n'
        +' FALA MEU CHAPA';

        // Chama o método que cria o hud do player
        this.player.createHUD();
        this.player.criaIntervalo();
        this.colisao = false;
    }

    update() {
        this.player.update(this.slimes, this, this.alavanca, this.ponte, this.aldeao, this.casa, this.moedas);
        this.slimes.update(this.player.sprite, this.slimes);
        this.secs = this.player.mins * 60 + this.player.timersecs;
        this.aldeao.update(this, this.player, this.msg);
    }

}
export default Level_1;