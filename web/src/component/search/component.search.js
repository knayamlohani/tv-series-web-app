import React, {Component} from 'react'

import SearchComponentCSS from './component.search.less'
import SearchResultsComponent from '../search-result/search-results/component.searchResults'
import BlurComponent from "../blur/component.blur";
import qs from 'qs'
import {SEARCHING, UNKNOWN} from "../../constant/constant.search-status";

export default class SearchComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            searchInput: ''
        };
        this.element = null;
    }

    componentDidMount() {
        const queryParams = qs.parse(this.props?.location?.search?.split("?")[1]);
        if (queryParams?.activate) {
            this.activateSearchComponent();
            this.element?.focus();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {searchSeriesStatus} = this.props;
    }

    handleSearchInputChange = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    };

    searchByInput = (e) => {
        e.preventDefault();
        this.props.dispatchSearchSeriesByName({
            payload: {
                series: {
                    name: this.state.searchInput
                }
            }
        })
    };

    activateSearchComponent = (e) => {

        if (!this.props?.isSearchComponentActive) {
            this.props.dispatchUpdateSearchComponentIsActiveState({
                payload: {
                    isActive: true
                }
            });
        }

    };

    componentWillUnmount() {
        this.finally();
    }

    finally = () => {
        this.props.dispatchUpdateSearchComponentIsActiveState({
            payload: {
                isActive: false
            }
        });

        this.props.dispatchSetSearchingSeriesStatus({
            payload: {
                searchSeriesStatus: UNKNOWN
            }
        });

        this.props.dispatchSetSeriesSearchResults({
            payload: {
                seriesSearchResults: []
            }
        });

        this.setState({
            searchInput: ''
        });
    };

    getIsSearchingFragment() {
        return (
            <React.Fragment>
                {
                    this.props.searchSeriesStatus === SEARCHING &&
                    <div className="searching-series">
                        <div className={"icon"}><i className={"fa fa-circle-o-notch fa-spin"} aria-hidden="true"/></div>
                        <div className={"text"}>Searching ...</div>
                    </div>
                }
            </React.Fragment>
        )
    }

    render() {
        return (
            <div className={"search-component " + (this.props?.isSearchComponentActive ? "active" : "")}>

                <div className={"search-component-body"}>
                    <form onSubmit={this.searchByInput} className="search-form">
                        <div className={"search-input-and-icons-wrapper"}>
                            <div
                                className={"exit-search-icon-wrapper " + (this.props?.isSearchComponentActive ? "" : "hidden")}
                                onClick={this.finally}>
                                <span className={"exit-search-icon"}>
                                    <i className={"fa fa-times-circle"} aria-hidden="true"/>
                                </span>
                            </div>
                            <div className={"search-input-wrapper"}>
                                <input
                                    type="text"
                                    value={this.state.searchInput}
                                    onChange={this.handleSearchInputChange}
                                    className="search-input"
                                    placeholder="Search you favourite TV Show"
                                    onFocus={this.activateSearchComponent}
                                    ref={(ref) => {
                                        this.element = ref
                                    }}
                                />
                            </div>
                            <div className={"search-icon-wrapper"} onClick={this.searchByInput}>
                                <span className={"search-icon"}>
                                    <i className={"fa fa-search"} aria-hidden="true"/>
                                </span>
                            </div>
                        </div>

                    </form>
                    {this.getIsSearchingFragment()}

                    {
                        this.props.seriesSearchResults?.length > 0 &&
                        <div className="matched-series-list-container">

                            <div>
                                <SearchResultsComponent
                                    searchResults={this.props.seriesSearchResults}
                                    dispatchSetCurrentSeriesBasicInfo={this.props.dispatchSetCurrentSeriesBasicInfo}
                                />
                            </div>

                        </div>
                    }
                </div>

                <BlurComponent/>
            </div>
        )
    }
}