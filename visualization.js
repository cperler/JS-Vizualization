Visualization = function(_name)
{	
	Visualization.superclass.constructor.call(this);	
	
	if (typeof _name != 'string')
	{
		error('No name set on visualization.');
		return;
	}
		
	this.name = _name;
	this.items = [];
	var activities = [];
	var renderers = [];
	this.display = null;

	this.addItem = function(_item)
	{		
		_item.visualization = this;
		this.items.push(_item);
		
		return this;
	};

	this.containsItem = function(_id)
	{
		for (var i = 0; i < this.items.length; i++)
		{
			if (this.items[i].get('id') == _id)
			{
				return true;
			}
		}
		
		return false
	};
	
	this.getLeafItems = function()
	{
		var leafItems = [];
		for (var i = 0; i < this.items.length; i++)
		{
			var item = this.items[i];
			if (item.isGroup === false)
			{
				leafItems.push(item);
			}
			else
			{
				var addIn = getLeafItemsForGroup(item);				
				for (var j = 0; j < addIn.length; j++)
				{
					leafItems.push(addIn[j]);
				}
			}
		}
		return leafItems;
	};
	
	var getLeafItemsForGroup = function(group)
	{
		var leafItems = [];
		for (var i = 0; i < group.count(); i++)
		{
			var item = group.getByIndex(i);
			if (item.isGroup === false)
			{
				leafItems.push(item);
			}
			else
			{
				var addIn = getLeafItemsForGroup(item);
				for (var j = 0; j < addIn.length; j++)
				{
					leafItems.push(addIn[j]);
				}
			}
		}
		
		return leafItems;
	};
	
	this.remove = function(_list, _item)
	{
		var newList = [];
		for (var i = 0; i < _list.length; i++)
		{
			if (_list[i] != _item)
			{
				newList.push(_list[i]);
			}
		}
		return newList;
	};
	
	this.add = function(_list, _item)
	{
		if (_item.setVisualization)
		{
			_item.setVisualization(this);
		}
		else
		{
			_item.visualization = this;
		}
		_list.push(_item);
	};
	
	this.removeItem = function(_item)
	{		
		this.items = this.remove(this.items, _item);
	};
	
	this.deleteAllItems = function()
	{
		for (var i = 0; i < this.items.length; i++)
		{		
			var item = this.items[i];
			if (item.get('id'))
			{
				var el = getEl(item.get('id'));
				if (el)
				{
					el.removeAllListeners();					
					el.remove();
				}
			}
			delete this.items[i];
		}
		this.items = [];
	}
	
	this.addActivity = function(_activity, addAll)
	{
		_activity.addAll = addAll;
		this.add(activities, _activity);
		return this.addItemsForActivity(_activity, addAll);
	};
	
	this.addItemsForActivity = function(_activity)
	{
		if (_activity.addAll === true)
		{
			for (var i = 0; i < this.items.length; i++)
			{
				_activity.addItem(this.items[i]);
			}
		}		
		return this;
	};
	
	this.findActivity = function(_name)
	{
		for (var i = 0; i < activities.length; i++)
		{
			if (activities[i].name == _name)
			{
				return activities[i];
			}
		}
		
		return null;
	};
	
	this.getActivities = function()
	{
		return activities;
	};
	
	this.removeActivity = function(_activity)
	{
		activities = this.remove(activities, _activity);		
	};
	
	this.addRenderer = function(_renderer)
	{
		this.add(renderers, _renderer);
		return this;
	};
	
	this.removeRenderer = function(_renderer)
	{
		renderers = this.remove(renderers, _renderer);
	};
	
	this.setDisplay = function(_display)
	{
		this.display = _display;
		this.display.setVisualization(this);
		return this;
	};
		
	this.runAction = function(action, item)
	{		
		if (action.setBounds)
		{
			action.setBounds(this.display.getBounds());
		}
		
		if (item == null)
		{
			action.process();
		}
		else if (item.isGroup === false)
		{
			action.process(item);
		}
		else
		{
			action.process(item);

			for (var i = 0; i < item.count(); i++)
			{
				this.runAction(action, item.getByIndex(i));
			}
		}
	};
	
	this.runRenderers = function()
	{
		for (var i = 0; i < renderers.length; i++)
		{
			for (var j = 0; j < this.items.length; j++)
			{					
				this.runRenderer(renderers[i], this.items[j]);
			}
		}		
	};
	
	this.reloadEvents = function(item)
	{
		this.display.captureEvents(item);	
	};
	
	this.runRenderersOnItem = function(item)
	{		
		if (item.isGroup === false)
		{						
			for (var i = 0; i < renderers.length; i++)
			{
				if (!renderers[i].isFiltered(item))
				{					
					renderers[i].render(this.display, item, true);
				}
			}
		}
		else
		{
			for (var i = 0; i < item.count(); i++)
			{												
				this.runRenderersOnItem(item.getByIndex(i));
			}
		}
	};
	
	this.update = function(item)
	{
		this.runRenderersOnItem(item);
	};
	
	this.runRenderer = function(renderer, item)
	{		
		if (item.isGroup === false)
		{
			if (!renderer.isFiltered(item))
			{
				renderer.render(this.display, item, true);
			}
		}
		else
		{
			for (var i = 0; i < item.count(); i++)
			{				
				this.runRenderer(renderer, item.getByIndex(i));
			}
		}
	};
	
	this.clear = function()
	{
		this.display.clear();
	};
	
	this.run = function()
	{			
		for (var i = 0; i < activities.length; i++)
		{
			activities[i].begin();
		}
	};
	
	this.reset = function()
	{
		this.stop();
		this.clear();
		
		for (var i = 0; i < activities.length; i++)
		{
			this.addItemsForActivity(activities[i]);
		}
		
		for (var i = 0; i < activities.length; i++)
		{
			activities[i].reset();
		}		
	}
	
	this.stop = function()
	{
		for (var i = 0; i < activities.length; i++)
		{
			activities[i].stop();			
		}
	};
};

Ext.extend(Visualization, TypedObject, {
	type : 'Visualization'
});