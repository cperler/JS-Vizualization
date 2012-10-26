WriterFactory = function() 
{       
        WriterFactory.superclass.constructor.call(this);
        
        this.getWriter = function()
        {
        	if (Ext.isIE)
        	{
        		return new VMLWriter();
        	}
        	else
        	{
        		return new SVGWriter();
        	}
        };
};

WriterFactory.getAttribute = function(key)
{
	if (Ext.isIE)
	{
		if (key == 'fillcolor')
		{
			return 'fillcolor';
		}
	}
	else
	{
		if (key == 'fillcolor')
		{
			return 'fill';
		}
	}
};

WriterFactory.getWriter = function()
{
	if (WriterFactory.instance == null)
	{
		WriterFactory.instance = new WriterFactory();
	}
	
	return WriterFactory.instance.getWriter();
};

Ext.extend(WriterFactory, TypedObject, {
        type : 'WriterFactory'
});