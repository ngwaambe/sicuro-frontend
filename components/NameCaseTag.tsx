import React from "react";

export default (text:string) => {
    return(
    <React.Fragment>
        <strong className="nameCaseColor">{text}</strong>
    </React.Fragment>
    );
}
