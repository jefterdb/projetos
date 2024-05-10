function createCard() {
    const container = document.getElementById('card-container');
    const card = document.createElement('div');
    card.className = 'card';
    card.style.position = 'absolute';
    card.style.top = '10px'; // initial position
    card.style.left = '10px'; // initial position
  
    const canvas = document.createElement('canvas');
    canvas.width = 120;
    canvas.height = 70;
  
    card.appendChild(canvas);
    container.appendChild(card);
  
    initCanvas(canvas);
  
    card.onmousedown = function(event) {
      let shiftX = event.clientX - card.getBoundingClientRect().left;
      let shiftY = event.clientY - card.getBoundingClientRect().top;
  
      moveAt(event.pageX, event.pageY);
  
      function moveAt(pageX, pageY) {
        card.style.left = pageX - shiftX + 'px';
        card.style.top = pageY - shiftY + 'px';
      }
  
      function onMouseMove(event) {
        moveAt(event.pageX, event.pageY);
      }
  
      document.addEventListener('mousemove', onMouseMove);
  
      card.onmouseup = function() {
        document.removeEventListener('mousemove', onMouseMove);
        card.onmouseup = null;
      };
    };
  
    card.ondragstart = function() {
      return false;
    };
  }
  
  function initCanvas(canvas) {
    const ctx = canvas.getContext('2d');
    let drawing = false;
  
    canvas.onmousedown = function(e) {
      drawing = true;
      ctx.beginPath();
      ctx.moveTo(e.offsetX, e.offsetY);
    };
  
    canvas.onmousemove = function(e) {
      if (drawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      }
    };
  
    canvas.onmouseup = function(e) {
      if (drawing) {
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        drawing = false;
      }
    };
  
    canvas.onmouseleave = function(e) {
      drawing = false;
    };
  }
  