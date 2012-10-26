VisualGraph = function(_nodes)
{	
	VisualGraph.superclass.constructor.call(this, _nodes);	
};

Ext.extend(VisualGraph, Graph, {
	type : 'VisualGraph',
	
	isGroup : true,
	
	nodeType : VisualNode
});

Ext.applyIf(VisualGraph.prototype, VisualItem.prototype);