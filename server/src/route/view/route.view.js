
const logger = require('./../../service/service.logger')(__filename)
const path = require('path');

module.exports = ({ express }) => {
    const router = express.Router();

    router.get('/*', (req, res, next) => {
        logger.info('received call for %s', JSON.stringify(req.path));
        res.sendFile(
            'index.dist.html', {
            root: __dirname + '../../../../../web/dist/'
        });
    });

    return router;
};