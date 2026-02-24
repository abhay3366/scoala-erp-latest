import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-2xl font-bold mb-4">Welcome</h1>
      <Link to="/login" className="text-blue-600 underline">
        Go to Login
      </Link>
    </div>
  );
};

export default Landing;
