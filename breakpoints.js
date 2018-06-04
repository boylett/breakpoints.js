/**
 * Breakpoints Manager
 * Version 1.2.2
 * © Ryan Boylett 2018 <http://boylett.uk/>
 */

;var Breakpoints = function(options)
{
	var $this = this;
	
	$this.triggers = [];
	
	$this.breakpoint = '';
	$this.breakpoints = [];

	$this.get = function(key)
	{
		for(var i = 0; i < $this.breakpoints.length; i ++)
		{
			if($this.breakpoints[i][0] == key)
			{
				return $this.breakpoints[i][1];
			}
		}

		return null;
	};

	$this.on = function(breakpoints, callback)
	{
		breakpoints = breakpoints.replace(/\s/g, ',').split(',');

		for(var i = 0; i < breakpoints.length; i ++)
		{
			var breakpoint = breakpoints[i].trim();

			if(breakpoint)
			{
				$this.triggers.push([breakpoint, callback]);
			}
		}

		return $this;
	};

	$this.trigger = function(breakpoints)
	{
		breakpoints = breakpoints.replace(/\s/g, ',').split(',');

		breakpointsloop:
		for(var i = 0; i < breakpoints.length; i ++)
		{
			var breakpoint = breakpoints[i].trim();

			if(breakpoint)
			{
				triggersloop:
				for(var j = 0; j < $this.triggers.length; j ++)
				{
					var trigger = $this.triggers[j];

					if(trigger[0] == breakpoint || trigger[0] == 'change')
					{
						if(trigger[1].call(window, breakpoint) === false)
						{
							break breakpointsloop;
						}
					}
				}
			}
		}

		return $this;
	};

	$this.test = function(breakpoint)
	{
		$this.update();

		if(breakpoint !== undefined)
		{
			return (breakpoint == $this.breakpoint);
		}

		return $this.breakpoint;
	};

	$this.update = function(forced)
	{
		var width          = window.innerWidth,
			new_breakpoint = $this.breakpoint;

		for(var i = 1; i < $this.breakpoints.length; i ++)
		{
			if(width > $this.breakpoints[i][1])
			{
				new_breakpoint = $this.breakpoints[i - 1][0];

				break;
			}
		}

		if(new_breakpoint != $this.breakpoint || forced)
		{
			if($this.triggers.length > 0)
			{
				$this.trigger(new_breakpoint);

				$this.breakpoint = new_breakpoint;
			}
		}

		return $this;
	};

	$this.add = function(key, width)
	{
		$this.breakpoints.push([key, width]);

		$this.breakpoints.sort(function(a, b)
		{
			return b[1] - a[1];
		});

		$this.update();

		return $this;
	};

	$this.remove = function(key)
	{
		var new_bp = [];

		for(var i = 0; i < $this.breakpoints.length; i ++)
		{
			if($this.breakpoints[i][0] != key)
			{
				new_bp.push($this.breakpoints[i]);
			}
		}

		$this.breakpoints = new_bp;

		$this.update();

		return $this;
	};

	$this.set = function(breakpoints)
	{
		if(typeof breakpoints == 'object')
		{
			var sort_bp = [];

			for(var bp_name in breakpoints)
			{
				sort_bp.push([bp_name, breakpoints[bp_name]]);
			}

			sort_bp.push(['zero', 0]);

			sort_bp.sort(function(a, b)
			{
				return b[1] - a[1];
			});

			$this.breakpoints = sort_bp;

			$this.update();
		}

		return $this;
	};

	if(options)
	{
		$this.set(options);
	}

	if(jQuery)
	{
		jQuery(window).on('load resize orientationchange', $this.update);
	}
	else if(window.addEventListener)
	{
		window.addEventListener('orientationchange', $this.update, false);
		window.addEventListener('resize', $this.update, false);
		window.addEventListener('load', $this.update, false);
	}
	else
	{
		window.attachEvent('onorientationchange', $this.update);
		window.attachEvent('onresize', $this.update);
		window.attachEvent('onload', $this.update);
	}
};
