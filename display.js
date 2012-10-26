Display = function(_element, _writer)
{
	Display.superclass.constructor.call(this);
	
	var element = getEl(_element);
	var controls = [];
	var canvasControl = null;
	
	this.canvas = null;

	if (element)
	{
		this.canvas = new Canvas(element, _writer);
	}
	else
	{	
		error('Unable to find element: ' + _element);
	}
	
	this.visualization = null;
	
	this.getBounds = function()
	{		
		if (this.canvas != null)
		{
			return this.canvas.getBounds();
		}
		else
		{
			return new Bounds(0, 0, 0, 0);
		}
	};
	
	this.addControl = function(control)
	{
		controls.push(control);
		control.display = this;
		return this;
	};
	
	this.setCanvasControl = function(control)
	{
		if (canvasControl != null)
		{						
			this.canvas.container.removeAllListeners();
		}
	
		canvasControl = control;		
		control.display = this;
		this.captureEventsForControl(null, this.canvas.container, canvasControl);
		return this;
	};
	
	this.setVisualization = function(_visualization)
	{
		this.visualization = _visualization;
		this.clear();		
	};

	this.clear = function()
	{		
		if (this.canvas != null)
		{
			this.canvas.clear();			
		}
	};
	
	this.write = function(key, item, params)
	{
		if (this.canvas != null)
		{
			this.canvas.write(key, params);
			this.captureEvents(item);
		}
	};
	
	this.writeHTML = function(item, html)
	{
		if (this.canvas != null)
		{
			this.canvas.writeHTML(html);
			this.captureEvents(item);
		}
	};
	
	this.captureEvents = function(item)
	{		
		if (item == null || item.getId() == null || item.get('ignoreEvents') === true)
		{
			return;
		}
		
		for (var i = 0; i < controls.length; i++)
		{
			var element = getEl(item.getId());	
			if (element == null)
			{
				continue;
			}
			
			this.captureEventsForControl(item, element, controls[i]);
		}
	};
	
	this.captureEventsForControl = function(item, element, control)
	{				
		if (element != null)
		{			
			element.removeAllListeners();
			
			if (item != null && control.isFiltered(item))
			{
				return;
			}

			if (control.itemEntered)
			{					
				element.on('mouseover', function(e) { var fn = this.c.itemEntered(this.i, e); }, {i: item, c: control});
			}

			if (control.itemExited)
			{
				element.on('mouseout', function(e) { var fn = this.c.itemExited(this.i, e); }, {i: item, c: control});
			}

			if (control.itemClicked)
			{
				element.on('click', function(e) { var fn = this.c.itemClicked(this.i, e); }, {i: item, c: control});
			}

			if (control.itemMouseDown)
			{
				element.on('mousedown', function(e) { var fn = this.c.itemMouseDown(this.i, e); }, {i: item, c: control});					
			}

			if (control.itemMouseUp)
			{
				element.on('mouseup', function(e) { var fn = this.c.itemMouseUp(this.i, e); }, {i: item, c: control});
			}

			if (control.itemMouseMove)
			{
				element.on('mousemove', function(e) { var fn = this.c.itemMouseMove(this.i, e); }, {i: item, c: control});
			}	
			
			if (control.itemDoubleClicked)
			{
				element.on('dblclick', function(e) { var fn = this.c.itemDoubleClicked(this.i, e); }, {i: item, c: control});
			}
		}
	};
};

Ext.extend(Display, TypedObject, {
	type : 'Display'
});