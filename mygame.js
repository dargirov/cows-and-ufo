// Creating  variables
var back=new Image, br=0;
var my=[], myX = 800, myY=[], myL=130, myH=93, myXc=[], myYc=[];
var clicked=[], h=0, ind=0, a=0, color=[], isCought=[], order = [];
var ufo=new Image, ufoX=288, ufoY=100, duX=0, duY=0, ufoL=180, ufoH=100, slowdownX=0, slowdownY=0, disappear=0, brDisappear=0;
var ray=new Image, raySc=0, drSc=0, pressed=0;
var scCought=0, cought=new Image, showCought=false;
var star =createArray(5,3), starX=createArray(5,3), starY=createArray(5,3);
var isFlying = createArray(5,3), isActive=createArray(5,3);
var coefs =createArray(5,3), coefc=createArray(5,3), myCoefs=0, myCoefc=0;
var dStar=createArray(5,3);
var boom=new Image, boomL=240, boomH=140, boomX, boomY;
var result = 0, lives = 3, level = 1, invert=1;
var timer=0;
var flyingCow = new Image, flyingCowX = 0, flyingCowY = 100, flyingCowL = 80, flyingCowH = 80, testX = 1, testY = 1;
var alreadyCollided = 0;
var deathTimer = 0;

var urlParams = new URLSearchParams(window.location.search);
var levelParam = urlParams.get('level');
if (levelParam === '2') {
    level = 2;
}

setInterval(function(){if(timer<60)timer++;}, 1000)

back.src="bkg.png";
ufo.src="ufo.png";
ray.src="ray.png";
cought.src="cowwalk1.gif";
boom.src="boom.png";

if(level === 2){
	duX=1; duY=1; result=100;
}

for (var i=0; i<5; i++)
{
	my[i] = new Image;
	for(var j=0;j<3;j++){
		star[i][j] = new Image;
		
		isActive[i][j]=0;
		isFlying[i][j]=0;
		dStar[i][j]=0;
		coefs[i][j]=0;
		coefc[i][j]=0;
	}
	
	star[i][0].src="greenStar.png";
	star[i][1].src="purpleStar.png";
	star[i][2].src="blueStar.png";
	myY[i] = 420;
	myX[i] = 800;
	clicked[i]=0;
	color[i]=0;
	isCought[i]=0;
	order[i]=i;
}

function getOrder(){
	var first = 0;
	for (var i=0; i<5; i++){
		if(order[i]===0){
			first = i;
			break;
		}
	}
	
	if(myXc[i]+myL <= 0 || myXc[i]>=800){
		for (var i=0; i<5; i++){
			if(i != first) order[i]--;
		}
		order[first]=4;
	}
	
	//for(var i=0; i<4; i++){
	//	for(var j=i+1; j<5; j++){
	//		if(myXc[i]!=undefined && myXc[i] > myXc[j] && MyXc[j]>0 && order[i]<order[j] ){
	//			var swap = order[i];
	//			order[i]=order[j];
	//			order[j]=swap;
	//		}
	//	}
	//}
}


function update()
{
	br++;
	brDisappear++;
	myX--;
	slowdownX++;
	slowdownY++;
	ufoX+=2*duX;
	ufoY+=2*duY;
	scCought+=0.01;
	if(scCought>1)scCought=1;
	deathTimer++;
	
	////getOrder();
	
	
	
	// flying cow mechanics
	flyingCowX+=testX;
	flyingCowY+=testY;
	if(flyingCowX<-20)testX=1;
	if(flyingCowX>800-flyingCowL+20) testX=-1;
	if(flyingCowY<0){
		testY=1;
		if (br%100>55){
		testY=2;
		testX=-1;
		}
	}
	if(flyingCowY>300)testY=-1;
	if(br%1000<2){
		testY=testY*-1;
		testX=testX*-2;
		}
	
	if(brDisappear>100){
		disappear=0;
	}
	
	if(level===1)
	{
		if(slowdownX>75 && duX!=0)
			duX=duX/Math.abs(duX);
		
		if(slowdownY>75 && duY!=0)
			duY=duY/Math.abs(duY);
	}
	
	if(pressed===0)raySc+=drSc;
	else raySc-=drSc/5;
	
	if(level === 2){
		var r=0;
		if(br%100<5)
		{
			r=Math.random();
			if(ufoX>=-20 && (r<=0.2 || r>=0.7))duX=1;
			if(r>0.2 && r<0.3)duX=0;
			if(ufoX<800-ufoL+20 && r>=0.4 && r<0.7) duX=-1;
			if(ufoY>0 && r<=0.4)duY=1;
			if(r>0.4 && r<0.6)duY=0;
			if(ufoY<300 && r>=0.6)duY=-1;
		}
		if(ufoX<-20)duX=1;
		if(ufoX>800-ufoL+20) duX=-1;
		if(ufoY<0)duY=1;
		if(ufoY>300)duY=-1;
	}else{
		if(ufoX<-20)ufoX=-20;
		if(ufoX>800-ufoL+20) ufoX=800-ufoL+20;
		if(ufoY<0)ufoY=0;
		if(ufoY>300)ufoY=300;
	}
	if(ufoY+ufoH/2+19.5*raySc>550)
		pressed=1;
	if(raySc<0)
	{
		pressed=0;
		raySc=0;
		drSc=0;
	}
	
	for (var i=0; i<5; i++)
		for (var j=0; j<3; j++)
			dStar[i][j]+=2;

	for (var i=0; i<5; i++){
		if(myY[i]<=420 && my[i]!=null && isCought[i]===0){
			if((br+i)%60<20){
				if(color[i]===0) my[i].src="cw1.png";
				else if(color[i]===1) my[i].src="_cw1.png";
				else if(color[i]===2) my[i].src="_cw1_.png";
			}else if((br+i)%60>=20 && (br+i)%60<40){
				if(color[i]===0) my[i].src="cw2.png"
				else if(color[i]===1) my[i].src="_cw2.png";
				else if(color[i]===2) my[i].src="_cw2_.png";
			}else {
				if(color[i]===0) my[i].src="cw3.png"
				else if(color[i]===1) my[i].src="_cw3.png";
				else if(color[i]===2) my[i].src="_cw3_.png";
			}
		}
	}

		if((br+i)%60<20){
			flyingCow.src = "fc1.png";
		}
		else if((br+i)%60>=20 && (br+i)%60<40){
			flyingCow.src = "fc4.png";
		}
		else if((br+i)%60>=20 && (br+i)%60<40){
			flyingCow.src = "fc8.png";
		}
		else {
			flyingCow.src = "fc10.png";
		}
		
	
	if(level===1 && Math.random()<0.07 && clicked[ind]===0){
		ind= Math.round(Math.random()*4)
		if(my[ind]===null){
			for(var i=0;i<5;i++)
				if(my[i]!=null){
					ind=i;
					break;
				}
		}
		if (alreadyCollided === 0)clicked[ind]=1;
		h=320-Math.random()*220;
	}else if(level===2 && drSc === 0 && Math.random()<0.01 && ufoY<250){
		drSc = 1;
	}
	
	for (var i=0; i<5; i++){
		if(clicked[i]===1 && my[i]!=null && isCought[i]===0){
			if(color[i]===0) my[i].src="cw2.png";	
			else if(color[i]===1)my[i].src="_cw2.png";	
			else if(color[i]===2) my[i].src="_cw2_.png";
			
			myY[i]=myY[i]-2;
			if(myY[i]<=h) clicked[i]=2;
		}
		
		if(clicked[i]===2 && myY[i]<420 && my[i]!=null && isCought[i]===0){
			if(color[i]===0) my[i].src="cw2.png";
			else if(color[i]===1) my[i].src="_cw2.png";
			else if(color[i]===2) my[i].src="_cw2_.png";
			
			myY[i]=myY[i]+3;
			if(myY[i]>=420){
				myY[i]=420;
				clicked[i]=0;
			}
		}
		
		if(my[i]!=null 
			&& myY[i]===420
			&& isCought[i]===0
			&& areColliding (
				myXc[i], 
				myYc[i],
				Math.abs(9*raySc-myL),
				10,
				ufoX+ufoL/2-9*raySc/2,
				ufoY+ufoH/2+19.5*raySc-myH, 
				Math.abs(9*raySc-myL),
				10)){
			if(color[i]===0)cought.src="cw2.png";
			else if(color[i]===1) cought.src="_cw2.png";
			else if(color[i]===2) cought.src="_cw2_.png";
			isCought[i]=1;
			if(color[i]===2){
				invert *=-1;
			}
			scCought=0;
			showCought = true;
			if(level===1)
				result += 10;
			else result-=10;
		}
		
		if(my[i]!=null
			&&myY[i]<400
			&& isCought[i]===0
			&& (alreadyCollided === 0 || level===2)
			&& areColliding (
				myXc[i]+55-myH*myCoefs/2-2*myL/5, 
				myYc[i]+myH*myCoefc/2-2*myH/5,
				4*myL/5,
				4*myH/5,
				ufoX+10, 
				ufoY-10,
				ufoL-20,
				ufoH-20)){
			isCought[i]=1;
			disappear=1;
			invert=1;
			brDisappear=0;
			boomX=ufoX+ufoL/2-boomL/2;
			boomY=ufoY+ufoH/2-boomH/2;
			if(level===1)alreadyCollided = 1;
			if(lives>0 && level===1)lives --;
			else result+=100;
		}
		
		if(myXc[i]+myL <= 0 ||myXc[i]>=800+myL){
			var r = Math.random();
			if(r<0.4)color[i]=0;
			else if(r<0.7) color[i]=1;
			else color[i]=2;
		}
		
		if(myXc[i]+myL <= 0 || myXc[i]>=800){
			isCought[i]=0;
		}
		
		if(level===1)
		{
			var isCowColliding = areColliding (
					flyingCowX+20, 
					flyingCowY+20,
					flyingCowL-20,
					flyingCowH-40,
					ufoX,
					ufoY,
					ufoL,
					ufoH);
			if(isCowColliding && brDisappear>60 && alreadyCollided === 0){
				disappear=1;
				brDisappear=0;
				boomX=ufoX+ufoL/2-boomL/2;
				boomY=ufoY+ufoH/2-boomH/2;
				if(lives>0)lives --;
				alreadyCollided = 1;
				flyingCowX = 100 + ufoX;
				flyingCowY =100 + ufoX;
			}
		}
	}
}

function draw()
{
	context.drawImage(back,0,0, 800,600);
	context.fillStyle = "white";
	context.font = "20px arial";
	context.fillText("result: " + result, 700, 40);
	if(level===1){
		context.fillStyle = "red";
		context.fillText("lives: " + lives, 700, 60);
	}else if (level===2){
		context.fillStyle = "blue";
		context.fillText("time: " + timer, 700, 60);
	}

	if((level===1 && lives > 0) || (level===2 && timer<60)){
		for (var i=0; i<5; i++){
			if(myX + a*1000<-i*200-130) a++;
			else if (myX + (a-1)*1000>=-i*200-130)a--;	
			myXc[i] = myX + a*1000+ i*200;
			
			// if(myXc[i]>=800-myL && myXc[i]<800)order[i]=4;
			// else if(myXc[i]>=600-myL && myXc[i]<800-myL)order[i]=3;
			// else if(myXc[i]>=400-myL && myXc[i]<600-myL)order[i]=2;
			// else if(myXc[i]>=200-myL && myXc[i]<400-myL)order[i]=1;
			// else if(myXc[i]>=0-myL && myXc[i]<200-myL)order[i]=0;
			myYc[i]=myY[i];
			
			var sign;
			if(i%2==0) sign=-1;
			else sign=1;

			if( myY[i]<=400 && my[i]!=null && isCought[i]===0){
				var mx=2*(420-h)/5;
				
				for (var p=0; p<mx; p++){
					if(br%(2*mx)<(p+1)*2 && br%(2*mx)>=p*2){
						context.save();
						context.translate(myXc[i]+55, myYc[i]);
						context.rotate(sign*2*p*Math.PI/(mx-0.5));
						context.translate(-myXc[i]-55, -myYc[i]);
						myCoefs=Math.sin(sign*2*p*Math.PI/(mx-0.5));
						myCoefc=Math.cos(sign*2*p*Math.PI/(mx-0.5));
						if(isCought[i]===0){
							context.drawImage(my[i],myXc[i], myYc[i], myL,myH);
							if(level===2){
								context.fillStyle = "pink";
								context.font = "20px arial";
								context.fillText(i+1, myXc[i]+myL/2, myYc[i]+myH/10);
							}							

							var stops =[10, Math.round(mx/3)+10, Math.round(2*mx/3)+10]
							for (var j=0; j<3; j++){
								if(p>=stops[j]-10 && p<=stops[j]){
									context.drawImage(star[i][j],myXc[i]+myH, myYc[i]+30, 25,25);//naluchkwam
								}
								if(p===stops[j]){
									isActive[i][j]=1;
									dStar[i][j]=0;
									coefs[i][j]=myCoefs;
									coefc[i][j]=myCoefc;
									
									starX[i][j]=myXc[i]+55+50*myCoefc-myH*myCoefs/2-12.5;
									starY[i][j]=myYc[i]+50*myCoefs+myH*myCoefc/2-12.5;							
								}
							}
						}
					}
				}
				context.restore();
				
				for(var j=0;j<3;j++){
					if(isActive[i][j]===1 && isCought[i]===0)
						context.drawImage(
							star[i][j],
							starX[i][j]+dStar[i][j]*coefs[i][j],
							starY[i][j]+dStar[i][j]*coefc[i][j],
							25+ dStar[i][j]*0.1,
							25+ dStar[i][j]*0.1);
				}
				//var midX=myXc[i]+55+40*myCoefc-myH*myCoefs/4;
				//var midY=myYc[i]+40*myCoefs+myH*myCoefc/4;
				//context.fillStyle="red";
				
				//context.fillRect(midX-10, midY-10, 20, 20);
				//h=0;
			}
			else{
				for(var j=0;j<3;j++){
					if(isActive[i][j]===1
						&&starX[i][j]+dStar[i][j]*coefs[i][j]<=825+dStar[i][j]*0.1
						&&starX[i][j]+dStar[i][j]*coefs[i][j]>=-25-dStar[i][j]*0.1
						&&starY[i][j]+dStar[i][j]*coefc[i][j]>=-25-dStar[i][j]*0.1
						&&starY[i][j]+dStar[i][j]*coefc[i][j]<=625+dStar[i][j]*0.1){
							context.drawImage(
								star[i][j],
								starX[i][j]+dStar[i][j]*coefs[i][j],
								starY[i][j]+dStar[i][j]*coefc[i][j],
								25 + dStar[i][j]*0.1,
								25+ dStar[i][j]*0.1);
					}
					else {
						isActive[i][j]=0;
					}
				}
				if (my[i]!=null && isCought[i]===0)	{		
					context.drawImage(my[i],myXc[i], myYc[i], myL,myH);
					if(level===2){
						context.fillStyle = "pink";
						context.font = "20px arial";
						context.fillText(i+1, myXc[i]+myL/2, myYc[i]+myH/10);	
					}					
				}
			}
			//h=0;
		}
		
		if(disappear===0){
			if(showCought){
				context.drawImage(
					cought,
					////ufoX+ufoL/2-9*raySc/2-(1-scCought)*myL/2+raySc*(1-scCought)*myL/24,////
					ufoX+ufoL/2-(1-scCought)*myL/2,
					ufoY+ufoH/2+19.5*raySc-100*(1-scCought), 
					myL*(1-scCought),
					myH*(1-scCought));
				if(19.5*raySc<=100*(1-scCought))showCought=false;
			}
			context.drawImage(ray,ufoX+ufoL/2-9*raySc/2,ufoY+ufoH/2, 9*raySc,19.5*raySc);
			context.drawImage(ufo,ufoX,ufoY, ufoL,ufoH);
		} else if(brDisappear<60)
			context.drawImage(boom,boomX, boomY, boomL, boomH);
	}
	else if (lives === 0 || (level===2 && timer>=60)){
		if(level === 1){
			context.drawImage(boom,boomX, boomY, boomL, boomH);
		}
        gameOver = true;
		lives=0;
		context.fillStyle = "white";
		context.font = "100px arial";
		context.fillText("Game Over!", 150, 300);
        var name = prompt('Please enter your name"');
        if (name !== null) {
            addScore(level, name, result);
        }
	}
	
	if(level===1){
		if(disappear===0){
		context.drawImage(flyingCow,flyingCowX,flyingCowY, flyingCowL,flyingCowH);
		alreadyCollided = 0;
		}
		else if(brDisappear<60){
			context.drawImage(boom,boomX, boomY, boomL, boomH);
		}
	}
}


function keyup(key)
{
	// Show the pressed keycode in the  console
	console.log("Pressed", key);
	if(level===1){
		if(key===37){
			// if(duX>0)duX*=-1;
			// duX-=2;
			// slowdownX=0;
			duX=0;
		}
		if(key===39){
			// if(duX<0)duX*=-1;
			// duX+=2;
			// slowdownX=0;
			duX=0;
		}
		if(key===38){
			// if(duY>0)duY*=-1;
			// duY-=2;
			// slowdownY=0;
			duY=0;
		}
		if(key===40){
			// if(duY<0)duY*=-1;
			// duY+=2;
			// slowdownY=0;
			duY=0;
		}
		if(key===13){duX=0;duY=0;}
		if(key===32)drSc=1;
	} else if (level===2){
		if(key>=49&&key<=53)jumpcow(key - 48);
	}
}

function keydown(key)
{
	// Show the pressed keycode in the  console
	console.log("Pressed", key);
	if(level===1){
		if(key===37){
			duX=-4*invert;
		}
		if(key===39){
			duX=4*invert;
		}
		if(key===38){
			duY=-4*invert;
		}
		if(key===40){
			duY=4*invert;
		}
		if(key===32){duX=0;duY=0;}
		if(key===13 && ufoY<250)drSc=1;
	} else if (level===2){
		if(key>=49&&key<=53)jumpcow(key - 48);
	}
}

function jumpcow(k)//още му трябва: сортираме по myXc избираме индекс key от сортирания
{
	var selected = -1;
	var anotherFlies = false;
	
	// for(var i=0; i<4; i++){
		// for(var j=i+1; j<5; j++){
			// if(myXc[i]!=undefined && myXc[i] > myXc[j] && MyXc[j]>0 && order[i]<order[j] ){
				// var swap = order[i];
				// order[i]=order[j];
				// order[j]=swap;
			// }
		// }
	// }
	
	for (var i=0; i<5; i++){
		if(order[i]===k-1){
			selected = i;
		}
		if(my[i]!= null && clicked[i]>0){
			anotherFlies = true;
			break;
		}
	}

	if(my[k-1]!=null && clicked[k-1]===0){//!anotherFlies && 
			if(!anotherFlies){
				h=320-Math.random()*220;
			}
			// if(color[selected]===0){clicked[selected]=1;}////my[i]=null;
			// else color[selected]=0;
			clicked[k-1]=1;
	}
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}
///level 2 крави срещу уфо. Имаме пастир, който ходи и сръчква кравите да скачат (или ги избираме с цифри), за да убият уфото. Уфото се движи и стреля произволно