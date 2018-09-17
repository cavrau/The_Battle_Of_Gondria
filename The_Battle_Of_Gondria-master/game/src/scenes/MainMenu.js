class MainMenu extends Phaser.Scene {

    constructor() {
        super({ key: "MainMenu" });
    }


    preload() {
        this.load.image('btnJogar', 'assets/images/botoes/btnJogar.png');
        this.load.image('btnJogarPress', 'assets/images/botoes/btnJogarPress.png');

        this.load.image('btnAjuda', 'assets/images/botoes/btnAjuda.png');
        this.load.image('btnAjudaPress', 'assets/images/botoes/btnAjudaPress.png');

        this.load.tilemapTiledJSON("map_mainMenu", "assets/tilemap/map_mainMenu.json");

        this.load.image("chaoBlocos", "assets/tilesets/fase_1_tileset.png");
        this.load.image('montanhas', 'assets/background/fase_1_montanhas.png');
        this.load.image('ceu', 'assets/background/fase_1_sky.png');
        this.load.image('arvore1', 'assets/images/arvores/arvore1.png');

        this.load.spritesheet({ 
            key: 'hero', 
            url: 'assets/images/mobs/heroi.png', 
            frameConfig: { 
                frameWidth: 60, 
                frameHeight: 84
            }
        });

        this.load.image('logo', 'assets/images/logo.png');

        this.load.audio('menusMusic', 'assets/musics/scenesMusics/menuMusic.mp3');
    }


    create() {

        const map = this.make.tilemap({
            key: 'map_mainMenu'
        });

        let foreground = map.addTilesetImage('ground', 'chaoBlocos');
        let backforeground = map.addTilesetImage('arvore1', 'arvore1');
        let middleground = map.addTilesetImage('montanhas', 'montanhas');
        let background = map.addTilesetImage('sky', 'ceu');

        map.createStaticLayer('background', background, 0, 0);
        map.createStaticLayer('middleground', middleground, 0, 0);
        map.createStaticLayer('backforeground', backforeground, 0, 0);
        map.createStaticLayer('foreground', foreground, 0, 0);

        let config = {
            key: 'move',
            frames: this.anims.generateFrameNumbers('hero', { start: 4, end: 5 }),
            frameRate: 6,
            repeat: -1
        };

        this.anims.create(config);
        let hero = this.add.sprite(85, 375, 'hero');
        hero.anims.play('move');

        let logo = this.add.image(432, 200, 'logo');
        logo.setScale(0.13);

        let jogarBtn = this.add.image(320, 310, "btnJogar").setInteractive();
        jogarBtn.setScale(0.65);

        let ajudaBtn = this.add.image(535, 310, "btnAjuda").setInteractive();
        ajudaBtn.setScale(0.65);

        var music = this.sound.add('menusMusic');

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
                this.scene.scene.start('AjudaScene');
            },150)
        });
        
    }

}
export default MainMenu;