import {Card, CardContent, CardHeader, MenuItem, MenuList} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import React from "react";
import {Customer} from "../state";
import Link from "next/link";
import {useTranslation} from "next-i18next";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {deepOrange} from "@material-ui/core/colors";
import {formatCustomerName} from "../service/customerService";

const useStyles = makeStyles((theme) => ({
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
    fontSize:'1.15rem',
    fontWeight:800,
    width: '48px',
    height: '48px'
  }
}));

interface Props{
   customer:Customer
}

const ProfileNaviagtionMenu = ({customer}) => {
  const classes = useStyles()
  const {t} = useTranslation('common')

  const formatName = ():string => {
    return `${t(customer.title)} ${customer.firstName} ${customer.lastName}`
  }
  return (
    <Card variant="outlined">
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.orange}>
            {customer.lastName.trim().charAt(0)}{customer.firstName.trim().charAt(0)}
          </Avatar>
        }
        title={formatName()}/>
      <CardContent>
        <MenuList>
          <MenuItem>
            <Link href="/profile"><a>My Sicuro</a></Link>
          </MenuItem>
          <MenuItem>
            <Link href="/profile"><a>{t('StartTransaction')}</a></Link>
          </MenuItem>
          <MenuItem>
            <Link href="/profile/account"><a>{t('UserAccount')}</a></Link>
          </MenuItem>
          <MenuItem>
            <Link href="/profile"><a>{t('MyTransactions')}</a></Link>
          </MenuItem>
          <MenuItem>
            <Link href="/profile"><a>{t('PaymentDocumentation')}</a></Link>
          </MenuItem>
        </MenuList>
      </CardContent>
    </Card>
  )
}

export default ProfileNaviagtionMenu;
