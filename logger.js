LogLevels = [];
LogLevels['debug'] = 1;
LogLevels['info'] = 2;
LogLevels['error'] = 3;

function log(level, msg, format)
{
	var d = new Date();
	var h = d.getHours();
	var m = d.getMinutes();
	var s = d.getSeconds();
	var ms = d.getMilliseconds();
	msg = h + ':' + m + ':' + s + '.' + ms + ' [' + level + '] ' + msg;
	
	if (format)
	{
		msg = '<' + format + '>' + msg + '</' + format + '>';
	}
	
	if (LogLevels[level] >= LOG_LEVEL)
	{
		console.log(msg);
	}
};

function debug(msg, format)
{
	log('debug', msg, format);
};

function info(msg)
{
	log('info', msg, 'span style="font-weight:bold;color:blue"');
};

function error(msg)
{
	log('error', msg, 'span style="font-weight:bold;color:red"');
};

function logOn()
{
	console.show();
};

function logOff()
{
	console.hide();
};