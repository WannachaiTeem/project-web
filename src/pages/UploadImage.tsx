import { Box, Button, Card, Container } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ImageGetRequest } from "../model/ImageGetRequest";
import axios from "axios";
import Header from "../hearder/Hearder";

function UploadImgPage() {
  const nav = useNavigate();
  const [search] = useSearchParams();
  const uid = search.get("UID");
  console.log("ImagePage UID = ", uid);
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
  function AddImageclick() {
    nav("/AddImage/?UID=" + uid);
  }
  function EditImageclick(lid: number) {
    nav("/EditImage/?UID=" + uid + "&LID=" + lid);
  }
  async function DeleteImageclick(lid: number) {
    const url = `http://localhost:3000/image/delete/${lid}`;
    await axios.delete(url);
    setImage((prevState) => prevState.filter((item) => item.LID !== lid));
  }

  return (
    <>
      <Header></Header>
      <Container
        style={{
          display: "flex",
          justifyContent: "center",
          textAlign: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px", // เพิ่มระยะห่างด้านล่างระหว่าง header และ cards
          }}
        >
          <h3>รูปภาพของคุณ</h3>
          {image.length <5 &&(
             <Button
             style={{
               background: "black",
               borderRadius: "40px",
               color: "white",
               height: "50px",
               width: "100px",
               marginTop: "15px",
             }}
             onClick={AddImageclick}
           >
             เพิ่มรูปภาพ
           </Button>
          )}
        </div>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent : "center"
          }}
        >
          {image.map((item, index) => (
            <Card
              key={index}
              style={{
                backgroundColor: "white",
                height: "250px",
                width: "450px",
                borderRadius: "40px",
                margin: "10px", // เพิ่มขอบของ card
                padding: "20px",
              }}
            >
              <Box display="flex" alignItems="center">
                <img
                  style={{
                    width: "200px",
                    height: "250px",
                    borderRadius: "40px",
                  }}
                  src={item.img}
                  alt=""
                />
                <div style={{ marginTop: "20px", textAlign: "center" }}>
                  <h4>{item.name}</h4>
                  <div style={{ display: "flex" ,textAlign: "center" }}>
                    <h4 style={{ marginLeft: "40px" }}>Score </h4>
                    <h3 style={{ marginLeft: "20px" }}>{parseInt(item.rate + "")}</h3>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "10px",
                      marginLeft : "10px"
                    }}
                  >
                    <Button
                      onClick={() => EditImageclick(item.LID)}
                      style={{
                        color: "black",
                        width: "100px",
                        background: "#74d56a",
                        borderRadius: "40px",
                        marginRight : "10px"
                      }}
                    >
                      เปลี่ยนรูปภาพ
                    </Button>
                    <Button
                      style={{
                        color: "black",
                        background: "#ff5456",
                        borderRadius: "40px",
                      }}
                      onClick={() => DeleteImageclick(item.LID)}
                    >
                      ลบ
                    </Button>
                  </div>
                </div>
              </Box>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

export default UploadImgPage;


