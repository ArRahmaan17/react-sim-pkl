import { Link } from "react-router-dom";

export default function Root() {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">SIM PKL</div>
      <Link className="sidebar-item" to="/">
        Home
      </Link>
      <Link className="sidebar-item" to="/attendance">
        Attendance
      </Link>
      <Link className="sidebar-item" to="/mentor/task">
        Task
      </Link>
      <Link className="sidebar-item" to="/create-user">
        Create User
      </Link>
      <Link className="sidebar-item" to="/login">
        Login
      </Link>
    </div>
  );
}
