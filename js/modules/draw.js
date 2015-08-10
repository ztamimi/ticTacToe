define ([], function() {
    var draw = {};
    
    draw.init = function(cellDim) {
        if (!cellDim)
            cellDim = 100;
        draw.cellDim = cellDim;
        console.log("dim " + draw.cellDim);
            
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
        var shift = draw.cellDim * 0.1;
        l.moveTo(shift, shift);
        l.lineTo(draw.cellDim - shift, draw.cellDim - shift);
        ctx.stroke(l);
        var r = new Path2D();
        r.moveTo(draw.cellDim - shift, shift);
        r.lineTo(shift, draw.cellDim - shift);
        ctx.stroke(r);
    };
    
    draw.O = function(cellId) {
        var ctx = document.getElementById(cellId).getContext('2d');
        ctx.lineWidth = draw.lineWidth;
        ctx.strokeStyle = draw.oColor;
        ctx.lineCap = draw.lineCap;
        var c = new Path2D();
        var r = draw.cellDim * 0.4;
        console.log("radius " + r);
        var x = draw.cellDim / 2;
        console.log("center " + x);
        c.arc(x, x, r, 0, Math.PI*2, true);
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