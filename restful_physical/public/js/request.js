  var x = 500;
  var y = 500;
  var request = new XMLHttpRequest();

  function setPos(name, value) {
    request.open("POST", '/position/' + name + "/" + value, true);
    // close the request:
    request.send(null);
  }

  function up() {
    y += 20;
    check();
    console.log("y", y);
    setPos("y", y);
  }

  function left() {
    x -= 20;
    check();
    console.log("x", x);
    setPos("x", x);
  }

  function right() {
    x += 20;
    check();
    console.log("x", x);
    setPos("x", x);
  }

  function down() {
    y -= 20;
    check();
    console.log("y", y);
    setPos("y", y);
  }

  function check() {
    if (x < 0) x = 0;
    if (x > 1000) x = 1000;
    if (y < 0) y = 0;
    if (y > 1000) y = 1000;
  }

  function makeRecord() {
    var name = document.getElementById('nameInput').value;
    request.open("POST", '/record/' + name + '/' + x + '/' + y, true);
    // close the request:
    request.send(null);
  }

  function getRecord() {
    var name = document.getElementById('nameFind').value;
    request.open("GET", '/record/' + name, true);
    // close the request:
    request.send(null);
  }