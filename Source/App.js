var cesiumWidget = new Cesium.Viewer('cesiumContainer', {
	animation : false,
	baseLayerPicker : false,
	fullscreenButton : true,
	geocoder : false,
	homeButton : false,
	infoBox : false,
	sceneModePicker : false,
	selectionIndicator : false,
	timeline : false
});

function show_image(src, width, height) {
    var img = document.createElement("img");
    img.id = "fullscreenImage";
    img.src = src;
    img.width = width;
    img.height = height;
    img.alt = "image";

    img.style.position = "absolute";
    img.style.left = "0px";
    img.style.top = "0px";

    document.body.appendChild(img);
}

function remove_image() {
	var img = document.getElementById("fullscreenImage");
        if (img !== null) {
                img.parentNode.removeChild(img);
        }
}

document.addEventListener('keydown', function(e) {
    switch(e.keyCode){
    case 'I'.charCodeAt(0):
       show_image('1.jpg', 2760, 1100);
       break;
    case 'M'.charCodeAt(0):
       remove_image();
       break;
    }
}, false);
