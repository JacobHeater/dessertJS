(() => {

    'use strict';

    const express = require('express');
    const app = express();
    const PORT = process.env.PORT || 4545;
    const STATIC = ['/lib', '/dist', '/examples'];

    STATIC.forEach(path => app.use(path, express.static(`${__dirname}/${path}`)));

    app.get('/', (req, res) => res.sendFile(`${__dirname}/index.html`));

    app.get('/examples/hello-world', (req, res) => res.sendfile('/examples/hello-world/index.html'));

    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`));

})();