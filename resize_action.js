ResizeAction = function(_sourceItem, _newBounds)
{
	ResizeAction.superclass.constructor.call(this);

	this.sourceItem = _sourceItem;
	this.newBounds = _newBounds;
};

Ext.extend(ResizeAction, Action, {
	process : function(item)
	{					
		if (item.isGroup === false)
		{				
			var points = item.get('points');			
			if (points == null)
			{
				var w = item.get('width') / this.sourceItem.get('width') * this.newBounds.w;
				var h = item.get('height') / this.sourceItem.get('height') * this.newBounds.h;
				var x = (item.get('x') - this.sourceItem.get('x')) / this.sourceItem.get('width') * this.newBounds.w;
				var y = (item.get('y') - this.sourceItem.get('y')) / this.sourceItem.get('height') * this.newBounds.h;

				item.set('width', w);
				item.set('height', h);
				item.set('x', x);
				item.set('y', y);
			}
			else
			{					
				for (var i = 0; i < points.length; i++)
				{
					var point = points[i];
					point[X_AXIS] = (point[X_AXIS] - this.sourceItem.get('x')) / this.sourceItem.get('width') * this.newBounds.w;
					point[Y_AXIS] = (point[Y_AXIS] - this.sourceItem.get('y')) / this.sourceItem.get('height') * this.newBounds.h;
				}
			}
		}
	},

	type : 'ResizeAction'
});	