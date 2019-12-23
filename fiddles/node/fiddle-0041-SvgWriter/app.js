(function() {
  const div = document.getElementById('fiddle');
  fetch('paintings.json').then((response) => response.json())
  .then((json) => {
    json.data.forEach((item) => {
      const image = new Image();
      image.src = 'data:image/png;base64,' + item.image;
      image.width = .30 * window.innerWidth;
      image.style = "padding: 5px;";
      div.appendChild(image);
    });
  });
  
})();
