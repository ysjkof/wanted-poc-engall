import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import AddSchedule from '../pages/AddSchedule';
import Main from '../pages/main';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Main />} />
          <Route path="/add" element={<AddSchedule />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
