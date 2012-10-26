VSS = function(_json)
{
	VSS.superclass.constructor.apply(this, _json);
	
	this.json = _json || [];
	this.styles = new List();
	
	for (var i = 0; i < this.json.length; i++)
	{				
		if (this.json[i].tag && this.json[i].css)
		{
			this.styles.add(this.json[i].tag, this.json[i].css);
		}
	}
	
	this.getStyle = function(_tag)
	{		
		if (typeof _tag == 'number')
		{
			return this.getStyle(this.getTagAt(_tag));
		}
		else
		{			
			return this.styles.get(_tag);
		}
	};
	
	this.getTagAt = function(_index)
	{		
		return this.styles.keyAt(_index);
	};
	
	this.length = function()
	{
		return this.styles.getCount();
	};
};

Ext.extend(VSS, TypedObject, {
	print : function()
	{
		return this.type + ': ' + Ext.util.JSON.encode(this.json);
	},
	
	type : 'VSS'
});