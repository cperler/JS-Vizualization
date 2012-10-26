DragDropControl = function()
{
	DragDropControl.superclass.constructor.call(this);
	this.onDrop = null;
	this.onMove = null;
};

Ext.extend(DragDropControl, Control, {	
	type : 'DragDropControl',
	
	itemMouseMove : function(sender, e)
	{				
		if (sender.get('drag') === true)
		{	
			if (this == null || this.display == null)
			{
				return;
			}
			
			var b = this.display.getBounds();		 
			
			if (b == null || e == null)
			{
				return;
			}
						
			var localX = e.getPageX() - b.x;
			var localY = e.getPageY() - b.y;
			
			sender.set('x', localX - sender.get('offsetx'));
			sender.set('y', localY - sender.get('offsety'));
			
			if (sender.get('x') < 0)
			{
				sender.set('x', 0);
			}
			
			if (sender.get('y') < 0)
			{
				sender.set('y', 0);
			}
			
			this.refreshItem(sender);
			
			if (this.onMove != null && (typeof this.onMove == 'function'))
			{
				this.onMove(sender, e);
			}
		}
	},
	
	itemMouseUp : function(sender, e)
	{
		
		this.display.canvas.container.removeListener('mouseup', function(e) { this.c.itemMouseUp(this.i, e); }, {c : this, i : sender});
		this.display.canvas.container.removeListener('mousemove', function(e) { this.c.itemMouseMove(this.i, e); }, {c : this, i : sender});
		sender.unset('drag');
		sender.unset('offsetx');
		sender.unset('offsety');
		
		if (this.onDrop != null && (typeof this.onDrop == 'function'))
		{
			this.onDrop(sender, e);
		}
	},
	
	itemMouseDown : function(sender, e)
	{	
		sender.set('drag', true);
		
		var b = this.display.getBounds();		 
		var localX = e.getPageX() - b.x;
		var localY = e.getPageY() - b.y;
		var offsetX = localX - sender.get('x');
		var offsetY = localY - sender.get('y');
		
		sender.set('offsetx', offsetX);
		sender.set('offsety', offsetY);
		
		this.display.canvas.container.removeListener('mouseup', function(e) { this.c.itemMouseUp(this.i, e); }, {c : this, i : sender});
		this.display.canvas.container.removeListener('mousemove', function(e) { this.c.itemMouseMove(this.i, e); }, {c : this, i : sender});
		this.display.canvas.container.on('mouseup', function(e) { this.c.itemMouseUp(this.i, e); }, {c : this, i : sender});
		this.display.canvas.container.on('mousemove', function(e) { this.c.itemMouseMove(this.i, e); }, {c : this, i : sender});
	}
});