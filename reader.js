Reader = function()
{
	Reader.superclass.constructor.apply(this);
	
	var isArray = function(obj)
	{	
		if (obj && obj.constructor && obj.constructor.toString().indexOf('Array') != -1)
		{
			return true;
		}
		return false;
	};
	
	var isObject = function(obj)
	{
		if (typeof obj == 'object')
		{
			return true;
		}
		return false;
	};
	
	this._readItem = function(_json, _typeOverride)
	{
		var i = null;
		if (_typeOverride)
		{			
			i = new _typeOverride();
		}
		else
		{
			i = new Item();
		}
		
		for (att in _json)
		{
			var val = _json[att];		
			i.set(att, val);
		}		
		return i;
	};
	
	this._readArray = function(_json)
	{		
		var items = [];
		for (var i = 0; i < _json.length; i++)
		{
			items.push(this._read(_json[i]));
		}		
		return items;
	};
	
	this._read = function(_json, _typeOverride)
	{
		if (isArray(_json))
		{					
			return this.readArray(_json);
		}
		else if (isObject(_json))
		{
			return this.readItem(_json);
		}
		else
		{
			error('Invalid type in reader.read().');
		}
	};
};


Ext.extend(Reader, TypedObject, {
	type : 'Reader'
});

Reader.prototype = {
	readItem : function(_json)
	{
		return this._readItem(_json);
	},
	
	readArray : function(_json)
	{
		return this._readArray(_json);
	},
	
	read : function(_json)
	{
		return this._read(_json);
	}
};
