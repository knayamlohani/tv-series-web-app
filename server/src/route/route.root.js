
module.exports = ({ express }) => {

    const rootRouter = express.Router();

    const apiRouter = require('./api/route.api.tvseries')({ express });
    rootRouter.use('/', apiRouter);

    const viewRouter = require('./view/route.view')({ express });
    rootRouter.use('/', viewRouter);

    return rootRouter;
};