import Phaser from 'phaser';
import { Boot } from './scenes/Boot';
import { Preloader } from './scenes/Preloader';
import { MainGame } from './scenes/MainGame';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    scene: [ Boot, Preloader, MainGame ]
};

new Phaser.Game(config);