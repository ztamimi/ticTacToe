define (["jquery", "modules/draw"], function($, draw) {
    var board = {};
  
    board.render = function() {
        var n = Math.sqrt(board.cellCount);
        var obj = $("#board");
        for (var i=0; i<n; i++) {
            for (var k=0; k<n; k++) {
                var id = i*n + k;
                var cell =  $("<canvas>", {'id':id, 'class':"cell"});
                cell.attr('width', 100);
                cell.attr('height', 100);
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
        draw.init();
        board.registerEvents();
    };

    board.registerEvents = function() {
        $(".cell").on("click", board.onClick);
    };

    board.onClick = function() {
        console.log("cell clicked");
        var cellId = ($(this).attr('id'));
        
        draw.O(cellId);
    };
    
    board.setCellCount = function(count) {
        board.cellCount = count;
    };

    return board;
});