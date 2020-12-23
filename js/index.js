function draw() {
  const canvas = this.document.getElementById('canvas-element');
  const button = this.document.getElementById('clear-interval');
  const ctx = canvas.getContext('2d');
  let seconds = 0;
  const pi = Math.PI;
  const startAngle = 0;
  let endAngle = 0;
  const increment = pi / 30;
  const stopAngle = 2 * pi;
  const intervalId = this.setInterval(tick, 1000);
  // rotating a shape around its center: (https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate)
  ctx.translate(250, 250); // move matrix's origin to shape's center
  ctx.rotate((3 * pi) / 2); // rotate matrix clockwise by desired amount
  ctx.translate(-250, -250); // move matrix's origin back to its starting point
  function tick() {
    this.console.log(seconds);
    // clear the canvas so that the subsequent calls to tick()
    // don't redraw the same lines over and over again
    // clearRect(x, y, width, height)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawArc(150);
    drawArc(100);
    drawArc(50);
    function drawArc(radius) {
      ctx.beginPath();
      // arc(x, y, radius, startAngle, endAngle, anticlockwise)
      ctx.arc(250, 250, radius, startAngle, endAngle, false);
      ctx.stroke();
      return undefined;
    }
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
  button.addEventListener('click', function() {
    clearTickInterval();
    return undefined;
  });
  return undefined;
}

draw();
