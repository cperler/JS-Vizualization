Renderer = function() 
{
	Renderer.superclass.constructor.apply(this);	
	this.visualization = null;
	var filters = [];
	
	this.addFilter = function(_filter)
	{
		filters.push(_filter);
		return this;
	};
	
	this.isFiltered = function(_item)
	{		
		for (var i = 0; i < filters.length; i++)
		{
			var filter = filters[i];
			if (filter(_item) === false)
			{
				return true;
			}
		}
		
		return false;	
	};
	
	this.get = function(item, attribute, _default) 
	{
		return ('' + (item.get(attribute) || (_default || 'none'))).toLowerCase();
        };
};

Renderer.prototype = {
	render : function(display, item, write) {}
};

Ext.extend(Renderer, TypedObject, {
	render : function(display, item, write)
	{
		debug('Rendering: ' + item.print(), 'h1 style="color:purple"');
	},	

	type : 'Renderer'
});