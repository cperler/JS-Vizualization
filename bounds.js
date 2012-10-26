Bounds = function(x, y, w, h)
{
	this.x = x;
	this.y = y;	
	this.w = w;
	this.h = h;
	
	this.getMinX = function()
	{
		return this.x;
	};
	
	this.getMaxX = function()
	{
		return this.x + this.w;
	};
	
	this.getMinY = function()
	{
		return this.y;
	};
	
	this.getMaxY = function()
	{
		return this.y + this.h;
	};
	
	this.getCenterX = function()
	{
		return (this.getMaxX() - this.getMinX()) / 2.0;
	};
	
	this.getCenterY = function()
	{
		return (this.getMaxY() - this.getMinY()) / 2.0;
	};
};

Ext.extend(Bounds, TypedObject, {
	type : 'Bounds'
});