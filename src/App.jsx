import './App.css'
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import PrivateRoute from '../PrivateRoute';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard'
import Register from './components/pages/Register';
import SinglePost from './components/pages/SinglePost';
import NewPost from './components/pages/NewPost';
import Sidebar from './components/Sidebar';
import Homepage from './components/pages/homepage';

const Layout = ({ children }) => {
  const location = useLocation();
  const hideSidebar = ["/login", "/register","/"].includes(location.pathname);
  const newPost = ["/new-post"].includes(location.pathname);

  return (
    <div className="flex h-screen">
      {!hideSidebar && <Sidebar />}
      <main className={`w-full flex justify-center ${newPost ? 'items-center' : ''} `}>{children}</main>
    </div>
  );
};

function App() {
  return (
    <BrowserRouter>
       <Layout>
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}> <Route path="/dashboard" element={<Dashboard />}/> </Route>
          <Route path='/register' element={<Register/>}/>
          <Route path="/post/:id" element={<SinglePost />} />
          <Route path="/new-post" element={<NewPost />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;