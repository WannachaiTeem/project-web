import { useState, useEffect } from "react";
import { Button, Card, Container } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios"; // นำเข้า Axios เพื่อทำ HTTP requests
import { UserGetRequest } from "../model/UserGetRequest";
import Header from "../hearder/Hearder";
import { ImageGetRequest } from "../model/ImageGetRequest";
import { LineChart } from "@mui/x-charts";

function AllUserProfilePage() {
  const [search] = useSearchParams();
  const uid = search.get("UID");
  console.log("AllUserProfilePage UID = ", uid);
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

  const [image, setImage] = useState<ImageGetRequest[]>([]);
  useEffect(() => {
    const callapi = async () => {
      // const url = "http://localhost:3000/user/4";
      const url = `http://localhost:3000/image//UID/${uid}`;
      const response = await axios.get(url);
      const imageData: ImageGetRequest[] = response.data;
      console.log("ImageData :", imageData);
      setImage(imageData);
    };
    callapi();
  }, [uid]);
  console.log("999999", image);
  const nav = useNavigate();
  function Backclick() {
    nav("/ShowallUser/?UID=" + uid);
  }

  return (
    <>
      <Header></Header>
      <Container style={{ marginTop: "60px" }}>
        <div>
          <Button
            style={{ background: "black", color: "white" }}
            onClick={() => Backclick()}
          >
            Back
          </Button>
        </div>
        <Card
          style={{
            width: "900px",
            height: "400px",
            justifyContent: "center",
            borderRadius: "10px",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.12)",
            margin: "0 auto",
            // padding: "2px",
            marginTop: "10px",
            overflowY: "auto", // เพิ่ม overflowY เพื่อให้มีการเลื่อนแนวตั้ง
          }}
        >
          <div>
            <div style={{ display: "flex", justifyContent: "center",marginTop : "20px" }}>
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
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                position : "sticky",
                top : "0",
                background : "Gray"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "10%",
                  justifyContent: "center",
                //   padding : "10px"
                }}
              >
                <h3>Image</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "80%",
                  justifyContent: "center",
                }}
              >
                <h3>Graph</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "10%",
                  justifyContent: "center",
                }}
              >
                <h3>Ratting</h3>
              </div>
            </div>
            {image.map((item, index) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <div style={{ display: "flex", justifyContent: "center" ,alignItems : "center",width : "40%"}}>
                  <img
                    key={index}
                    style={{
                      borderRadius: "50px",
                      display: "inline-block",
                      margin: "5px",
                      justifyContent: "center",
                      marginRight: "10px",
                    }}
                    width={"200px"}
                    height={"150px"}
                    src={item.img}
                    alt=""
                  />
                </div>
                <div style={{ display: "flex", justifyContent: "center", width : "40%"}}>
                <LineChart
                        xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                        series={[
                          {
                            data: [2, 5.5, 2, 8.5, 1.5, 5],
                          },
                        ]}
                        width={400}
                        height={300}
                      />
                </div>
                <div style={{ display: "flex", justifyContent: "center", width : "20%" ,alignItems : "center"}}>
                <h3>{parseInt(item.rate + "")}</h3>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Container>
    </>
  );
}

export default AllUserProfilePage;
