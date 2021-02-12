import Head from 'next/head'
import Student from '../components/studentListItem';
import styles from '../styles/StudentSearch.module.css'

export default function studentSearch(){
    return (
        <div>
            <Student firstName="John" lastName="Doe" id="id"/>
            <h1>This is the student search page</h1>

            <button className={styles.button}>Add New</button>
        </div>
    )
}