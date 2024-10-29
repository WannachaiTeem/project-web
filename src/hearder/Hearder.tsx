import { AppBar, Toolbar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { UserGetRequest } from "../model/UserGetRequest";
import { useState, useEffect } from "react";

function Header() {
  const [userData, setUserData] = useState<UserGetRequest | null>(null);
  const userDataString = localStorage.getItem("UserData");
  useEffect(() => {
    if (userDataString) {
      const userData: UserGetRequest = JSON.parse(userDataString);
      setUserData(userData);
      // console.log("11111111");
      // console.log("SETTEST = " + userData.UID);
    }
  }, [userDataString]);

  const nav = useNavigate();

  console.log("HearderPage UID = ", userData?.UID);
  function Homeclick() {
    nav("/?UID=" + userData?.UID);
  }
  function Rankclick() {
    nav("/Rank/?UID=" + userData?.UID);
  }
  function Grahclick() {
    nav("/Graph/?UID=" + userData?.UID);
  }
  function Imageclick() {
    nav("/Uploadimage/?UID=" + userData?.UID);
  }
  function LogOutclick() {
    localStorage.removeItem("UserData");
    setUserData(null);
    nav("/");
    // console.log(localStorage.getItem("UserData"));
  }
  function LogInclick() {
    localStorage.removeItem("UserData");
    nav("/Login");
    // console.log(localStorage.getItem("UserData"));
  }
  function Showuserclick() {
    nav("/ShowallUser/?UID=" + userData?.UID);
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <div style={{display : "flex",justifyContent : "space-between",width : "100%"}}>
            <Typography
              variant="h6"
              component="div"
              sx={{ display: "flex", alignItems: "center" }}
            >
              <h2 style={{ marginRight: "20px" }}>FACEMASH</h2>
              {userData?.type === 1 && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <h3 style={{ color : "black"}}>Admin</h3>
                </div>
              )}
            </Typography>
           <div style={{display : "flex",alignItems: "center" }}>
           {userData?.type === 1 && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Button
                    color="inherit"
                    onClick={Showuserclick}
                    
                  >
                    All User
                  </Button>
                  
                </div>
                
              )}
            {userData?.UID != null && (
              
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button color="inherit" onClick={Homeclick}>
                  HOME
                </Button>
                <Button color="inherit" onClick={Rankclick}>
                  RANK
                </Button>
                <Button color="inherit" onClick={Grahclick}>
                  GRAPH
                </Button>
                <Button color="inherit" onClick={Imageclick}>
                  IMAGE
                </Button>
                <Link to={"/Profile/?UID=" + userData?.UID}>
                  <img
                    style={{ width: 50, borderRadius: "50%" }}
                    src={userData.avatar}
                    alt=""
                  />
                </Link>
                <Button color="inherit" onClick={LogOutclick}>
                  LogOut
                </Button>
              </div>
            )}
            {userData?.UID == null && (
              <div>
                <Button color="inherit" onClick={Homeclick}>
                  HOME
                </Button>
                <Button color="inherit" onClick={Rankclick}>
                  RANK
                </Button>
                <Button color="inherit" onClick={LogInclick}>
                  LogIn
                </Button>
              </div>
            )}
           </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  );
}

export default Header;
