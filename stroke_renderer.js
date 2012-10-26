StrokeRenderer = function()
{
	StrokeRenderer.superclass.constructor.call(this);	
};

Ext.extend(StrokeRenderer, Renderer, {
	render : function(display, item, write)
	{	
		var params = {};
		params.color = this.getStrokeColor(item);
		params.weight = this.getStrokeWeight(item);
		params.opacity = this.getOpacity(item);	
		params.dashstyle = this.getDashStyle(item);
		
		if (write === false)
		{
			params.addTo = item.get('id') + '';
		}
        	
        	display.write('stroke', item, params);
	},
		
	getStrokeColor : function(item)
	{
		return this.get(item, 'strokecolor', 'black');
	},
	
	getStrokeWeight : function(item)
	{
		return this.get(item, 'strokeweight', '1');
	},
	
	getOpacity : function(item)
	{
		return this.get(item, 'strokeopacity', '1');
	},
	
	getDashStyle : function(item)
	{
		return this.get(item, 'dashstyle', 'solid');
	},
	
	type : 'StrokeRenderer'
});