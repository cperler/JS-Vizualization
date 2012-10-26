Canvas = function(_container, _writer)
{	
	Canvas.superclass.constructor.call(this);
	
	this.container = _container;
	this.writer = _writer.init(this.container);		
		
	this.write = function(key, params)
	{
		this.writer.write(key, params);
	};
	
	this.writeHTML = function(_html)
	{
		this.writer.writeHTML(_html);
	};
	
	this.getBounds = function()
	{
		if (this.bounds)
		{
			return this.bounds;
		}
		else
		{
			this.bounds = new Bounds(this.container.getLeft(), this.container.getTop(), this.container.getWidth(), this.container.getHeight());
			return this.bounds;
		}
	};
	
	this.clear = function()
	{		
		this.container.update('');
		this.container.clean();
		this.writer.setContainer(this.container);
	};
	
	this.destroy = function()
	{		
		this.container.remove();
	};
	
	this.clear();
};

Ext.extend(Canvas, TypedObject, {
	type : 'Canvas'
});