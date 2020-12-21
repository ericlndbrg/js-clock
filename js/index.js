function draw() {
  // declare functions at top, is this good practice?
  function tick() {
    this.console.log(seconds);
    // clear the canvas so that the subsequent calls to tick()
    // don't redraw the same lines over and over again
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(250, 250, 150, startAngle, endAngle, false);
    ctx.stroke();
    endAngle += increment;
    seconds += 1;
    if (endAngle > stopAngle) {
      seconds = 1;
      endAngle = pi / 30;
      return undefined;
    }
    return undefined;
  }
  function clearTickInterval() {
    this.clearInterval(intervalId);
    this.console.log('clearInterval fired');
    return undefined;
  }
  const canvas = this.document.getElementById('canvas-element');
  const button = this.document.getElementById('clear-interval');
  const ctx = canvas.getContext('2d');
  // arc(x, y, radius, startAngle, endAngle, anticlockwise)
  // clearRect(x, y, width, height)
  let seconds = 0;
  const pi = Math.PI;
  const startAngle = 0;
  let endAngle = 0;
  const increment = pi / 30;
  const stopAngle = 2 * pi;
  const intervalId = this.setInterval(tick, 1000);
  button.addEventListener('click', function() {
    clearTickInterval();
  });
  return undefined;
}

draw();
