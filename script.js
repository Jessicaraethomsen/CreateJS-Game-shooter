
var rect, target, w, h;
var bullet;
var bulletcoordX,bulletcoordY;
var targetcoordX,targettcoordY;

	
function init(){
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
	//bulletcoord = bullet.localtoGlobal(w /2 -15);
	   
		stage.update(); 
						

	
			
		}

function drawTarget(){
		target = new createjs.Shape();
	    target.graphics.beginFill("#FF56DE").drawRect(0, 0, 35, 10);
		target.x = 0;   
		target.y = 0;
		
		target.alpha = 1;
		targetcoordX = target.x;
		targetcoordY = target.y;

		stage.addChild(target);  
		console.log('Shape create: target');
		

}
	
function moveTarget(){
 	createjs.Tween.get(target,{loop:true}) //make a loop...
	.to({x: w- 30 , y: 0 }, 4000)  //you need to make this scalable
	.to({x: 0, y: 0}, 4000)
	 
	}
		
//**************THE GUN**********//	
	
	
function drawGun(){
		rect = new createjs.Shape();
	    rect.graphics.beginFill("#fff").drawRect(0, 0, 15, 30);
		rect.x = w /2 -15;
		rect.y = h - 30;
		stage.addChild(rect);  
		console.log('Shape create: rect');		
}	
		
	
function operateGun(event){

	bullet = new createjs.Shape();
	bullet.graphics.beginFill("#fff").drawCircle(0, 0, 5);  
   
	bullet.x = rect.x + 7;  
    bullet.y = rect.y - 5, 5, 5;   
	
	bulletcoordX = bullet.x;
	bulletcoordY = bullet.y;

	createjs.Tween.get(bullet,{loop:false}).to({ y: -300 }, 1000);
	 
	
	createjs.Sound.on("fileload", laserSound); ///call function hanle calls the sound
	createjs.Sound.registerSound('laser.mp3','laser')
	
 	createjs.Ticker.on("tick", hitTest);

    stage.addChild(bullet);
	 
}

		
function hitTest(event){
			//var pt = objA.localToLocal(posX, posY, objB);
			//pt.x= targets x
			//pt.y= bullet y
	
			var pt = bullet.localToLocal(bulletcoordX, 300, target);	
			console.log("position of objB: ", pt.x, pt.y); 			
			if (target.hitTest(pt.x, pt.y)) { 
			
			target.alpha = 0.5;
			score.value++; 
			score.text = score.value;
			event.remove();
			checkGame();
			};
			
			//testing
			console.log ('TARGET', target);
			console.log ('bulletcordX', bulletcoordX);
			console.log ('bulletcordY', bulletcoordY);
			console.log ('pt.y', pt.y);
			console.log ('pt.x', pt.x);
	
}

//**************THE KEY MOVEMENT**********//	
function onKey(e){
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
				operateGun();
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
		
		sound = createjs.Sound.play('laser');
	}

function winnerSound(){
		
		sound = createjs.Sound.play('winner');
	}

		
//**************ADD SCORE**********//	
	
function addScore(){
		score = new createjs.Text ("0", "20px Arial", "#fff"); //here we create a display with a 0
		score.x = w - 25;  //this is flexible... it will always be 50 pixels from the top
		score.y = h - h + 20;
		score.textBaseline = "alphabetic";
		score.value = 0;  //setting the value at 0.... so we start there
		stage.addChild(score); //then we are addign it to the stage
		
	}

	
//**************RESET & GAME OVER***********//
	function checkGame () {
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
	
