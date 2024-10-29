import { Button, Card, Container, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Header from "../hearder/Hearder";
import { ImageGetRequest } from "../model/ImageGetRequest";

function EditImagePage() {
  const [search] = useSearchParams();
  const uid = search.get("UID");
  const lid = search.get("LID");
  console.log("AddPage UID = ", uid);
  console.log("EditPage LID = ", lid);
  const imgRef = useRef<HTMLInputElement>();
  const nameRef = useRef<HTMLInputElement>();

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

  console.log("555555",image);

  const nav = useNavigate();
  function Backclick() {
    nav("/UploadImage/?UID=" + uid);
  }
  async function Editclick() {
    console.log(imgRef.current?.value);
    console.log(nameRef.current?.value);
    const url = `http://localhost:3000/image/${lid}`;

    if (imgRef.current?.value !== "" && nameRef.current?.value !== "") {
      try {
        const body = {
          img: imgRef.current?.value,
          name: nameRef.current?.value,
        };
        const response = await axios.put(url, body);
        console.log(response);
      } catch (eee) {
        console.log("Errorrrrrrr : " + eee);
      }
      const json = {
        img: imgRef.current?.value,
        name: nameRef.current?.value,
      };

      localStorage.setItem("data", JSON.stringify(json));
      nav("/UploadImage/?UID=" + uid);
    } else {
      console.log("กรุณาใส่ข้อมูลให้ครบด้วยครับ");
    }
  }
  function getLocal() {
    console.log(JSON.parse(localStorage.getItem("data")!));
  }

  return (
    <>
      <Header></Header>
      <Container style={{ marginTop: "60px" }}>
        <Card
          style={{
            width: "500px",
            height: "500px",
            justifyContent: "center",
            borderRadius: "10px",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.12)",
            /* Added styles for centering */
            margin: "0 auto",
          }}
        >
          <div style={{ padding: "20px" }}>
            <h4>EditImage Page</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
            {image && lid ?(
                
               image.map((item) => (
                item.LID === +lid ?(
                  <>
                  <TextField
                inputRef={imgRef}
                id="outlined-basic"
                label="URL-Image"
                defaultValue={item.img}
                variant="outlined"
                style={{ marginBottom: "15px" }}
              />
              <TextField
                inputRef={nameRef}
                id="outlined-basic"
                label="Name-Image"
                defaultValue={item.name}
                variant="outlined"
                style={{ marginBottom: "15px" }}
              />
                </>
                  ) : null
               ))
                
              ) : null}
              <Button
                onClick={Backclick}
                style={{
                  backgroundColor: "#0073b7",
                  color: "white",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  fontSize: "16px",
                }}
              >
                กลับ
              </Button>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "20px",
                  fontSize: "14px",
                }}
              >
                <Button
                  onClick={Editclick}
                  style={{
                    background: "#74d56a",
                    color: "white",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    fontSize: "16px",
                  }}
                >
                  บันทึกรูปภาพ
                </Button>
              </div>
            </div>
          </div>
        </Card>
        <Button onClick={getLocal}>GetLocal</Button>
      </Container>
    </>
  );
}

export default EditImagePage;
