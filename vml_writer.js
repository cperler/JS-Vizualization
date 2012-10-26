VMLWriter = function()
{	
	VMLWriter.superclass.constructor.call(this);
	
	this.rectStart = new Ext.Template('<v:{shape} id="{id}" style={style}>');
	this.rectStart.compile();
	this.rectEnd = new Ext.Template('</v:{shape}>');
	this.rectEnd.compile();
	this.roundrectStart = new Ext.Template('<v:{shape} id={id} style={style} arcsize={arcsize}');         
	this.roundrectStart.compile();
	this.lineStart = new Ext.Template('<v:{shape} style={style} from="{from}" to="{to}">');
	this.lineStart.compile();
	this.lineEnd = this.rectEnd;
	this.polyline = new Ext.Template('<v:{shape} style={style} points="{points}"></v:{shape}>');
        this.polyline.compile();
        this.bezier = new Ext.Template('<v:{shape} style={style} from="{from}" control1="{control1}" control2="{control2}" to="{to}"></v:{shape}>');
        this.bezier.compile();
	this.solid = new Ext.Template('<v:fill type="{filltype}" color="{fillcolor}" opacity="{opacity}"/>');
	this.solid.compile();
	this.gradient = new Ext.Template('<v:fill type="{filltype}" color="{fillcolor}" color2="{fillcolor2}" opacity="{opacity}" colors="{colors}"/>');
	this.gradient.compile();
	this.stroke = new Ext.Template('<v:stroke color="{color}" weight="{weight}" opacity="{opacity}" dashstyle="{dashstyle}"/>');
	this.stroke.compile();
	this.span = new Ext.Template('<span id={id} class={className} style="position:absolute;left:{x};top:{y};font-size:{fontsize};' +
		'font-family:{fontfamily};font-weight:{fontweight};color:{fontcolor};background-color:{backcolor};">{text}</span>');
	this.span.compile();
	this.box = new Ext.Template('<v:textbox><span id={id} class={className} style="font-size:{fontsize};' +
		'font-family:{fontfamily};font-weight:{fontweight};color:{fontcolor};background-color:{backcolor};">{text}</span></v:textbox>');
	this.box.compile();
};

Ext.extend(VMLWriter, Writer, {
	type : 'VMLWriter',
	
	setContainer : function(_container)
	{	
		this.container = _container;
		
		if (this.container.dom.ownerDocument.namespaces != null)
		{
			if (this.container.dom.ownerDocument.namespaces['v'] == null)
			{
				this.container.dom.ownerDocument.namespaces.add("v", "urn:schemas-microsoft-com:vml");	
				var style = this.container.dom.ownerDocument.createStyleSheet();
				style.addRule('v\\:*', "behavior: url(#default#VML);");	
			}
		}
	},
	
	getTemplate : function(key)	
	{
		switch (key)
		{
			case 'oval':
			case 'rect':			
				return [this.rectStart, this.rectEnd];
			break;
			case 'roundrect':
				return [this.roundrectStart, this.rectEnd];
			break;
			case 'line':
				return [this.lineStart, this.lineEnd];
			break;
			case 'polyline':
				return [this.polyline];
			break;
			case 'curve':
				return [this.bezier];
			break;
			case 'solid':
				return [this.solid];
			break;
			case 'gradient':
				return [this.gradient];
			break;
			case 'stroke':
				return [this.stroke];
			break;
			case 'span':
				return [this.span];
			break;
			case 'box':
				return [this.box];
			break;
        	}
        	
        	return null;
	},
	
	write : function(key, params)
	{		
		var templates = this.getTemplate(key);
		
		if (templates == null)
		{			
			return;
		}
		
		var html = '';		
				
		if (templates[START])
		{
			html += templates[START].applyTemplate(params);
		}
		
		if (templates[END])
		{
			html += templates[END].applyTemplate(params);
		}

		if (params.addTo && params.addTo != null)
		{				
			var parentEl = getEl(params.addTo);
			Ext.DomHelper.append(parentEl, html);			
		}
		else
		{			
			this.writeHTML(html);
		}
	},
	
	writeHTML : function(_html)
	{	
		var block = Ext.DomHelper.append(this.container, _html);
		Ext.DomHelper.applyStyles(block, 'visibility:visible');
	}
});