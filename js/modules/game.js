define (["modules/board"], function(board) {
    var game = {};
    
    game.players = ['Ali', 'Sami'];
    
    game.symbols = ['X', 'O'];

    game.init = function(boardSize) {
        board.init(boardSize);
        if (!game.playerCount)
            game.playerCount = 2;
    };
    
    game.switchTurn = function() {
        game.turn++;
        game.turn %= game.playerCount;
    };
    
    game.initTurn = function() {
        game.turn = Math.random() % game.playerCount;
    };
    
    game.setPlayerCount = function(count) {
        game.playerCount = count;
    };

    return game;
});