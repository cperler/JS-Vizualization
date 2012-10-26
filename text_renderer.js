TextRenderer = function(_className, _textTemplate)
{
	TextRenderer.superclass.constructor.call(this);		

	this.lastRenderedText = '';
	this.className = _className;
	this.textTemplate = _textTemplate || new Ext.Template('{text}');
	if (_textTemplate == null)
	{
		this.addFilter(only('text'));
	}
		
	this.textType = SPAN;
	
	this.setTemplate = function(textType)
	{	
		this.textType = textType;
		return this;
	};
};

TextRenderer.defaultY = 0.0001;

Ext.extend(TextRenderer, Renderer, {
	render : function(display, item, write)
	{		
		var text = this.textTemplate.applyTemplate(item.data);
				
		if (text != '')
		{
			var params = {};
			params.id = this.getId(item);
			params.fontsize = this.getFontSize(item);
			params.fontcolor = this.getFontColor(item);
			params.backcolor = this.getBackColor(item);
			params.fontfamily = this.getFontFamily(item);
			params.fontweight = this.getFontWeight(item);
			params.x = this.getX(item);
			params.y = this.getY(item);
			params.boundingWidth = item.get('width');
			params.boundingHeight = item.get('height');
			params.text = text;
			params.className = this.className;
			
			if (write === false)
			{
				params.addTo = item.get('id') + '';
			}
			
			display.write(this.textType, item, params);
		}
	},
		
	getFontWeight : function(item)
	{
		return this.get(item, 'fontweight', 'normal');
	},
	
	getFontFamily : function(item)
	{
		return this.get(item, 'fontfamily', 'tahoma');
	},
	
	getFontSize : function(item)
	{
		return this.get(item, 'fontsize', '10px');
	},
	
	getBackColor : function(item)
	{
		return this.get(item, 'fontbackcolor', 'transparent');
	},
	
	getFontColor : function(item)
	{
		return this.get(item, 'fontcolor', 'black');
	},
	
	getY : function(item)
	{
		return this.get(item, 'y', TextRenderer.defaultY);
	},
	
	getX : function(item)
	{
		return this.get(item, 'x', 0.0001);
	},
	
	getId : function(item) 
	{
		return 'TEXT_' + this.get(item, 'id', create_id());
	},               
	
	type : 'TextRenderer'
});