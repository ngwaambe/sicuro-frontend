import {withStyles} from "@material-ui/styles";
import {Button, CardActions, createMuiTheme, FormControl, TextField, Typography} from "@material-ui/core";

export const MyTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#00796B',
    },
    secondary: {
      main: '#a0c100',
    },
    error: {
      main: '#d9534f'
    }
  },
  typography: {
    fontFamily: [
      'Roboto Slab',
      'UnitRoundedOT',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 14
  },
  overrides: {
    MuiButton: { // Name of the component ⚛️ / style sheet
      text: { // Name of the rule
        textTransform: 'none', // Some CSS
      },
    },
  },

});

export const StyledCardActions = withStyles({
  root:{
    display: 'flex',
    alignItems: 'center',
    padding: '8px',
  }
})(CardActions)

export const StyledFormTypography = withStyles({
 root: {
   marginBottom: '20px',
   fontSize: '16px'
 }
}) (Typography)

export const ErrorStyledFormTypography = withStyles({
  root: {
    marginBottom: '20px',
    fontSize: '16px'
  }
}) (Typography)

export const StyledTextField = withStyles({
  root: {
    margin: '4px 0px 4px 0px',
    fontFamily: 'Roboto Slab',
  },

}) (TextField)


export const ActionButton = withStyles({
  root:{
    border: '2px',
    fontSize: '1.01rem',
    textTransform: 'none'
  }
})(Button)

export const StyledFormControls = withStyles({
  root:{
    margin: '4px 0px 4px 0px',
    width: '100%',
  }
})(FormControl)
