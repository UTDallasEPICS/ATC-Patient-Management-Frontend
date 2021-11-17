import React from 'react'
import TextField from '@material-ui/core/TextField';
import styles from "../../styles/Mastery.module.css";


const Mastery = () => {
    return (
        <div className={styles.container}>
            <TextField
          id="standard-textarea"
          label="Mastery Criteria"
          placeholder=""
          multiline
        />
        </div>
    )
}

export default Mastery
