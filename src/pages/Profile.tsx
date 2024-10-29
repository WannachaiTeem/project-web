import { useState, useEffect } from "react";
import { Button, Card, Container } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios"; // นำเข้า Axios เพื่อทำ HTTP requests
import { UserGetRequest } from "../model/UserGetRequest";
import Header from "../hearder/Hearder";

function ProfilePage() {
  const [search] = useSearchParams();
  const uid = search.get("UID");
  console.log("ProfilePage UID = ", uid);
  const [user, setUser] = useState<UserGetRequest[]>([]);
  useEffect(() => {
    const callapi = async () => {
      // const url = "http://localhost:3000/user/4";
      const url = `http://localhost:3000/user/${uid}`;
      const response = await axios.get(url);
      const userData: UserGetRequest[] = response.data;
      console.log("UserData :", userData);
      setUser(userData);
    };
    callapi();
  }, [uid]);

  const nav = useNavigate();
  function Editclick() {
    nav("/EditProfile/?UID=" + uid);
  }

  return (
    <>
      <Header></Header>
      <Container style={{ marginTop: "60px" }}>
        <Card
          style={{
            width: "900px",
            height: "400px",
            justifyContent: "center",
            borderRadius: "10px",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.12)",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                style={{ borderRadius: "50px" }}
                width={"200px"}
                height={"150px"}
                src={user[0]?.avatar}
                alt=""
              />
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3>{user[0]?.name}</h3>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3>UserName : {user[0]?.username}</h3>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <h3>PassWord : {user[0]?.password}</h3>
            </div>
            <div style={{ display: "flex", justifyContent: "end" }}>
              <Button
                style={{
                  backgroundColor: "#0073b7",
                  color: "white",
                  width: "200px",
                  borderRadius: "5px",
                  fontSize: "16px",
                }}
                onClick={Editclick}
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
}

export default ProfilePage;
