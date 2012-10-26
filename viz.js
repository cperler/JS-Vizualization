var List = Ext.util.MixedCollection; 

var idCount = 0;

//var create_id = function()
function create_id()
{
	return 'rnd_' + (idCount++) + '_' + Math.random();
};

//var only = function(field)
function only(field)
{
	return function(item) {
		if (item.get(field))		
		{
			return true;
		}
		else
		{
			return false;
		}
	};
};

//var except = function(field)
function except(field)
{
	return function(item) {
		if (item.get(field))
		{
			return false;
		}
		else
		{
			return true;
		}
	};
};

//var where = function(field, values)
function where(field, values)
{
	return function(item)
	{		
		if (values.indexOf(item.get(field)) != -1)
		{
			return true;
		}
		else
		{
			return false;
		}
	};
};

//var findEl = function(el, field)
function findEl(el, field)
{	
	if (el == null || field == null)
	{
		return null;
	}
	
	if (el.dom)
	{
		el = el.dom;
	}

	if (el.getAttribute(field) == null)
	{
		var children = el.childNodes;
		if (children != null && children.length > 0)
		{
			for (var i = 0; i < children.length; i++)
			{				
				var child = children[i];					
				var el = this.findEl(child, field);
				if (el != null)
				{
					if (el.dom)
					{						
						return el.dom;
					}
					else
					{
						return el;
					}
				}
			}
		}

		return null;
	}
	else
	{
		return el;
	}
};

function preventTextSelection()
{
	function disabletext(e)
	{
		return false;
	};

	function reEnable()
	{
		return true;
	};

	document.onselectstart=new Function ("return false");

	if (window.sidebar)
	{
		document.onmousedown=disabletext
		document.onclick=reEnable
	};
};
preventTextSelection();

function toInt(arguments)
{
	if (arguments != null)
	{
		for (var i = 0; i < arguments.length; i++)
		{
			arguments[i] = 1 * arguments[i];
		}
	}
	return arguments;
};

function isPointWithin(x, y, boxLeft, boxTop, boxWidth, boxHeight)
{
	if (x >= boxLeft &&
	    y >= boxTop &&
	    x <= (boxLeft + boxWidth) &&
	    y <= (boxTop + boxHeight))
	{		
		return true;
	}

	return false;
};

function isBoxWithin(x1, y1, w1, h1, x2, y2, w2, h2)
{
	if (isPointWithin(x1, y1, x2, y2, w2, h2) ||
	    isPointWithin(x1 + w1, y1, x2, y2, w2, h2) ||
	    isPointWithin(x1, y1 + h1, x2, y2, w2, h2) ||
	    isPointWithin(x1 + w1, y1 + h1, x2, y2, w2, h2))
	{
		return true;
	}
	
	return false;
};

function overlaps(x1, y1, w1, h1, x2, y2, w2, h2)
{
	arguments = toInt(arguments);
	
	if (isBoxWithin(x1, y1, w1, h1, x2, y2, w2, h2) ||
	    isBoxWithin(x2, y2, w2, h2, x1, y1, w1, h1))
	{
		return true;
	}
	
	return false;
};