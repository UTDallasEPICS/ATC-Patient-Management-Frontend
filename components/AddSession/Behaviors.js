import Behavior from "./Behavior";

 
export default function Behaviors({ behaviors, returnResponses}) {
  let responseArray = []
  for(var i = 0; i < behaviors.length; i++)
  {
      responseArray[i] = [];
  }
  const fillData = (behaviorCount, response) =>
  {
      responseArray[behaviorCount] = response;
      if(typeof(returnResponses) == "function") {
        returnResponses(responseArray);
      }
  }

  return (
    <div>
      {behaviors.map(( behavior, i ) => (
        <Behavior behaviorCount={i} data={behavior} returnData={fillData}/>
      ))}
    </div>
  );
} 