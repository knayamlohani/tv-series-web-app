import React, {Component} from 'react'


import SearchComponent from './search/component.search'

export default class BodyComponent extends Component {
    constructor(props) {
        super(props);
        console.log('search component', props)
    }

    componentDidMount() {

    }

    render() {
        return (
            <div>
                <SearchComponent {...this.props}/>
            </div>
        )
    }
}