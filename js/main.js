define (["modules/game"], function(game) {
    
    return function() {
        console.log("main");
        game.init();
        game.initTurn();
    };
     
});