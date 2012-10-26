AxisLayout = function(_axis, _nodeSize) 
{       
        AxisLayout.superclass.constructor.call(this); 
                
        this.axis = _axis || X_AXIS;     
                
        this.nodeSizeSet = false;
        this.nodeSize = _nodeSize || 40;
        if (_nodeSize && _nodeSize != null)
        {
        	this.nodeSizeSet = true;
        }
        
        this.setMinMax = function()
        {
        	this.min = 0;
        	
        	var b = this.bounds;
	        if (this.axis == X_AXIS) 
	        {
	        	this.range = b.w;
	        } 
	        else 
	        {
	            this.range = b.h;
        	}
        };
        
        this.setAxis = function(_axis) 
        { 
                this.axis = _axis; 
                return this; 
        };
}; 

Ext.extend(AxisLayout, Layout, {        
        process : function(item) 
        {               
                this.numericalLayout(item); 
        }, 
                        
        set : function(item, _val) 
        {               
                var val = this.min + _val * this.range;                 
                if (this.axis == X_AXIS) 
                {                	
                        this.setX(item, val);                         
                } 
                else 
                { 
                        this.setY(item, val); 
                } 
        }, 
                
        numericalLayout : function(item) 
        { 
        	this.setMinMax();
                if (item.isGroup === true)
                {                       
                        for (var i = 0; i < item.count(); i++) 
                        { 
                                var child = item.getByIndex(i); 
                                var val = child.id
                                this.lo = this.lo ? Math.min(this.lo, val) : val; 
                                this.hi = this.hi ? Math.max(this.hi, val) : val;
                                
                                if (this.nodeSizeSet)
                                {
                                	child.set('width', this.nodeSize);
                                	child.set('height', this.nodeSize);
                                }
                                else
                                {
	                                child.set('width', this.range / item.count());
                                	child.set('height', this.range / item.count());
                                }
                        } 
                                                              
                        for (var i = 0; i < item.count(); i++) 
                        { 
                                var child = item.getByIndex(i);                         
                                var val = child.id;
                                this.set(child, Math.interpolate(this.lo, this.hi, val)); 
                                this.numericalLayout(child); 
                        } 
                        
                        
                }               
        }, 
        
        type : 'AxisLayout'
});