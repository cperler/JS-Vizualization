LineRenderer = function()
{ 
        LineRenderer.superclass.constructor.call(this);
};

Ext.extend(LineRenderer, Renderer, { 
        render : function(display, item, write) 
        {         	                
                var params = {};                
                params.shape = this.getShape(item);             
                
		var points = item.get('points');
		if (points == null || points.length == null)
		{
			return;
		}
                
                switch (params.shape)
                {
                        case 'line':
                        	if (points.length < 2)
                        	{
                        		return;
                        	}
                        	params.style = '"position:absolute"';
                        	params.x1 = points[0][X_AXIS];
                        	params.y1 = points[0][Y_AXIS];
                        	params.from = points[0][X_AXIS] + ', ' + points[0][Y_AXIS];
                        	params.x2 = points[points.length - 1][X_AXIS];
                        	params.y2 = points[points.length - 1][Y_AXIS];
                        	params.to = points[points.length - 1][X_AXIS] + ', ' + points[points.length - 1][Y_AXIS];
                        	break;
                        case 'polyline':
                        	if (points.length < 2)
			       	{
					return;
                        	}
                        	params.style = '"position:absolute"';
                        	params.points = '';
                        	for (var i = 0; i < points.length; i++)
                        	{
                        		params.points += points[i][X_AXIS] + ' ' + points[i][Y_AXIS] + ' ';
                        	}
                        	break;
                        case 'bezier':
                        	if (points.length < 4)
                        	{
                        		return;
                        	}
                        	params.shape = 'curve';
                        	params.style = '"position:absolute"';
                        	params.from = points[0][X_AXIS] + ', ' + points[0][Y_AXIS];
                        	params.control1 = points[1][X_AXIS] + ', ' + points[1][Y_AXIS];
                        	params.control2 = points[2][X_AXIS] + ', ' + points[2][Y_AXIS];
                        	params.to = points[points.length - 1][X_AXIS] + ', ' + points[points.length - 1][Y_AXIS];
                        	break;
                        default:                         	
                                return; 
                }
                
                display.write(params.shape, item, params);
        },
        
        getShape : function(item) 
        {                               
                return this.get(item, 'shape', 'rect'); 
        }, 
                
        type : 'LineRenderer'
});