Activity = function(_name, _start, _duration, _step)
{	
	Activity.superclass.constructor.apply(this);
	
	this.visualization = null;	
	this.name = _name;
	this.start = _start || NOW;	
	this.duration = _duration || ONCE;
	this.originalDuration = this.duration;
	this.step = _step || 1;
	this.enabled = (this.start != AS_NEEDED);
	this.waitForItem = false;
	this.actions = [];
	this.items = [];
	this.addAll = false;
	var filters = [];
	
	this.setVisualization = function(_visualization)
	{
		this.visualization = _visualization;
		for (var i = 0; i < this.actions.length; i++)
		{
			this.actions[i].visualization = this.visualization;
		}
	};
	
	this.addAction = function(_action)
	{
		_action.visualization = this.visualization;
		_action.activity = this;
		this.actions.push(_action);
		return this;
	};
	
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
	
	this.addItem = function(_item)
	{			
		for (var i = 0; i < this.items.length; i++)
		{			
			if (this.items[i] == _item)
			{
				return this;
			}
		}
		
		for (var i = 0; i < this.items.length; i++)
		{			
			if (this.items[i] == null)
			{
				this.items[i] = _item;
				return this;
			}
		}
		
		this.items.push(_item);
		return this;
	};
	
	this.removeItem = function(_item)
	{
		for (var i = 0; i < this.items.length; i++)
		{
			if (this.items[i] = _item)
			{
				this.items[i] = null;
			}
		}
	};
};

Ext.extend(Activity, TypedObject, {
	onRunStart : function()
	{				
		if (this.enabled === true)
		{			
			if (this.duration != ONCE && this.duration != INFINITY)
			{
				this.duration -= this.step;
			}
			
			if (this.enabled === true)
			{
				this.run();
			}
		}
	},
	
	run : function()
	{						
		for (var i = 0; i < this.actions.length; i++)
		{
			for (var j = 0; j < this.items.length; j++)
			{				
				var item = this.items[j];
				if (item != null)
				{
					if (this.enabled === true)
					{			
						if (!this.isFiltered(item))
						{							
							this.visualization.runAction(this.actions[i], item);
						}
						else
						{
							this.removeItem(item);
						}
					}
					else
					{
						return;
					}
				}
			}
		}
		this.onRunComplete();
	},
	
	onRunComplete : function()
	{				
		if (this.enabled === true)
		{
			if (this.duration == INFINITY || (this.duration != ONCE && this.duration > 0))
			{
				this.onRunStart.defer(this.step, this);
			}
			else if (this.start == AS_NEEDED)
			{
				this.enabled = false;
			}
		}		
	},
	
	reset : function()
	{
		this.duration = this.originalDuration;
		this.enabled = true;
	},
	
	enable : function()
	{				
		if (this.enabled === false)
		{
			if (this.start == AS_NEEDED)
			{
				this.duration = this.originalDuration;				
			}
			
			this.enabled = true;
			this.begin();			
		}
	},
	
	disable : function()
	{				
		this.enabled = false;		
	},
	
	begin : function()
	{
		if (this.enabled === true)
		{					
			if (this.start == AS_NEEDED)
			{
				this.onRunStart.defer(0, this);
			}
			else
			{			
				this.onRunStart.defer(this.start, this);
			}
		}
	},
	
	stop : function()
	{
		this.disable();
	},
	
	type : 'Activity'
});