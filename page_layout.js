PageLayout = function() 
{		
	this.panels = [];

	function container()
	{
		var container = new Ext.BorderLayout(document.body,
		{
			west: {
				autoScroll: true, 
				collapsible: true, 
				collapsed: false, 
				fitToFrame: true, 
				initialSize: '30%', 
				split: true},
			center: {}
		});
		
		container.beginUpdate();
		container.add('west', new Ext.NestedLayoutPanel(get('left')));
		container.add('center', new Ext.NestedLayoutPanel(get('center')));
		container.endUpdate();		

		put('main_window', container);
		return container;
	}
	
	function panel(element, autoScroll)
	{		
		if (autoScroll)
		{
			var panel = new Ext.ContentPanel(element, {fitToFrame:true, autoScroll:true, resizeEl:element});
		}
		else
		{
			var panel = new Ext.ContentPanel(element, {fitToFrame:true});
		}
		put(element, panel);
		return panel;
	}
	
	function infoPanel(element, title)
	{
		var panel = new Ext.ux.InfoPanel(element, {title: title, trigger:'title', collapsed:true});
		panel.body.setStyle('padding', '10px');
		put(element, panel);
		return panel;
	}
	
	function left() 
	{
		var left = new Ext.BorderLayout('left',
		{
			north: {
				autoScroll: true,
				fitToFrame: true, 
				initialSize: '50%', 
				split: true},
			center: {}
		});
		
		left.beginUpdate();
		left.add('north', get('post'));
		left.add('center', get('info'));
		left.endUpdate();		
		
		put('left', left);
		return left;
	}
	
	function center() 
	{		
		var center = new Ext.BorderLayout('center',
		{
			north: {initialSize: '10%'},
			center: {}
		});

		center.beginUpdate();
		center.add('north', get('mini_map'));
		center.add('center', get('main_window'));
		center.endUpdate();
		put('center', center);
		return center;
	}
	
	function put(element, panel)
	{
		this.panels[element] = panel;
	}
	
	function get(name)
	{
		if (this.panels[name])
		{
			return this.panels[name];
		}
		else if (getEl(name))
		{
			return getEl(name);
		}
		
		error('Invalid panel: ' + name + '.');
	}
	
	function setVisibility(panel, value)
	{
		if (panel.getEl())
		{
			panel = panel.getEl();
		}
		
		if (value)
		{
			panel.show();
		}
		else
		{
			panel.hide();
		}
	}
	
	return {
		show : function(name) 
		{
			var panel = get(name);
			if (panel)
			{
				setVisibility(panel, true);
			}
		},
	
		hide : function(name) 
		{
			panel = get(name);
			if (panel)
			{
				setVisibility(panel, false);
			}
		},
	
		init : function() 
		{
			infoPanel('reply', 'Reply');
			infoPanel('tag', 'Tag');
			panel('post', true);
			panel('info', true);
			panel('mini_map', false);
			panel('main_window', false);
			
			left();
			center();
			container();
			
		//	this.hide('info');
		}
	};
}();

PageLayout.init();