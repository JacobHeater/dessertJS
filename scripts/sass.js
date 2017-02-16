(() => {

    'use strict';

    const sass = require('node-sass');
    const fs = require('fs');
    const sourcePath = './examples/comprehensive/styles/index.scss';
    const destPath = './examples/comprehensive/styles/index.css';

    sass.render({
        file: sourcePath
    }, (error, result) => {

        if (!error) {
            fs.writeFile(destPath, result.css, (err) => {
                if (!err) {
                    console.log(`index.css written to path ${destPath}.`);
                }
            });
        }

    });

})();