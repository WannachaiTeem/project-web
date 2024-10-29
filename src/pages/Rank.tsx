import { Card, Container } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import Header from "../hearder/Hearder";
import { ImageGetRequest } from "../model/ImageGetRequest";
import { useEffect, useState } from "react";
import axios from "axios";

function RankPage() {
  const [search] = useSearchParams();
  const uid = search.get("UID");
  console.log("RankPage UID = ", uid);

  const [image, setImage] = useState<ImageGetRequest[]>([]);
  useEffect(() => {
    const callapi = async () => {
      // const url = "http://localhost:3000/user/4";
      const url = "http://localhost:3000/image";
      const response = await axios.get(url);
      const imageData: ImageGetRequest[] = response.data;
      console.log("ImageData :", imageData);
      setImage(imageData);
    };
    callapi();
  }, []);
  console.log("ImageRank = ", image);

  return (
    <>
      <Header></Header>
      <Container>
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <h3>RANKKING</h3>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            overflowY: "auto",
          }}
        >
          <Card
            style={{
              backgroundColor: "whitesmoke",
              width: "1100px",
              height: "480px",
              borderRadius: "40px",
              overflowY: "auto", // เพิ่ม overflowY เพื่อให้มีการเลื่อนแนวตั้ง
              textAlign: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                position : "sticky",
                top : "0",
                background : "whitesmoke"
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "10%",
                  justifyContent: "center",
                }}
              >
                <h3>RANK</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "80%",
                  justifyContent: "center",
                }}
              >
                <h3>CHARECTER</h3>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "10%",
                  justifyContent: "center",
                }}
              >
                <h3>RATTING</h3>
              </div>
            </div>
            {image.map((item, i) => (
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  width: "100%",
                  marginBottom: "30px",
                  marginTop : "10px"
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "10%",
                    justifyContent: "center",
                  }}
                >
                  <h3>{i + 1}</h3>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "80%",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "end",
                    }}
                  >
                    <img
                      style={{
                        width: "150px",
                        height: "150px",
                        borderRadius: "40px",
                        marginRight: "30px",
                      }}
                      src={item.img}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      width: "50%",
                      display: "flex",
                      justifyContent: "start",
                    }}
                  >
                    <h3>{item.name}</h3>
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "10%",
                    justifyContent: "center",
                  }}
                >
                  <h3>{parseInt(item.rate + "")}</h3>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </Container>
    </>
  );
}

export default RankPage;
