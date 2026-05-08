import Phaser from 'phaser';
import { SIZES, COUNTS, TILE_STATE } from '../constants.js';
import { Row } from './Row.js';

export class Board extends Phaser.GameObjects.Container
{
    constructor(config) {
        const { scene, x, y, w, h, word } = config;
        
        super(scene, x, y);
        
        this.w = w;
        this.h = h;
        this.word = word;
        this.rows = [];
        this.activeRow = 0;
        
        // console.log(`[DEV] Word: ${word}`)
        
        this.render();
        this.addListeners();
        
        this.scene.add.existing(this);
    }
    
    render() {
        for(let i=0; i<COUNTS.ROWS; i++) {
            const row = new Row({
                scene: this.scene,
                x: 0,
                y: SIZES.TILE_HEIGHT * i,
                board: this
            });
            
            this.add(row);
            this.rows.push(row);
        }
    }
    
    addListeners() {
        // TODO check tile index bugs
        this.scene.input.keyboard.on('keydown', (e) => {
            let key = e.key.toLowerCase();
            // console.log(`[DEV] key: ${key}`)
            
            if(e.repeat) return;
            
            const row = this.rows[this.activeRow];
            let tile = row.tiles[row.activeTile];
            
            // console.log(`[DEV] active tile index: ${row.activeTile}`)
            
            if (/^[a-z]$/.test(key) && !e.altKey && !e.ctrlKey) {
                if(row.activeTile > COUNTS.COLS - 1) return;
                
                tile.char.setText(key);
                
                row.activeTile++;
                // if (row.activeTile >= COUNTS.COLS) row.activeTile = COUNTS.COLS - 1;
            } else if(key == 'backspace') {
                if(row.activeTile > COUNTS.COLS - 1) {
                    row.activeTile--;
                    tile = row.tiles[row.activeTile];
                }
                
                tile.char.setText('');
            
                row.activeTile--;

                if(row.activeTile < 0) row.activeTile = 0;
            } else if(key == 'enter') {
                let guess = row.getText();
                
                if(guess.length < COUNTS.COLS) {
                    alert("Not enough letters!");
                    return;
                }
                
                this.checkGuess(row, guess);
                this.activeRow++;
            }
        });
    }
    
    checkGuess(row, guess) {
        // TODO check if word actually exists
        // TODO consider occurence count of each letter when matching
        
        // console.log(`[DEV] ${guess} vs ${this.word}`)
        let matches = 0;
        
        for(let i=0; i<guess.length; i++) {
            // console.log(`[DEV] ${guess[i]}`)
            
            if(this.word.includes(guess[i])) {
                if(guess[i] == this.word[i]) {
                    row.tiles[i].spr.setFrame(TILE_STATE.MATCH);
                    matches++;
                } else {
                    row.tiles[i].spr.setFrame(TILE_STATE.MISMATCH);
                }
            } else {
                row.tiles[i].spr.setFrame(TILE_STATE.NO_MATCH);
            }
        }
        
        // TODO check win/lose - show correct word if loss
        if(matches == COUNTS.COLS) {
            alert("YOU WIN!");
        } else if(this.activeRow > COUNTS.ROWS) {
            alert(`YOU LOSE! The word is ${this.word}`);
        }
    }
}