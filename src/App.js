import './App.css';
import React, {useState, useEffect} from 'react';

//components
import Header from './components/header/header';
import Router from './routes/routes';
import Footer from './components/footer/footer';

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from './api/firebase/config';

function App() {

  const [authenticate, setAuthenticate] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [uid, setUID] = useState('');
  const [track, setTrack] = useState("users")

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {

      if (user) {
        setAuthenticate(true)
        setUID(user.uid)
        setTrack(user.displayName)
        //onSnapshot(doc(db, "users", user.uid), setChangedAuth(!changedAuth));
  

      } else {
        setAuthenticate(false)
      }
  })
  
  useEffect(() => {

    //getUser(uid).then(user => setCurrentUser(user));
    
    if(uid !== '') {

      onSnapshot(doc(db, "users", uid), (doc) => {
          setCurrentUser(doc.data());
      });

    }
    
  }, [uid, authenticate, track])
  

  return (
    
    <div className="app">

      <Header user = {currentUser}/>
      <Router user = {currentUser} />
      {/* <Footer/> */}

    </div>

  );

}

export default App;
