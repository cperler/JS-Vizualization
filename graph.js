Graph = function(_nodes)
{	
	Graph.superclass.constructor.call(this, _nodes);
	
	var indexToId = [];
	var idToNode = [];
	
	this.count = function()
	{		
		return indexToId.length;
	};
	
	this.get = function(_id)
	{
		return idToNode[_id];
	};
	
	this.getByIndex = function(_index)
	{
		return this.get(indexToId[_index]);
	};
	
	this.setNodes = function(_nodes)
	{
		for (var i = 0; i < _nodes.length; i++)
		{		
			var node = _nodes[i];		
			indexToId[i] = node.id;			
			idToNode[node.id] = node;
		}
		
		if (this.nodesSetComplete)
		{
			this.nodesSetComplete();
		}
	};

	if (_nodes)
	{
		this.setNodes(_nodes);
	}
	
	this.addIdPrefix = function(prefix)
	{
		for (var i = 0; i < this.count(); i++)
		{
			var node = this.getByIndex(i);
			node.set('id', prefix + '_' + node.get('id'));
			node.id = node.get('id');
			idToNode[node.id] = node;			
		}
	};
};

Graph.prototype = 
{
	nodeType : Node
};

Ext.extend(Graph, TypedObject, {
	type : 'Graph',
	
	print : function()
	{
		return this.type + ' (contains ' + this.count() + ' nodes).';
	},
	
	nodeType : Node
});