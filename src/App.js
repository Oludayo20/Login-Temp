import { Routes, Route } from 'react-router-dom';
import Login from './features/auth/Login';
import NewUserForm from './features/users/NewUserForm';
import DashLayout from './components/DashLayout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer position="top-center" />
      <Routes>
        <Route path="/dash" element={<NewUserForm />}></Route>
        <Route path="/" element={<DashLayout />}></Route>
      </Routes>
    </>
  );
}

export default App;
