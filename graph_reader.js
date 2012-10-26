GraphReader = function()
{	
	GraphReader.superclass.constructor.call(this);
	
	this.nodeType = Node;
};

Ext.extend(GraphReader, Reader, {
	type : 'GraphReader',
	
	readItem : function(_json)
	{		
		return this._readItem(_json, this.nodeType);
	},
	
	read : function(_json, _typeOverride)
	{	
		if (_typeOverride)
		{
			var container = new _typeOverride();			
			this.nodeType = container.nodeType;
			container.setNodes(this._read(_json));			
			return container;
		}
		else
		{
			return new Graph(this._read(_json));
		}
	}
});