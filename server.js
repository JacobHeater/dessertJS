(() => {
    var express = require('express');
    var app = express();
    var path = require('path');

    var paths = ['/src', '/examples', '/bin', '/lib'];
    var defaults = ['/comprehensive'];
    var port = 1025;

    app.get('/', function(request, response) {
        //We're using the framework to drive the examples.
        //Redirect the user to the comprehensive example single page app.
        response.redirect("/examples/comprehensive");
        response.end();
    });
    //Make these directories static so that their files can be served.
    paths.map(p => app.use(p, express.static(__dirname.concat(p))));
    //Redirect the user to the appropriate demo if any of the given default directories are used.
    defaults.map(d => app.get(d, (request, response) => response.redirect(302, `/examples${d}`)));

    app.listen(process.env.PORT || port, function() {
        console.log(`Listening on port ${port}.`);
    });
})();
