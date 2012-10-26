Layout = function() 
{ 
        Layout.superclass.constructor.call(this); 
        this.bounds = new Bounds(0, 0, 0, 0); 

        this.setX = function(item, x) 
        { 
        	item.set('x', x);                 
        }; 
        
        this.setY = function(item, y) 
        {               
                item.set('y', y); 
        }; 
}; 

Ext.extend(Layout, Action, {
        setBounds : function(_bounds) 
        {         	        	
                this.bounds = _bounds;
                return this;
        }, 
        
        type : 'Layout'
});