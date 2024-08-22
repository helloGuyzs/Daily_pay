import React from 'react'
import styles from "./Model.module.css"
import { ErrorMessage ,Form, Formik ,Field  } from 'formik'
import { db } from '../firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import * as Yup from 'yup';

export default function Model(props) {


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
        managerId: Yup.string()
            .required('Manager Id is required')
            
        
    });


    const addUser= async (values,actions) => {

        try {

            
            const userRef= collection(db,"Users");
            await addDoc(userRef,{
                ...values,
                createdAt: serverTimestamp(),
                // updatededAt: serverTimestamp() 
            });          
            

            console.log("User added successfully!");
            actions.resetForm();
            
        } catch (error) {
            console.log("error",error.message);
        }
        
    }
    
    const updateCurrentUser= async(values,actions)=>{       
        
        try {
            
            try {
                
                const userRef=doc(db,"Users",props.updateContact.id);
                
                await updateDoc(userRef, {
                    ...values,
                    updatedAt: serverTimestamp()
                });

                
                actions.resetForm();
                props.setUpdate(!props.toUpdate);
    
            } catch (error) {
                console.log("Error in deleting user")
            }
            
        } catch (error) {
            console.log("Error in Updating")
        }

    }


  return (
    <>

        <div className={styles.card}>

            <Formik
            
            initialValues={ props.toUpdate ? 
                { name: props.updateContact.name , mobileNumber: props.updateContact.mobileNumber, panCard: props.updateContact.panCard }
                :
                { name: '', mobileNumber: '', panCard: '' }
                
            }
            validationSchema={validationSchema}
            
            onSubmit={(values,actions) => {                   
                
                
                    props.toUpdate ? updateCurrentUser(values,actions) : addUser(values,actions);

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
                        <label htmlFor="panCard">Pan Card</label>                        
                        <Field  name="panCard" placeholder="Pan Card"></Field>
                        <ErrorMessage name="panCard" component="div" className={styles.error} />

                    </div>  
                    <div className={styles.input}>
                        <label htmlFor="managerId">Manager Id</label>                        
                        <Field  name="managerId" placeholder="Manager Id"></Field>
                        <ErrorMessage name="managerId" component="div" className={styles.error} />

                    </div>  

                    <button className={styles.btn} type='submit'> Add User</button>       

                </Form>

            </Formik>

        </div>
      
    </>
  )
}
