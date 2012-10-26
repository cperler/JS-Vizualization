VisualTree = function(_nodes)
{	
	VisualTree.superclass.constructor.call(this, _nodes);	
};

Ext.extend(VisualTree, Tree, {
	type : 'VisualTree',
	
	isGroup : true,
	
	nodeType : VisualNode
});

Ext.applyIf(VisualTree.prototype, VisualItem.prototype);