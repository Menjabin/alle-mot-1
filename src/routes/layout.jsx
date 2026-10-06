import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div className="App">
      <div className="App-header bg-current text-secondary">
        <Outlet />
      </div>
    </div>
  );
};
