SVGWriter = function()
{
	SVGWriter.superclass.constructor.call(this);
};

Ext.extend(SVGWriter, Writer, {
	type : 'SVGWriter',
	
	setContainer : function(_container)
	{				
		var container = getEl(_container).dom;
		container.style.MozUserSelect = 'none';
		this.svgNamespace = 'http://www.w3.org/2000/svg';
		this.svgRoot = container.ownerDocument.createElementNS(this.svgNamespace, 'svg');		
		container.appendChild(this.svgRoot);		
		this.container = getEl(_container);
	},
	
	getTemplate : function(_key)	
	{				
		var container = this.container;
		var ns = this.svgNamespace;
		
		switch (_key)
		{
			case 'rect':
				if (this.rect)
				{
					return this.rect;
				}
				else
				{
					this.rect = function(params)
					{												
						var svg = container.dom.ownerDocument.createElementNS(ns, 'rect');
						
						svg.id = params.id;
						svg.setAttributeNS(null, 'x', params.x);
		    				svg.setAttributeNS(null, 'y', params.y);
						svg.setAttributeNS(null, 'width', params.width);
		    				svg.setAttributeNS(null, 'height', params.height);
		    				svg.setAttributeNS(null, 'stroke', 'black');
		    				svg.setAttributeNS(null, 'fill', 'none');		    				
		    				
	        				return svg;
		    			}
		    			return this.rect;
		    		}
			break;
			case 'oval':
				if (this.ellipse)
				{
					return this.ellipse;
				}
				else
				{
					this.ellipse = function(params)
					{
						var svg = container.dom.ownerDocument.createElementNS(ns, 'ellipse');
						
						svg.id = params.id;
						svg.setAttributeNS(null, 'cx', params.cx);
						svg.setAttributeNS(null, 'cy', params.cy);
						svg.setAttributeNS(null, 'rx', params.width / 2.0);
						svg.setAttributeNS(null, 'ry', params.height / 2.0);
						svg.setAttributeNS(null, 'stroke', 'black');
						svg.setAttributeNS(null, 'fill', 'none');		    				

	        				return svg;
					}
					return this.ellipse;
				}
			break;
			case 'roundrect':
				if (this.roundrect)
				{
					return this.roundrect;
				}
				else
				{
					this.roundrect = function(params)
					{												
						var svg = container.dom.ownerDocument.createElementNS(ns, 'rect');
						svg.id = params.id;
						svg.setAttributeNS(null, 'x', params.x);
						svg.setAttributeNS(null, 'y', params.y);
						svg.setAttributeNS(null, 'width', params.width);
						svg.setAttributeNS(null, 'height', params.height);
						svg.setAttributeNS(null, 'rx', params.arcsize * params.width);
						svg.setAttributeNS(null, 'ry', params.arcsize * params.height);
						svg.setAttributeNS(null, 'stroke', 'black');
						svg.setAttributeNS(null, 'fill', 'none');		    				

						return svg;
					}
					return this.roundrect;
			}
			break;
			case 'line':
				if (this.line)
				{
					return this.line;
				}
				else
				{
					this.line = function(params)
					{
						var svg = container.dom.ownerDocument.createElementNS(ns, 'line');
						
						svg.setAttributeNS(null, 'x1', params.x1 + 'px');
						svg.setAttributeNS(null, 'y1', params.y1 + 'px');
						svg.setAttributeNS(null, 'x2', params.x2 + 'px');
						svg.setAttributeNS(null, 'y2', params.y2 + 'px');
						svg.setAttributeNS(null, 'stroke-width', 1);
						svg.setAttributeNS(null, 'stroke', 'black');
							
	        				return svg;
					}
					return this.line;
				}
			break;
			case 'polyline':
				if (this.polyline)
				{
					return this.polyline;
				}
				else
				{
					this.polyline = function(params)
					{
						var svg = container.dom.ownerDocument.createElementNS(ns, 'polyline');
						svg.setAttributeNS(null, 'points', params.points);
						svg.setAttributeNS(null, 'fill', 'none');
						svg.setAttributeNS(null, 'stroke-width', 1);
						svg.setAttributeNS(null, 'stroke', 'black');

						return svg;
					}
					return this.line;
			}
			break;
			case 'curve':
			if (this.bezier)
			{
				return this.bezier;
			}
			else
			{
				this.bezier = function(params)
				{
					var svg = container.dom.ownerDocument.createElementNS(ns, 'path');
					var path = 'M' + params.from + ' C' + params.control1 + ' ' + params.control2 + ' ' + params.to;
					svg.setAttributeNS(null, 'd', path);
					svg.setAttributeNS(null, 'stroke-width', 1);
					svg.setAttributeNS(null, 'stroke', 'black');
					svg.setAttributeNS(null, 'fill', 'none');
					
					return svg;
				}
				return this.bezier;
			}
			break;
			case 'solid':
				if (this.solid)
				{
					return this.solid;
				}
				else
				{
					this.solid = function(params)
					{						
						var svg = getEl(params.addTo);
						if (svg == null)
						{
							return null;
						}
												
						svg.dom.setAttributeNS(null, 'fill', params.fillcolor);
						svg.dom.setAttributeNS(null, 'fill-opacity', params.opacity);
						return null;
					}
					return this.solid;
				}
			break;
			case 'gradient':
				if (this.gradient)
				{
					return this.gradient;
				}
				else
				{
					this.gradient = function(params)
					{
						var svg = getEl(params.addTo);
						if (svg == null)
						{
							return null;
						}
						
						var defs = container.dom.ownerDocument.createElementNS(ns, 'defs');
						this.svgRoot.appendChild(defs);

						var lg = container.dom.ownerDocument.createElementNS(ns, 'linearGradient');
						defs.appendChild(lg);
						
						lg.id = params.addTo + '_gradient';

						var first = container.dom.ownerDocument.createElementNS(ns, 'stop');
						lg.appendChild(first);						
						first.setAttributeNS(null, 'offset', '0%');
						first.setAttributeNS(null, 'stop-color', params.fillcolor);
						
						var colors = params.colors.split(',');
						for (var i = 0; i < colors.length; i++)
						{
							var color = container.dom.ownerDocument.createElementNS(ns, 'stop');
							lg.appendChild(color);
							var colorDetails = colors[i].split(' ');
							color.setAttributeNS(null, 'offset', colorDetails[0]);
							color.setAttributeNS(null, 'stop-color', colorDetails[1]);
						}
						
						var last = container.dom.ownerDocument.createElementNS(ns, 'stop');
						lg.appendChild(last);
						last.setAttributeNS(null, 'offset', '100%');
						last.setAttributeNS(null, 'stop-color', params.fillcolor2);

						svg.dom.setAttributeNS(null, 'fill', 'url(#' + lg.id + ')');
						svg.dom.setAttributeNS(null, 'fill-opacity', params.opacity);
						return null;
					}
					return this.gradient;
				}
			break;
			case 'stroke':
				if (this.stroke)
				{
					return this.stroke;
				}
				else
				{
					this.stroke = function(params)
					{
						var svg = getEl(params.addTo);
						if (svg == null)
						{
							return null;
						}
						
						svg.dom.setAttributeNS(null, 'stroke-width', params.weight);
						svg.dom.setAttributeNS(null, 'stroke', params.color);
						svg.dom.setAttributeNS(null, 'stroke-opacity', params.opacity);
						
						// doesn't work:
						svg.dom.setAttributeNS(null, 'stroke-dasharray', params.dashstyle);
						
						return null;
					}
					return this.stroke;
				}
			break;
			case SPAN:
			case BOX:
				if (this.text)
				{
					return this.text;
				}
				else
				{
					this.text = function(params)
					{
						var svg = container.dom.ownerDocument.createElementNS(ns, 'text');
						
						// TODO: textarea
						var newX = (1 * params.x) + (params.boundingWidth * 0.25);						
						var newY = (1 * params.y) + (params.boundingHeight * 0.3);
						
						svg.setAttributeNS(null, 'x', newX + 'px');																		
						svg.setAttributeNS(null, 'y', newY + 'px');
						svg.setAttributeNS(null, 'font-size', params.fontsize);
						svg.setAttributeNS(null, 'color', params.fontcolor);
						svg.setAttributeNS(null, 'background-color', params.backcolor);
						svg.setAttributeNS(null, 'font-family', params.fontfamily);
						svg.setAttributeNS(null, 'font-weight', params.fontweight);
						
						var text = container.dom.ownerDocument.createTextNode(params.text);
						svg.appendChild(text);
						
						return svg;
					}
					return this.text;
				}
			break;
        	}
        	
        	return null;
	},
	
	write : function(key, params)
	{
		var template = this.getTemplate(key);
		if (template == null)
		{
			return;
		}
		
		var obj = template.createDelegate(this, [params])();
		
		if (obj != null)
		{
			this.writeHTML(obj);

		}
	},
	
	writeHTML : function(obj)
	{			
		this.svgRoot.appendChild(obj);
	}
});