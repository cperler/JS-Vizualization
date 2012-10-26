CanvasControl = function()
{
	CanvasControl.superclass.constructor.call(this)
	
	this.display = null;
};

CanvasControl.prototype = {
	itemClicked : function(sender, e) {},
	itemEntered : function(sender, e) {},
	itemExited : function(sender, e) {},
	itemMouseDown : function(sender, e) {},
	itemMouseUp : function(sender, e) {},
	itemMouseMove : function(sender, e) {},
	itemDoubleClicked : function(sender, e) {}
};

Ext.extend(CanvasControl, TypedObject, {	
	type : 'CanvasControl',
	
	refreshItem : function(item)
	{		
		getEl(item.getId()).remove();		
		this.display.visualization.runRenderersOnItem(item);	
	}
});