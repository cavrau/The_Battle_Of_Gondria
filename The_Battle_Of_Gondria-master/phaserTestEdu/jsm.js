class teste extends Phaser.Scene {

  constructor() {
    super({ key: 'teste' })
  }
  init() {
    this.player;
  }

  preload() {

    this.load.image("blocos", "assets/blocos.png");
    this.load.tilemapTiledJSON("map", "assets/mapa.json");
    this.load.spritesheet('dude',
      'assets/dude.png',
      { frameWidth: 32, frameHeight: 48 });
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
    // Phaser's cache (i.e. the name you used in preload)
    const tileset = map.addTilesetImage("tilesetBlocos", "blocos");

    // Parameters: layer name (or index) from Tiled, tileset, x, y
    const layer1 = map.createStaticLayer("camada1", tileset, 0, 0);
    const layer2 = map.createStaticLayer("camada2", tileset, 0, 0);

    var index = [2, 3, 4];
    layer2.setTileIndexCallback(index, passaBloco, this);

    layer1.setCollisionBetween(2, 4);

    layer2.setCollisionBetween(2, 4);

    const debugGraphics = this.add.graphics().setAlpha(0.75);

    layer1.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

    layer2.renderDebug(debugGraphics, {
      tileColor: null, // Color of non-colliding tiles
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
    });

    
    
    let player = this.physics.add.sprite(20, 350, 'dude');

    player.setBounce(0.1);

    player.setCollideWorldBounds(true);

    this.player = player;

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 0, end: 3
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20
    });
    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 5, end: 8
      }),
      frameRate: 10,
      repeat: -1
    });
    this.physics.add.collider(player, layer1);
    this.physics.add.collider(player, layer2);

    function passaBloco(sprite, tile) {
      layer2.setCollision(false);
      
      // Return true to exit processing collision of this tile vs the sprite - in this case, it
      // doesn't matter since the coin tiles are not set to collide.
      return false;
    }

    let slime = this.physics.add.sprite(500, 350, 'slime');
    slime.setScale(0.1);
    slime.setBounce(0);
    slime.flipX;
    this.physics.add.collider(slime, layer1)
  };
  update() {

    let cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      this.player.setVelocityX(-160);
      this.player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      this.player.setVelocityX(160);
      this.player.anims.play('right', true);
    } else {
      this.player.anims.play('turn', true);
      this.player.setVelocityX(0);
    }
    if (cursors.up.isDown && this.player.body.onFloor()) {
      this.player.setVelocityY(-330);
    }
  }
}
var config = {
  type: Phaser.AUTO,
  width: 864,
  height: 480,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 400 }
    },
  },
  scene:
    teste

};

var game = new Phaser.Game(config);
