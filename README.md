## Vanilla Javascript slide toggle

This uses CSS transitions to smooth slide toggle an element of dynamic height by calculating its height, appending its height an inline style, animating, and then resetting the inline style in both directions. There is a seperate timeout which toggles the display none/block status of the element. In addition, a `window.setTimeout` function is used to prevent spamming or que buildup while animation is taking place.
