import React, { createContext, useContext, useState ,useEffect} from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../red-onion.config';
import {Route,Redirect} from 'react-router-dom'

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

export const AuthContextProvider = props => {
    const auth = Auth();
    return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

export const PrivateRoute = ({ children, ...rest }) => {

    const auth = useAuth();

    return (
      <Route
        {...rest}
        render={({ location }) =>
            auth.user? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const Auth = () => {
    const [user, setUser] = useState(null);

   
    const getUser = user => {
        const {displayName, email, photoURL} = user;
        return {
            name: displayName,
            email,
            photo: photoURL
        }
    }
    const signInWithGoogle = () => {

        const provider = new firebase.auth.GoogleAuthProvider();

       return firebase.auth().signInWithPopup(provider)
        .then(res => {
            const signedInUser = getUser(res.user);
            setUser(signedInUser);
            return res.user;
        })
        .catch( err => {
            setUser(null);
            console.log(user);
            return err.message;
        })

    }
    const signOut = () => {
        return firebase.auth().signOut().then(function() {
            setUser(null);
            return true;
          }).catch(function(error) {
            console.log(error);
            return false;
          });
    }
        useEffect(() => {
            firebase.auth().onAuthStateChanged(function(user) {
                if (user) {
                const currentUser = getUser(user);
                setUser(currentUser);
                } else {
                // No user is signed in.
                }
            });
        },[])
    return {
        user,
        signInWithGoogle,
        signOut,
    }
    
};

export default Auth;