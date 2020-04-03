import React from 'react'
import EpisodeComponentCSS from './component.episode.less'

const EpisodeComponent = ({episode, activeEpisodeKey, dispatchSetActiveEpisodeKey}) => {

    const {
        airedEpisodeNumber,
        episodeName,
        firstAired,
        overview,
        episodeKey
    } = episode;

    const updateActiveEpisodeKey = (e) => {
        dispatchSetActiveEpisodeKey({
            payload: {
                activeEpisodeKey: episodeKey === activeEpisodeKey ? null : episodeKey
            }
        })
    };

    return (
        <div className={"episode " + (episode.episodeKey === activeEpisodeKey ? "active" : "")}>
            <div className={"episode-title"} onClick={updateActiveEpisodeKey}>
                <div className={"episode-no-name-wrapper"}>
                    <div className={"episode-no"}>{airedEpisodeNumber}</div>
                    <div className={"episode-name"}>{episodeName || '-'}</div>
                </div>
                <div className={"episode-min-max"}>
                    <span className={episode.episodeKey === activeEpisodeKey ? "hidden" : ""}>
                        <i className={"fa fa-angle-down"}/>
                    </span>
                    <span className={episode.episodeKey === activeEpisodeKey ? "" : "hidden"}>
                        <i className={"fa fa-angle-up"}/>
                    </span>
                </div>
            </div>

            <div className={"episode-description " + (episode.episodeKey !== activeEpisodeKey ? "hidden" : "")}>
                <div className={"air-date"}>
                    <span>{firstAired}</span>
                </div>
                <div className={"overview"}>
                    {overview || '-'}
                </div>
            </div>
        </div>
    )
};


export default EpisodeComponent;