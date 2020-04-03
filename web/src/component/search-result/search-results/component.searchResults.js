import React, {Component} from 'react'

import SearchResultComponent from '../component.searchResult'
import SearchResultsComponentCSS from './component.search-results.less'

export default class SearchResultsComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        console.log("search results", this.props)
    }


    render() {
        const {searchResults, dispatchSetCurrentSeriesBasicInfo} = this.props;
        console.log("search results", searchResults);
        return (
            <div className="search-results">
                {
                    searchResults.map((searchResult) => {
                        return <SearchResultComponent
                            {...searchResult}
                            key={searchResult.id}
                            dispatchSetCurrentSeriesBasicInfo={dispatchSetCurrentSeriesBasicInfo}
                        />
                    })
                }
            </div>
        )
    }
}