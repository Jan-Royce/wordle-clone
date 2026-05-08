import Phaser from 'phaser';

export class Preloader extends Phaser.Scene {
    constructor() {
        super('Preloader');
    }
    
    preload() {
        this.load.setPath('assets/images');
        
        this.load.spritesheet('tile', 'squares-single.png', { frameWidth: 90, frameHeight: 94 });
    }
    
    create() {
        this.scene.start('MainGame');
    }
}