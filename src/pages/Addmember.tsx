import { Button, Card, Container, TextField } from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../hearder/Hearder";

function AddmemberPage() {
  const fullnameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();

  const nav = useNavigate();
  function Backclick() {
    nav("/Login");
  }
  async function Addclick() {
    console.log(fullnameRef.current?.value);
    console.log(emailRef.current?.value);
    console.log(passRef.current?.value);

    const url = "http://localhost:3000/user/addmember";

    if (
      fullnameRef.current?.value !== "" &&
      emailRef.current?.value !== "" &&
      passRef.current?.value !== ""
    ) {
      try {
        const body = {
          username: emailRef.current?.value,
          password: passRef.current?.value,
          name: fullnameRef.current?.value,
        };
        const response = await axios.post(url, body);
        console.log(response);
      } catch (eee) {
        console.log("Errorrrrrrr : " + eee);
      }
      const json = {
        full: fullnameRef.current?.value,
        email: emailRef.current?.value,
        pass: passRef.current?.value,
      };

      localStorage.setItem("data", JSON.stringify(json));
      nav("/");
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
            <h4>Addmember Page</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                inputRef={fullnameRef}
                id="outlined-basic"
                label="ชื่อ-สกุล"
                variant="outlined"
                style={{ marginBottom: "15px" }}
              />
              <TextField
                inputRef={emailRef}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                style={{ marginBottom: "15px" }}
              />
              <TextField
                inputRef={passRef}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                style={{ marginBottom: "15px" }}
              />
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
                  onClick={Addclick}
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    width: "100%",
                    padding: "10px",
                    borderRadius: "5px",
                    fontSize: "16px",
                  }}
                >
                  สมัครสมาชิก
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

export default AddmemberPage;
