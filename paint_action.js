PaintAction = function()
{
	PaintAction.superclass.constructor.call(this);	
};

Ext.extend(PaintAction, Action, {
	process : function(item)
	{			
		if (item == null || item.getId == null || item.getId() == null)
		{					
			TextRenderer.defaultY = 0.0001;

			var display = this.visualization.display;
			display.canvas.container.hide();
			display.canvas.clear();

			this.visualization.runRenderers();
		
			display.canvas.container.show();
		}
		else 
		{						
			var el = getEl(item.getId());			
			if (el != null)
			{				
				getEl(item.getId()).remove();
				this.visualization.runRenderersOnItem(item);				
			}
			else
			{					
				TextRenderer.defaultY = 0.0001;
				this.visualization.runRenderersOnItem(item);
			}
		}
	},
	
	type : 'PaintAction'
});