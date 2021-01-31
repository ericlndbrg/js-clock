(function() {
  const time = this.document.getElementById('time');
  const canvas = this.document.getElementById('canvas');
  canvas.height = null;
  canvas.width = null;
  if (this.innerHeight > this.innerWidth) {
    canvas.height = this.innerWidth;
    canvas.width = this.innerWidth;
  } else if (this.innerWidth > this.innerHeight) {
    canvas.width = this.innerHeight;
    canvas.height = this.innerHeight;
  } else {
    canvas.height = this.innerHeight;
    canvas.width = this.innerWidth;
  }
  const halfCanvasWidth = canvas.width / 2;
  const halfCanvasHeight = canvas.height / 2;
  const pi = Math.PI;
  const ctx = canvas.getContext('2d');
  // the following 3 lines rotate the circles around their center point (source: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate)
  ctx.translate(halfCanvasWidth, halfCanvasHeight); // move matrix's origin to shape's center
  ctx.rotate((3 * pi) / 2); // rotate matrix clockwise by desired amount
  ctx.translate((-1 * halfCanvasWidth), (-1 * halfCanvasHeight)); // move matrix's origin back to its starting point
  const hourHandIncrement = pi / 12;
  const secMinHandIncrement = pi / 30;
  // initialize position of div#time
  time.textContent = '00:00:00';
  time.setAttribute('style', 'top:' + (halfCanvasHeight - (time.clientHeight / 2)) + 'px;' + 'left:' + (halfCanvasWidth - (time.clientWidth / 2)) + 'px;');
  time.textContent = ''; // use relative units to make the font size scale up/down with the canvas width and height
  this.setInterval(tick, 1000);
  function tick() {
    const date = new Date();
    time.textContent = date.toLocaleTimeString([], { hour12: false });
    const hourAngle = date.getHours() * hourHandIncrement;
    const minuteAngle = date.getMinutes() * secMinHandIncrement;
    const secondAngle = date.getSeconds() * secMinHandIncrement;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // prevents redrawing
    drawArc((halfCanvasWidth * 0.9), hourAngle); // hour hand
    drawArc((halfCanvasWidth * 0.6), minuteAngle); // minute hand
    drawArc((halfCanvasWidth * 0.3), secondAngle); // second hand
    function drawArc(radius, endAngle) {
      ctx.beginPath();
      ctx.arc(halfCanvasWidth, halfCanvasHeight, radius, 0, endAngle, false);
      ctx.stroke();
      return undefined;
    }
    return undefined;
  }
  return undefined;
})();
