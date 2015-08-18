define (["jquery", "jquerymobile", "modules/game"], function($, jqm, game) {
    var start = {};
  
    start.render = function() {
        
    };

    start.init = function() {
        start.render();
        start.registerEvents();
    };

    start.registerEvents = function() {
        $("startPage") > $("#startBtn").on("click", start.onClick);
    };

    start.onClick = function() {
        console.log("start game");
        var boardSize = $("#boardSize").val();
        var playerCount = $("#playerCount").val();
        var playerName = $("#playerName").val();
        console.log(boardSize);
        console.log(playerCount);
        console.log(playerName);
        
        game.setPlayerCount(playerCount);
        game.init(boardSize);
        game.initTurn();
        $.mobile.changePage("#boardPage", {transition: "slide", changeHash: false});
    };
    
    return start;
});