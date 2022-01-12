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
      'UnitRoundedOT',
      'Roboto Slab',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    fontSize: 12,
    h5:{
      fontWeight: 500,
      marginBottom: '10px'
    }
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
    padding: '16px',
    "& .MuiButton-outlined": {
      outline:"1px solid #8c8c8c",
      border: "2px solid transparent",
    },

    "& .MuiButton-outlined:hover": {
      border:"2px solid #8c8c8c",
      outline:"1px solid transparent",
    }


  }
})(CardActions)

export const StyledFormTypography = withStyles({
  root: {
    marginBottom: '20px',
    fontSize: 14,
    fontWeight: 500
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
    "& .MuiFormLabel-root": {
      fontWeight: '500',
      fontSize:'0.9rem'
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
      borderRadius: "2px",
      border: '1px solid #cc071e',
      outline: "0px solid transparent",
    },

    "& .MuiFormHelperText-root.Mui-error": {
      margin:"3px 0"
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
    "& .MuiOutlinedInput-input": {
      padding:"6px 0 7px"
    }
  },

  outlined: {
    padding: "6px 0 7px"
  },

  select: {
    "&:hover,&:focus": {
      outline: "0px solid transparent",
      borderRadius: "2px",
      border: "2px solid #8c8c8c",
    },
    "& .MuiOutlinedInput-input": {
      padding:"6px 0 7px"
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
    "& .Mui-error": {
     '& .MuiSelect-root': {
       outlineColor: "#cc071e !important",
     }
    },
  }
})(FormControl)

const enum FontWeight {
  Light = 300,
  Normal = 400,
}

export const StyledTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      //fontWeight: theme.typography.fontWeightMedium,
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



