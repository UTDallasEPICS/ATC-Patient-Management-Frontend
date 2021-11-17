import React from 'react'
import Behavior from "./Behavior";



const Mastered = ( { studentID }) => {
    
    const [behavior, setBehavior] = React.useState([]);
  
    React.useEffect(() => {
      setBehavior([
        {
          id: 0,
          name: "Touch Toes",
          description: "Test if client is able to touch toes",
          type: "Trial",
          domain: ["Behaviors for Increase"],
          masteryCriteria: "5 consecutive days passed.",
          mastered: false,
        },
        {
          id: 1,
          name: "Punching",
          description:
            "If student punches anyone",
          type: "frequency",
          domain: ["Behaviors for decrease"],
          masteryCriteria: "2 consecutive days passed.",
          mastered: false,
        },
        {
          id: 2,
          name: "Responding to Name",
          description: "Reacts when name is called",
          type: "probe",
          domain: ["Listener Reponding"],
          masteryCriteria: "10 Sessions Passed",
          mastered: true,
        },
      ]);
    }, []);
    return (
        <div>
            <Behavior list={behavior} />
        </div>
    )
}

export default Mastered

