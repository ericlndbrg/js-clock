(function() {
  const time = this.document.getElementById('time');
  const canvas = this.document.getElementById('canvas');
  const pi = Math.PI;
  const hourHandIncrement = pi / 12;
  const secMinHandIncrement = pi / 30;
  const ctx = canvas.getContext('2d');

  // the following 3 lines rotate the circles around their center point (source: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate)
  ctx.translate(250, 250); // move matrix's origin to shape's center
  ctx.rotate((3 * pi) / 2); // rotate matrix clockwise by desired amount
  ctx.translate(-250, -250); // move matrix's origin back to its starting point

  this.setInterval(function() {
    const date = new Date();
    time.textContent = date.toLocaleTimeString([], { hour12: false });
    const hourAngle = date.getHours() * hourHandIncrement;
    const minuteAngle = date.getMinutes() * secMinHandIncrement;
    const secondAngle = date.getSeconds() * secMinHandIncrement;
    ctx.clearRect(0, 0, canvas.width, canvas.height); // prevents redrawing
    drawArc(198, hourAngle); // hour hand
    drawArc(132, minuteAngle); // minute hand
    drawArc(66, secondAngle); // second hand
    return undefined;
  }, 1000);

  function drawArc(radius, endAngle) {
    ctx.beginPath();
    ctx.arc(250, 250, radius, 0, endAngle, false);
    ctx.stroke();
    return undefined;
  }

  return undefined;
})();
