import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import { Box } from '@mui/material';

function Navigation({ isLoaded }) {
    const sessionUser = useSelector(state => state.session.user);

    return (
        <>
            {isLoaded && (
                <Box
                >
                    <ProfileButton user={sessionUser} />
                </Box>
            )}
        </>
    );
}

export default Navigation;
