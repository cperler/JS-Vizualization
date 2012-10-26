StyleAction = function(_vss)
{
	StyleAction.superclass.constructor.call(this);
	
	this.vss = _vss;
	this.regex_global = /\w*:[^;]*;/g;
	this.regex = /(\w*):([^;]*);/;
};

Ext.extend(StyleAction, Action, {
	process : function(item)
	{					
		if (item.isGroup === false)
		{
			if (this.vss == null)
			{
				return;
			}

			var tag = item.get('tag');
			var id = item.get('id');

			if (tag)
			{
				for (var i = 0; i < this.vss.length(); i++)
				{
					if (tag == this.vss.getTagAt(i))
					{															
						var style = this.vss.getStyle(i);					
						var matches = style.match(this.regex_global);
						for (var j = 0; j < matches.length; j++)
						{
							var parsed = this.regex.exec(matches[j]);
							item.set(parsed[1], parsed[2]);
						}					
					}
				}
			}		
			else if (id)
			{
				for (var i = 0; i < this.vss.length(); i++)
				{												
					if (id == this.vss.getTagAt(i))
					{
						var style = this.vss.getStyle(i);
						var matches = style.match(this.regex_global);
						for (var j = 0; j < matches.length; j++)
						{
							var parsed = this.regex.exec(matches[j]);
							item.set(parsed[1], parsed[2]);
						}					
					}
				}				
			}			
		}
	},
	
	type : 'StyleAction'
});