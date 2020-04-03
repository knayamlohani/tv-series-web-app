import React from 'react'
import SeasonComponent from "../season/component.season";
import SeasonsComponentCSS from './component.seasons.less'

class SeasonsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }


    componentDidUpdate(prevProps, prevState, snapshot) {
        const {seasons, dispatchSetActiveSeasonKey, activeSeasonKey, anySeasonEverSelected, dispatchSetAnySeasonEverSelectedStatus} = this.props
        // console.log("=========SeasonsComponent SET ACTIVE SEASON  KEY", this.props);
        if (activeSeasonKey == null && !anySeasonEverSelected && seasons?.length > 0) {
            console.log("=========SeasonsComponent SET ACTIVE SEASON  KEY", this.props, Object.values(seasons)[0].seasonKey);

            const [firstSeason] = seasons;
            console.log("firstSeason",firstSeason);

            dispatchSetActiveSeasonKey({
                payload: {
                    seasonKey: Object.values(seasons)[0].seasonKey
                }
            });

            dispatchSetAnySeasonEverSelectedStatus({
                payload: {
                    status: true
                }
            })
        }
    }

    finally = () => {
        this.props.dispatchSetActiveSeasonKey({
            payload: {
                seasonKey: null
            }
        });

        this.props.dispatchSetAnySeasonEverSelectedStatus({
            payload: {
                status: false
            }
        })
    }


    componentWillUnmount() {
        this.finally();
    }


    render() {
        console.log('seasons', seasons);
        const {seasons, activeEpisodeKey, activeSeasonKey, dispatchSetActiveEpisodeKey, dispatchSetActiveSeasonKey} = this.props;
        return (
            <div className={"seasons"}>
                {
                    seasons?.map((season) => {
                        return <SeasonComponent
                            season={season}
                            key={season.seasonNumber}
                            activeEpisodeKey={activeEpisodeKey}
                            activeSeasonKey={activeSeasonKey}
                            dispatchSetActiveEpisodeKey={dispatchSetActiveEpisodeKey}
                            dispatchSetActiveSeasonKey={dispatchSetActiveSeasonKey}
                        />
                    })
                }
            </div>
        )
    }
}


export default SeasonsComponent;