import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/GlobalState'
import { MenuItem } from '@material-ui/core'
import { withCookies} from 'react-cookie';

function LogInOutButton(props) {

    const { authenticated } = useContext(GlobalContext)
    const { cookies } = props;
    const [ csrfToken, setCsrfToken ] = useState('')
    useEffect(() => {
        if(csrfToken !== '') {
            setCsrfToken(cookies.get('XSRF-TOKEN'))
        }
    }, [cookies, setCsrfToken, csrfToken])

    const login = () => {
        let port = (window.location.port ? ':' + window.location.port : '');
        if (port === ':3000') {
          port = ':8080';
        }
        //window.location.href = '//' + window.location.hostname + port + '/login';
        //todo probly replace this with window.location.origin + '/oauth2...'
        window.location.href = '//' + window.location.hostname + port + '/oauth2/authorization/okta';
      }
    
    const logout = () =>  {
        fetch('/api/v1/logout', 
            {
                method: 'POST', credentials: 'include',
                headers: {'X-XSRF-TOKEN': csrfToken}
            }
        ).then(res => res.json())
        .then(response => {
            window.location.href = response.logoutUrl + "?id_token_hint=" +
            response.idToken + "&post_logout_redirect_uri=" + window.location.origin;
        });
    }

    return (
        <MenuItem 
            onClick={() => (authenticated ? logout() : login())}
        >
            {authenticated ? "Logout" : "Login" }
        </MenuItem>
        
    )

}

export default withCookies(LogInOutButton)