Tree = function(_nodes)
{
	Tree.superclass.constructor.call(this, _nodes);
	
	this.levelNodes = [];
	var initialized = false;
	this.root = null;
	
	this.nodesSetComplete = function()
	{		
		for (var i = 0; i < this.count(); i++)
		{
			var node = this.getByIndex(i);			
			if (this.getParent(node) == null)
			{
				if (this.root)
				{
					error('Root already set on tree.');
					return;
				}
				else
				{
					this.root = node;
				}
			}
		}
		
		initialized = true;		
	};
	
	this.normalizeNode = function(nodeOrId)
	{
		if (nodeOrId.id)
		{
			return nodeOrId;
		}
		else
		{			
			return this.get(nodeOrId);
		}
	};
	
	this.getLeftMost = function(nodeOrId, level, maxLevel)
	{
		var node = this.normalizeNode(nodeOrId);
		if (level >= maxLevel)
		{
			return node;
		}

		if (this.getChildren(node).length == 0)
		{
			return null;
		}

		var children = this.getChildren(node);
		for (var i = 0; i < children.length; i++)
		{
			var iChild = children[i];
			var leftmostDescendant = this.getLeftMost(iChild, level + 1, maxLevel);

			if (leftmostDescendant != null)
			{
				return leftmostDescendant;
			}
		}

		return null;
	};
	
	this.getLeftNeighbor = function(nodeOrId)
	{
		return this.getNeighbor(nodeOrId, LEFT);
	};
	
	this.getRightNeighbor = function(nodeOrId)
	{
		return this.getNeighbor(nodeOrId, RIGHT);
	};
	
	this.getNeighbor = function(nodeOrId, side)
	{
		var node = this.normalizeNode(nodeOrId);
		var neighborId = node.get(side + 'neighbor_id');
		
		if (neighborId != null)
		{
			var neighbor = this.normalizeNode(this.get(neighborId));
			return neighbor;
		}
		
		return null;
	};
	
	this.getSibling = function(nodeOrId, side)
	{		
		var node = this.normalizeNode(nodeOrId);		
		var neighborId = node.get(side + 'neighbor_id');
		
		if (neighborId != null)
		{			
			var neighbor = this.normalizeNode(this.get(neighborId));

			if (this.getParent(neighbor) == this.getParent(node))
			{
				return neighbor;
			}
		}
				
		return null;
	};
	
	
	this.setNeighbors = function(nodeOrId, level)
	{			
		var node = this.normalizeNode(nodeOrId);		

		if (this.levelNodes[level] && this.levelNodes[level] != null)
		{					
			node.set('leftneighbor_id', this.levelNodes[level]);			
		}

		if (this.getLeftNeighbor(node) != null)
		{
			var leftNeighborNode = this.getLeftNeighbor(node);			
			leftNeighborNode.set('rightneighbor_id', node.id);
		}
			
		this.levelNodes[level] = node.id;
	};
		
	this.getParent = function(nodeOrId)
	{		
		return this.normalizeNode(nodeOrId).get('parent_id');
	};
	
	this.getChildren = function(nodeOrId)
	{	
		var node = this.normalizeNode(nodeOrId);
		var childIds = node.get('child_ids');
		if (childIds)
		{
			var children = [];
			for (var i = 0; i < childIds.length; i++)
			{
				children[i] = this.get(childIds[i]);		
			}
			return children;
		}
		
		return [];
	};	
	
	this.getLeftSibling = function(nodeOrId)
	{
		var n = this.normalizeNode(nodeOrId);		
		var lsib = this.getSibling(n, LEFT);		
		return lsib;
	};
	
	this.getRightSibling = function(nodeOrId)
	{
		var n = this.normalizeNode(nodeOrId);
		var rsib = this.getSibling(n, RIGHT);
		return rsib;
	};
	
	this.getFirstChild = function(nodeOrId)	
	{		
		var node = this.normalizeNode(nodeOrId);				
		var children = this.getChildren(node);		
		if (children.length > 0)
		{		
			return children[0];
		}
		else
		{		
			return null;
		}		
	};
	
	this.getLastChild = function(nodeOrId)	
	{
		var node = this.normalizeNode(nodeOrId);		
		var children = this.getChildren(node);
		if (children.length > 0)
		{
			return children[children.length - 1];
		}
		else
		{
			return null;
		}		
	};
};

Ext.extend(Tree, Graph, {
	print : function()
	{
		return this.type + ' (root id = ' + this.root.id + ')';
	},
	
	type : 'Tree'
});