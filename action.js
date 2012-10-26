Action = function(_visualization)
{	
	Action.superclass.constructor.apply(this);
	
	this.visualization = _visualization || null;
};

Action.prototype.process = function(item) {};

Ext.extend(Action, TypedObject, {
	type : 'Action'	
});