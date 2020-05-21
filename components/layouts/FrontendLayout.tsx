import {Link, withTranslation} from "../../i18n";
import React from "react";
import Header from "../Header";


class FrontendLayout extends React.Component {
    render() {
        return (
            <React.Fragment>
                <div id="wrapper">
                    {/* Header Area Start Here */}
                    <Header/>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default withTranslation('common')(FrontendLayout);
