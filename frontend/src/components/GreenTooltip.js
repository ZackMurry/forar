import { withStyles, Tooltip } from '@material-ui/core'
import { green } from '@material-ui/core/colors';

const GreenTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: green[500],
      color: '#fffff',
      boxShadow: theme.shadows[1],
      fontSize: 11,
    },
  }))(Tooltip);

export default GreenTooltip