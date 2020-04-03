import React, {Component} from 'react'
import HeaderComponent from "../header/component.header";
import BodyComponent from "../component.body";

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    render() {
        return (
            <React.Fragment>
                <BodyComponent {...this.props}/>
            </React.Fragment>
        )
    }
}