class Goblins {
    constructor(scene, camada1) {
        this.scene = scene;
        let spawns = this.scene.spawns;
        this.array = this.scene.physics.add.group();
        console.log('hey');
        for (let i = 0; i < spawns.length; i++) {
            if (spawns[i].name === "spawn_Goblin") {

                let goblin = this.array.create(spawns[i].x, spawns[i].y, 'goblin');
                goblin.setScale(0.75);
                goblin.lifes = 3;
                goblin.hittedPlayer = true;
                goblin.isHit = {
                    right: false,
                    left: false
                };
                goblin.isDead = false;
                goblin.canHit = true;

            }
        }
        this.scene.physics.add.collider(this.array, camada1);
        this.c_player = this.scene.physics.add.collider(this.array, this.scene.player.sprite, this.goblinHit, null, this.scene);
    }

    goblinHit(goblin, player) {
        goblin.hittedPlayer = true;
        this.colisao = true;
        player.setVelocityX(0);
        if (player.x - goblin.x <= 0) {
            goblin.setVelocityX(200);
        } else {
            goblin.setVelocityX(-200);
        }
        goblin.setVelocityY(-200);
        if (goblin.body.velocity.x <= 0) {
            player.setVelocityX(200);
        } else {
            player.setVelocityX(-200);
        }

        player.setVelocityY(-100);
        this.player.lifes -= 1;
        console.log(this.player.lifes + ' - player goblin hit');
        this.player.hit.play();
        player.setVelocityY(-150);
        this.player.hit.play();
    }

    update(player) {
        this.player = player;
        for (let i = 0; i < this.array.children.entries.length; i++) {
            let goblin = this.array.children.entries[i];

            if (goblin.lifes == 0) {
                goblin.destroy();
            } else if (goblin.y > 490) {
                goblin.destroy();
            } else if (player.y - goblin.y < 72 && player.y - goblin.y > -72 && this.scene.colisao == false) {
               /* if (goblin.body.touching.up) {
                    goblin.destroy();
                    player.setVelocityY(-100);
                } else*/ if (player.x - goblin.x < 200 && player.x - goblin.x > 0 && !goblin.isHit.right) {
                    goblin.setVelocityX(100);
                    if (player.y - goblin.y < -40) {
                        goblin.setVelocityY(-150);
                    }
                } else if (player.x - goblin.x > -200 && player.x - goblin.x < 0 && !goblin.isHit.left) {
                    goblin.setVelocityX(-100);
                    if (player.y - goblin.y < -40) {
                        goblin.setVelocityY(-150);
                    }
                } else if (!goblin.isHit.right && !goblin.isHit.left) {
                    goblin.setVelocityX(0);
                }
            } else if (!goblin.isHit.right && !goblin.isHit.left) {
                goblin.setVelocityX(0);
            }
            if (goblin.isHit.right) {
                setTimeout(() => goblin.isHit.right = false, 500);
            }
            if (goblin.isHit.left) {
                setTimeout(() => goblin.isHit.left = false, 500);
            }
        }
    }
}
export default Goblins;