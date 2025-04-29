import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "../Pages/Home";
import { FormPage } from "../Pages/FormPage";
import { ScenePlanner } from "../Pages/ScenePlanner";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/p/:playId" element={<ScenePlanner />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
