class Scene1_level1 extends Phaser.Scene{
    
    constructor(test) {
        super({
            key: 'Scene1_level1'
        });
    }

    preload(){
        this.load.image('btnVoltar' , 'assets/images/botoes/btnVoltar.png');
        this.load.image('btnVoltarPress', 'assets/images/botoes/btnVoltarPress.png');
        this.load.image("tileset", "assets/tilesets/fase1_tileset.png");
        this.load.image('ceu', 'assets/background/sky_fase1.png');
        this.load.image('montanhas','assets/background/background_1.png');
        this.load.image('ponte','assets/images/ponte.png');
        this.load.tilemapTiledJSON("map", "assets/tilemap/map_1.json");
        this.load.spritesheet('dude', 
             'assets/images/dude.png',
             { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('slime_verde','assets/images/mobs/slime/andar/verde_esquerdo.png',
    {frameWidth:18, frameHeight:21});
    this.load.spritesheet('slime_azul','assets/images/mobs/slime/andar/azul_esquerdo.png',
    {frameWidth:18, frameHeight:21});
    this.load.spritesheet('slime_vermelho','assets/images/mobs/slime/andar/vermelho_esquerdo.png',
    {frameWidth:18, frameHeight:21});
        
    
    }
    create(){
        const map = this.make.tilemap({key:"map"});
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const ponte = map.addTilesetImage("ponte","ponte")
        const blocos = map.addTilesetImage("blocos", "tileset");
        const background = map.addTilesetImage('ceu','ceu');
        const midground = map.addTilesetImage('montanhas','montanhas')
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        map.createDynamicLayer('background', background,0,0);
        map.createDynamicLayer('midground',midground,0,0);
        this.layer2= map.createStaticLayer("foreground_2",blocos,0,0);
        this.ponte = map.createDynamicLayer("ponte_up",ponte,0,0);
        this.layer1 = map.createDynamicLayer("foreground_1", blocos, 0, 0);
        this.layer1.setCollisionBetween(1, 6);
        this.layer2.setCollisionBetween(1,6);
        this.ponte.setCollisionBetween(0,3);
        console.log(this.ponte);
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
    let player = this.physics.add.sprite(20,350,'dude');
    
    player.setBounce(0.1);
    
    player.setCollideWorldBounds(false);
    this.physics.add.collider(player, this.layer1);
    this.physics.add.collider(player, this.ponte);
    this.c_layer2= this.physics.add.collider(player, this.layer2);
    // set workd bounds to allow camera to follow the player
    this.cameras.main.setBounds(0, 0, 6048, 480);
    this.c_layer2.active=false;
    
    // making the camera follow the player
    this.player = player;
    this.cameras.main.startFollow(this.player);
    let spawnLayer= map.getObjectLayer("spawns");
    this.spawns = spawnLayer.objects;
    this.slimes_verde = this.physics.add.group();
    this.slimes_azul = this.physics.add.group();
    this.slimes_vermelho = this.physics.add.group();
    console.log(this.spawns);
    for(let i =0 ; i<this.spawns.length;i++){
        if(this.spawns[i].name==="Spawn_Slime_Verde"){
           let slime = this.slimes_verde.create(this.spawns[i].x,this.spawns[i].y,'slime_verde');
        //    slime.setScale(1.5);
        }
        if(this.spawns[i].name==="Spawn_Slime_Azul"){
            let slime = this.slimes_azul.create(this.spawns[i].x,this.spawns[i].y,'slime_azul');
            // slime.setScale(1.7);
        }
        if(this.spawns[i].name==="Spawn_Slime_Vermelho"){
            let slime = this.slimes_vermelho.create(this.spawns[i].x,this.spawns[i].y,'slime_vermelho');
            // slime.setScale(2.0);
        }
    }
    
    this.physics.add.collider(this.slimes_verde,this.layer1);
    this.physics.add.collider(this.slimes_azul,this.layer1);
    this.physics.add.collider(this.slimes_vermelho,this.layer1);
}
update() {
    let cursors = this.input.keyboard.createCursorKeys();
    if(!this.player.body.onFloor()&&this.player.body.velocity.y>0){
        this.c_layer2.active=true;
    }else{
        this.c_layer2.active=false;
    }
    if(cursors.left.isDown&&this.player.x-16>0){
        this.player.setVelocityX(-160);
        // this.player.anims.play('left',true);
    }else if(cursors.right.isDown){
        this.player.setVelocityX(160);
        // this.player.anims.play('right',true);
    }else{
        // this.player.anims.play('turn',true);
        this.player.setVelocityX(0);
    }
    if ( cursors.up.isDown &&this.player.body.onFloor()){
            

                this.player.setVelocityY(-230);
            
        }
    }
}
export default Scene1_level1;