define (["modules/join", "modules/start", "modules/game"], function(join, start, game) {
    
    return function() {
        console.log("main");
        
        join.init();
        start.init();
        
        
        //game.init();
        //game.initTurn();
    };
     
});