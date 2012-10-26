NodeTreeLinkLayout = function(_edgeShape, _defaultWidth, _defaultHeight)
{
	NodeTreeLinkLayout.superclass.constructor.call(this);
	
	this.orientation = ORIENT_TOP_BOTTOM;	
	this.offset = 50;	
	this.ax = 0;
	this.ay = 0;
	this.offset = 0;
	this.defaultWidth = _defaultWidth || 0;
	this.defaultHeight = _defaultHeight || 0;
	this.x_sep = 0;
	this.y_sep = 0;
	
	this.edgeShape = _edgeShape || '';
	var tree = null;
	
	this.setTree = function(_tree)
	{
		if (_tree.isGroup === true)
		{
			if (_tree.root && _tree.root != null)
			{
				tree = _tree;
			}
		}
		
		return tree;
	};
	
	this.clearTree = function()
	{
		tree = null;
	};
	
	this.setDefaultSize = function()
	{
		for (var i = 0; i < tree.count(); i++)
		{
			var node = tree.getByIndex(i);
			node.set('width', this.defaultWidth);			
			node.set('height', this.defaultHeight);
		}
	};
	
	this.setSizeAndSpacing = function()
	{
		var b = this.bounds;
		
		if (this.defaultWidth == 0)
		{
			this.defaultWidth = b.w / 14;
		}
		
		if (this.defaultHeight == 0)
		{
			this.defaultHeight = b.h / 10;
		}
		
		this.x_sep = this.defaultWidth;
		this.y_sep = this.defaultHeight * 3;
		this.offset = 0;
	};
	
	this.getLayoutAnchor = function()
	{
		var pt = [0, 0];
		var b = this.bounds;
		switch (this.orientation) 
		{
			case ORIENT_LEFT_RIGHT:
				pt = [this.offset, b.h / 2.0];
		                break;
			case ORIENT_RIGHT_LEFT:
				pt = [b.getMaxX() - this.offset, b.h / 2.0];
		                break;
		        case ORIENT_TOP_BOTTOM:		        
		            	pt = [b.w / 2.0, this.offset];
		                break;
		        case ORIENT_BOTTOM_TOP:
		               	pt = [b.w / 2.0, b.getMaxY() - this.offset];
		                break;
		}
	
		return pt;
	};
	
	this.setBreadth = function(n, b)
	{
		switch (this.orientation) 
		{
			case ORIENT_LEFT_RIGHT:
			case ORIENT_RIGHT_LEFT:
				this.setY(n, this.ay + b);
				break;
			case ORIENT_TOP_BOTTOM:
			case ORIENT_BOTTOM_TOP:
				this.setX(n, this.ax + b);
				break;
			default:
				error('Invalid orientation.');
		}
	};

	this.setDepth = function(n, d)
	{
		switch (this.orientation) 
		{
			case ORIENT_LEFT_RIGHT:
				this.setX(n, this.ax + d);
				break;
			case ORIENT_RIGHT_LEFT:
				this.setX(n, this.ax - d);
				break;
			case ORIENT_TOP_BOTTOM:
				this.setY(n, this.ay + d);
				break;
			case ORIENT_BOTTOM_TOP:
				this.setY(n, this.ay - d);
				break;
			default:
				error('Invalid orientation.');
		}
        };
	
	this.firstWalk = function(level, node)
	{		
		tree.setNeighbors(node, level);
		
		if (tree.getChildren(node).length == 0)
		{
			var leftSibling = tree.getLeftSibling(node);			
			if (leftSibling != null)
			{
				node.set('pre_x', (leftSibling.get('pre_x') + node.get('width') + this.x_sep));
			}
			else
			{						
				node.set('pre_x', 0);
			}
		}
		else
		{					
			var children = tree.getChildren(node);
			for (var i = 0; i < children.length; i++)
			{				
				this.firstWalk(level + 1, children[i]);
			}			

			var mid = this.getChildCenter(node);
			mid -= (node.get('width') / 2.0);			
			
			leftSibling = tree.getLeftSibling(node);

			if (leftSibling != null)
			{			
				node.set('pre_x', (leftSibling.get('pre_x') + leftSibling.get('width') + this.x_sep));
				node.set('mod', node.get('pre_x') - mid);
				this.apportion(node, level);
			}
			else
			{
				node.set('pre_x', mid);
			}
		}
	};
	
	this.getChildCenter = function(node)
	{		
		var first = tree.getFirstChild(node);
		var last = tree.getLastChild(node);
		return first.get('pre_x') + ((last.get('pre_x') - first.get('pre_x')) + last.get('width')) / 2.0;
	};
	
	this.apportion = function(node, level)
	{		
		var firstChild = tree.getFirstChild(node);
		var firstChildLeftNeighbor = tree.getLeftNeighbor(firstChild);
		
		var j = 1;
		while (firstChild != null && firstChildLeftNeighbor != null)
		{			
			var modifierSumRight = 0;
			var modifierSumLeft = 0;
			var rightAncestor = firstChild;
			var leftAncestor = firstChildLeftNeighbor;

			for (var i = 0; i < j; i++)
			{			
				rightAncestor = tree.normalizeNode(tree.getParent(rightAncestor));
				leftAncestor = tree.normalizeNode(tree.getParent(leftAncestor));
				modifierSumRight += rightAncestor.get('mod');
				modifierSumLeft += leftAncestor.get('mod');
			}

			var totalGap = (firstChildLeftNeighbor.get('pre_x') + modifierSumLeft +
				firstChildLeftNeighbor.get('width') + this.x_sep) -
				(firstChild.get('pre_x') + modifierSumRight);

			if (totalGap > 0)
			{
				var subtreeAux = node;
				var numSubtrees = 0;

				while (subtreeAux != null && subtreeAux != leftAncestor)
				{
					numSubtrees++;
					subtreeAux = tree.getLeftSibling(subtreeAux);
				}

				if (subtreeAux != null)
				{
					var subtreeMoveAux = node;
					var singleGap = totalGap / numSubtrees;
					while (subtreeMoveAux != leftAncestor)
					{
						subtreeMoveAux.set('pre_x', (subtreeMoveAux.get('pre_x') + totalGap));
						subtreeMoveAux.set('mod', (subtreeMoveAux.get('mod') + totalGap));
						totalGap -= singleGap;
						subtreeMoveAux = tree.getLeftSibling(subtreeMoveAux);
					}
				}
			}

			j++;
			if (tree.getChildren(firstChild).length == 0)
			{
				firstChild = tree.getLeftMost(node, 0, j);
			}
			else
			{
				firstChild = tree.getFirstChild(firstChild);
			}

			if (firstChild != null)
			{
				firstChildLeftNeighbor = tree.getLeftNeighbor(firstChild);
			}
		}
	};
	
	this.secondWalk = function(node, level, x)
	{		
		this.setBreadth(node, (node.get('pre_x') || 0) + x);
		this.setDepth(node, level * this.y_sep);
		
		if (tree.getChildren(node).length != 0)
		{
			this.secondWalk(tree.getFirstChild(node), level + 1, x + node.get('mod'));
		}
		
		var rightSibling = tree.getRightSibling(node);
		if (rightSibling != null)
		{
			this.secondWalk(rightSibling, level, x);
		}
	};
	
	this.position = function()
	{
		var root = tree.root;
		var firstChild = root;
		var x = 0;
		while (firstChild != null)
		{
			x = firstChild.get('x');
			firstChild = tree.getFirstChild(firstChild);
		}
		var diff = root.get('x') - x;
		for (var i = 0; i < tree.count(); i++)
		{
			var node = tree.getByIndex(i);
			node.set('x', (node.get('x') - diff));
		}
	};
	
	this.addEdges = function()
	{				
		if (this.edgeShape != '')
		{
			for (var i = 0; i < tree.count(); i++)
			{
				var node = tree.getByIndex(i);

				var children = tree.getChildren(node);

				for (var j = 0; j < children.length; j++)
				{				
					var child = children[j];
	
					var fromX = node.get('x') + (node.get('width') / 2);
					var fromY = node.get('y') + node.get('height');

					var toX = child.get('x') + (child.get('width') / 2);
					var toY = child.get('y');

					var turn1X = fromX;
					var turn1Y = fromY + (Math.abs(toY - fromY) / 2);

					var turn2X = toX;
					var turn2Y = turn1Y;
					
					var edge = new VisualItem({id : (node.get('id') + '_' + child.get('id')), 
						shape : this.edgeShape, points : [[fromX, fromY], [turn1X, turn1Y], [turn2X, turn2Y], [toX, toY]]});

					edge.set('ignoreEvents', true);
					this.visualization.addItem(edge);
					this.visualization.runRenderersOnItem(edge);
				}

			}
		}
	};
};

Ext.extend(NodeTreeLinkLayout, Layout, {        
        process : function(item) 
        {               	
        	if (this.setTree(item) != null)
        	{        		        		
        		var anchor = this.getLayoutAnchor();        		
			this.ax = anchor[X_AXIS];
	        	this.ay = anchor[Y_AXIS];
	        	
	        	this.setSizeAndSpacing();
	        	this.setDefaultSize();
        		
        		this.firstWalk(0, item.root);
        		this.secondWalk(item.root, 0, 0);
        		this.position();
        
        		this.addEdges();
        		this.clearTree();
        	}	              		        
        },               
                                      
        type : 'NodeTreeLinkLayout'
});