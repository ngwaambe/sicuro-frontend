import React, {Component, ReactNode} from "react";
import LoginHeader from "../LoginHeader";
import MenuHeader from "../MenuHeader";
import MobileMenuHeader from "../MobileMenuHeader";
import {withTranslation} from "next-i18next";
import PropTypes from "prop-types";

interface Props {
    t: any;
    children?:ReactNode,
    token?:string
}
/*
const FrontendLayout = (props:Props) => {
    return (
      <React.Fragment>
          <div>
              <div className="header-area header-fixed header-style-four">
                  <LoginHeader />
                  <MenuHeader />
                  <MobileMenuHeader/>
              </div>
              {props.children}
          </div>
      </React.Fragment>
    )
}
*/

class FrontendLayout extends Component<Props> {
    constructor(props) {
        super(props);
    }

    static propTypes = {
        t: PropTypes.func.isRequired,
    }

    static getInitialProps = async () => ({
        namespacesRequired: ['common'],
    })

    render() {
        return (
            <React.Fragment>
                <div>
                    <div className="header-area header-fixed header-style-four">
                        <LoginHeader />
                        <MobileMenuHeader/>
                        <MenuHeader />
                    </div>
                    {this.props.children}
                </div>
            </React.Fragment>
        )
    }
}

export default withTranslation(['common'])(FrontendLayout);
