define (["jquery", "jquerymobile", "modules/game"], function($, jqm, game) {
    var join = {};
  
    join.render = function() {
        
    };

    join.init = function() {
        join.render();
        join.registerEvents();
    };

    join.registerEvents = function() {
        $("#joinBtn").on("click", join.onClick);
        $("#startGame").on("click", join.startNewGame);
    };

    join.onClick = function() {
        console.log("join game");
        //var boardSize = $("#boardSize").val();
        //var playerCount = $("#playerCount").val();
        var playerName = $("#joinPlayerName").val();
        //console.log(boardSize);
        //console.log(playerCount);
        console.log(playerName);
        
        //game.setPlayerCount(playerCount);
        game.init();
        //game.initTurn();
        $.mobile.changePage("#boardPage", {transition: "slide", changeHash: false});
    };
    
    join.startNewGame = function() {
        console.log("start new game");
        var playerName = $("#playerName").val();
        //if (playerName)
        $.mobile.changePage("#startPage", {transition: "slide", changeHash: false});
    };
    
    return join;
});