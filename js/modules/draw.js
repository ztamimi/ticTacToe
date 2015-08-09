define ([], function() {
    var draw = {};
    
    draw.init = function() {
        draw.xColor = '#FD0';
        draw.oColor = '#6C0';
        draw.lineWidth = 10;
        draw.lineCap = 'round';
    };
    
    draw.X = function(cellId) {
        var ctx = document.getElementById(cellId).getContext('2d');
        ctx.lineWidth = draw.lineWidth;
        ctx.strokeStyle = draw.xColor;
        var l = new Path2D();
        l.moveTo(10, 10);
        l.lineTo(90, 90);
        ctx.stroke(l);
        var r = new Path2D();
        r.moveTo(90, 10);
        r.lineTo(10, 90);
        ctx.stroke(r);
    };
    
    draw.O = function(cellId) {
        var ctx = document.getElementById(cellId).getContext('2d');
        ctx.lineWidth = draw.lineWidth;
        ctx.strokeStyle = draw.oColor;
        ctx.lineCap = draw.lineCap;
        var c = new Path2D();
        c.arc(50, 50, 40, 0, Math.PI*2, true);
        ctx.stroke(c);
    };
    
    draw.setXColor = function(color) {
        draw.xColor = color;
    };
    
    draw.setOColor = function(color) {
        draw.oColor = color;
    };
    
    draw.setLineWidth = function(width) {
        draw.lineWidth = width;
    };
    
    draw.setLineCap = function(cap) {
        draw.lineCap = cap;
    };
    
    return draw;
});