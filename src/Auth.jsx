import { createContext,useState,useEffect} from 'react';
import {useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from './firebase.init.js';
import useAxios from './useAxios.js';
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const myContext = createContext(null)
const Auth = ({children}) => {
    const caxios=useAxios()
    const [user, setUser] = useState([]);
    const navigate = useNavigate()
    function signUpUser(email, password) {
      return createUserWithEmailAndPassword(auth, email, password)
    }
    function googlemama() {
      return signInWithPopup(auth, provider)
    }
    function SignIn(email, password) {
      return signInWithEmailAndPassword(auth, email, password)
    }
    function LogOut() {
      navigate('/login')
      caxios.post('/logout').then().catch(err=>err)
      return signOut(auth)
    }
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        if (currentUser && !!currentUser?.email) {
          caxios.post('/jsonwebtoken',{email:currentUser.email}).then(res=>res).catch(error=>console.log(error))
        }else{
          caxios.post('/logout').then().catch(err=>err)
        }
      });
      return () => {
        unSubscribe();
      }
    }, [])
    const context = {
        user,
        signUpUser,
        SignIn,
        LogOut,
        googlemama,
        
      }
    
    return (
        <myContext.Provider value={context}>
        {children}
        </myContext.Provider>
    );
};

export default Auth;