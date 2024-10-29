import { Box, Button, Card, Container } from "@mui/material";
import Header from "../hearder/Hearder";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserGetRequest } from "../model/UserGetRequest";
import axios from "axios";

function ShowallUserPage() {
  const [search] = useSearchParams();
  const uid = search.get("UID");
  console.log("ShowallUserPage UID = ", uid);
  const [user, setUser] = useState<UserGetRequest[]>([]);
  const nav = useNavigate();
  useEffect(() => {
    const callapi = async () => {
      const url = "http://localhost:3000/user";
      const response = await axios.get(url);
      const userData: UserGetRequest[] = response.data;
      console.log("UserData :", userData);
      setUser(userData);
    };
    callapi();
  }, [uid]);

  function Viewprofileclick(uid: number) {
    nav("/AllUserProfile/?UID=" + uid);
  }
  
  return (
    <>
      <Header></Header>
      <Container>
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          sx={{ gap: 2, justifyContent: "center" }}
        >
          {user.map((item) => (
            <Card
              style={{
                backgroundColor: "white",
                width: "1000px",
                height: "150px",
                borderRadius: "40px",
                marginTop: "30px",
                padding: "20px",
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <img
                      style={{
                        width: "140px",
                        height: "140px",
                        borderRadius: "50%",
                        marginRight: "20px", // เปลี่ยนจาก 90px เป็น 20px
                      }}
                      src={item.avatar}
                      alt=""
                    />
                  </div>
                  <div>
                    <h2>{item.name}</h2>
                  </div>
                </div>
                <div>
                  <Button 
                  onClick={() => Viewprofileclick(item.UID)}
                  style={{ backgroundColor: "black", 
                  color: "white" }}
                  
                  >
                    View Profile
                  </Button>
                </div>
              </Box>
            </Card>
          ))}
        </Box>
      </Container>
    </>
  );
}

export default ShowallUserPage;
