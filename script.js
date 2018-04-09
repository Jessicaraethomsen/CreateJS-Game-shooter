var rect, bullet, score, gunCoord, target, w, h; // global variables
var fired = false;
var bulletcoordX,bulletcoordY;


	
function init(){
	"use strict";
	stage = new createjs.Stage("demoCanvas");
	h= demoCanvas.height;// canvas height	
	w= demoCanvas.width; // canvas width
	
	//Testing
	console.log(h);
	console.log(w);
	
	//my gun functions
	drawGun();
	
	//my target functions
	drawTarget();
	moveTarget();
	
	//score function
	addScore();
	//if any keyboard key is press an eventhandler for window if any key is pressed.
	
	window.onkeydown = onKey;
	createjs.Ticker.on("tick", tick); // the main listener
				

}
	
	function tick(event) {
			"use strict";
	gunCoord = rect.localToGlobal(w / 2, h - 15); //ALWAYS TRACING THE X POSITION OF THE GUN
	//win();
	stage.update(event);
}

function drawTarget(){
	"use strict";
		target = new createjs.Shape();
	    target.graphics.beginFill("#FF56DE").drawRect(0, 0, 35, 10);

		target.alpha = 1;
		targetcoordX = target.x;
		targetcoordY = target.y;

		stage.addChild(target);  
		console.log('Shape create: target');
		

}
	
function moveTarget(){
	"use strict";
 	createjs.Tween.get(target,{loop:true}) //make a loop...
	.to({x: w- 30 }, 4000)  //you need to make this scalable
	.to({x: 0}, 4000);
	 
	}
		
//**************THE GUN**********//	
	
	
function drawGun(){
	"use strict";
		rect = new createjs.Shape();
	    rect.graphics.beginFill("#fff").drawRect(0, 0, 15, 30);
		rect.x = w /2 -15;
		rect.y = h - 30;
		stage.addChild(rect);  
		console.log('Shape create: rect');		
}	
		
	
function operateGun(event){
	"use strict";
	bullet = new createjs.Shape();
	fired = true;
	bullet.graphics.beginFill("#fff").drawCircle(0, 0, 5);  
   
	bullet.x = rect.x + 7;  
    bullet.y = rect.y - 5, 5, 5;   
	
	bulletcoordX = bullet.x;
	bulletcoordY = bullet.y;
	bulletcoordX=gunCoord.x; //THE X VALUE OF THE BULLET

	createjs.Tween.get(bullet,{loop:false}).to({ y: -300 }, 1000);
	 
	createjs.Sound.on("fileload", laserSound); ///call function hanle calls the sound
	createjs.Sound.registerSound('laser.mp3','laser');
	
 	createjs.Ticker.on("tick", hitTest);

    stage.addChild(bullet);
	
	 
}

		
function hitTest(event){
			//var pt = objA.localToLocal(posX, posY, objB);
			//pt.x= targets x
			//pt.y= bullet y
	"use strict";
	var pt = bullet.localToLocal(bulletcoordX,400, target); //the bullet is x and the 300 is the y coordianates and then compares the target)
	console.log(pt.y, pt.y); //PT.X IS THE TARGET & PT.Y = BULLET.Y
	if (target.hitTest(pt.x, pt.y)){
		stage.removeChild(bullet);
		target.alpha = 0.1;
		score.value++;
		score.text = score.value;
		event.remove();
	}
	
	if(pt.y<=10){
		fired = false;
		target.alpha = 1;
		stage.removechild(bullet);
		event.remove();
	}
	
	stage.update(event);
	
}

//**************THE KEY MOVEMENT**********//	
function onKey(e){
	"use strict";
		switch(e.keyCode){
				
				case 37:  
				console.log('move-left');
				rect.x -= 10;
				break;
				
				case 39:
				console.log('move-right');
				rect.x += 10;
				break;
				
				case 32:    //spacebar
				if (fired === false) {operateGun()};
				
				laserSound();
				/*score.value++; 
				score.text = score.value;
				checkGame();
				*/
        		break; 	
		}
		
	}
	
//**************ADD SOUND**********//	
	
function laserSound(){
		"use strict";
		sound = createjs.Sound.play('laser');
	}

function winnerSound(){
		"use strict";
		sound = createjs.Sound.play('winner');
	}

		
//**************ADD SCORE**********//	
	
function addScore(){
	"use strict";
		score = new createjs.Text ("0", "20px Arial", "#fff"); //here we create a display with a 0
		score.x = w - 25;  //this is flexible... it will always be 50 pixels from the top
		score.y = h - h + 20;
		score.textBaseline = "alphabetic";
		score.value = 0;  //setting the value at 0.... so we start there
		stage.addChild(score); //then we are addign it to the stage
		
	}

	
//**************RESET & GAME OVER***********//
	function checkGame () {
		"use strict";
	if ( score.value === 5 ) {
		createjs.Sound.on("fileload", winnerSound); 
		createjs.Sound.registerSound('winner.mp3','winner')
		winnerSound();
		stage.removeChild(target);
		stage.removeChild(bullet);
		stage.removeChild(rect);
		var modal = document.getElementById('restart-dialog'),
	   	restartButton = document.getElementById('restart');
		modal.className = modal.className + ' is-visible';
		restartButton.onclick = function (e) {
		e.preventDefault();
 		modal.className = 'modal';
        score.value = 0; 
	    init();
		};
	}
}