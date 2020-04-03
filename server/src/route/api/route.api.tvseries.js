const tvdbService = require('../../service/service.tvdb');

module.exports = ({ express }) => {
    const router = express.Router();

    router.get('/api/series/', (req, res, next) => {
        tvdbService.searchSeriesByName({
            series: {
                name: req.query.name,
            }
        }).then((serviceResponse) => {
            res.send(serviceResponse)
        })
    });

    router.get('/api/series/:id', (req, res, next) => {
        tvdbService.searchSeriesById({
            series: {
                id: req.params.id
            }
        }).then((serviceResponse) => {
            res.send(serviceResponse)
        })
    });

    router.get('/api/series/:id/episodes', (req, res, next) => {
        tvdbService.getEpisodesForSeriesWithId({
            series: {
                id: req.params.id,
                page: req.query.page || '1'
            }
        }).then((serviceResponse) => {
            res.send(serviceResponse)
        })
    });

    router.get('/api/series/:id/cast', (req, res, next) => {
        tvdbService.getCastForSeriesWithId({
            series: {
                id: req.params.id,
            }
        }).then((serviceResponse) => {
            res.send(serviceResponse)
        })
    });

    return router;
};