import { React, createContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState({});
    const store = { userState: [user, setUser] }; /* eslint-disable-line */
    return (
        <AuthContext.Provider value={store}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthProvider, AuthContext };

AuthProvider.propTypes = {
    children: PropTypes.any,    /* eslint-disable-line */
};
