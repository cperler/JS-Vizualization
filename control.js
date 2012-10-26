Control = function()
{
	Control.superclass.constructor.call(this)
	
	this.display = null;
	var filters = [];

	this.addFilter = function(_filter)
	{
		filters.push(_filter);
		return this;
	};

	this.isFiltered = function(_item)
	{		
		for (var i = 0; i < filters.length; i++)
		{
			var filter = filters[i];
			if (filter(_item) === false)
			{
				return true;
			}
		}

		return false;	
	};
};

Control.prototype = {
	itemClicked : function(sender, e) {},
	itemEntered : function(sender, e) {},
	itemExited : function(sender, e) {},
	itemMouseDown : function(sender, e) {},
	itemMouseUp : function(sender, e) {},
	itemMouseMove : function(sender, e) {},
	itemDoubleClicked : function(sender, e) {}
};

Ext.extend(Control, TypedObject, {	
	type : 'Control',
	
	refreshItem : function(item)
	{		
		getEl(item.getId()).remove();		
		this.display.visualization.runRenderersOnItem(item);	
	}
});