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

function find_width() {
    return [window.innerWidth, window.innerHeight];
}

function show_image(src) {
    var img = document.getElementById("fullscreenImage");
    if (img == null) {
        img = document.createElement("img");
        img.id = "fullscreenImage";
        document.getElementById('image_container').appendChild(img);
    }
    img.id = "fullscreenImage";
    img.src = src;
    img.alt = "image";

    var screen_size = find_width();
    img.height = screen_size[1] * 0.9;

    img.style.position = "relative";
    img.style.top = "20px";
    img.style.align = "center";
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
                              location_data.latitude-0.015,
                              5000),
        orientation : {
        heading : Cesium.Math.toRadians(0),
        pitch : Cesium.Math.toRadians(-45),
        roll : location_data.roll
        },
        duration: 3,
        complete : show_next_image,
    }
    return pos
}

function show_next_image () {
    show_image(locations[i].filename)
}

function set_overview () {
    var point_array = [];
    for (i=0; i < locations.length; i++){
        point_array.push(Cesium.Cartographic.fromDegrees(locations[i].longitude,locations[i].latitude))
    }
    var pos = {
        destination : Cesium.Rectangle.fromCartographicArray(point_array),
        orientation : {
        heading : Cesium.Math.toRadians(0),
        pitch : Cesium.Math.toRadians(-90),
        roll : 0,
        },
        duration: 3,
    }
    return pos
}


viewer.camera.frustum.fov = 2

function add_markers() {
for (i=0; i < locations.length; i++){
    var entity = viewer.entities.add({
        position : Cesium.Cartesian3.fromDegrees(locations[i].longitude, locations[i].latitude),
        label : {
            text : '',
            verticalOrigin : Cesium.VerticalOrigin.TOP
        },
        billboard : {
            image : 'point.png',
            verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
        }
    });
}
}

function reqListener () {
    locations = JSON.parse(this.responseText);
    add_markers()
}

var oReq = new XMLHttpRequest();
oReq.onload = reqListener;
oReq.open("get", "db.json", true);
oReq.send();

var i = -1
document.addEventListener('keydown', function(e) {
    switch(e.keyCode){
    case 'I'.charCodeAt(0):
       show_image(locations[i].filename);
       break;
    case 'M'.charCodeAt(0):
        remove_image();
        break;
    case 'N'.charCodeAt(0):
        remove_image();
        i++;
        if (i >= locations.length) {
            i = 0;
        }
        viewer.camera.flyTo(set_destination(locations[i]));
        break;
    case 'O'.charCodeAt(0):
        viewer.camera.flyTo(set_overview());
        break;
    }
}, false);

