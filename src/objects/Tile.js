import Phaser from 'phaser';
import { SIZES } from '../constants.js';

export class Tile extends Phaser.GameObjects.Container {
    constructor(config) {
        const { scene, x, y, row } = config;
        
        super(scene, x, y);
        
        this.row = row;
        // this.status = 0;// 
        
        this.render();
        this.initText();
    }
    
    render() {
        const spr = new Phaser.GameObjects.Sprite(this.scene, 0, 0, 'tile', 0);
        spr.setOrigin(0);
        this.spr = spr;
        this.add(spr);
    }
    
    initText() {
        const tileText = new Phaser.GameObjects.Text(this.scene, SIZES.TILE_WIDTH / 4, 0, '', {
            fontSize: `64px`,
            fontStyle: 'bold',
            fontFamily: '"Courier New", monospace',
            // fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
            color: '#000'
        });
        tileText.setStroke('#fff', 4);
        tileText.setOrigin(0);
        
        this.char = tileText;
        this.add(tileText);
    }
}