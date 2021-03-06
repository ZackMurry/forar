import { createMuiTheme } from '@material-ui/core'
import { green } from '@material-ui/core/colors';


export const theme = createMuiTheme({
    palette: {
      primary: green,
      secondary: {
        main: '#fffff'
      },
      hoverColor: 'red'
    },
    root: {
        fontFamily: 'Roboto'
    },
    overrides: {
      MuiList: {
        root:{
          width: 200
        }
      }
    }
});