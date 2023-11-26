import { createContext,useState,useEffect} from 'react';
import { getAuth, onAuthStateChanged, signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from './firebase.init.js';
import useAxios from './useAxios.js';
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const myContext = createContext(null)
const Auth = ({children}) => {
    const caxios=useAxios()
    const [user, setUser] = useState([]);
    const [role, setRole] = useState(null);
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
      caxios.post('/logout').then().catch(err=>err)
      return signOut(auth)
    }
    function userData(data){
      data.role="User"
      return caxios.post("/insertuser",data)
    }
    useEffect(() => {
      const unSubscribe = onAuthStateChanged(auth, currentUser => {
        setUser(currentUser);
        if (currentUser && !!currentUser?.email) {
          if (role!=null) {
            caxios.post('/jsonwebtoken',{email:currentUser.email,role:role}).then(res=>res).catch(error=>console.log(error))
          }else{
            caxios.get(`/getrole?mail=${currentUser?.email}`).then(res=>{
              setRole(res.data)
              caxios.post('/jsonwebtoken',{email:currentUser.email,role:res.data}).then(res=>res).catch(error=>console.log(error))
            })
          }
          
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
        userData,
        role,
        setRole
        
      }
    
    return (
        <myContext.Provider value={context}>
        {children}
        </myContext.Provider>
    );
};

export default Auth;