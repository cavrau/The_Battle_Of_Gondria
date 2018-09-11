import Player from "../sprites/player.js";
import Slimes from "../sprites/enemies/slimes.js";
class Level_1 extends Phaser.Scene {

    constructor(test) {
        super({
            key: 'Level_1'
        });
    }

    preload() {

        this.load.spritesheet({
            key: 'sprite_hero',
            url: 'assets/images/mobs/heroi.png',
            frameConfig: {
                frameWidth: 60,
                frameHeight: 84
            }
        });

        this.player_vidas = 3;

        this.load.image('coracao_cheio', 'assets/images/huds/coracao_cheio.png');
        this.load.image('coracao_vazio', 'assets/images/huds/coracao_vazio.png');

        this.load.image('btnVoltar', 'assets/images/botoes/btnVoltar.png');
        this.load.image('btnVoltarPress', 'assets/images/botoes/btnVoltarPress.png');

        this.load.tilemapTiledJSON("map_fase_1", "assets/tilemap/map_fase_1.json");

        this.load.image("fase_1_tileset", "assets/tilesets/fase_1_tileset.png");
        this.load.image('fase_1_sky', 'assets/background/fase_1_sky.png');
        this.load.image('fase_1_montanhas', 'assets/background/fase_1_montanhas.png');
        // this.load.image('ponte', 'assets/images/ponte.png');


        this.load.spritesheet('slime_verde', 'assets/images/mobs/slime_verde_walk.png',
            { frameWidth: 18, frameHeight: 21 });

        this.load.spritesheet('slime_azul', 'assets/images/mobs/slime_azul_walk.png',
            { frameWidth: 18, frameHeight: 21 });

        this.load.spritesheet('slime_vermelho', 'assets/images/mobs/slime_vermelho_walk.png',
            { frameWidth: 18, frameHeight: 21 });


    }


    create() {

        //Cria o mapa apartir do arquivos JSON que veio do Tiled
        const map = this.make.tilemap({ key: "map_fase_1" });

        /* Parametros para tileset: const blocos = map.addTilesetImage("nome do tileset que está no tiled", "nome da key que foi carregada no phaser");*/
        const blocos = map.addTilesetImage("blocos", "fase_1_tileset");
        const background = map.addTilesetImage('ceu', 'fase_1_sky');
        const midground = map.addTilesetImage('montanhas', 'fase_1_montanhas');

        //Cria layers não colidivel
        map.createDynamicLayer('background', background, 0, 0);
        map.createDynamicLayer('midground', midground, 0, 0);

        //Cria e seta os blocos do tileset da layer 1
        this.layer1 = map.createDynamicLayer("foreground_1", blocos, 0, 0);

        //Cria e seta os blocos do tileset da layer 2
        this.layer2 = map.createStaticLayer("foreground_2", blocos, 0, 0);


        //Seta os blocos que serão colidiveis na layer 1
        this.layer1.setCollisionBetween(1, 6);

        //Seta os blocos que serão colidiveis na layer 2
        this.layer2.setCollisionBetween(1, 6);

        //Cria um player dentro da cena da fase, com coordenadas x e y
        this.player = new Player(this, 20, 300);

        //Seta o bounce do player
        this.player.sprite.setBounce(0.1);
        this.player.sprite.setScale(0.5);

        //Seta a colisão do player com a layer 1
        this.physics.add.collider(this.player.sprite, this.layer1);

        //Cria e seta os blocos do tileset da layer 2
        this.c_layer2 = this.physics.add.collider(this.player.sprite, this.layer2);

        /*Desativa a colisão temporáriamente, pois o player poderá passar
        entre os blocos dessa layer sem precisar pular, mas caso seja sua 
        preferencia pular em cima a colisão é ativada no update() */
        this.c_layer2.active = false;

        /*INICIO - Debug para colisão */
        const debugGraphics = this.add.graphics().setAlpha(0.75);

        this.layer1.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });

        this.layer2.renderDebug(debugGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        });
        /*FIM - Debug para colisão */

        //Cria uma camera que seguira o player
        this.cameras.main.startFollow(this.player.sprite);
        //Seta os limites do mapa que a camera acompanhará
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        let spawnLayer = map.getObjectLayer("spawns");
        this.spawns = spawnLayer.objects;

        this.parado = true;
        this.slimes = new Slimes(this);
        // if (this.spawns[i].name === "Spawn_Flag") {
        //     //this.physics.add.sprite(this.spawns[i].x,this.spawns[i].y,"flag_branca")
        // }

        

        //     this.c_slimes = this.physics.add.collider(this.player, this.slimes, this.slimeHit, null, this);
        //     this.life_1 = this.add.image(720, 40, 'coracao_cheio');
        //     this.life_2 = this.add.image(770, 40, 'coracao_cheio');
        //     this.life_3 = this.add.image(820, 40, 'coracao_cheio');
        //     this.timer = 0;


        //     this.scoreText = this.add.text(16, 16, '0', {
        //         fontSize: '16px',
        //         fill: '#000'
        //     });
        // }

        
        
    }
    
    update() {
        this.player.update(this.slimes,this);
        this.slimes.update(this.player.sprite,this.slimes);
        // if (this.player.body.x < 432) {
        // } else {
        //     this.life_1.x = this.player.body.x + 300;
        //     this.life_2.x = this.player.body.x + 350;
        //     this.life_3.x = this.player.body.x + 400;
        // }
        // const cam = this.cameras.main;

        // if (this.player_vidas == 2) {
        //     this.life_1.setTexture("coracao_vazio");
        // } else if (this.player_vidas == 1) {
        //     this.life_1.setTexture("coracao_vazio");
        //     this.life_2.setTexture("coracao_vazio");
        // } else if (this.player_vidas == 0) {
        //     this.life_1.setTexture("coracao_vazio");
        //     this.life_2.setTexture("coracao_vazio");
        //     this.life_3.setTexture("coracao_vazio");
        // } else if (this.player_vidas == 3) {
        //     this.life_1.setTexture("coracao_cheio");
        //     this.life_2.setTexture("coracao_cheio");
        //     this.life_3.setTexture("coracao_cheio");
        // }
        // if (this.player.body.y > 500) {
        //     this.player_vidas = 0;
        // }



        // }

        

        // if (this.colisao == false) {
        //     if (cursors.left.isDown && this.player.x - 16 > 0) {
        //         this.player.sprite.setVelocityX(120);
        //         this.parado = false;
        //         // this.player.anims.play('left',true);
        //     } else if (cursors.right.isDown) {
        //         this.player.sprite.setVelocityX(-120);
        //         this.parado = false;
        //         // this.player.anims.play('right',true);
        //     } else if (this.colisao == false) {
        //         this.player.sprite.setVelocityX(0);
        //         // this.player.anims.play('turn',true);
        //     }
        // }

        // if (this.colisao == true) {
        //     // this.c_slimes.active = false;
        // } else {
        //     // this.c_slimes.active = true;
        // }

        // if (this.colisao == true) {
        //     setTimeout(() => {
        //         if (this.player.body.onFloor()) {
        //             this.colisao = false;
        //         }
        //     }, 500)
        // }

        // if (cursors.up.isDown && this.player.sprite.body.onFloor()) {
        //     this.player.sprite.setVelocityY(-230);
        // }

       

    }

}export default Level_1;