/**
 * Breakpoints.js 1.0.0
 * Written by Ryan Boylett <ryan@boylett.uk>
 */

(function()
{
	var Breakpoints = [],

	Listener = (window.addEventListener !== undefined) ? 'addEventListener' : 'attachEvent',

	RefreshBreakpoints = function()
	{
		var WindowWidth = window.innerWidth;

		for(var i = 0; i < Breakpoints.length; i ++)
		{
			if(WindowWidth <= Breakpoints[i].width)
			{
				if(!Breakpoints[i].active)
				{
					Breakpoints[i].active = true;
					Breakpoints[i].activate();
				}
			}
			else
			{
				if(Breakpoints[i].active)
				{
					Breakpoints[i].active = false;
					Breakpoints[i].deactivate();
				}
			}
		}

		while(document.documentElement.className.indexOf('  ') > -1)
		{
			document.documentElement.className = document.documentElement.className.replace('  ', ' ').trim();
		}
	};

	window.Breakpoint = function(Width)
	{
		var Breakpoint = this;

		Breakpoint.width = Math.round(parseFloat(Width));

		Breakpoint.active = false;

		Breakpoint.activate = function()
		{
			document.documentElement.className = document.documentElement.className + ' breakpoint-' + Breakpoint.width;
		};

		Breakpoint.deactivate = function()
		{
			document.documentElement.className = document.documentElement.className.replace(new RegExp('(^| )breakpoint-' + Breakpoint.width + '( |$)', 'i'), '$1$2');
		};

		Breakpoint.remove = function()
		{
			var NewList = [];

			for(var i = 0; i < Breakpoints.length; i ++)
			{
				if(Breakpoints[i] != Breakpoint)
				{
					NewList.push(Breakpoints[i]);
				}
			}

			Breakpoints = NewList;
		};

		Breakpoints.push(Breakpoint);
	};

	window[Listener](((Listener == 'attachEvent') ? 'on' : '') + 'resize', RefreshBreakpoints);
	window[Listener](((Listener == 'attachEvent') ? 'on' : '') + 'load', RefreshBreakpoints);
})();
