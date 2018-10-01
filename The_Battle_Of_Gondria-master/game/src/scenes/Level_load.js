class Level_load extends Phaser.Scene {
    constructor() {
        super({
            key: 'Level_load'
        })
    }
    init(data) {
        this.name = data.scene;
    }
    preload() {
        this.load.image('load_escudo', 'assets/images/menus/escudo_load.png');
        this.switch();
    }
    create() {
        this.add.image(750, 400, 'load_escudo').setScale(0.05);
        let jogarBtn = this.add.image(432, 240, "btnJogar").setInteractive();
        jogarBtn.setScale(0.65);
        jogarBtn.setScrollFactor(0);
        jogarBtn.on('pointerdown', () => {
            this.scene.moveBelow(this, this.name);
            this.scene.stop(this);
            this.scene.launch(this.name);
        });

    }

    switch () {
        switch (this.name) {
            case 'Level_1':
                this.load.tilemapTiledJSON("map_fase_1", "assets/tilemap/map_fase_1.json");
                this.load.audio('music_1_1', 'assets/musics/music_level_1.mp3');
                this.load.audio('music_1_2', 'assets/musics/music_level_1_2.mp3');
                this.load.audio('slime_jump', 'assets/sounds/slime_jump.mp3');
                this.load.spritesheet('slime_verde', 'assets/images/mobs/slime_verde_walk.png', {
                    frameWidth: 18,
                    frameHeight: 21
                });

                this.load.spritesheet('slime_azul', 'assets/images/mobs/slime_azul_walk.png', {
                    frameWidth: 18,
                    frameHeight: 21
                });

                this.load.spritesheet('slime_vermelho', 'assets/images/mobs/slime_vermelho_walk.png', {
                    frameWidth: 18,
                    frameHeight: 21
                });
                this.load.spritesheet('slime_verde_hit', 'assets/images/mobs/slime_verde_hit.png', {
                    frameWidth: 16,
                    frameHeight: 12
                });

                this.load.spritesheet('slime_azul_hit', 'assets/images/mobs/slime_azul_hit.png', {
                    frameWidth: 16,
                    frameHeight: 12
                });

                this.load.spritesheet('slime_vermelho_hit', 'assets/images/mobs/slime_vermelho_hit.png', {
                    frameWidth: 16,
                    frameHeight: 12
                });
                this.load.on('complete',
                    () => {
                        let anims = this.anims;
                        //animacao pular esquerda
                        anims.create({
                            key: "slime_verde_jump_left",
                            frames: anims.generateFrameNumbers('slime_verde', {
                                start: 0,
                                end: 19
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_azul_jump_left",
                            frames: anims.generateFrameNumbers('slime_azul', {
                                start: 0,
                                end: 19
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_vermelho_jump_left",
                            frames: anims.generateFrameNumbers('slime_vermelho', {
                                start: 0,
                                end: 19
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        //animacoes andar pra direita
                        anims.create({
                            key: "slime_verde_jump_right",
                            frames: anims.generateFrameNumbers('slime_verde', {
                                start: 20,
                                end: 39
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_azul_jump_right",
                            frames: anims.generateFrameNumbers('slime_azul', {
                                start: 20,
                                end: 39
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_vermelho_jump_right",
                            frames: anims.generateFrameNumbers('slime_vermelho', {
                                start: 20,
                                end: 39
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        //anims hit esquerda
                        anims.create({
                            key: "slime_verde_hit_left",
                            frames: anims.generateFrameNumbers('slime_verde_hit', {
                                start: 0,
                                end: 6
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_azul_hit_left",
                            frames: anims.generateFrameNumbers('slime_azul_hit', {
                                start: 0,
                                end: 6
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_vermelho_hit_left",
                            frames: anims.generateFrameNumbers('slime_vermelho_hit', {
                                start: 0,
                                end: 6
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        //anims hit direita
                        anims.create({
                            key: "slime_verde_hit_right",
                            frames: anims.generateFrameNumbers('slime_verde_hit', {
                                start: 7,
                                end: 13
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_azul_hit_right",
                            frames: anims.generateFrameNumbers('slime_azul_hit', {
                                start: 7,
                                end: 13
                            }),
                            frameRate: 15,
                            repeat: -1
                        });
                        anims.create({
                            key: "slime_vermelho_hit_right",
                            frames: anims.generateFrameNumbers('slime_vermelho_hit', {
                                start: 7,
                                end: 13
                            }),
                            frameRate: 15,
                            repeat: -1
                        });

                        anims.create({
                            key: 'dieEffect',
                            frames: anims.generateFrameNumbers('inimigoDie', {
                                start: 0,
                                end: 8
                            }),
                            frameRate: 10,
                        });
                    }
                )
                break;
            case 'Level_2':
                this.load.spritesheet('goblin', 'assets/images/mobs/goblin.png', {
                    frameWidth: 63,
                    frameHeight: 63
                });
                /*Faz load dos arquivos usados na cena Level_2 e outras cenas  */
                this.load.tilemapTiledJSON('map_fase_2', 'assets/tilemap/map_fase_2.json');
                this.load.image('fase_2_tileset', 'assets/tilesets/fase_2_tileset.png');
                this.load.image('fase_2_sky', 'assets/background/fase_2_sky.png');
                this.load.image('fase_2_montanhas', 'assets/background/fase_2_montanhas.png');
                this.load.audio('music_2', 'assets/musics/music_level_2.mp3');
                this.load.audio('goblin_jump', 'assets/sounds/goblin_jump.wav');
            default:
                break;
        }
    }
}
export default Level_load;