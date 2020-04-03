import React from "react";

import CastMember from './../cast-member/component.cast-member'
import CastMembersComponentCSS from './component.cast-members.less'

class CastMembersComponent extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;

        this.state = {
            showAllCastMembers: false
        }
    }

    toggleShowAllCastMembersState = (e) => {
        const state = this.state.showAllCastMembers;
        this.setState({
            showAllCastMembers: !state
        });
    };

    render() {

        const {castMembers} = this.props;

        return (
            <div className={"cast"}>
                <div className={"cast-title"}>
                    <span>Cast</span>
                </div>
                <div className={"cast-members " + (this.state.showAllCastMembers ? "hidden" : "")}>
                    {
                        castMembers?.slice(0, 5)?.map((castMember, index) => {
                            return <CastMember {...castMember} key={`${castMember.id}_${index}`}/>
                        })
                    }
                </div>

                <div
                    className={"cast-members cast-members-all " + (this.state.showAllCastMembers ? "" : "hidden")}>
                    {
                        castMembers?.slice(0, castMembers?.length)?.map((castMember, index) => {
                            return <CastMember {...castMember} key={`${castMember.id}_${index}`}/>
                        })
                    }
                </div>

                <div className={ castMembers?.length > 5 ? "": "hidden"}>
                    <div onClick={this.toggleShowAllCastMembersState} className="show-hide-cast">
                        <span className={"show-hide-cast-icon " + (!this.state.showAllCastMembers ? "" : "hidden")}>
                            <i className="fa fa-angle-down" aria-hidden="true" />
                        </span>
                        <span className={"show-hide-cast-icon " + (!this.state.showAllCastMembers ? "hidden" : "")}>
                            <i className="fa fa-angle-up" aria-hidden="true" />
                        </span>
                    </div>
                </div>
            </div>
        )
    }
};


export default CastMembersComponent;