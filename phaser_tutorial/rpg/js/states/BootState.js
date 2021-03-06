var RPG = RPG || {};

RPG.BootState = function(){
  "use strict";
  Phaser.State.call(this);
}
RPG.BootState.prototype = Object.create(Phaser.State.prototype);
RPG.BootState.prototype.constructor = RPG.BootState;

RPG.BootState.prototype.init = function(level_file){
  "use strict";
  this.level_file = level_file
  this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
  this.scale.pageAlignHorizontally = true;
  this.scale.pageAlignVertically = true;
};

RPG.BootState.prototype.preload = function(){
  "use strict";
  this.load.text("level_file", this.level_file);
};

RPG.BootState.prototype.create = function(){
  "use strict";
  var level_data = JSON.parse(this.game.cache.getText('level_file'));
  // console.log(level_data);
  this.game.state.start("LoadingState",true,false,level_data);
};
