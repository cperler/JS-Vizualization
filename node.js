Node = function(_data)
{	
	Node.superclass.constructor.call(this, _data);	
	
	this.id = this.get('id');
	this.parent_id = this.get('parent_id');
	this.child_ids = this.get('child_ids');	
};

Ext.extend(Node, Item, {
	type : 'Node',
	
	onSet : function(_key, _value)
	{						
		switch (_key)
		{
			case 'id':
				this.id = _value;
			break;
			case 'parent_id':
				this.parent_id = _value;
			break;
			case 'child_ids':
				this.child_ids = _value;
			break;
		}
	},
	
	print : function()
	{
		var parentStr = this.parent_id ? (this.parent_id + '->') : '';
		var childStr = this.child_ids ? ('->[' + this.child_ids + ']') : '';
		
		return this.type + 
			' [' + parentStr + '<u>' + this.id + '</u>' + childStr + '] : ' + 
			Ext.util.JSON.encode(this.data);
	}
});