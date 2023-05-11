import React from "react";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

const Behavior = ({ reports, /*studentId, updateBehaviorList*/ }) => {

    return (
        <div>
            {reports.map((report) => {
                const behaviors = report['behaviors']

                return(
                    <Accordion key={report._id}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                        >
                            <Typography>{(new Date(report.sessionTime)).toLocaleString()} </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <div>
                                {behaviors.map((behavior) => {
                                    const index = behaviors.indexOf(behavior)
                                    console.log(behavior.id)
                                    return (
                                        <Accordion key={behavior.id}>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon />}
                                                aria-controls="panel1a-content"
                                            >
                                                <Typography>{behavior.name} </Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div >
                                                    <Typography color="textSecondary" variant="body2">
                                                        Description: <br />
                                                        {behavior.description}
                                                        <br />
                                                        <br />
                                                    </Typography>
                
                                                    <Typography color="textSecondary" variant="body2">
                                                        Type: <br />
                                                        {behavior.datatype}
                                                        <br />
                                                        <br />
                                                    </Typography>

                                                    <Typography color="textSecondary" variant="body2">
                                                        Data: <br /> 
                                                        {report['data'][index].map((element) => {
                                                            const keys = Object.keys(element)
                                                            var data = ''
                                                            for (const key of keys) {
                                                                data += `${key}: ${element[key]} \n`
                                                            }
                                                            console.log(data)
                                                            return data
                                                        })}
                                                    </Typography>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>   
                                    )
                                })}
                            </div>
                        </AccordionDetails>
                    </Accordion>    
                )
            })}
        </div>
    );
};

export default Behavior;