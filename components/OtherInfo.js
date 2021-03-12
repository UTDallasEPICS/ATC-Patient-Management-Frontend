import React from 'react'
import styles from "../styles/OtherInfo.module.css"

const OtherInfo = ({ info }) => {
    return (
        <div>
            <p className = {styles.oi}>{info}</p>
        </div>
    )
}

export default OtherInfo
