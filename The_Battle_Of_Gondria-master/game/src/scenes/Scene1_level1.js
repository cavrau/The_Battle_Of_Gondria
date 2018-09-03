class Scene1_level1 extends Phaser.Scene {

    constructor(test) {
        super({
            key: 'Scene1_level1'
        });
    }

    preload() {
        this.load.image('btnVoltar', 'assets/images/botoes/btnVoltar.png');
        this.load.image('btnVoltarPress', 'assets/images/botoes/btnVoltarPress.png');
        this.load.image("tileset", "assets/tilesets/fase1_tileset.png");
        this.load.image('ceu', 'assets/background/sky_fase1.png');
        this.load.image('montanhas', 'assets/background/background_1.png');
        this.load.tilemapTiledJSON("map", "assets/tilemap/map_1.json");
        this.load.spritesheet('dude',
            'assets/images/dude.png',
            { frameWidth: 32, frameHeight: 48 });

    }
    create() {
        const map = this.make.tilemap({ key: "map" });
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const blocos = map.addTilesetImage("blocos", "tileset");
        const background = map.addTilesetImage('ceu', 'ceu');
        const midground = map.addTilesetImage('montanhas', 'montanhas')
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        map.createDynamicLayer('background', background, 0, 0);
        map.createDynamicLayer('midground', midground, 0, 0);
        this.layer2 = map.createStaticLayer("foreground_2", blocos, 0, 0);
        this.layer1 = map.createDynamicLayer("foreground_1", blocos, 0, 0);
        this.layer1.setCollisionBetween(1, 7);
        this.layer2.setCollisionBetween(1, 7);
        // }, context, tileX, tileY, width, height, filteringOptions, this.layer);

        //    const debugGraphics = this.add.graphics().setAlpha(0.75);
        //     layer1.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        //   });
        let player = this.physics.add.sprite(20, 350, 'dude');

        player.setBounce(0.1);

        player.setCollideWorldBounds(false);
        this.physics.add.collider(player, this.layer1);
        this.c_layer2 = this.physics.add.collider(player, this.layer2);
        // set workd bounds to allow camera to follow the player
        this.cameras.main.setBounds(0, 0, 6048, 480);
        this.c_layer2.active = false;
        console.log(this.c_layer2);

        // making the camera follow the player
        this.player = player;
        this.cameras.main.startFollow(this.player);

        /*Pause Game Function*/
        this.input.keyboard.on('keydown_P', function (event) {
            this.pausado=true
            console.log('func de pausar');
            this.scene.pause();

            this.voltar = this.add.image(432, 240, 'btnVoltar').setInteractive();
            this.voltar.setScale(0.6);

            this.voltar.on('keydown_P', function () {
                let btn = this;
                btn.setTexture("btnVoltarPress");
                setTimeout(() => {
                    btn.setTexture("btnVoltar");
                    this.scene.resume();
                    console.log('despausei');
                    }, 150);
                });
        },this);

    }

    update() {
        let cursors = this.input.keyboard.createCursorKeys();
        if (!this.player.body.onFloor()) {
            this.c_layer2.active = true;
        } else {
            this.c_layer2.active = false;
        }
        if (cursors.left.isDown && this.player.x - 16 > 0) {
            this.player.setVelocityX(-160);
            // this.player.anims.play('left',true);
        } else if (cursors.right.isDown) {
            this.player.setVelocityX(160);
            // this.player.anims.play('right',true);
        } else {
            // this.player.anims.play('turn',true);
            this.player.setVelocityX(0);
        }
        if (cursors.up.isDown && this.player.body.onFloor()) {


            this.player.setVelocityY(-230);

        }
    }
}
export default Scene1_level1;