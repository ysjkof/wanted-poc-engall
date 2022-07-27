import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<p>hello world</p>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
