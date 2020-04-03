export const mapSeriesData = (newSeriesData, existingSeriesData) => {

    console.log(newSeriesData, existingSeriesData);

    const basicInfo = newSeriesData?.basicInfo;
    const fullInfo = newSeriesData?.fullInfo;
    let episodes = newSeriesData?.episodes;
    const castMembers = newSeriesData?.castMembers;

    if(existingSeriesData?.episodes) {
        episodes = existingSeriesData?.episodes.concat(episodes || [])
    }

    const episodeCount =  episodes?.length || 0

    console.log("EPISODES ===========", episodes)


    console.log("new series data", newSeriesData);


    console.log("basicInfo", basicInfo, "fullInfo", fullInfo, 'episodes', episodes);


    return {
        currentSeries: {
            id: existingSeriesData?.id || basicInfo?.id || fullInfo?.id,
            seriesId: existingSeriesData?.seriesId || basicInfo?.seriesId || fullInfo?.seriesId,
            seriesName: existingSeriesData?.seriesName || basicInfo?.seriesName || fullInfo?.seriesName,
            aliases: existingSeriesData?.aliases || basicInfo?.aliases || fullInfo?.aliases,
            season: existingSeriesData?.season || basicInfo?.season || fullInfo?.season,
            poster: existingSeriesData?.poster || (basicInfo?.poster ? `https://thetvdb.com${basicInfo?.poster}` : '') || (fullInfo?.poster ? `https://thetvdb.com/banners/${fullInfo?.poster}` : ''),
            banner: existingSeriesData?.banner || basicInfo?.banner || fullInfo?.banner,
            fanart: existingSeriesData?.fanart || basicInfo?.fanart || fullInfo?.fanart,
            status: existingSeriesData?.status || basicInfo?.status || fullInfo?.status,
            firstAired: existingSeriesData?.firstAired || basicInfo?.firstAired || fullInfo?.firstAired,
            network: existingSeriesData?.network || basicInfo?.network || fullInfo?.network,
            networkId: existingSeriesData?.networkId || basicInfo?.networkId || fullInfo?.networkId,
            runtime: existingSeriesData?.runtime || basicInfo?.runtime || fullInfo?.runtime,
            language: existingSeriesData?.language || basicInfo?.language || fullInfo?.language,
            genre: existingSeriesData?.genre || basicInfo?.genre || fullInfo?.genre,
            overview: existingSeriesData?.overview || basicInfo?.overview || fullInfo?.overview,
            lastUpdated: existingSeriesData?.lastUpdated || basicInfo?.lastUpdated || fullInfo?.lastUpdated,
            airsDayOfWeek: existingSeriesData?.airsDayOfWeek || basicInfo?.airsDayOfWeek || fullInfo?.airsDayOfWeek,
            airsTime: existingSeriesData?.airsTime || basicInfo?.airsTime || fullInfo?.airsTime,
            rating: existingSeriesData?.rating || basicInfo?.rating || fullInfo?.rating,
            imdbId: existingSeriesData?.imdbId || basicInfo?.imdbId || fullInfo?.imdbId,
            zap2itId: existingSeriesData?.zap2itId || basicInfo?.zap2itId || fullInfo?.zap2itId,
            added: existingSeriesData?.added || basicInfo?.added || fullInfo?.added,
            addedBy: existingSeriesData?.addedBy || basicInfo?.addedBy || fullInfo?.addedBy,
            siteRating: existingSeriesData?.siteRating || basicInfo?.siteRating || fullInfo?.siteRating,
            siteRatingCount: existingSeriesData?.siteRatingCount || basicInfo?.siteRatingCount || fullInfo?.siteRatingCount,
            slug: existingSeriesData?.slug || basicInfo?.slug || fullInfo?.slug,
            episodes: existingSeriesData?.episodes || episodes,
            episodeCount: episodeCount,
            ...getSeasonsAndCount(episodes),
            castMembers: existingSeriesData?.castMembers || mapCast(castMembers)
        }
    }

};


const getSeasonsAndCount = (episodes) => {
    const seasons = mapSeasons(reduceEpisodesToSeasons(episodes));
    return {
        seasons,
        seasonCount: getSeasonCount(seasons)
    }
};


const mapSeasons = (seasons) => {
    return seasons?.map((season) => {
        return {
            ...season,
            episodes: season.episodes.sort((episode1, episode2) => {
                return episode1.airedEpisodeNumber - episode2.airedEpisodeNumber
            })
        }
    });
};

const reduceEpisodesToSeasons = (episodes) => {
    return episodes?.reduce((seasons, episode) => {
        if (!seasons[episode.airedSeason]) {
            seasons[episode.airedSeason] = {
                seasonNumber: episode.airedSeason,
                seasonID: episode.airedSeasonID,
                seasonKey: `${episode.airedSeasonID}_${episode.airedSeason}`,
                episodes: []
            };
        }
        seasons[episode.airedSeason].episodes.push(mapEpisode(episode));
        return seasons;
    }, [])
};


const getSeasonCount = seasons => {
    if (seasons) {
        console.log("max season", seasons.map((season) => season.seasonNumber).reduce((max, curr) => curr > max ? curr : max));
        return seasons.map((season) => season.seasonNumber).reduce((max, curr) => curr > max ? curr : max);
    } else {
        return null;
    }
};


const mapEpisode = (episode) => {
    return {
        ...episode,
        episodeKey: `${episode.airedSeasonID}_${episode.id}`
    }
};


const mapCast = (castMembers) => {
    return castMembers?.map((castMember) => {
        return {
            ...castMember,
            image: `https://thetvdb.com/banners/${castMember.image}`
        }
    })?.sort((castMember1, castMember2) => {
        return castMember1.sortOrder - castMember2.sortOrder
    })
};