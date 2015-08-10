define (["jquery", "jquerymobile", "modules/draw"], function($, jqm, draw) {
    var board = {};
  
    board.render = function() {
        var n = Math.sqrt(board.cellCount);
        var obj = $("#board");
        var windowWidth = $(document).width();
        var windowHeight = $(document).height();
        var dim = Math.min(windowWidth, windowHeight) - 2 * (n+1);
        board.cellDim = Math.floor(dim / n);
        console.log("dim " + board.cellDim);
        
        for (var i=0; i<n; i++) {
            for (var k=0; k<n; k++) {
                var id = i*n + k;
                var cell =  $("<canvas>", {'id':id, 'class':"cell"});
                cell.attr('width', board.cellDim);
                cell.attr('height', board.cellDim);
                
                obj.after(cell);
                obj = cell;
            }
            var br = $("<br>");
            obj.after(br);
            obj = br;
        }
    };

    board.init = function(count) {
        if (!count)
            count = 9;
        board.cellCount = count;
        board.render();
        draw.init(board.cellDim);
        board.registerEvents();
    };

    board.registerEvents = function() {
        $(".cell").on("click", board.onClick);
    };

    board.onClick = function() {
        console.log("cell clicked");
        var cellId = ($(this).attr('id'));
        
        draw.X(cellId);
    };
    
    board.setCellCount = function(count) {
        board.cellCount = count;
    };

    return board;
});