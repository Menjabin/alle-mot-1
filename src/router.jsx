import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./routes/layout";
import { Main } from "./routes/main";
import { Contestant } from "./routes/contestant";
import { Results } from "./routes/results";
import { Admin } from "./routes/admin";

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="contestant" element={<Contestant />} />
          <Route path="results" element={<Results />} />
        </Route>
        <Route path="admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
};
