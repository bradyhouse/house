"use strict"

const utils =  require('../utils/index');
const pagesService = require('../services/PagesService');
const logger = utils.log;

module.exports.pagesPOST = function (req, res) {
    pagesService.pagesPOST(req.body)
        .then((response) => {
            utils.sleep(2000).then(() => {
                utils.writeJson(res, response);
            });
        })
        .catch((response) => {
            utils.writeJson(res, response);
        })
}