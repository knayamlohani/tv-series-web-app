import React, {Component} from 'react'

import seriesComponentCSS from './component.series.less'
import BlurComponent from "../blur/component.blur";
import CastMembersComponent from '../cast-members/component.cast-members'
import SeasonsComponent from "../seasons/component.seasons";

export default class SeriesComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    componentDidMount() {
        console.log("series component mounted props", this.props);
        const {match: {params}} = this.props;

        console.log(params);

        if (!this.props.currentSeries || !this.props.currentSeries.fullInfo) {
            this.props.dispatchGetSeriesById({
                payload: {
                    series: {
                        id: params.id
                    }
                }
            })
        }

        this.props.dispatchGetEpisodesForCurrentSeries({
            payload: {
                series: {
                    id: params.id
                }
            }
        });

        this.props.dispatchGetCastForCurrentSeries({
            payload: {
                series: {
                    id: params.id
                }
            }
        });


    }


    componentWillUnmount() {
        this.finally();
    }

    finally = () => {
        this.props.dispatchUpdateSeriesInfo({
            payload: {
                currentSeries: null
            }
        })
    };


    render() {
        const {
            poster,
            overview,
            castMembers,
            seasons
        } = this.props?.currentSeries || {};

        const {
            activeEpisodeKey,
            dispatchSetActiveEpisodeKey,
            dispatchSetActiveSeasonKey,
            activeSeasonKey,
            anySeasonEverSelected,
            dispatchSetAnySeasonEverSelectedStatus
        } = this.props;

        console.log('castMembers are', castMembers);
        return (
            <div className={"series-component"}>
                <BlurComponent backgroundUrl={poster}/>
                <div className={"series-info"}>
                    <div className={"artwork"}>
                        <img src={poster}/>
                    </div>
                    <div className={"information"}>

                        <CastMembersComponent castMembers={castMembers}/>

                        <div className={"overview"}>
                            <div className={"overview-title"}>Overview</div>
                            <div className={"overview-text"}>{overview}</div>
                        </div>

                        <div className={"quick-info-list"}>
                            {this.getQuickInfoList(this.props?.currentSeries || {})}
                        </div>
                    </div>
                </div>
                <SeasonsComponent seasons={seasons}
                                  activeEpisodeKey={activeEpisodeKey}
                                  dispatchSetActiveEpisodeKey={dispatchSetActiveEpisodeKey}
                                  dispatchSetActiveSeasonKey={dispatchSetActiveSeasonKey}
                                  activeSeasonKey={activeSeasonKey}
                                  anySeasonEverSelected={anySeasonEverSelected}
                                  dispatchSetAnySeasonEverSelectedStatus={dispatchSetAnySeasonEverSelectedStatus}
                />
            </div>
        )
    }

    getQuickInfoList = ({episodeCount, seasonCount, network, runtime, airsTime, status}) => {
        return (
            <React.Fragment>
                <div className={"episodes-quick-info quick-info"}>
                    <div className={"quick-info-value"}>{episodeCount || '-'}</div>
                    <div className={"quick-info-name"}>Episodes</div>
                </div>
                <div className={"seasons-quick-info quick-info"}>
                    <div className={"quick-info-value"}>{seasonCount || '-'}</div>
                    <div className={"quick-info-name"}>Seasons</div>
                </div>
                <div className={"network-quick-info quick-info"}>
                    <div className={"quick-info-value"}>{network || '-'}</div>
                    <div className={"quick-info-name"}>Network</div>
                </div>
                <div className={"run-time-quick-info quick-info"}>
                    <div className={"quick-info-value"}>{`${runtime} min` || '-'} </div>
                    <div className={"quick-info-name"}>Duration</div>
                </div>
                <div className={"run-time-quick-info quick-info"}>
                    <div className={"quick-info-value"}>{airsTime || '-'}</div>
                    <div className={"quick-info-name"}>Air Time</div>
                </div>
                <div className={"run-time-quick-info quick-info"}>
                    <div className={"quick-info-value"}>{status || '-'}</div>
                    <div className={"quick-info-name"}>Status</div>
                </div>
            </React.Fragment>
        )
    };


}