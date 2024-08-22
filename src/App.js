import { useEffect, useState } from 'react';
import './App.css';
import Model from './components/Model';
import { collection, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import ShowUsers from './components/ShowUsers';
import Seach from './components/Seach';

function App() {

  const [user, setuser] = useState([]);
  const [toUpdate ,  setUpdate] =  useState(false);
  const [updateContact , setUpdateContact] = useState(null);
  

  useEffect( () =>{

    const getuser = async ()=>{

      try {


        const userRef= collection(db, "Users");
  
        const userSnapshot = await getDocs(userRef);

        onSnapshot(userRef, (snapshot)=>{


          const userList= snapshot.docs.map((doc)=>{
  
            return {
  
              id: doc.id,          
  
              ...doc.data()
            };
          });
    
          console.log(userList);
          setuser(userList);


        });

        
      } catch (error) {
        console.log('error');
        
      }


    }

    getuser();


  } , []);

  return (
    <>

      <Model toUpdate={toUpdate}  setUpdate={setUpdate} updateContact={updateContact}   setUpdateContact={setUpdateContact}  user={user}/>
      
      <ShowUsers toUpdate={toUpdate} setUpdate={setUpdate} updateContact={updateContact}   setUpdateContact={setUpdateContact} user={user} />

    </>
  );
}

export default App;
