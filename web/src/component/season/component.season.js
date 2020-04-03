import React from "react";

import EpisodeComponent from './../episode/component.episode'
import SeasonComponentCSS from './component.season.less'

const SeasonComponent = ({season, activeEpisodeKey, activeSeasonKey, dispatchSetActiveEpisodeKey, dispatchSetActiveSeasonKey}) => {

    const {seasonNumber, episodes, id, seasonKey} = season;

    console.log("seasonKey, activeSeasonKey", seasonKey, activeSeasonKey, seasonKey === activeSeasonKey, (seasonKey === activeSeasonKey) ? "" : "hidden")

    return (
        <div className={"season"}>
            <div className={"season-title"} onClick={(e) => {

                dispatchSetActiveSeasonKey({
                    payload: {
                        seasonKey: seasonKey === activeSeasonKey ? null : seasonKey
                    }
                })
            }}>
                <div className={"season-name"}>{getSeasonName(seasonNumber)}</div>
                <div className={"season-min-max"}>
                    <i className={"fa fa-angle-up min-icon " + (seasonKey === activeSeasonKey ? "" : "hidden")}/>
                    <i className={"fa fa-angle-down max-icon " + (seasonKey === activeSeasonKey ? "hidden" : "")}/>
                </div>
            </div>

            <div className={"episodes " + (seasonKey === activeSeasonKey ? "" : "hidden")}>
                <div className={"episodes-left"}>
                    {
                        episodes?.slice(0, episodes.length / 2 + 1)?.map((episode) => {
                            return <EpisodeComponent
                                episode={episode}
                                key={episode.airedEpisodeNumber}
                                activeEpisodeKey={activeEpisodeKey}
                                dispatchSetActiveEpisodeKey={dispatchSetActiveEpisodeKey}
                            />
                        })
                    }
                </div>

                <div className={"episodes-right"}>
                    {
                        episodes?.slice(episodes.length / 2 + 1, episodes.length)?.map((episode) => {
                            return <EpisodeComponent
                                episode={episode}
                                key={episode.airedEpisodeNumber}
                                activeEpisodeKey={activeEpisodeKey}
                                dispatchSetActiveEpisodeKey={dispatchSetActiveEpisodeKey}
                            />
                        })
                    }
                </div>
            </div>
        </div>
    )
};

const getSeasonName = (seasonNumber) => {
    return seasonNumber === 0 ? "Extras" : `Season ${seasonNumber}`;
}

export default SeasonComponent;