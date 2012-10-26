GridLayout = function(_rows, _cols) 
{       
        GridLayout.superclass.constructor.call(this);
        
        this.rows = _rows;
        this.cols = _cols;
}; 

Ext.extend(GridLayout, Layout, {        
        process : function(item) 
        {                   
        	if (item.isGroup === true) 
        	{        
		        var r = this.bounds;
		        var bx = 0;
		        var by = 0;
	        	var h = r.h;
		        var w = r.w;	        
		        var m = this.rows;
		        var n = this.cols;
			        			        		
			for (var i = 0; i < item.count() && i < (this.rows * this.cols); i++) 
			{ 				
                        	var child = item.getByIndex(i);                         	
				var x = bx + w * ((i % n) / n);
				var y = by + h * (Math.floor(i / n) / m);				
	            		this.setX(child, x);
		        	this.setY(child, y);		        	
        		}
        	}
        }, 
                                      
        type : 'GridLayout'
});