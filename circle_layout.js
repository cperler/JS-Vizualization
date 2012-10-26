CircleLayout = function(_radius) 
{       
        CircleLayout.superclass.constructor.call(this);
        
        this.radius = _radius || 0;
}; 

Ext.extend(CircleLayout, Layout, {        
        process : function(item) 
        {                   
        	if (item.isGroup === true) 
        	{
			var nn = item.count();
	        
		        var r = this.bounds;
	        	var height = r.h;
		        var width = r.w;
	        	var cx = r.getCenterX();
		        var cy = r.getCenterY();
			        	
		        if (this.radius <= 0) 
		        {
	            		this.radius = 0.45 * (height < width ? height : width);
	        	}
		
			for (var i = 0; i < item.count(); i++) 
			{ 				
                        	var child = item.getByIndex(i);                        	
				var angle = (2 * Math.PI * i) / nn;
	            		var x = Math.cos(angle) * this.radius + cx;
		            	var y = Math.sin(angle) * this.radius + cy;		            	
	            		this.setX(child, x);
		        	this.setY(child, y);
        		}
        	}
        }, 
                                      
        type : 'CircleLayout'
});