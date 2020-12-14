function draw() {
  var canvas = this.document.getElementById('canvas-element');
  var button = this.document.getElementById('clear-interval');
  var ctx = canvas.getContext('2d');
  // arc(x, y, radius, startAngle, endAngle, anticlockwise)
  // clearRect(x, y, width, height)
  var endAngle = Math.PI / 30;
  var increment = Math.PI / 30;
  var stopAngle = 2 * Math.PI;
  var intervalId = this.setInterval(tick, 1000);
  button.addEventListener('click', function() {
    clearTickInterval();
    return undefined;
  });
  function tick() {
    if(endAngle > stopAngle) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      endAngle = Math.PI / 30;
      return undefined;
    }
    // clear the canvas so that the subsequent calls to tick()
    // don't redraw the same lines over and over again
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(250, 250, 150, 0, endAngle, false);
    ctx.stroke();
    endAngle += increment;
    return undefined;
  }
  function clearTickInterval() {
    this.clearInterval(intervalId);
    this.console.log('clearInterval fired');
    return undefined;
  }
  return undefined;
}

draw();
