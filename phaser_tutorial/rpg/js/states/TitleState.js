 var RPG = RPG || {};

RPG.TitleState = function(){
  'use strict';
  Phaser.State.call(this);
}
RPG.TitleState.prototype = Object.create(Phaser.State.prototype);
RPG.TitleState.prototype.constructor = RPG.TitleState;


// RPG.TitleState.prototype.init = function(){
//   'use strict';
//   this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
//   this.scale.pageAlignHorizontally = true;
//   this.scale.pageAlignVertically = true;
// };
// RPG.TitleState.prototype.preload = function(){
//   'use strict';
//   this.load.image('background_image', 'assets/images/battle/background.png');
//   this.load.spritesheet('click', 'assets/images/battle/bat.png', 121, 89);
// };
//passing the level data into the init makes it accessible to the next state
RPG.TitleState.prototype.init = function(level_data){
  'use strict';
  this.level_data = level_data;
  // console.log(this.level_data.sprites.background);
};
RPG.TitleState.prototype.create = function(){
  'use strict';
  this.groups = {};
  this.level_data.groups.forEach(function(group_name){
    this.groups.[group_name] = this.game.add.group();
    },this
  );//end forEach
  this.sprites  = {};
  for (var sprite_name in this.level_data.sprites){
    var sprite_data = this.level_data.sprites[sprite_name];
    //sprite_name is the object declaration in the sprites array in the json file
    // console.log(sprite_data);
    switch(sprite_data.type){
      case "sprite":
        var sprite = this.game.add.sprite(
          sprite_data.position.x,
          sprite_data.position.y,
          sprite_data.texture
        );
        break;
        case "text":
          var sprite = this.game.add.text(
            sprite_data.position.x,
            sprite_data.position.y,
            sprite_data.text,
            sprite_data.style,
          );
          sprite.anchor.setTo(sprite_data.anchor);
          break;
    }//end switch
    this.sprites[sprite_name] = sprite;
    this.groups[sprite_data.group].add(sprite);
  }//end for in loop which is looping through each sprite

  //the following loads the item but does not allow for groups effectively
  // var background = this.game.add.sprite(
  //   this.level_data.sprites.background.position.x,
  //   this.level_data.sprites.background.position.y,
  //   this.level_data.sprites.background.texture);
  // //
};

RPG.TitleState.prototype.startGame = function(){
  'use strict';
  console.log("hi");
};

// prior method to define state using single object method
// var RPG.State = function() {
//   init: function(){
//
//   },
//   preload: function(){
//
//   },
//   create: function(){
//
//   }
// };

// new method creates object and corresponding methods for the Object
// var RPG.State = function(){};
//
// RPG.State.prototype.init = function(){
//
// }
// RPG.State.prototype.preload = function(){
//
// }
// RPG.State.prototype.create = function(){
//
// }
//to separate content from code, use a level file to contain the level data
//level file -- boot state -- loading state -- level state


// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
// Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
