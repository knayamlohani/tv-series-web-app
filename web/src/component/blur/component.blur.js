import React, {Component} from 'react'
import PropTypes from 'prop-types'

import BlurComponentCSS from './component.blur.less'

export default class BlurComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }


    render() {
        return (
            <div className="blur-component" style={this.props.backgroundUrl ? {
                backgroundImage: `url(${this.props.backgroundUrl})`
            } : {}}></div>
        )
    }
}

// BlurComponent.propTypes = {
//     backgroundImage: PropTypes.string.isRequired
// };