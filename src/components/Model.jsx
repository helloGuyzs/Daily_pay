import React from 'react'
import styles from "./Model.module.css"
import { ErrorMessage ,Form, Formik ,Field  } from 'formik'
import { db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import * as Yup from 'yup';

export default function Model() {


    const validationSchema = Yup.object({

        name: Yup.string()
            .required('Name is required')
            .min(2, 'Name must be at least 2 characters long'),

        mobileNumber: Yup.string()
            .required('Mobile number is required')
            .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits'),

        panCard: Yup.string()
            .required('PAN card number is required')
            .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN card format'),
        
    });


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
                validationSchema={validationSchema}

                onSubmit={(values,actions) => {                    
                    
                    addUser(values,actions);

                }}


            >

                <Form >

                    <div className={styles.input}>
                        <label htmlFor="name">Name</label>
                        <Field name="name" placeholder="Full Name"></Field>
                        <ErrorMessage name="name" component="div" className={styles.error} />
                    

                    </div>
                    <div className={styles.input}>
                        <label htmlFor="Mobile Number">Mobile Number</label>
                        <Field name="mobileNumber" placeholder="Mobile Number"></Field>
                        <ErrorMessage name="mobileNumber" component="div" className={styles.error} />

                    </div>
                    <div className={styles.input}>
                        <label htmlFor="PAN CARD">Pan Card</label>                        
                        <Field  name="panCard" placeholder="Pan Card"></Field>
                        <ErrorMessage name="panCard" component="div" className={styles.error} />

                    </div>  

                    <button className={styles.btn} type='submit'> Add User</button>       

                </Form>

            </Formik>

        </div>
      
    </>
  )
}
