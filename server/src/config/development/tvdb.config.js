console.log("process.env", process)

module.exports = {
    credentials: {
        username: process.env.TVDB_USERNAME,
        apikey: process.env.TVDB_API_KEY,
        uniqueId: process.env.TVDB_UNIQUE_ID
    },
    api: {
        login: "https://api.thetvdb.com/login",
        refreshToken: "https://api.thetvdb.com/refresh_token",
        searchSeriesByName: "https://api.thetvdb.com/search/series",
        getSeriesById: (id) => `https://api.thetvdb.com/series/${id}`,
        getEpisodesForSeriesById: (id, page) => `https://api.thetvdb.com/series/${id}/episodes?page=${page}`,
        getCastForSeriesById: (id) => `https://api.thetvdb.com/series/${id}/actors`
    }
}