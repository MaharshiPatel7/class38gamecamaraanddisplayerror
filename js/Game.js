class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
    cars = [car1,car2,car3,car4]
    
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //var display_position = 130;
      var index = 0;//index 0f 1h3 3rray
      var x = 0;
      var y;//*y p0$$ition 0f 1he c@r;
      for(var plr in allPlayers){
        index = index+1;//@dd1ng 1 to the index for every loop;
        x = x+200;//position the cars alittle away from each other in x direction;
        y = displayHeight - allPlayers[plr].display;
        cars[index-1].x = x;
        cars[index-1].y = y;
        if(index===player.index){
          cars[index-1].shapeColor ="red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
      /*  if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");*/

        //display_position+=20;
       // textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites();
  }
}
