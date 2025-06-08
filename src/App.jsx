import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from '../PrivateRoute';
import Login from './components/Login';
import Dashboard from './components/Dashboard'
import Register from './components/Register';
import SinglePost from './components/SinglePost';
import NewPost from './components/NewPost';
import Sidebar from './components/Sidebar';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideSidebar = ["/login", "/register"].includes(location.pathname);

  return (
    <div className="flex">
      {!hideSidebar && <Sidebar />}
      <main className="flex-1">{children}</main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
       <Layout>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}> <Route path="/" element={<Dashboard />}/> </Route>
          <Route path='/register' element={<Register/>}/>
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/new-post" element={<NewPost />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;