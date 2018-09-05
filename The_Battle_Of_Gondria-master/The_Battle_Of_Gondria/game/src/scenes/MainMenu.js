class MainMenu extends Phaser.Scene {

    constructor() {
        super({ key: "MainMenu" });
    }


    preload() {
        this.load.image('btnJogar', 'assets/images/botoes/btnJogar.png');
        this.load.image('btnJogarPress', 'assets/images/botoes/btnJogarPress.png');
        
        this.load.image('btnAjuda', 'assets/images/botoes/btnAjuda.png');
        this.load.image('btnAjudaPress', 'assets/images/botoes/btnAjudaPress.png');

        this.load.tilemapTiledJSON("map", "assets/tilemap/mainMenuMap.json");
        this.load.image("chaoBlocos", "assets/tilesets/fase1_tileset.png");
        this.load.image('montanhas', 'assets/background/background_1.png');
        this.load.image('ceu', 'assets/background/sky_fase1.png');
        this.load.image('arvore1', 'assets/images/arvores/arvore1.png');

        this.load.spritesheet('hero', 'assets/images/mobs/playerFrente.png', { frameWidth: 78, frameHeight: 84 });

        this.load.image('logo', 'assets/images/logo.png');

        // this.load.audio('tema', ['assets/musics/Menu.wav']);
    }


    create() {

        const map = this.make.tilemap({
            key: 'map'
        });

        let foreground = map.addTilesetImage('ground', 'chaoBlocos');
        let backforeground = map.addTilesetImage('arvore1', 'arvore1');
        let middleground = map.addTilesetImage('montanhas', 'montanhas');
        let background = map.addTilesetImage('sky', 'ceu');

        map.createStaticLayer('background', background, 0, 0);
        map.createStaticLayer('middleground', middleground, 0, 0);
        map.createStaticLayer('backforeground', backforeground, 0, 0);
        map.createStaticLayer('foreground', foreground, 0, 0);
        
        var config = {
            key: 'mexendose',
            frames: this.anims.generateFrameNumbers('hero'),
            frameRate: 6,
            yoyo: true,
            repeat: -1
        };
    
        let anim = this.anims.create(config);
        let sprite = this.add.sprite(85, 375, 'hero');
        sprite.anims.play('mexendose');

        let logo = this.add.image(432, 200, 'logo');
        logo.setScale(0.13);

        let jogarBtn = this.add.image(320, 310, "btnJogar").setInteractive();
        jogarBtn.setScale(0.65);

        let ajudaBtn = this.add.image(535, 310, "btnAjuda").setInteractive();
        ajudaBtn.setScale(0.65);

        var music = this.sound.add('tema');

        // music.play();

        jogarBtn.on("pointerdown", function () {
            let btn = this;
            btn.setTexture("btnJogarPress");
            setTimeout(()=> {
                btn.setTexture("btnJogar");
                this.scene.scene.start('MenuFases');
            },150)
        });

        ajudaBtn.on("pointerdown", function () {
            let btn = this;
            btn.setTexture("btnAjudaPress");
            setTimeout(()=> {
                btn.setTexture("btnAjuda");
                this.scene.scene.start('MenuFases');
            },150)
        });

        
    }

    update() {

    }

}
export default MainMenu;