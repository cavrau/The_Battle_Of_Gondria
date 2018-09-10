class Level_1 extends Phaser.Scene {

    constructor(test) {
        super({
            key: 'Level_1'
        });
    }

    preload() {
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


        this.load.spritesheet('dude',
            'assets/images/mobs/dude.png',
            { frameWidth: 32, frameHeight: 48 });

        this.load.spritesheet('slime_verde', 'assets/images/mobs/slime_verde_walk.png',
            { frameWidth: 18, frameHeight: 21 });

        this.load.spritesheet('slime_azul', 'assets/images/mobs/slime_azul_walk.png',
            { frameWidth: 18, frameHeight: 21 });

        this.load.spritesheet('slime_vermelho', 'assets/images/mobs/slime_vermelho_walk.png',
            { frameWidth: 18, frameHeight: 21 });


    }

    createHUD() {


    }

    create() {
        const map = this.make.tilemap({ key: "map_fase_1" });

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)

        // const ponte_tile = map.addTilesetImage("ponte", "ponte")
        const blocos = map.addTilesetImage("blocos", "fase_1_tileset");
        const background = map.addTilesetImage('ceu', 'fase_1_sky');
        const midground = map.addTilesetImage('montanhas', 'fase_1_montanhas');
        // console.log(ponte_tile)
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        map.createDynamicLayer('background', background, 0, 0);
        map.createDynamicLayer('midground', midground, 0, 0);
        this.layer2 = map.createStaticLayer("foreground_2", blocos, 0, 0);

        // this.ponte = map.createDynamicLayer("ponte_up", ponte_tile, 0, 0);

        this.layer1 = map.createDynamicLayer("foreground_1", blocos, 0, 0);
        this.layer1.setCollisionBetween(1, 6);
        this.layer2.setCollisionBetween(1, 6);

        // let colision = this.ponte.setCollision(1);
        // console.log(this.ponte);

        // }, context, tileX, tileY, width, height, filteringOptions, this.layer);

        //    const debugGraphics = this.add.graphics().setAlpha(0.75);
        //     layer1.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        //   });
        // this.voltar = this.add.image(780,40,'btnVoltar').setInteractive();
        // this.voltar.setScale(0.6);
        // this.voltar.on('pointerdown',function() {
        //     let btn = this;
        //     btn.setTexture("btnVoltarPress");
        //     setTimeout(()=> {
        //         btn.setTexture("btnVoltar");
        //         this.scene.scene.start('MenuFases');
        //     },150);
        // })
        let player = this.physics.add.sprite(20, 350, 'dude');

        player.setBounce(0.1);

        player.setCollideWorldBounds(false);
        this.physics.add.collider(player, this.layer1);
        // this.physics.add.collider(player, this.ponte);
        // console.log(colision);
        this.c_layer2 = this.physics.add.collider(player, this.layer2);
        // set workd bounds to allow camera to follow the player
        this.cameras.main.setBounds(0, 0, 6048, 480);
        this.c_layer2.active = false;
        // making the camera follow the player
        this.player = player;
        this.cameras.main.startFollow(this.player);
        let spawnLayer = map.getObjectLayer("spawns");
        this.spawns = spawnLayer.objects;
        this.slimes_verde = this.physics.add.group();
        this.slimes_azul = this.physics.add.group();
        this.slimes_vermelho = this.physics.add.group();
        console.log(this.spawns);
        console.log(this.player);
        for (let i = 0; i < this.spawns.length; i++) {
            if (this.spawns[i].name === "Spawn_Slime_Verde") {
                let slime = this.slimes_verde.create(this.spawns[i].x, this.spawns[i].y, 'slime_verde');
                slime.setScale(1.5);
            }
            if (this.spawns[i].name === "Spawn_Slime_Azul") {
                let slime = this.slimes_azul.create(this.spawns[i].x, this.spawns[i].y, 'slime_azul');
                // slime.
                // slime.setScale(1.7);
            }
            if (this.spawns[i].name === "Spawn_Slime_Vermelho") {
                let slime = this.slimes_vermelho.create(this.spawns[i].x, this.spawns[i].y, 'slime_vermelho');
                // slime.setScale(2.0);
            }
            if (this.spawns[i].name === "Spawn_Flag") {
                //this.physics.add.sprite(this.spawns[i].x,this.spawns[i].y,"flag_branca")
            }
        }

        this.physics.add.collider(this.slimes_verde, this.layer1);
        this.physics.add.collider(this.player, this.slimes_verde, this.slimeHit, null, this);
        this.physics.add.collider(this.player, this.slimes_azul, this.slimeHit, null, this);
        this.physics.add.collider(this.player, this.slimes_vermelho, this.slimeHit, null, this);
        this.physics.add.collider(this.slimes_azul, this.layer1);
        this.physics.add.collider(this.slimes_vermelho, this.layer1);
        console.log(this.slimes_verde.children);
        this.life_1 = this.add.image(720, 40, 'coracao_cheio');
        this.life_2 = this.add.image(770, 40, 'coracao_cheio');
        this.life_3 = this.add.image(820, 40, 'coracao_cheio');
        this.timer = 0;
        this.parado = true;
        this.colisao = false;
        this.scoreText = this.add.text(16, 16, '0', {
            fontSize: '16px',
            fill: '#000'
        });
    }

    slimeHit(player, slime) {
        if (slime.body.velocity.x == 0) {
            player.setVelocityX(-100);
        } else {
            player.setVelocityX(slime.body.velocity.x * 4);
        }
        player.setVelocityY(-150);
        slime.setVelocityX((slime.body.velocity.x) * -1);
        slime.setVelocityY(-200);
        this.player_vidas -= 1;
        this.colisao = true;
    }


    update() {

        if (this.player.body.x < 432) {
        } else {
            this.life_1.x = this.player.body.x + 300;
            this.life_2.x = this.player.body.x + 350;
            this.life_3.x = this.player.body.x + 400;
        }
        if (this.player_vidas == 2) {
            this.life_1.setTexture("coracao_vazio");
        } else if (this.player_vidas == 1) {
            this.life_1.setTexture("coracao_vazio");
            this.life_2.setTexture("coracao_vazio");
        } else if (this.player_vidas == 0) {
            this.life_1.setTexture("coracao_vazio");
            this.life_2.setTexture("coracao_vazio");
            this.life_3.setTexture("coracao_vazio");
        } else if (this.player_vidas == 3) {
            this.life_1.setTexture("coracao_cheio");
            this.life_2.setTexture("coracao_cheio");
            this.life_3.setTexture("coracao_cheio");
        }
        if (this.player.body.y > 500) {
            this.player_vidas = 0;
        }
        let cursors = this.input.keyboard.createCursorKeys();
        if (!this.player.body.onFloor() && this.player.body.velocity.y > 0) {
            this.c_layer2.active = true;
        } else {
            this.c_layer2.active = false;
        }
        if (this.colisao == false) {
            if (cursors.left.isDown && this.player.x - 16 > 0) {
                this.player.setVelocityX(-120);
                this.parado = false;
                // this.player.anims.play('left',true);
            } else if (cursors.right.isDown) {
                this.player.setVelocityX(120);
                this.parado = false;
                // this.player.anims.play('right',true);
            } else if (this.colisao == false) {
                this.player.setVelocityX(0);
                // this.player.anims.play('turn',true);
            }
        }
        if (this.colisao == true) {
            setTimeout(() => {
                if (this.player.body.onFloor()) {
                    this.colisao = false;
                }
            }, 100)
        }
        if (cursors.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-230);
        }
        for (let i = 0; i < this.slimes_verde.children.entries.length; i++) {
            if (this.slimes_verde.children.entries[i].y > 490) {
                this.slimes_verde.children.entries[i].destroy();
            }
            if (this.slimes_verde.children.entries[i].x - this.player.x < 150 && this.slimes_verde.children.entries[i].x - this.player.x > 0) {
                if (this.slimes_verde.children.entries[i].body.onFloor()) {
                    this.slimes_verde.children.entries[i].setVelocityX(-80);
                    this.slimes_verde.children.entries[i].setVelocityY(-200);
                }
            } else if (this.slimes_verde.children.entries[i].x - this.player.x > -150 && this.slimes_verde.children.entries[i].x - this.player.x < 0) {
                if (this.slimes_verde.children.entries[i].body.onFloor()) {
                    this.slimes_verde.children.entries[i].setVelocityX(80);
                    this.slimes_verde.children.entries[i].setVelocityY(-200);
                }
            } else {
                this.slimes_verde.children.entries[i].setVelocityX(0);
            }
        }
        for (let i = 0; i < this.slimes_azul.children.entries.length; i++) {
            if (this.slimes_azul.children.entries[i].y > 490) {
                this.slimes_azul.children.entries[i].destroy();
            }
            if (this.slimes_azul.children.entries[i].x - this.player.x < 150 && this.slimes_azul.children.entries[i].x - this.player.x > 0) {
                if (this.slimes_azul.children.entries[i].body.onFloor()) {
                    this.slimes_azul.children.entries[i].setVelocityX(-80);
                    this.slimes_azul.children.entries[i].setVelocityY(-200);
                }
            } else if (this.slimes_azul.children.entries[i].x - this.player.x > -150 && this.slimes_azul.children.entries[i].x - this.player.x < 0) {
                if (this.slimes_azul.children.entries[i].body.onFloor()) {
                    this.slimes_azul.children.entries[i].setVelocityX(80);
                    this.slimes_azul.children.entries[i].setVelocityY(-200);
                }
            } else {
                this.slimes_azul.children.entries[i].setVelocityX(0);
            }
        }
        for (let i = 0; i < this.slimes_vermelho.children.entries.length; i++) {
            if (this.slimes_vermelho.children.entries[i].y > 490) {
                this.slimes_vermelho.children.entries[i].destroy();
            }
            if (this.slimes_vermelho.children.entries[i].x - this.player.x < 150 && this.slimes_vermelho.children.entries[i].x - this.player.x > 0) {
                if (this.slimes_vermelho.children.entries[i].body.onFloor()) {
                    this.slimes_vermelho.children.entries[i].setVelocityX(-80);
                    this.slimes_vermelho.children.entries[i].setVelocityY(-200);
                }
            } else if (this.slimes_vermelho.children.entries[i].x - this.player.x > -150 && this.slimes_vermelho.children.entries[i].x - this.player.x < 0) {
                if (this.slimes_vermelho.children.entries[i].body.onFloor()) {
                    this.slimes_vermelho.children.entries[i].setVelocityX(80);
                    this.slimes_vermelho.children.entries[i].setVelocityY(-200);
                }
            } else {
                this.slimes_vermelho.children.entries[i].setVelocityX(0);
            }
        }
    }
}
export default Level_1;