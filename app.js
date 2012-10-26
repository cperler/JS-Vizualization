function go() {		

	var vss = [ 
			{tag : 'PRO', css : 'shape:roundrect;fillcolor:#ee0000;strokecolor:#2200dd;strokeweight:5;opacity:0.4;arcsize:.3;strokeopacity:0.4;dashstyle:shortdash;'},
			{tag : 'CON', css : 'shape:circle;fillcolor:#00ff33;strokecolor:#ee0000;strokeweight:3;opacity:0.67;filltype:gradient;fillcolor2:red;colors:50% #14f35c;'}
		  ];

	var nodes =
		[
			{id : 1, child_ids : [2, 3, 4], subject : 'Node #1', tag : 'PRO'},
			{id : 2, parent_id : 1, child_ids : [5, 6], subject : 'Node #2', tag : 'CON'},
			{id : 3, parent_id : 1, child_ids : [7], subject : 'Node #3', tag : 'BAD'},
			{id : 4, parent_id : 1, child_ids : [8, 9, 10], subject : 'Node #4', tag : 'PRO'},
			{id : 5, parent_id : 2, subject : 'Node #5', tag : 'CON'},
			{id : 6, parent_id : 2, child_ids : [11], subject : 'Node #6', tag : 'BAD'},
			{id : 7, parent_id : 3, subject : 'Node #7', tag : 'PRO'},
			{id : 8, parent_id : 4, subject : 'Node #8', tag : 'CON'},
			{id : 9, parent_id : 4, subject : 'Node #9', tag : 'BAD'},
			{id : 10, parent_id : 4, subject : 'Node #10', tag : 'PRO'},
			{id : 11, parent_id : 6, subject : 'Node #11', tag : 'CON'}
		];

	var focus = { id : 'focus', width : '30', height : '30', x : '0', y : '0', fillcolor : 'blue', opacity : 0.25};	

	var ddControl = new DragDropControl().addFilter(except('tag'));
	ddControl.onMove = queueFocusedNodes.createDelegate(ddControl, false, true);
	ddControl.onDrop = queueFocusedNodes.createDelegate(ddControl, true, true);

	function queueFocusedNodes(sender, e, fullRender) 
	{		
		var items = this.display.visualization.getLeafItems();

		var queue = [];	
		for (var i = 0; i < items.length; i++)
		{
			var item = items[i];

			var x = item.get('x');
			var y = item.get('y');
			var points = item.get('points');

			if (item != sender)
			{
				var senderX = sender.get('x');
				var senderY = sender.get('y');
				var senderW = sender.get('width');
				var senderH = sender.get('height');

				if (points != null)
				{
					for (var j = 0; j < points.length; j++)
					{
						var point = points[j];
						if (overlaps(point[X_AXIS], point[Y_AXIS], 0, 0, senderX, senderY, senderW, senderH))
						{						
							queue.push(item);
							break;
						}
					}
				}			
				else if (x != false && y != false)
				{
					var w = item.get('width');
					var h = item.get('height');

					if (overlaps(x, y, w, h, senderX, senderY, senderW, senderH))			
					{	
						queue.push(item);					
					}						
				}
			}
		}

		runVizOnNodes(focus_item, queue, fullRender);
	};

	var main_display = new Display('main_window', WriterFactory.getWriter());

	var full_main_display = new Display('main_window', WriterFactory.getWriter())
		.addControl(new HoverControl().addFilter(only('tag')).addFilter(only('fillcolor')));

	var nodeRenderer = new ShapeRenderer(FIT_TO_SHAPE)
		.setTextRenderer(new TextRenderer('subject', new Ext.Template('{subject}')).setTemplate(BOX));

	var fullRenderer = new ShapeRenderer(FIT_TO_SHAPE)	
		.addFilter(only('tag'))
		.setStrokeRenderer(new StrokeRenderer())
		.setFillRenderer(new FillRenderer())	
		.setTextRenderer(new TextRenderer('subject', new Ext.Template('{subject}')));

	var colorize = new Activity('colorize', AS_NEEDED, INFINITY, 30)
		.addFilter(only('fillcolor'))			
		.addAction(new ColorAnimator('fillcolor', .1, true));

	var vizCache = [];
	function runVizOnNodes(sourceItem, items, fullRendering)
	{	
		var name = 'main';
		var display = main_display;
		if (fullRendering === true)
		{
			display = full_main_display;
			name = 'main_fullrender';
		}	

		var viz = vizCache[name];
		if (viz != null)
		{	
			if (viz.display.canvas != null)
			{
				viz.display.canvas.clear();
			}
			viz.stop();
			delete viz;
			delete vizCache[name];
		}

		viz = new Visualization(name);

		for (var i = 0; i < items.length; i++)
		{		
			var item = items[i].clone(true);
			var id = item.get('id');
			if (id != null)
			{
				item.set('id', name + id);
				item.id = item.get('id');
			}		
			viz.addItem(item);
		}	

		var layout = new Activity('layout', 0, ONCE, 1)
			.addAction(new StyleAction(new VSS(vss)))
			.addAction(new ResizeAction(sourceItem, display.getBounds()))
			.addAction(new PaintAction());

		if (fullRendering)
		{
			viz.addRenderer(fullRenderer)
				.addRenderer(new LineRenderer())
				.addActivity(layout, true)
				.addActivity(colorize)              
				.setDisplay(display);
		}
		else
		{
			viz.addRenderer(nodeRenderer)			
				.addRenderer(new LineRenderer())
				.addActivity(layout, true)
				.setDisplay(display);
		}	

		viz.run();

		vizCache[name] = viz;
	};

	var tree = new GraphReader().read(nodes, VisualTree);
	for (var i = 0; i < tree.count(); i++)
	{
		tree.getByIndex(i).set('width', 3);
		tree.getByIndex(i).set('height', 3);
	}
	
	var focus_item = new VisualItem(focus);	

	var focusRenderer = new ShapeRenderer()	
		.addFilter(where('id', ['focus']))
		.setFillRenderer(new FillRenderer());
		
	function focusOnNode(id)
	{
		var node = tree.get(id);

		if (node != null)
		{			
			canvasDoubleClick.itemDoubleClicked(null, {ignoreBounds : true, xy : [node.get('x'), node.get('y')]});
		}
	};
		
	var canvasDoubleClick = new CanvasControl();
	canvasDoubleClick.itemDoubleClicked = function(sender, e) 
	{
		var localX = e.xy[0] - (focus_item.get('width') / 2.0);
		var localY = e.xy[1];
		
		if (e.ignoreBounds == null || e.ignoreBounds === false)
		{		
			var b = this.display.getBounds();		 
	
			var localX = localX - b.x;
			var localY = localY - b.y;
		}
		
		focus_item.set('x', localX);
		focus_item.set('y', localY);
		this.refreshItem(focus_item);
		queueFocusedNodes.createDelegate(this, [focus_item, e, true])();
	};

	var mini_display = new Display('mini_map', WriterFactory.getWriter())
		.setCanvasControl(canvasDoubleClick)
		.addControl(ddControl);

	var miniNodeRenderer = new ShapeRenderer(FIT_TO_SHAPE)	
		.addFilter(only('tag'));

	var miniLayout = new Activity('layout', 0, ONCE, 1)		
		.addAction(new StyleAction())
		.addAction(new NodeTreeLinkLayout('line', 3, 3))		
		.addAction(new PaintAction());

	var mini_viz = new Visualization('mini')                
		.addItem(tree)
		.addItem(new VisualItem(focus))			
		.addActivity(miniLayout, true)
		.addRenderer(miniNodeRenderer)
		.addRenderer(focusRenderer)
		.addRenderer(new LineRenderer())
		.setDisplay(mini_display);

	mini_viz.run();
	
	focusOnNode(1);
};

go();