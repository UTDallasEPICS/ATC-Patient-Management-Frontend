import Behavior from "./Behavior";

 
export default function Behaviors({ behaviors }) {
  return (
    <div>
      {behaviors.map(( behavior ) => (
        <Behavior data={behavior}/>
      ))}
    </div>
  );
}
