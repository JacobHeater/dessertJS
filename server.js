(() => {
    var express = require('express');
    var app = express();
    var path = require('path');
    var cmd = require('child_process').exec;

    var paths = ['/src', '/examples'];
    var defaults = ['/examples', '/countries'];
    var port = 1024;

    //Make these directories static so that their files can be served.
    paths.map(p => app.use(p, express.static(__dirname.concat(p))));
    //Redirect the user to the appropriate demo if any of the given default directories are used.
    defaults.map(d => app.get(d, (request, response) => response.redirect(302, `/examples${d}`)));

    app.listen(port, function() {
        console.log(`Listening on port ${port}.`);
        //Open chrome in a new window pointing to the address of our application.
        cmd(`start cmd /c start chrome http://localhost:1024/countries"`, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
        });
    });
})();
