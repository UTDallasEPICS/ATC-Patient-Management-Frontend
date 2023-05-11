import React from 'react'
import Current from './Current'
import styles from "../../../styles/AddSession.module.css";
import Typography from "@material-ui/core/Typography";

const Reports = ({ reports }) => {

    return (
        <div>
            <br />
            <Current reports={reports} />
        </div>
    )
    // return (
    //     <div className={styles.behaviorBox}>
    //     <p className={styles.behaviorTitle}>{title}</p>
    //     <p>
    //         <Typography>Description:</Typography>
    //         <Typography>{description}</Typography>
    //     </p>
  
    //     {/* <Grid container justify="center" spacing={2}>
    //       {entries.map((entry) => (
    //         <Grid item key={entry}>
    //           {generateInput(entry, entryCounter)}
    //         </Grid>
    //       ))}
    //     </Grid> */}
  
    //     <Divider style={{ marginTop: "40px" }} />
    //     <ul className={styles.tagsSection}>
    //       {tags.map((tag, i) => {
    //         return (
    //           <li key={tag}>
    //             {tag != "" ? <Chip className={styles.tagItem} label={tag} /> : ""}
    //           </li>
    //         );
    //       })}
    //     </ul>
    //   </div>
    // )
}

export default Reports
