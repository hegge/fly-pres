var imgpath = "paths/storebjorn/"
var jsonfilepath = imgpath+"storebjorn.json"

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
        document.body.appendChild(img);
    }
    img.id = "fullscreenImage";
    img.src = src;
    img.alt = "image";
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

function set_view_destination (location_data) {
    var pos = {
        destination : Cesium.Cartesian3.fromDegrees(
                              location_data.longitude,
                              location_data.latitude,
                              location_data.height),
        orientation : {
        heading : Cesium.Math.toRadians(location_data.heading),
        pitch : location_data.pitch,
        roll : location_data.roll
        },
        duration: 3,
        complete : show_next_image,
    }
    return pos
}

function show_next_image () {
    show_image(imgpath+locations[i].filename)
}

function zoom_rectangle (rect, zoom_factor) {
    return new Cesium.Rectangle(
        rect.west - rect.width * zoom_factor,
        rect.south - rect.height * zoom_factor,
        rect.east + rect.width * zoom_factor,
        rect.north + rect.height * zoom_factor
    )
}

function set_overview () {
    var point_array = [];
    for (i=0; i < locations.length; i++){
        point_array.push(Cesium.Cartographic.fromDegrees(locations[i].longitude,locations[i].latitude))
    }
    var minimal_dest = Cesium.Rectangle.fromCartographicArray(point_array);
    var dest = zoom_rectangle(minimal_dest, 0.3); // Zoom out overview by 30%.
    var pos = {
        destination : dest,
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
oReq.open("get", jsonfilepath, true);
oReq.send();

var i = -1
document.addEventListener('keydown', function(e) {
    switch(e.keyCode){
    case 'I'.charCodeAt(0):
       show_image(imgpath+locations[i].filename);
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
    case 'V'.charCodeAt(0):
        remove_image();
        i++;
        if (i >= locations.length) {
            i = 0;
        }
        viewer.camera.flyTo(set_view_destination(locations[i]));
        break;
    case 'C'.charCodeAt(0):
        remove_image();
        i--;
        if (i == -1) {
            i = locations.length-1;
        }
        viewer.camera.flyTo(set_view_destination(locations[i]));
        break;
    case 'O'.charCodeAt(0):
        remove_image();
        viewer.camera.flyTo(set_overview());
        break;
    }
}, false);

