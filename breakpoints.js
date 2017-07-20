/**
 * Breakpoints Manager 2.0.0
 * Written by Ryan Boylett <boylett.uk>
 */

;var Breakpoints = function(options)
{
	var $this = this;
	
	$this.triggers = [];
	
	$this.breakpoint = '';
	$this.breakpoints = [];

	$this.on = function(breakpoint, callback)
	{
		$this.triggers.push([breakpoint, callback]);

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

	$this.trigger = function(breakpoint)
	{
		for(var i = 0; i < $this.triggers.length; i ++)
		{
			if($this.triggers[i][0] == breakpoint || $this.triggers[i][0] == 'change')
			{
				if($this.triggers[i][1].call(window, breakpoint) === false)
				{
					break;
				}
			}
		}

		return $this;
	};

	$this.update = function()
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

		if(new_breakpoint != $this.breakpoint)
		{
			if($this.triggers.length > 0)
			{
				$this.trigger(new_breakpoint);

				$this.breakpoint = new_breakpoint;
			}
		}

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
