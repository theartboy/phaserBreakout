//initiate the Phaser framework
var game = new Phaser.Game(640, 360, Phaser.AUTO);

var GameState = {
  preload: function() {
    this.load.image('background', 'assets/images/background.png');
    this.load.spritesheet('chicken', 'assets/images/chicken_spritesheet.png',131,200);
    this.load.spritesheet('horse', 'assets/images/horse_spritesheet.png',212,200);
    this.load.spritesheet('pig', 'assets/images/pig_spritesheet.png',297,200);
    this.load.spritesheet('sheep', 'assets/images/sheep_spritesheet.png',244,200);
    this.load.image('arrow', 'assets/images/arrow.png');
    this.load.audio('chickenSound', ['assets/audio/chicken.mp3','assets/audio/chicken.ogg']);
    this.load.audio('horseSound', ['assets/audio/horse.mp3','assets/audio/horse.ogg']);
    this.load.audio('pigSound', ['assets/audio/pig.mp3','assets/audio/pig.ogg']);
    this.load.audio('sheepSound', ['assets/audio/sheep.mp3','assets/audio/sheep.ogg']);
    this.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.fnt');
  },
  create: function() {
    //anchor point is default top arrowLeft
    //scaling and rotating is from the anchor point
    //rotation is in degrees
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;

    this.background = this.game.add.sprite(0,0,'background');

    // this.chicken = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY,'chicken');
    // this.chicken.anchor.setTo(0.5);
    // this.chicken.animations.add('walk', [0,1,2],6,true);

    var animalData = [
      //keys match the loaded graphic names in the preload
      {key: 'chicken', text: 'Chicken', audio: 'chickenSound'},
      {key: 'horse', text: 'Horse', audio: 'horseSound'},
      {key: 'pig', text: 'Pig', audio: 'pigSound'},
      {key: 'sheep', text: 'Sheep', audio: 'sheepSound'}
    ]
    //game.add.## is accessing the game factory to create objects

    this.animals = this.game.add.group();
    var self = this;
    var animal;

    animalData.forEach(function(element){
      //would be nice to use the following
      //the 'this' refers to the function instead of the context outside the function
      // this.animals.create(200,this.game.world.centerY, element.key);
      animal = self.animals.create(-1000, this.game.world.centerY, element.key, 0);//final number is starting frame
      animal.anchor.setTo(0.5);
      animal.inputEnabled = true;
      animal.input.pixelPerfectClick = true;
      animal.customParams = {text: element.text, sound: self.game.add.audio(element.audio)};
      animal.animations.add('walk', [0,1,2,1,0,1], 6, true);
      animal.events.onInputDown.add(self.animateAnimal, self);
      animal.events.onInputUp.add(self.stopAnimateAnimal, self);
      // animal.add.audio()
    });

    //groups have the next and previous methods
    this.currentAnimal = this.animals.next();
    this.currentAnimal.position.setTo(this.game.world.centerX, this.game.world.centerY);

    //customParams is a 'custom' parameter added to the object
    //it is not part of Phaser
    this.arrowLeft = this.game.add.sprite(20, this.game.world.centerY, 'arrow');
    this.arrowLeft.anchor.setTo(1,0.5);
    this.arrowLeft.scale.setTo(-1,1);
    this.arrowLeft.customParams = {direction: -1};
    this.arrowLeft.inputEnabled = true;
    this.arrowLeft.input.pixelPerfectClick = true;
    this.arrowLeft.events.onInputDown.add(this.switchAnimal, this);

    this.arrowRight = this.game.add.sprite(this.game.world.width - 20, this.game.world.centerY, 'arrow');
    this.arrowRight.anchor.setTo(1,0.5);
    this.arrowRight.scale.setTo(1,1);
    this.arrowRight.customParams = {direction: 1};
    this.arrowRight.inputEnabled = true;
    this.arrowRight.input.pixelPerfectClick = true;
    this.arrowRight.events.onInputDown.add(this.switchAnimal, this);

    this.animalName = this.add.bitmapText(this.game.world.centerX, this.game.world.height-70, 'font', this.currentAnimal.customParams.text, 48);
    this.animalName.anchor.setTo(0.5,0);

  },
  update: function() {
    // this.chicken.animations.play('walk');
    // this.animals.forEach(function(element){
    //   element.animations.play('walk');
    // });
    // this.animals.animations.play('walk');
  },
  switchAnimal: function(sprite, event){
    // var shrink = this.add.tween(sprite).to({x: sprite.x+10}, 500, Phaser.Easing.EaseIn, true);
    // var grow = this.add.tween(sprite).to({x: sprite.x-10}, 500, Phaser.Easing.EaseIn, true);
    // shrink.chain(grow);
    // shrink.start();
    if (this.isMoving){
      return false;
    }
    this.isMoving = true;
    this.animalName.visible = false;
    // console.log(sprite.customParams.direction);
    var nextAnimal, endX;
    if (sprite.customParams.direction == 1){
      //establish the next animal
      nextAnimal = this.animals.next();
      nextAnimal.x = -nextAnimal.width/2;
      endX = this.game.world.width + this.currentAnimal.width/2;
    } else {
      nextAnimal = this.animals.previous();
      nextAnimal.x = this.game.world.width + nextAnimal.width/2;
      endX = -this.currentAnimal.width/2;
    }

    var currentAnimalMove = this.game.add.tween(this.currentAnimal);
    currentAnimalMove.to({x:endX}, 500, Phaser.Easing.EaseOut);

    var newAnimalMove = this.game.add.tween(nextAnimal);
    newAnimalMove.to({x:this.game.world.centerX}, 500, Phaser.Easing.EaseOut);

    var fadeOutText = this.game.add.tween(this.animalName);
    fadeOutText.to({alpha:0},500, Phaser.Easing.EaseOut);
    var fadeInText = this.game.add.tween(this.animalName);
    fadeInText.to({alpha:100},500, Phaser.Easing.EaseOut);

    currentAnimalMove.onComplete.add(function(){
      newAnimalMove.start();
    });
    newAnimalMove.onComplete.add(function(){
      // fadeInText.start();
      this.animalName.visible = true;
      this.currentAnimal = nextAnimal;
      this.isMoving = false;
      this.animalName.text = this.currentAnimal.customParams.text;
    }, this);

    currentAnimalMove.start();
    // fadeOutText.start();

    //my way that doesn't stop continual moving
    // this.add.tween(this.currentAnimal).to( { x: endX }, 500, Phaser.Easing.EaseOut, true);
    // this.add.tween(nextAnimal).to( { x: this.game.world.centerX }, 500, Phaser.Easing.EaseOut, true);
    // this.currentAnimal = nextAnimal;

    // if (sprite.customParams.direction == 1){
    //   //establish the next animal
    //   nextAnimal = this.animals.next();
    //   //animate the currentAnimal off screen
    //   this.add.tween(this.currentAnimal).to( { x: this.game.world.width+this.currentAnimal.width/2 }, 500, Phaser.Easing.EaseOut, true);
    //   //prepare location of next animal
    //   nextAnimal.position.setTo(-nextAnimal.width/2, this.game.world.centerY);
    //   //update currentAnimal
    //   this.currentAnimal = nextAnimal;
    //   //animate in the NEW currentAnimal
    //   this.add.tween(this.currentAnimal).to( { x: this.game.world.centerX }, 500, Phaser.Easing.EaseOut, true);
    // } else {
    //   nextAnimal = this.animals.previous();
    //   this.add.tween(this.currentAnimal).to( { x: -1000 }, 500, Phaser.Easing.EaseOut, true);
    //   nextAnimal.position.setTo(1000, this.game.world.centerY);
    //   this.currentAnimal = nextAnimal;
    //   this.add.tween(this.currentAnimal).to( { x: this.game.world.centerX }, 500, Phaser.Easing.EaseOut, true);
    // }
  },
  animateAnimal: function(sprite, event){
    sprite.play('walk');
    sprite.customParams.sound.play();
  },
  stopAnimateAnimal: function(sprite, event){
    sprite.animations.stop();
  },


};



game.state.add('GameState', GameState);
game.state.start('GameState');
