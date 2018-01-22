float score, highScore;
String  gameState;

Critter critter;
Wall [] walls;

boolean mp = false;

Stripe stripe;

TimeInfo timer;
float adjFPS;

void setup(){
	size(480,720);
	// frameRate(120);
	noStroke();
	critter = new Critter();

	walls = new Wall[10];

	stripe = new Stripe();

	for (int i = 0; i<walls.length; i+=2){
		float yp = random(200,height-100);
		float yp2 = yp-1100;
		float xp = width+20+i*100;
		walls[i] = new Wall(xp, yp, color(0,255,0));
		walls[i+1] = new Wall(xp, yp2, color(i*30,0,255));
		// println("yp "+yp+"   yp2 "+yp2);
	}

	gameState="LOADGAME";

	score = 0;
	highScore = 0;

	timer = new TimeInfo(60);
	adjFPS = 1;
	
}

void draw(){
	timer.timeCorrection();
	adjFPS = timer.coeff;
	// println("fps: "+timer.fps+"  ");
	if (gameState=="LOADGAME"){
		loadGame();

	}else if (gameState=="STARTGAME"){
		startGame();

	}else if (gameState=="PLAYGAME"){
		playGame();

	}else if (gameState=="WIN"){
		win();

	}else if (gameState=="LOSE"){
		lose();

	}else {
		println("Something went wrong with gameState");
	}
	String s = "FPS: "+int(timer.fps);
	fill(255);
	text (s,20,height-30 );
}
void loadGame(){
	gameState="STARTGAME";
}

void startGame(){
	clearBackground();
	fill(255);
	String s = "Click to Play";
	text(s, width/2-50,height/2);
	updateUI();
	if (mousePressed){
		critter.reset();
		for (int i = 0; i<walls.length; i+=2){
			float yp = random(200,height-100);
			float yp2 = yp-1100;
			walls[i].y=yp;
			walls[i+1].y=yp2;
		}
		for (int i = 0; i<walls.length; i++){
			walls[i].reset();
		}
		score = 0;
		gameState = "PLAYGAME";		
	}
}
void playGame(){
	clearBackground();
	//timer.timeCorrection();
	//float fix = timer.coeff;
	// println("fps: "+timer.fps+"  ");
	stripe.update(adjFPS);
	moveObjects();
	checkCollisions();
	displayObjects();
	updateUI();
}
void clearBackground(){
	fill(50);
	rect(0,0,width,height);
	// stripe.update();
	stripe.display();
}
void mouseReleased(){
	mp = false;
}
void moveObjects(){
	if(mousePressed && !mp){
		critter.accelerate();
		mp = true;
	}
	critter.update(adjFPS);
	for (int i = 0; i<walls.length; i++){
		walls[i].update(adjFPS);
		if (walls[i].x<width/2-critter.w/2 && walls[i].scorable==true){
			walls[i].scorable = false;
			score +=0.5;
		}
	}
}
void checkCollisions(){
	for (int i = 0; i<walls.length; i++){
		if((critter.x<walls[i].x+walls[i].w) && (critter.x+critter.w > walls[i].x)){
			if((critter.y+critter.h>walls[i].y) && (critter.y<walls[i].y+walls[i].h)){
				gameState="LOSE";
			}
		}
	}
	if (critter.y+critter.h >= height){
		gameState = "LOSE";
	}
}
void displayObjects(){
	critter.display();
	for (int i = 0; i<walls.length; i++){
		walls[i].display();
	}
}
void updateUI(){
	fill(255);
	String s = "Score: "+int(score);
	String s2 = "High Score: "+int(highScore);
	text(s, 20, 40);
	text(s2, 20, 20);
}
void win(){

}
void lose(){
	clearBackground();
	updateUI();
	String s = "Again?";
	text(s, width/2-40,height/2);
	if(mousePressed){
		gameState="LOADGAME";
		if (score > highScore){
			highScore = score;
		}
	}
}
class Stripe{
	float x,y,w,h,speedX;
	color c;
	Stripe(){
		x=-510;
		y=0;
		w=10;
		h=height;
		speedX=1;
	}
	void update(float coef){
		x+=speedX*coef;
		// if(x<-510){x=-10;}
		if(x>-10){x=-510;}
	}
	void display(){
		pushMatrix();
		translate(x,y);
		for (int i = 0; i<100; i++){
			if(i%2==0){
				c=color(100,100,200);
			}else{
				c=color(90,90,180);
			}
			fill(c);
			rect(i*10,0,w,h);
		}
		popMatrix();
	}
}
class Wall{
	float x,y,w,h;
	float speedX;
	float startX;
	color c;
	boolean scorable;

	Wall(float xPos, float yPos, color cCol){
		x = xPos;
		startX = xPos;
		y = yPos;
		w = 20;
		h = 900;
		speedX = -5;
		c = cCol;
		scorable = true;
	}
	void update(float coef){
		x += speedX*coef;
		if (x< -100){
			//switch to 2d array to allow for changing and shrinking during repeats
			x=100*9;
			scorable = true;
			//y = random(100,height-100);
		}
	}
	void display(){
		fill(c);
		rect(x,y,w,h);
	}
	void reset(){
		x = startX;
		scorable = true;
		//y = random(100,height-100);
	}
}
class Critter{
	float x,y,w,h;
	float gravity,speedX,speedY, rot;

	Critter(){
		x = width/2;
		y = height/2;
		w = 20;
		h = 20;

		gravity = .8;
		speedX = 0;
		speedY = 0;
		rot = 0;
	}
	void update(float coef){
		if (y>height-h){
			speedY=0;
			y=height-h;
		}
		y += speedY*coef;
		if(speedY<20){
			speedY += gravity*coef;
		}
		if(y<0){
			y=0;
			speedY=0;
		}
	}
	void display(){
		pushMatrix();
		translate(x,y+h/2);
		rotate(radians(rot));
		fill(255,0,0);
		rect(0, 0, w, h);
		popMatrix();
		if (rot<0){
			rot+=1;
		}else{
			rot=1;
		}
	}
	void reset(){
		y=height/2;
		speedY=0;
	}
	void accelerate(){
		rot = -15;
		speedY=-8;
	}
}

class TimeInfo{
	int newTime;
	int oldTime;
	int elapsed;
	int goalFPS;
	float fps;
	int interCount;
	int totalFPS;
	float totalCoeff;
	float coeff;
	float avgFPS;
	float avgCoeff;

	TimeInfo(int tempGoalFPS){
		newTime=millis();
		oldTime=0;
		elapsed = newTime-oldTime;
		fps = 1000/elapsed;
		interCount = 0;
		totalFPS = 0;
		totalCoeff = 1;
		goalFPS = tempGoalFPS;
	}

	void timeCorrection(){
		oldTime = newTime;
		newTime = millis();
		elapsed = newTime-oldTime;
		fps = 1000/elapsed;
		interCount++;
		totalFPS += fps;
		coeff = goalFPS/fps;
		totalCoeff += coeff;
		avgFPS = totalFPS/interCount;
		avgCoeff = totalCoeff/interCount;
		// return coeff;
	}

}

