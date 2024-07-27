$(document).ready(function () {


    let buttonColours = ["red", "blue", "green", "yellow"];
    let gamePattern = [];
    let userClickedPattern = [];
    let level = 0;
    let clicked = false;

    $("html").on("keypress",function(){
        if(!clicked){

        nextSequence();
        clicked = true;
        }
    });

    function playSound(randomChosenColour){
        let audio = new Audio(`./sounds/${randomChosenColour}.mp3`)
        audio.play();
    }

    function animatePress(currentColour){
        $(`#${currentColour}`).addClass("pressed");
        setTimeout(function(){
            $(`#${currentColour}`).removeClass("pressed");
        }, 100);
    }

    function nextSequence(){

        userClickedPattern = [];
        level ++;
        $("h1").text(`level ${level}`);

        let randomNum = Math.floor(Math.random() * 4);
        let randomChosenColour = buttonColours[randomNum]; 

        //console.log(randomChosenColour);

        $(`#${randomChosenColour}`).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(randomChosenColour);

        gamePattern.push(randomChosenColour);

    }
    function gameOver(){

        new Audio("./sounds/wrong.mp3").play();

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
          },200)

        $("h1").text("Game Over, Press Any Key to Restart");
        
        startOver();

    }

    function startOver(){
        level = 0;
        gamePattern = [];
        clicked = false;
        userClickedPattern = [];
    }

    function checkAnswer(currentLevel){
        userClickedPattern = userClickedPattern.filter(String);
        console.log(gamePattern);
        console.log(userClickedPattern);

        if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
            if(gamePattern.length === userClickedPattern.length){
                setTimeout(function () {
                nextSequence();
                }, 1000);
            }

        }
        else{
            gameOver();
        }
    }


    $("body").on("click touchend",function (event) {

        let userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);

        playSound(userChosenColour);

        animatePress(userChosenColour);
        checkAnswer(userClickedPattern.lastIndexOf(userClickedPattern[userClickedPattern.length-1]));

      })

    


});
