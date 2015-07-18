
// In an application that uses Viewer:
var viewer = new Cesium.Viewer('cesiumContainer', {
	baseLayerPicker : false,
	terrainProvider : new Cesium.CesiumTerrainProvider({
		url : '//assets.agi.com/stk-terrain/world'
	    })
    });

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
        case 'N'.charCodeAt(0):
            viewer.camera.flyTo(set_destination(locations[i]));
            i++;
            if (i >= locations.length) {
                i = 0;
            }
        break;
    }
}, false);
