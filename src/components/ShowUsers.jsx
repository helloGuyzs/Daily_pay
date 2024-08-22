import React, { useState } from 'react'
import styles from './ShowUsers.module.css'
import styless from './Search.module.css'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

export default function ShowUsers( props) {

    const [ showUser , setShowUser] = useState(props.user);

    const formatDate = (timestamp) => {
        if (!timestamp || !timestamp.seconds) {
          return 'No Date';
        }
        
        const date = new Date(timestamp.seconds * 1000);
        
        return date.toLocaleDateString("en-US", {
          year: 'numeric', month: '2-digit', day: '2-digit',
          hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
        });
    };

    const deleteUser= async(id)=>{

        try {
            
            await deleteDoc(doc(db,"Users" , id))

        } catch (error) {
            console.log("Error in deleting user")
        }

    }

    const updateCurrentUser= (data)=>{

        props.setUpdate(true);
        props.setUpdateContact(data);
        console.log(props.updateContact)
        console.log(props.toUpdate)
        

    }

    const filterManagerId = (event) => {
        const toCheck = event.target.value.trim().toLowerCase();

        if (toCheck === "") {
            setShowUser(props.user);
        } else {
            const filtered = props.user.filter(data => data.managerId?.toLowerCase().includes(toCheck));
            setShowUser(filtered);
        }
    };

  return (
    <>

        <div className={styless.outer}>

            <input type="text" placeholder='Search By manager Id' onChange={filterManagerId}/>

        </div>

        <div className={styles.outer}>

        <table>
            <thead> 
                <tr>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>Pan Card</th>
                <th>Manager ID</th>
                <th>Created Time</th>
                <th>Updated Time</th>
                <th>Action</th>
                </tr>
            </thead>

            <tbody>

                {

                    showUser?.map((data ,id)=>{

                        return (

                            <tr key={id}>
                                <th>{data.name}</th>
                                <th>{data.mobileNumber}</th>
                                <th>{data.panCard}</th>
                                <th>{data.managerId}</th>
                                <th>{formatDate(data.createdAt)}</th>   
                                <th>{formatDate(data.updatededAt)}</th>
                                <th className={styles.actions}>
                                    <button onClick={()=>updateCurrentUser(data)}>Update</button>
                                    <button onClick={()=>deleteUser(data.id)}>Delete</button>
                                </th>
                                
                            </tr>


                        )

                    })

                }

            </tbody>

        
        </table>

        </div>

      
    </>
  )
}
