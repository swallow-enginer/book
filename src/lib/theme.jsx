import { createMuiTheme} from "@material-ui/core/styles";
import lightBlue from '@material-ui/core/colors/lightBlue';

// Create a theme instance.
const theme = createMuiTheme({
    palette: {
        secondary: {
            main: '#00b0ff',
            contrastText: '#fff',
        },
        gray: {
            main: "#f5f5f5"
        },
        white: {
            main: "#ffffff"
        }
    }
});

export default theme;
