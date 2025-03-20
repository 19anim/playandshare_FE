import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section>
      <h1>Not Found Page ❌</h1>
      <Link to="/">Go back to home page</Link>
    </section>
  );
};

export default NotFound;
