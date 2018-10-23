# breakpoints.js
Lightweight library for breakpoint detection.

### Installation & Initialization
Add the following script tag to your `<head>` element:
```html
<script type="text/javascript" src="breakpoints.js"></script>
```

Now, in your site's JavaScript file or wherever you're doing your dirty work, create a new instance and supply some breakpoints:
```js
var breakpoints = new Breakpoints(
{
    desktop: 1920,
    tablet:  768,
    mobile:  375
});
```

You can call a breakpoint whatever you like, it won't mind. I tend to stick with `desktop`, `tablet` and `mobile` but have also opted for things like `potato` or `wumbomonitor` in the past.

If you change your mind halfway through a document and want to use a new set of breakpoints, try this one easy trick!
```js
breakpoints.set(
{
    ipadpro:    1024,
    ipadair:    768,
    applewatch: 272,
    tamagotchi: 32
});
```

### Event Binding
In order to actually _use_ this library, we'll need to do some binding:
```js
breakpoints.on('desktop', function()
{
    console.log("Look ma, no touchscreen!", window.innerWidth);
});
```

`Breakpoints.js` now supports Daisychaining™! Be a cool kid and keep all your functions together:
```js
breakpoints.on('mobile', function()
{
    console.log("I'm a smartphone!");
})
.on('tablet', function()
{
    console.log("I'm a tablet!");
})
.on('desktop', function()
{
    console.log("I'm a desktop!");
});
```

Are you looking for a breakpoint detection method without having to specify a breakpoint name? Then we've got the solution for you!
```js
breakpoints.on('change', function(breakpoint)
{
    console.log("I used to be a great", breakpoint, "but then I took an arrow to the knee.");
});
```

`Breakpoints.js` updates when the page loads, when a change in window size is detected and when the device's orientation changes. Gotta be progressive.
