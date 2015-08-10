define (["modules/start", "modules/game"], function(start, game) {
    
    return function() {
        console.log("main");
        
        start.init();
        
        //game.init();
        //game.initTurn();
    };
     
});