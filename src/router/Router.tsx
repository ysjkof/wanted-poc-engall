import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "../Components/Layout";
import AddSchedule from "../pages/AddSchedule";
import Main from "../pages/main";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="/add" element={<AddSchedule />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
