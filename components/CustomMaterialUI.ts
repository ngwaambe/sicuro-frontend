import {withStyles} from "@material-ui/styles";
import {
  Button,
  CardActions,
  createStyles, createTheme,
  FormControl, InputLabel, Select, Tab,
  TextField,
  Theme,
  Typography
} from "@material-ui/core";

export const MyTheme = createTheme({
  palette: {
    primary: {
      main: '#00796B',
    },
    secondary: {
      main: '#a0c100',
    },
    error: {
      main: '#cc071e'
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
  root: {
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
})(Typography)

export const ErrorStyledFormTypography = withStyles({
  root: {
    marginBottom: '20px',
    fontSize: '16px'
  }
})(Typography)

export const StyledTextField = withStyles({
  root: {
    "input:-internal-autofill-selected":{
      backgroundColor:'none',
    },
    "& label.MuiInputLabel-root": {
      padding: "0px"
    },
    "& .MuiFilledInput-underline": {
      border: "none"
    },
    "& .MuiInput-underline::before": {
      borderBottom: "0px"
    },
    "& .MuiInput-underline::after": {
      borderBottom: "0px"
    },
    "& .MuiInputLabel-shrink": {
      transform: "translate(0, 1.5px) scale(0.75)",
      transformOrigin: "top left",
      margin: "10px 0px 0px 0px"
    },
    "& .MuiInputLabel-formControl": {
      top: "10px",
      left: "6px",
      position: "absolute",
      zIndex:'100'
    },
    "& .MuiInput-root": {
      borderRadius: "2px",
      webkitBorderRadius: "2px",
      outline: "1px solid #8c8c8c",
      border: "2px solid transparent",
      width: "100%",
      height: "48px",

    },
    "& .MuiInputBase-root.Mui-error": {
      border: '1px solid #cc071e',
      outline: "0px solid transparent",
    },
    "& .MuiInputBase-root:hover": {
      outline: "0px solid transparent",
      borderRadius: "2px",
      border: "2px solid #8c8c8c",
    },
    "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
      borderBottom: "0px"
    },
    "& .MuiInputBase-input": {
      padding: "20px 3px 7px 6px"
    },
  },

})(TextField)

export const StyledSelect = withStyles({
  root: {
    borderRadius: "2px",
    outline: "1px solid #8c8c8c",
    border: "2px solid transparent",
    width: "100%",
    height: "34px",
    lineHeight: "46px",
    paddingLeft: "6px",
    "& .MuiInput-underline.Mui-error:after": {
      borderColor: "#f44336"
    },
  },

  select: {
    "&:hover,&:focus": {
      outline: "0px solid transparent",
      borderRadius: "2px",
      border: "2px solid #8c8c8c",
    },
    '&.Mui-error': {
      '& .MuiOutlinedInput-notchedOutline': {
        border: '1px solid #cc071e!important'
      },
    }
  }

})(Select)

export const StyledSelectLabel = withStyles({
  root: {
    top: "18px",
    left: "8px",
  }
})(InputLabel)

export const ActionButton = withStyles({
  root: {
    border: '2px',
    borderRadius: '2px',
    fontSize: '1.01rem',
    textTransform: 'none'
  },
  startIcon: {}
})(Button)

export const StyledFormControls = withStyles({
  root: {
    margin: '4px 0px 4px 0px',
    width: '100%',
  }
})(FormControl)

export const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(1),
      '&:hover': {
        color: theme.palette.primary.dark,
        opacity: 1,
      },
      '&$selected': {
        color: theme.palette.primary.dark,
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: theme.palette.primary.dark,
      },
    },
    selected: {},
  }),
)(Tab)



