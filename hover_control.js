HoverControl = function(_highlightColor, _clickColor)
{
	HoverControl.superclass.constructor.call(this);
		
	this.highlightColor = _highlightColor || '#ffff00';	
};

Ext.extend(HoverControl, Control, {
	type : 'HoverControl',
	
	itemEntered : function(sender, e)
	{		
		if (sender.get('start:fillcolor') == null)
		{
			sender.set('start:fillcolor', sender.get('fillcolor'));
		}
		sender.set('end:fillcolor', this.highlightColor);
	
		var activity = this.display.visualization.findActivity('colorize');
	
		if (activity)
		{
			activity.addItem(sender).enable();
		}
	},
	
	itemExited : function(sender, e)
	{
		sender.set('end:fillcolor', sender.get('start:fillcolor'));						

		var activity = this.display.visualization.findActivity('colorize');
	
		if (activity)
		{
			activity.addItem(sender).enable();
		}
	}
});