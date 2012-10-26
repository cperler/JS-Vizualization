Item = function(_data)
{	
	Item.superclass.constructor.call(this);

	this.data = _data || {};
	
	this.get = function(_key)
	{			
		return this.data[_key] || null;
	};
	
	this.set = function(_key, _value)
	{		
		if (_key != null && _value != null)
		{					
			this.data[_key] = _value;
			
			if (this.onSet)
			{				
				this.onSet(_key, _value);
			}
		}		
	};
	
	var clone_object = function(_array)
	{
		var new_array = [];
		
		for (var idx in _array)
		{
			if (typeof _array[idx] == 'object')
			{
				new_array[idx] = clone_object(_array[idx]);
			}
			else
			{
				new_array[idx] = _array[idx];
			}
		}
		
		return new_array;
	};
		
	this.clone = function()
	{					
		var new_item = eval('new ' + this.type + '()');
		
		for (var att in this.data)
		{
			if (typeof this.data[att] == 'object')
			{
				new_item.set(att, clone_object(this.data[att]));
			}
			else
			{
				new_item.set(att, this.data[att]);
			}			
		}
		
		return new_item;
	};
	
	this.unset = function(_key)
	{
		if (this.get(_key) != null)
		{
			delete this.data[_key];
		}
	};
	
	this.getId = function()
	{
		if (this.id != null)
		{
			return '' + this.id;
		}
		else 
		{
			var id = this.get('id');
			if (id != null)
			{
				return '' + id;
			}
		}
		
		return null;
	};
};

Item.prototype = {
	onSet : function(_key, _value) { info('error');}
};

Ext.extend(Item, TypedObject,
{
	print : function() 
	{
		return this.type + ': ' + Ext.util.JSON.encode(this.data);
	},
	
	type : 'Item'
});