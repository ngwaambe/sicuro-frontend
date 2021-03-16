import {default as BaseLink} from 'next/link';
import Router from 'next/router';
import styles from './LoginHeader.module.css'
import {updateUser, useDispatch} from "../service/Auth.context";
import React from "react";
import PersonIcon from '@material-ui/icons/PersonTwoTone';
import HomceIcon from '@material-ui/icons/HomeTwoTone'
import ExitToAppIcon from '@material-ui/icons/ExitToAppTwoTone';
import {useTranslation} from "next-i18next";

const LoginHeader = () => {
  const[state, dispatch] = useDispatch();
  const {i18n} = useTranslation()
  const changeLanguage = (language:string) => {
    i18n.changeLanguage(language);
  }

  const logout = () => {
    fetch("/api/logout", {
      method : "post",
      headers: {
        "Content-Type":"application/json"
      },
      body: JSON.stringify({})
    });

    dispatch(updateUser(
      {
        loggedIn: false,
        username:'',
        firstName:'',
        lastName:''
      }
    ));

    Router.push('/');
  }

  return (
    <div className={styles.mainMenuAreaTop}>
      <div className="container">
        <div className={styles.flexCotainer}>
          <div className={styles.ImageMargin}>
            <span className={styles.marginR2Style}>
              <img src="/img/ico-tel.png"/>+49 (0) 228 38759255
            </span>
            <span className={styles.ClearDisplayMobile}>
              <img src="/img/email-ico.png" />
              <a href="mailto:contact@sicuro.com">contact[at]sicuro.com</a>
            </span>
          </div>
          <div className={styles.TextAlignRightMobile}>
            <BaseLink href="/">
              <a>
              <HomceIcon fontSize="default"/>
              <span className={styles.menuText}>Sicuro</span>
              </a></BaseLink>
            {!state.user.loggedIn &&
              <BaseLink href="/authenticate">
                <a className={styles.space}>
                    <PersonIcon fontSize="default"/>
                    <span className={styles.menuText}>Login</span>
                </a>
              </BaseLink>
            }
            {state.user.loggedIn  &&
             <>
             <BaseLink href="/profile/">
                  <a>
                      <PersonIcon fontSize="default"/>
                      <span className={styles.menuText}>My sicuro</span>
                  </a>
              </BaseLink>
              <BaseLink href="#">
                     <a onClick={logout}>
                         <ExitToAppIcon fontSize="default"/>
                         <span className={styles.menuText}>Logout</span>
                     </a>
              </BaseLink>
             </>
            }
            <BaseLink href="" locale="it">
              <a onClick={() => changeLanguage('it')}>
                <img src="/img/it.png"/>
              </a>
            </BaseLink>
            <BaseLink href="" locale="en">
              <a onClick={() => changeLanguage('en')}>
                <img src="/img/en.png"/>
              </a>
            </BaseLink>
            <BaseLink href="" locale="es">
              <a onClick={() => changeLanguage('es')}>
                <img src="/img/es.png"/>
              </a>
            </BaseLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginHeader;
