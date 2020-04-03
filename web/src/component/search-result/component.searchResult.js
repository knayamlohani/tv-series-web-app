import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import SearchResultCSS from './component.search-result.less'


export default class SearchResultComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
        this.state = {
            imageLoaded: false
        }
    }


    onClickHandler = (e) => {
        this.props.dispatchSetCurrentSeriesBasicInfo({
            payload: {
                basicInfo: this.props
            }
        })
    };

    onImgLoadHandler = (e) => {
        console.log("image loaded");
        this.setState({
            imageLoaded: true
        })
    };

    render() {

        const {
            seriesName,
            id,
            image
        } = this.props;

        return (
            <Link className="search-result" to={`/series/${id}`} onClick={this.onClickHandler}>
                <div className="search-result-image-wrapper">
                    <img
                        className="search-result-image"
                        src={`https://artworks.thetvdb.com${image}`}
                        onLoad={this.onImgLoadHandler}
                    />
                </div>
                <div className={"loader " + (this.state.imageLoaded ? "hidden" : "")}>
                    <span><i className={"fa fa-circle-o-notch " + (this.state.imageLoaded ? "" : "fa-spin")}
                             aria-hidden="true"/>
                    </span>
                </div>
                <div className="search-result-info">
                    <span>{seriesName}</span>
                    {this.imageLoaded}
                </div>
            </Link>
        )
    }
}