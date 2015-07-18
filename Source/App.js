
// In an application that uses Viewer:
var viewer = new Cesium.Viewer('cesiumContainer', {
	baseLayerPicker : false,
	terrainProvider : new Cesium.CesiumTerrainProvider({
		url : '//assets.agi.com/stk-terrain/world'
	    })
    });

var pos1 = {
    destination : Cesium.Cartesian3.fromDegrees(10.41651047, 63.43911310, 1000),
    orientation : {
	heading : 0.0,
	pitch : Cesium.Math.PI_OVER_FIVE,
	roll : 0.0
    }
}

var pos2 = {
    destination : Cesium.Cartesian3.fromDegrees(10.41651047, 63.43911310, 500),
    orientation : {
	heading : 0.0,
	pitch : 0.0,
	roll : Cesium.Math.PI_OVER_FOUR
    }
}
var posA = {
    destination : Cesium.Cartesian3.fromDegrees(10.788634, 59.876789, 1000),
    orientation : {
	heading : 0.0,
	pitch : 0.0,
	roll : 0.0
    }
}
var posB = {
    destination : Cesium.Cartesian3.fromDegrees(10.789788, 59.968241, 1000),
    orientation : {
	heading : Cesium.Math.toRadians(315),
	pitch : 0.0,
	roll : 0.0
    }
}
var posC = {
    destination : Cesium.Cartesian3.fromDegrees(8.391132, 61.170962, 1000),
    orientation : {
	heading : Cesium.Math.toRadians(45),
	pitch : 0.0,
	roll : 0.0
    }
}
var posD = {
    destination : Cesium.Cartesian3.fromDegrees(8.371959, 61.202269, 1000),
    orientation : {
	heading : Cesium.Math.toRadians(180),
	pitch : 0.0,
	roll : 0.0
    }
}

var pos_list = [posA, posB, posC, posD]
var i = 0
document.addEventListener('keydown', function(e) {
    switch(e.keyCode){
    case 'A'.charCodeAt(0):
	viewer.camera.flyTo(pos1);
	break;
    case 'B'.charCodeAt(0):
	viewer.camera.flyTo(pos2);
	break;
    case 'N'.charCodeAt(0):
	viewer.camera.flyTo(pos_list[i]);
	i++;
	break;
    }
}, false);
