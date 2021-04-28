import React from 'react'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Chip from "@material-ui/core/Chip";
import styles from "../../styles/EditProgram.module.css";
import Divider from "@material-ui/core/Divider";



const Behavior = ({ list }) => {
    return (
        <div>
        {list.map((item) => (
            <Accordion key={item.id}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>{item.name} </Typography>
            
            
            
                </AccordionSummary>
                <AccordionDetails>
                       <Typography>

                       <Typography color="textSecondary" variant="body2">
                            Type: <br/>
                            {item.type}
                            <br/>
                            <br/>
                        </Typography>
                    
                        <Typography color="textSecondary" variant="body2">
                            Description: <br/>
                            {item.description}
                            <br/>
                            <br/>
                        </Typography>

                        <Typography color="textSecondary" variant="body2">
                            Mastery Criteria: <br/>
                            {item.masteryCriteria}
                            <br/>
                            <br/>
                        </Typography>

                        <Typography color="textSecondary" variant="body2">
                            Domain: <br/>
                        </Typography>
                        {item.domain.map((data) => {
                            return (
                            <Chip
                                label={data}
                                className={styles.chip}
                             />
            
            
          
        );
      })}
                    
                    

                       
                    </Typography>
                    
            </AccordionDetails>
            </Accordion>
        ))}
        </div>
    )
}

export default Behavior
