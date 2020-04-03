import React from 'react'

const CastMember = ({id, image, name, role}) => {
    return (
        <div className={"cast-member"}>
            <div className={"cast-member-image-wrapper"}>
                <img
                    src={image}
                    // alt={castMember.name}
                    className={"cast-member-image"}
                    onError={e => e.target.src = ""}
                />
            </div>
            <div className={"cast-member-name"}>
                <span>{name}</span>
                <span>:</span>
                <span>{role}</span>
            </div>
        </div>
    )
};


export default CastMember;