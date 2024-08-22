import { useEffect, useState } from 'react';
import './App.css';
import Model from './components/Model';
import { collection, getDoc, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import ShowUsers from './components/ShowUsers';

function App() {

  const [user, setuser] = useState([]);

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

      <Model/>
      <ShowUsers user={user} />

    </>
  );
}

export default App;
