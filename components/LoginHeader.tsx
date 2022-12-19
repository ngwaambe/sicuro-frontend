import {default as BaseLink} from 'next/link';
import Router from 'next/router';
import styles from './LoginHeader.module.css'
import {clearState, updateUser, useDispatch} from "../service/Auth.context";
import React, {useEffect} from "react";
import PersonIcon from '@material-ui/icons/PersonTwoTone';
import HomceIcon from '@material-ui/icons/HomeTwoTone'
import EmailTwoToneIcon from '@material-ui/icons/EmailTwoTone';
import PhoneTwoToneIcon from '@material-ui/icons/PhoneTwoTone';
import ExitToAppIcon from '@material-ui/icons/ExitToAppTwoTone';
import {useTranslation} from "next-i18next";
import {Container} from "@material-ui/core";
import {clearToken} from "../service/authentication";

const LoginHeader = () => {
  const[state, dispatch] = useDispatch();
  const {i18n} = useTranslation()

  const changeLanguage = (language:string) => {
    i18n.changeLanguage(language);
  }

  const logout = () => {
    clearToken().then(()=>{
      dispatch(clearState());
      Router.push("/")
    })
  }

  return (
    <div className={styles.mainMenuAreaTop}>
      <Container maxWidth="lg">
        <div className={styles.flexCotainer}>
          <div className={styles.Header}>
               <PhoneTwoToneIcon fontSize="medium"/>
               <span className={styles.menuText}>+49 (0) 228 38759255</span>

              <a href="mailto:contact@sicuro.com">
                <EmailTwoToneIcon fontSize="medium"/>
                <span className={styles.menuText}>contact[at]sicuro.com</span>
              </a>
          </div>
          <div className={styles.TextAlignRightMobile}>
            <BaseLink href="/">
              <a>
              <HomceIcon fontSize="medium"/>
              <span className={styles.menuText}>Sicuro</span>
              </a>
            </BaseLink>
            { (state?.user===undefined || !state?.user.loggedIn) &&
              <BaseLink href="/authenticate">
                <a className={styles.space}>
                    <PersonIcon fontSize="medium"/>
                    <span className={styles.menuText}>Login</span>
                </a>
              </BaseLink>
            }
            { (state?.user !==undefined && state?.user.loggedIn)  &&
             <>
             <BaseLink href="/profile">
                  <a>
                      <PersonIcon fontSize="medium"/>
                      <span className={styles.menuText}>My sicuro</span>
                  </a>
              </BaseLink>
              <BaseLink href="#">
                     <a onClick={logout}>
                         <ExitToAppIcon fontSize="medium"/>
                         <span className={styles.menuText}>Logout</span>
                     </a>
              </BaseLink>
             </>
            }
            <BaseLink href="#" locale="it">
              <a onClick={() => changeLanguage('it')}>
                <img src="/img/it.png"/>
              </a>
            </BaseLink>
            <BaseLink href="#" locale="en">
              <a onClick={() => changeLanguage('en')}>
                <img src="/img/en.png"/>
              </a>
            </BaseLink>
            <BaseLink href="#" locale="es">
              <a onClick={() => changeLanguage('es')}>
                <img src="/img/es.png"/>
              </a>
            </BaseLink>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default LoginHeader;
