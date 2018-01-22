var RPG = RPG || {};

RPG.LoadingState = function () {
    "use strict";
    Phaser.State.call(this);
};

RPG.LoadingState.prototype = Object.create(Phaser.State.prototype);
RPG.LoadingState.prototype.constructor = RPG.LoadingState;

//init grabs from game cache???
RPG.LoadingState.prototype.init = function (level_data) {
    "use strict";
    this.level_data = level_data;
    // console.log(this.level_data);
    var loading_message = this.game.add.text(this.game.world.centerX, this.game.world.centerY,
      "loading...", {font: "48px kells", fill: "#ffffff"});
    loading_message.anchor.setTo(0.5);
};

RPG.LoadingState.prototype.preload = function () {
    "use strict";
    // console.log(this.level_data);
    var assets = this.level_data.assets;
    for (var asset_key in assets) {
      var asset = assets[asset_key];
      // console.log(asset);
      //the following works if all assets are images
      // this.load.image(asset_key, asset.source);
      //use switch to load based on asset type
      switch (asset.type) {
        case "image":
          this.load.image(asset_key, asset.source);
          break;
        case "spritesheet":
          this.load.image(asset_key, asset.source, asset.frameWidth, asset.frameHeight, asset.frames, asset.margin, asset.spacing);
          break;
      }
    }
};

RPG.LoadingState.prototype.create = function () {
    "use strict";
    console.log('starting titleState');
    this.game.state.start('TitleState',true,false,this.level_data);
};
