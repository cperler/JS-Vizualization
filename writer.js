Writer = function()
{
	Writer.superclass.constructor.apply(this);
	
	this.container = null;
}

Ext.extend(Writer, TypedObject, {
	type : 'Writer'
});

Writer.prototype = {
	init : function(_container) 
	{	
		this.setContainer(_container);
		return this;
	},
	
	write : function(key, params)
	{
		debug('Writing: ' + _key, 'h1 style="color:purple"');		
	},
	
	setContainer : function(_container)
	{
		this.container = _container;		
	},

	writeHTML : function(html)
	{
		debug('Writing: ' + html, 'h1 style="color:purple"');
	}
};