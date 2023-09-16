(function() {
  function Arc(radius, increment, timeValue = 0, angle = 0) {
    this.radius = radius;
    this.increment = increment;
    this.timeValue = timeValue;
    this.angle = angle;
  }

  Arc.prototype.updateTimeValue = function(newTimeValue) {
    this.timeValue = newTimeValue;
    return undefined;
  };

  Arc.prototype.recalculateAngle = function() {
    this.angle = this.timeValue * this.increment;
    return undefined;
  };

  Arc.prototype.drawArc = function(ctx) {
    ctx.beginPath();
    ctx.arc(250, 250, this.radius, 0, this.angle, false);
    ctx.stroke();
    return undefined;
  };

  var pi = Math.PI;

  var hourHandIncrement = pi / 12;
  var secMinHandIncrement = pi / 30;

  var time = this.document.getElementById('time');

  var canvas = this.document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  // the following 3 lines rotate the matrix clockwise by 270 degrees
  // the arcs won't begin at 12 o'clock if I don't do this
  // source: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rotate
  ctx.translate(250, 250); // move matrix's origin to shape's center
  ctx.rotate((3 * pi) / 2); // rotate matrix clockwise by desired amount
  ctx.translate(-250, -250); // move matrix's origin back to its starting point

  var secondArc = new Arc(158, secMinHandIncrement);
  var minuteArc = new Arc(178, secMinHandIncrement);
  var hourArc = new Arc(198, hourHandIncrement);

  this.setInterval(function() {
    // clear the canvas to prevent redrawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var date = new Date();
    time.textContent = date.toLocaleTimeString([], { hour12: false });

    [
      [secondArc, date.getSeconds()],
      [minuteArc, date.getMinutes()],
      [hourArc, date.getHours()]
    ].forEach(function(arcUpdateArr) {
      // update the arc if it's stale
      if (arcUpdateArr[0].timeValue != arcUpdateArr[1]) {
        arcUpdateArr[0].updateTimeValue(arcUpdateArr[1]);
        arcUpdateArr[0].recalculateAngle();
      }
      // draw the arc
      arcUpdateArr[0].drawArc(ctx);
    });

    // dereference the date object, not sure how much good this does
    date = null;

    return undefined;
  }, 1000);

  return undefined;
})();
