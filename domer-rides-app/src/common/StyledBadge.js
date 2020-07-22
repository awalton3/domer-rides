import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
    badge: {
        right: '25px',
        top: '5px',
        padding: '0 4px',
    },
}))(Badge);

export default StyledBadge; 