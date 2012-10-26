var loadCache = [];

function dll(fn)
{
	var strFn = '' + fn;
	var name = strFn.split(' ')[1].replace('(', '').replace(')', '');
	
	var openBraceIdx = strFn.indexOf('{');
	var start = strFn.substr(0, openBraceIdx) + '{';
	var end = strFn.substr(openBraceIdx + 1);	
	
	if (loadCache[name] == null)
	{	
		loadCache[name] = true;
		var re = new RegExp("new \\w*", "gm");	

		while ((m = re.exec(strFn)) != null)
		{
			var splits = m[0].split(' ');
			var clazz = splits[1];
			if (clazz != null && clazz != '')
			{
				var file = getFileName(clazz);

				if (file != '' && loadCache[file] == null)
				{
					start += ' try { ' + clazz + '.prototype.type; } catch(e) { ' + name + '.defer(1); return; } ';
					if (load(file) === true)
					{	
						self[name] = eval(start + end);
					}
				}
			}
		}
						
		eval(name + '()');
	}
};

function getFileName(clazz)
{
	if (clazz.indexOf('Ext') == 0)
	{
		return '';
	}
	
	var file = '';
	for (var j = 0; j < clazz.length - 1; j++)
	{
		var cur = clazz.charAt(j);
		var next = clazz.charAt(j + 1);

		file += cur;

		if (cur.match(/[a-z]/) && next.match(/[A-Z]/))
		{
			file += '_';
		}

		if (j == clazz.length - 2)
		{
			file += next;
		}
	}
	
	return file.toLowerCase();
};

function load(url) 
{ 		
	url = getFileName(url);
	
	if (loadCache[url] == null)
	{
		loadCache[url] = true;
		var suffixedurl = url + '.js'; 
		var element = document.createElement('script'); 
		element.src = suffixedurl; 
		element.type = 'text/javascript'; 
		document.getElementsByTagName('head')[0].appendChild(element);		
		return true;
        }
        
        return false;
};

LOAD_ALL = true;

Ext.onReady(function() {
	load('Constants'); 
	load('Math'); 
	load('Viz');
	load('Logger'); 
	load('TypedObject'); 
	load('Item'); 
	load('VisualItem'); 
	load('Node'); 
	load('VisualNode'); 
	load('Graph'); 
	load('VisualGraph'); 
	load('Tree');
	load('VisualTree');	
	load('Vss'); 
	load('Bounds'); 
	load('Action'); 
	load('Layout'); 
	load('Rgbcolor');
	load('Activity');
	load('Renderer'); 
	load('Reader');
	load('Visualization');
	load('Writer');
	load('VmlWriter');
	load('SvgWriter');
	load('WriterFactory');
	load('Canvas');
	load('Control');
	load('Display');

	if (LOAD_ALL === true)
	{		
		load('StyleAction'); 
		load('AxisLayout'); 
		load('CircleLayout');
		load('RandomLayout');
		load('GridLayout');
		load('NodeTreeLinkLayout');	
		load('PaintAction');
		load('ResizeAction');
		load('ColorAnimator');
		load('TextRenderer');
		load('FillRenderer'); 
		load('StrokeRenderer'); 
		load('ShapeRenderer');
		load('LineRenderer');
		load('GraphReader');
		load('HoverControl');
		load('DragDropControl');
		load('CanvasControl');
	}
	
	load('PageLayout');
	load('App');
});