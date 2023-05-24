import { Route } from "react-router";
const Welcome = () => {
  return (
    <div>
      <h2>hellooo this is the welcome page everyone can see</h2>
      <Route path="/Welcome/new">
        <p>this is the page for the new user</p>
      </Route>
    </div>
  );
};
export default Welcome;
