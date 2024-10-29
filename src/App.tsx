import './App.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/Home';
import LoginPage from './pages/Login';
import AddmemberPage from './pages/Addmember';
import RankPage from './pages/Rank';
import GraphPage from './pages/Graph';
import UploadImgPage from './pages/UploadImage';
import ProfilePage from './pages/Profile';
import EditProfilePage from './pages/EditProfile';
import ForgotPassPage from './pages/ForgotPass';
import ViewProfilePage from './pages/ViewProfile';
import AddImagePage from './pages/AddImage';
import EditImagePage from './pages/EditImage';
import ShowallUserPage from './pages/ShowallUser';
import AllUserProfilePage from './pages/AllUserProfile';

const routers = createBrowserRouter(
	[
   
      { path: "/", element: <HomePage/> },
      { path: "/Login", element: <LoginPage /> },
      { path: "/Addmem", element: <AddmemberPage/> },
      { path: "/Rank", element: <RankPage/> },
      { path: "/Graph", element: <GraphPage/> },
      { path: "/Upimg", element: <UploadImgPage/> },
      { path: "/Profile", element: <ProfilePage/> },
      { path: "/EditProfile", element: <EditProfilePage/> },
      { path: "/ForgotPass", element: <ForgotPassPage/> },
      { path: "/ViewProfile", element: <ViewProfilePage/> },
      { path: "/UploadImage", element: <UploadImgPage/> },
      { path: "/AddImage", element: <AddImagePage/> },
      { path: "/EditImage", element: <EditImagePage/> },
      { path: "/ShowallUser", element: <ShowallUserPage/> },
      { path: "/AllUserProfile", element: <AllUserProfilePage/> }
     
	]
);

function App() {
  return (
      <>
    <RouterProvider router={routers} /></>

  )
}

export default App
