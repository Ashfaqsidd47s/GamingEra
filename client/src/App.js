import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Edit from "./pages/edit/Edit";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Messenger from "./pages/messenger/Messenger.js";
import { BrowserRouter, Routes, Route ,Navigate, Outlet} from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context";



function App(){
  const {user} = useContext(Context);


  function ProtectedRoutes  (){
    
    if(user){
      return (<Outlet />);
    }else{
      return (<Navigate to="/login" />);
    }
  }

  return(
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedRoutes />} >
          <Route index element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit" element={<Edit />} />
          <Route path="messenger" element={<Messenger />} />
          <Route path="*" element={<h1>Error </h1>} />
        </Route>
          <Route path="login" element={user ? <Navigate to="/" />:<Login />} />
          <Route path="register" element={user ? <Navigate to="/" /> : <Register />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
