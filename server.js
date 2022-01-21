var express = require('express');
var app = express();
app.use(express.static('dist/cloud-run-websockets-front'));
app.get('/', function (req, res,next) {
    res.redirect('/');
});
app.listen(8080, () => {
    console.log('Listen on 8080');
});