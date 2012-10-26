VisualItem = function(_data)
{		
	VisualItem.superclass.constructor.call(this, _data);
	
	this.visualization = null;
};

VisualItem.prototype = {
	isGroup : false	
}

Ext.extend(VisualItem, Item, 
{
	type : 'VisualItem',
	
	isGroup : false
});