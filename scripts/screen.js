const window_resize = event => {
  const canvas = document.getElementById('canvas');
  canvas.width = canvas.height = 1;
  const width = $(canvas).parent().width();
  const height = $(canvas).parent().height();
  canvas.width = width; canvas.height = ( width / example.aspectRatio.width ) * example.aspectRatio.height;
  canvas.getContext('2d').setTransform(canvas.width / example.resolution.width, 0, 0, canvas.width / example.resolution.width, 0, 0);
  console.log(canvas.width/example.resolution.width)
  canvas.dispatchEvent( new Event('Render'));
}
