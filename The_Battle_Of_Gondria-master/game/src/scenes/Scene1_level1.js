class Scene1_level1 extends Phaser.Scene{
    
    constructor(test) {
        super({
            key: 'Scene1_level1'
        });
    }

    preload(){
        
        this.load.image("tileset", "assets/tilesets/fase1_tileset.png");
        this.load.image('ceu', 'assets/background/sky_fase1.png');
        this.load.image('montanhas','assets/background/background_1.png');
        this.load.tilemapTiledJSON("map", "assets/tilemap/map_1.json");
        // this.load.spritesheet('dude', 
        //     'assets/dude.png',
        //     { frameWidth: 32, frameHeight: 48 });
    
    }
    create(){
        const map = this.make.tilemap({key:"map"});
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const blocos = map.addTilesetImage("blocos", "tileset");
        const background = map.addTilesetImage('ceu','ceu');
        const midground = map.addTilesetImage('montanhas','montanhas')
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        map.createStaticLayer('background', background,0,0);
        map.createStaticLayer('midground',midground,0,0);
        let layer2= map.createStaticLayer("foreground_2",blocos,0,0);
        let layer1 = map.createStaticLayer("foreground_1", blocos, 0, 0);
        layer1.setCollisionBetween(2, 4);
  
    //    const debugGraphics = this.add.graphics().setAlpha(0.75);
    //     layer1.renderDebug(debugGraphics, {
    //     tileColor: null, // Color of non-colliding tiles
    //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
    //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    //   });
    }

}
export default Scene1_level1;