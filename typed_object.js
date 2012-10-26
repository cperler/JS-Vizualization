TypedObject = function() {};

TypedObject.prototype = {
	print : function() 
	{
		return this.type;
	},
	
	type : 'TypedObject'
}