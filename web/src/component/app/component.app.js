import React, {Component} from 'react'
import * as TVSeriesActionCreator from '../../redux/action-creator/redux.actionCreator.tvseries'
import * as AppActionCreator from '../../redux/action-creator/redux.actionCreator.app'

import {connect} from 'react-redux'


import HeaderComponent from '../header/component.header'


import AppCSS from './component.app.less'

import {BrowserRouter, Route} from "react-router-dom";
import SearchComponent from "../search/component.search";

const SeriesComponent = React.lazy(() => import("./../series/component.series"))

class AppComponent extends Component {
    constructor(props) {
        super(props);
        console.log('props', props);
        this.props = props;
    }

    render() {
        return (
            <React.Fragment>
                <div className={"app-component"}>

                    <React.Suspense fallback={"loading"}>
                        <BrowserRouter>
                            <HeaderComponent currentSeries={this.props.tvSeries.currentSeries}/>
                            <Route
                                path="/series/:id"
                                exact={true}
                                render={(props) => {
                                    return <SeriesComponent
                                        dispatchGetSeriesById={this.props.getSeriesById}
                                        dispatchUpdateSeriesInfo={this.props.updateSeriesInfo}
                                        currentSeries={this.props.tvSeries.currentSeries}
                                        dispatchGetEpisodesForCurrentSeries={this.props.getEpisodesForCurrentSeries}
                                        dispatchGetCastForCurrentSeries={this.props.getCastForCurrentSeries}
                                        activeEpisodeKey={this.props.tvSeries.activeEpisodeKey}
                                        dispatchSetActiveEpisodeKey={this.props.setActiveEpisodeKey}
                                        dispatchSetActiveSeasonKey={this.props.setActiveSeasonKey}
                                        activeSeasonKey={this.props.tvSeries.activeSeasonKey}
                                        anySeasonEverSelected={this.props.tvSeries.anySeasonEverSelected}
                                        dispatchSetAnySeasonEverSelectedStatus={this.props.setAnySeasonEverSelectedStatus}
                                        {...props}
                                    />
                                }}
                            />

                            <Route
                                path={["/", "/search"]}
                                exact={true}
                                render={(props) => {
                                    return <SearchComponent
                                        dispatchSearchSeriesByName={this.props.searchSeriesByName}
                                        dispatchSetSearchingSeriesStatus={this.props.setSearchingSeriesStatus}
                                        seriesSearchResults={this.props.tvSeries.seriesSearchResults}
                                        isSearchingSeries={this.props.tvSeries.isSearchingSeries}
                                        dispatchSetCurrentSeriesBasicInfo={this.props.setCurrentSeriesBasicInfo}
                                        dispatchUpdateSearchComponentIsActiveState={this.props.updateSearchComponentIsActiveState}
                                        isSearchComponentActive={this.props.app.isSearchComponentActive}
                                        dispatchSetSeriesSearchResults={this.props.setSeriesSearchResults}
                                        {...props}
                                    />
                                }}
                            />

                        </BrowserRouter>
                    </React.Suspense>
                </div>
            </React.Fragment>
        )
    }

    componentDidMount() {
    }
}


const mapStateToProps = (state, ownProps) => {
    return {
        tvSeries: state.tvSeries,
        app: state.app,
        ...ownProps
    }
};

const mapDispatchToProps = {
    ...TVSeriesActionCreator,
    ...AppActionCreator
};

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);