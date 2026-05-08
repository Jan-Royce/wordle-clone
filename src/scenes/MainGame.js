import Phaser from 'phaser';

export class MainGame extends Phaser.Scene {
    constructor() {
        super('MainGame');
    }
    
    create() {
        this.add.text(400, 300, 'Hello', {
            fontSize: '64px',
            color: '#ffffff'
        }).setOrigin(0.5);
    }
    
    update() {
        
    }
}