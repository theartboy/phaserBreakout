//rpg gmae
//establish namespace
var RPG = RPG || {};

var game = new Phaser.Game(640, 480, Phaser.AUTO);

game.state.add('BootState', new RPG.BootState());
game.state.add('JSONLoadingState', new RPG.JSONLoadingState());
game.state.add('LoadingState', new RPG.LoadingState());
game.state.add('TitleState', new RPG.TitleState());

game.state.start('BootState',true, false, "assets/levels/title_screen.json");
