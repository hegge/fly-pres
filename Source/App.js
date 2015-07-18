
// In an application that uses Viewer:
var viewer = new Cesium.Viewer('cesiumContainer', {
	baseLayerPicker : false,
	terrainProvider : new Cesium.CesiumTerrainProvider({
		url : '//assets.agi.com/stk-terrain/world'
	    })
    });
