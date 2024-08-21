import React from 'react'
import styles from "./Model.module.css"
import { Form, Formik ,Field } from 'formik'

export default function Model() {
  return (
    <>

        <div className={styles.card}>

            <Formik
            
                initialValues={{ name: '', mobileNumber: '', panCard: '' }}

                onSubmit={(values) => {
                    
                    console.log(values);

                }}

            >

                <Form >

                    <div className={styles.input}>
                        <label htmlFor="name">Name</label>
                        <Field name="name"></Field>
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="Mobile Number">Mobile Number</label>
                        <Field name="mobileNumber"></Field>
                    </div>
                    <div className={styles.input}>
                        <label htmlFor="PAN CARD">PAN CARD</label>
                        <Field  name="panCard"></Field>
                    </div>  

                    <button className={styles.btn}> Add User</button>       

                </Form>

            </Formik>

        </div>
      
    </>
  )
}
