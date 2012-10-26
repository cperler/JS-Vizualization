RandomLayout = function() 
{       
        RandomLayout.superclass.constructor.call(this);
}; 

Ext.extend(RandomLayout, Layout, {        
        process : function(item) 
        {                   
        	if (item.isGroup === true) 
        	{
        		var b = this.bounds;
		      	var x = 0;
		      	var y = 0;
		        var w = b.w;
		       	var h = b.h;
		        		        
		        for (var i = 0; i < item.count(); i++) 
			{ 				
                        	var child = item.getByIndex(i);                        	
				x = Math.random() * w;				
				y = Math.random() * h;				
			        this.setX(child, x);
			        this.setY(child, y);
        		}
        	}
        }, 
                                      
        type : 'RandomLayout'
});