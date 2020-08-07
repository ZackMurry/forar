import { createMuiTheme } from '@material-ui/core'
import { green } from '@material-ui/core/colors';


export default createMuiTheme({
    palette: {
      primary: green,
      secondary: {
        main: '#4caf50'
      }
    },
    root: {
        fontFamily: 'Roboto'
    }
});