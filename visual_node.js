VisualNode = function(_data)
{		
	VisualNode.superclass.constructor.call(this, _data);
};

Ext.extend(VisualNode, Node, {
	type : 'VisualNode'
});

Ext.applyIf(VisualNode.prototype, VisualItem.prototype);