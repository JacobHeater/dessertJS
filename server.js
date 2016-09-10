(() => {
    var express = require('express');
    var app = express();
    var path = require('path');

    var paths = ['/src', '/examples', '/bin'];
    var defaults = ['/countries', '/singlepage', '/package', '/books', '/multiapp'];
    var port = 1024;

    app.get('/', function(request, response) {
      response.sendFile(path.join(__dirname.concat("/index.html")));
    });
    //Make these directories static so that their files can be served.
    paths.map(p => app.use(p, express.static(__dirname.concat(p))));
    //Redirect the user to the appropriate demo if any of the given default directories are used.
    defaults.map(d => app.get(d, (request, response) => response.redirect(302, `/examples${d}`)));

    app.listen(port, function() {
        console.log(`Listening on port ${port}.`);
    });
})();
