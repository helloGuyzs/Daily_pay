import React from 'react'
import styles from "./Model.module.css"
import { Form, Formik ,Field } from 'formik'
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

export default function Model() {

    const addUser= async (values,actions) => {

        try {

            const userRef= collection(db,"Users");
            await addDoc(userRef,{
                ...values,
                createdAt: serverTimestamp() ,
                updatededAt: serverTimestamp() 
            });
            
            

            console.log("User added successfully!");
            actions.resetForm();

        } catch (error) {
            console.log("error",error.message);
        }

    }
  return (
    <>

        <div className={styles.card}>

            <Formik
            
                initialValues={{ name: '', mobileNumber: '', panCard: '' }}

                onSubmit={(values,actions) => {
                    
                    // console.log(values);
                    addUser(values,actions);


                }}


            >

                <Form >

                    <div className={styles.input}>
                        <label htmlFor="name">Name</label>
                        <Field name="name" placeholder="Full Name"></Field>
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="Mobile Number">Mobile Number</label>
                        <Field name="mobileNumber" placeholder="Mobile Number"></Field>
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="PAN CARD">PAN CARD</label>
                        <Field  name="panCard" placeholder="Pan Card"></Field>
                    </div>  

                    <button className={styles.btn} type='submit'> Add User</button>       

                </Form>

            </Formik>

        </div>
      
    </>
  )
}
