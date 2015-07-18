var viewer = new Cesium.Viewer('cesiumContainer', {
    animation : false,
    baseLayerPicker : false,
    fullscreenButton : true,
    geocoder : false,
    homeButton : false,
    infoBox : false,
    sceneModePicker : false,
    selectionIndicator : false,
    timeline : false,
    terrainProvider : new Cesium.CesiumTerrainProvider({
	url : '//assets.agi.com/stk-terrain/world'
    })
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
function set_destination (location_data) {
    var pos = {
        destination : Cesium.Cartesian3.fromDegrees(
                              location_data.longitude,
                              location_data.latitude,
                              location_data.height),
        orientation : {
        heading : Cesium.Math.toRadians(location_data.heading),
        pitch : location_data.pitch,
        roll : location_data.roll
        }
    }
    return pos
}

function reqListener () {
    locations = JSON.parse(this.responseText);
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "db.json", true);
oReq.send();

var i = 0
document.addEventListener('keydown', function(e) {
    switch(e.keyCode){
    case 'I'.charCodeAt(0):
       show_image('1.jpg', 2760, 1100);
       break;
    case 'M'.charCodeAt(0):
	remove_image();
	break;
    case 'N'.charCodeAt(0):
        viewer.camera.flyTo(set_destination(locations[i]));
        i++;
        if (i >= locations.length) {
            i = 0;
        }
        break;
    }
}, false);
