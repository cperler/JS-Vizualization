ShapeRenderer = function(_expandForText) 
{ 
        ShapeRenderer.superclass.constructor.call(this); 
                         
        this.expandForText = (_expandForText == null) ? true : _expandForText;
        
        this.fillRenderer = null;
        this.strokeRenderer = null;
        this.textRenderer = null;
        
        this.setFillRenderer = function(renderer)
        {        	
        	this.fillRenderer = renderer;
        	return this;
        };
        
        this.setStrokeRenderer = function(renderer)
	{
	        this.strokeRenderer = renderer;
	        return this;
        };
        
        this.setTextRenderer = function(renderer)
	{
	        this.textRenderer = renderer;
	        this.textRenderer.setTemplate(BOX);
	        return this;
        };
};

Ext.extend(ShapeRenderer, Renderer, { 
        render : function(display, item, write) 
        {
                var params = {};

                params.id = this.getId(item);
                params.shape = this.getShape(item);
                params.arcsize = this.getArcSize(item);
                params.x = item.get('x');
                params.y = item.get('y');
                params.width = item.get('width');
                params.height = item.get('height');
                params.cx = params.x + (0.5 * params.width);
                params.cy = params.y + (0.5 * params.height);
                
                switch (params.shape)
                {
                        case 'rect':
                        case 'roundrect':
                                params.style = '"position:absolute; width: ' + params.width + 'px; height: ' + params.height + 'px; left: ' + params.x + '; top: ' + params.y + '"';
                                break;
                        case 'oval':
                        case 'ellipse':
                        case 'circle':
                                params.style = '"position:absolute; width: ' + params.width + 'px; height: ' + params.height + 'px; left: ' + params.x + '; top: ' + params.y + '"';
                                params.shape = 'oval';
                                break;
                        default:
                                return;
                }
                
                display.write(params.shape, item, params);
                
                if (this.fillRenderer)
                {                	
                	this.fillRenderer.render(display, item, false);
                }
                
                if (this.strokeRenderer)
                {
                	this.strokeRenderer.render(display, item, false);
                }
                
                if (this.textRenderer)
                {
                	this.textRenderer.render(display, item, false);
                	
			var textElement = getEl(this.textRenderer.getId(item));
			var shapeElement = getEl(this.getId(item));

			if (this.expandForText === true)
			{
				item.set('width', textElement.getWidth() + 20);
				shapeElement.setStyle('width', textElement.getWidth() + 20 + 'pt');
				item.set('height', textElement.getHeight() + 20);
				shapeElement.setStyle('height', textElement.getHeight() + 20 + 'pt');
			}
			else if (textElement != null)
			{				
				textElement.up('textbox').setStyle('text-overflow', 'ellipsis');
			}
                }
        },
        
        getShape : function(item) 
        {                               
                return this.get(item, 'shape', 'rect'); 
        }, 
        
        getId : function(item) 
	{
		return this.get(item, 'id', create_id());
	},               
        
        getArcSize : function(item) 
        { 
                return this.get(item, 'arcsize', '0'); 
        },
               
        type : 'ShapeRenderer'
});