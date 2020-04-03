import React from 'react';
import * as headerCSS from './component.header.less'
import {Link} from "react-router-dom";

import {useLocation} from 'react-router'

const Header = ({currentSeries}) => {

    const {pathname} = useLocation();
    return (
        <nav className="header">
            <div>
                <a href="/">TV Series</a>
                {currentSeries?.seriesName &&
                <React.Fragment>
                    <span className={"separator"}><i className="fa fa-caret-right" aria-hidden="true"/></span>
                    <span> {currentSeries?.seriesName}</span>
                </React.Fragment>
                }
            </div>

            {
                pathname?.startsWith("/series") &&
                <div>
                    <Link to={"/search?activate=true"}>
                    <span className={"search-icon"}>
                        <i className={"fa fa-search"} aria-hidden="true"/>
                    </span>
                    </Link>
                </div>}

        </nav>
    );
};


export default Header;
