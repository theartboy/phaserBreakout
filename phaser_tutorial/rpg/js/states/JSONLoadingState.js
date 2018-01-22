var RPG = RPG || {};

RPG.JSONLoadingState = function(){
 'use strict';
 Phaser.State.call(this);
}
RPG.JSONLoadingState.prototype = Object.create(Phaser.State.prototype);
RPG.JSONLoadingState.prototype.constructor = RPG.JSONLoadingState;

//passing the level data into the init makes it accessible to the next state
RPG.JSONLoadingState.prototype.init = function(level_data){
 'use strict';
 this.level_data = level_data;
};
RPG.JSONLoadingState.prototype.create = function(){
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

};

RPG.JSONLoadingState.prototype.startGame = function(){
 'use strict';
 console.log("hi");
};
