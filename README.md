Because your slideshows are boring, make them non-boring.

Uses cesium, based on cesium-starter-app

Expect code to appear in Source/App.js

Local server
------------

A local HTTP server is required to run the app.

Have python installed?  If so, from the `cesium-starter-app` root directory run
```
python -m SimpleHTTPServer
```
(Starting with Python 3, use `python -m http.server 8000`).

Browse to `http://localhost:8000/`

No python?  Use Cesium's node.js server.

* Install [node.js](http://nodejs.org/)
* From the `cesium-starter-app` root directory, run
   * `npm install`
   * `node server.js`

Browse to `http://localhost:8000/`

