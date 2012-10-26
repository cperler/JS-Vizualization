ColorAnimator = function(_field, _rate, _transitionComplete)
{
	ColorAnimator.superclass.constructor.call(this);
	
	this.field = _field;	
	this.rate = _rate || .1;
	this.transitionComplete = _transitionComplete;
	
	this.rgb = function(r, g, b)
	{
		return new RGBColor('rgb(' + r + ', ' + g + ', ' + b + ')').toHex();
	};
};

Ext.extend(ColorAnimator, Action, {
	process : function(item)
	{
		if (item.isGroup === false)
		{
			var start = item.get(this.field);
			var end = item.get('end:' + this.field);
			var att = WriterFactory.getAttribute(FILLCOLOR);
			
			if (start != null && end != null && start != end)
			{				
				start = new RGBColor(start);
				end = new RGBColor(end);
							
				if (Math.abs(start.r - end.r) < 15 &&
				    Math.abs(start.g - end.g) < 15 &&
				    Math.abs(start.b - end.b) < 15)
				{
					var newColor = this.rgb(end.r, end.g, end.b);
				
            				item.set(this.field, newColor);
            				
					if (this.transitionComplete != null)
					{
						if (this.transitionComplete === true)
						{
							item.set(this.field, item.get('end:' + this.field));
							var el = findEl(getEl(item.getId()), att);
							
							if (el != null)
							{
	            						el.setAttribute(att, newColor);
	            					}
	            					
							this.activity.removeItem(item);
							this.activity.disable();
						}
					}										
					
					return;
				}
															
				var rate = this.rate;
				var irate = 1 - this.rate;
				
				var newColor = this.rgb(
						Math.round(rate * end.r + irate * start.r),
						Math.round(rate * end.g + irate * start.g),
						Math.round(rate * end.b + irate * start.b));

            			item.set(this.field, newColor);
            			var el = findEl(getEl(item.getId()), att);
            			if (el != null)
            			{
            				el.setAttribute(att, newColor);
            			}
			}
			else
			{
				this.activity.removeItem(item);				
			}
		}
	},	
	
	type : 'ColorAnimator'
});

var hit = 0;