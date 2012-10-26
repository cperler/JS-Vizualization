FillRenderer = function()
{
	FillRenderer.superclass.constructor.call(this);
};

Ext.extend(FillRenderer, Renderer, {
	render : function(display, item, write)
	{	
		var params = {};
		params.filltype = this.getFillType(item);
		params.fillcolor = this.getFillColor(item);
		params.opacity = this.getOpacity(item);
		
		if (write === false)
		{
			params.addTo = item.get('id') + '';
		}
		
		if (params.filltype != 'solid')
		{
			params.fillcolor2 = this.getFillColor2(item);
			params.colors = this.getColors(item);			
		}

        	display.write(params.filltype, item, params);
	},
	
	getFillType : function(item)
	{
		return this.get(item, 'filltype', 'solid');
	},
	
	getFillColor : function(item)
	{
		return this.get(item, 'fillcolor', 'black');
	},
	
	getFillColor2 : function(item)
	{
		return this.get(item, 'fillcolor2', '');
	},
	
	getColors : function(item)
	{
		return this.get(item, 'colors', '');
	},
	
	getOpacity : function(item)
	{
		return this.get(item, 'opacity', '0.7');
	},
	
	get : function(item, attribute, _default)
	{		
		return (item.get(attribute) || (_default || 'none')).toLowerCase();
	},
	
	type : 'FillRenderer'
});