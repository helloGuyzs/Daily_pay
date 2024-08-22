import { useEffect, useState } from 'react';
import './App.css';
import Model from './components/Model';
import { collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase';

function App() {

  const [user, setuser] = useState([]);

  useEffect( () =>{

    const getuser = async ()=>{

      try {


        const userRef= collection(db, "Users");
  
        const userSnapshot = await getDocs(userRef);

        const userList= userSnapshot.docs.map((doc)=>{

          return {

            id: doc.id,          

            ...doc.data()
          }
        })
  
        console.log(userList);
        
      } catch (error) {
        console.log('error');
        
      }


    }

    getuser();


  } , []);

  return (
    <>

      <Model/>

    </>
  );
}

export default App;
