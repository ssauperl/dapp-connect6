import React, { Component } from "react";
import jdenticon from "jdenticon"

class HashAvatar extends Component {
    render() {
        const {hash} = this.props;
        const avatar = jdenticon.toSvg(hash, 64);
        return (
            <figure className="image is-64x64" dangerouslySetInnerHTML={{__html:avatar}} />
        );
    }
}

export default HashAvatar;