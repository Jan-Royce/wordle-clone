import Phaser from 'phaser';
import { SIZES, COUNTS } from '../constants.js';
import { Tile } from './Tile.js';

export class Row extends Phaser.GameObjects.Container
{
    constructor(config) {
        const { scene, x, y, board } = config;

        super(scene, x, y);
        
        this.w = SIZES.TILE_WIDTH * COUNTS.COLS;
        this.h = SIZES.TILE_HEIGHT;
        this.board = board;
        this.tiles = [];
        this.activeTile = 0;
        
        this.render();
    }
    
    render() {
        for(let i=0; i<COUNTS.COLS; i++) {
            const tile = new Tile({
                scene: this.scene,
                x: SIZES.TILE_WIDTH * i,
                y: 0,
                row: this
            });
            
            this.add(tile);
            this.tiles.push(tile);
        }
    }
    
    getText() {
        let text = "";
        this.tiles.forEach((tile, i) => {
            text += tile.char.text;
        });
        
        return text;
    }
}