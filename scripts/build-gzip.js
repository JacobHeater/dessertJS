(function() {

    'use strict';

    const zlib = require('zlib');
    const fs = require('fs');
    const gzip = zlib.createGzip();

    const input = fs.createReadStream('dist/dessert.min.js');
    const out = fs.createWriteStream('dist/dessert.min.js.gz');

    input.pipe(gzip).pipe(out);

})();
