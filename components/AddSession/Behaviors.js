import Behavior from "./Behavior";

 
export default function Behaviors({ behaviors }) {
  return (
    <div>
      {behaviors.map(( behavior, i ) => (
        <Behavior key={i} data={behavior}/>
      ))}
    </div>
  );
}
