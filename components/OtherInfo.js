import React from 'react'
import styles from "../styles/OtherInfo.module.css"

const OtherInfo = ({ info }) => {
    return (
        <div>
            <div className = {styles.container}>
            <p className = {styles.oi}>{info}</p>
            </div>
        </div>
    )
}

export default OtherInfo
