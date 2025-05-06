import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Home } from "../Pages/Home";
import { FormPage } from "../Pages/FormPage";
import { ScenePlanner } from "../Pages/ScenePlanner";
import { AllProductionsPage } from "../Pages/AllProductionsPage";
import { PlayEditPage } from "../Pages/PlayEditPage";
import { ActorPage } from "../Pages/ActorPage";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/scenisar" element={<ActorPage />} />
          <Route path="/scenplannerare/:playId" element={<ScenePlanner />} />
          <Route path="/playPage/:playId" element={<PlayEditPage />} />
          <Route path="/allProductions" element={<AllProductionsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
