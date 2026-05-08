import Phaser from 'phaser';
import { COUNTS } from '../constants.js';
import { SIZES } from '../constants.js';
import { generate } from 'random-words';
import { Board } from '../objects/Board';

export class MainGame extends Phaser.Scene {
    constructor() {
        super('MainGame');
    }
    
    create() {
        const word = generate({ minLength: 5, maxLength: 5 });
        
        const boardSize = {
            w: SIZES.TILE_WIDTH * COUNTS.COLS,
            h: SIZES.TILE_HEIGHT * COUNTS.ROWS
        };
        
        const boardPos = {
            x: (this.scale.width - boardSize.w) / 2,
            y: (this.scale.height - boardSize.h) / 2
        };
        
        
        // console.log(`[DEV] w: ${boardSize.w}, h: ${boardSize.h}`)
        // console.log(`[DEV] x: ${boardPos.x}, y: ${boardPos.y}`)
        
        const board = new Board({
            scene: this, 
            x: boardPos.x,
            y: boardPos.y,
            w: boardSize.w,
            h: boardSize.h,
            word: word
        });
        
        board.setScale(0);
        this.tweens.add({
            targets: board,
            scale: 1,
            duration: 800,
            ease: 'Back.easeOut'
        });
    }
    
    update() {
        
    }
}