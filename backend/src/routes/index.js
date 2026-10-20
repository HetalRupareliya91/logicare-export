const fs = require('fs');
const path = require('path');
const router = require('express').Router();

// Auto-register every *Routes.js file in this folder
fs.readdirSync(__dirname)
  .filter((file) => file.endsWith('Routes.js'))
  .forEach((file) => {
    const mod = require(path.join(__dirname, file));
    router.use(mod.basePath, mod.router);
  });

module.exports = router;
