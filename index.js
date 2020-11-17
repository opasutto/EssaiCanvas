
var c = document.getElementById("c"),
  width = 640 * 1.0,
  height = 480 * 1.0;

document.getElementById("c").onmousemove = function(event) {mouseMove(event)};

// Get a context in order to generate a proper data array. We aren't going to
// use traditional Canvas drawing functions like `fillRect` - instead this
// raytracer will directly compute pixel data and then put it into an image.
c.width = width;
c.height = height;
var ctx = c.getContext("2d"),
  data = ctx.getImageData(0, 0, width, height);

var lastMouseX;
var lastMousey;

const rect = document.getElementById("c").getBoundingClientRect();
  
 function mouseMove(e) {
  lastMouseX = Math.round((e.clientX - rect.x) * (width / rect.width));
  lastMouseY = Math.round((e.clientY - rect.y) * (height / rect.height));
  
  var coor = "Coordinates: (" + lastMouseX + "," + lastMouseY + ")";
  document.getElementById("debugStr").innerHTML = coor;
  
  render(false);
}

function render(first) {
    if (first)
    {
        for (var x = 0; x < width; x++) {
            for (var y = 0; y < height; y++) {
                index = x * 4 + y * width * 4;
                data.data[index + 0] = ((Math.cos((x * Math.PI * 4) / width) + 1) * 63) + ((Math.sin((y * Math.PI * 3) / height) + 1) * 63);
                data.data[index + 1] = (x * 255) / width;
                data.data[index + 2] = (y * 255) / height;
                data.data[index + 3] = 255;
            }
        }
    }
    else
    {
        index = lastMouseX * 4 + lastMouseY * width * 4;
        var tmp = data.data[index + 0];
        data.data[index + 0] = 255 - data.data[index + 0];
        data.data[index + 1] = 255 - data.data[index + 1];
        data.data[index + 2] = 255 - data.data[index + 2];
        data.data[index + 3] = 255;
    }

    // Now that each ray has returned and populated the `data` array with
    // correctly lit colors, fill the canvas with the generated data.
    ctx.putImageData(data, 0, 0);
}

render(true);