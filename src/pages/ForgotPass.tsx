import { Button, Card, Container, TextField } from "@mui/material";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../hearder/Hearder";

function ForgotPassPage() {
  const usernameRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const newpassRef = useRef<HTMLInputElement>();

  const nav = useNavigate();
  function Backclick(){
    nav("/Login");
}
  function logclick() {
    console.log(usernameRef.current?.value);
    console.log(passRef.current?.value);
    console.log(newpassRef.current?.value);

    if (
      usernameRef.current?.value !== "" &&
      passRef.current?.value !== "" &&
      newpassRef.current?.value !== ""
    ) {
      const json = {
        username: usernameRef.current?.value,
        pass : passRef.current?.value,
        newpass : newpassRef.current?.value,
      };

      localStorage.setItem("data", JSON.stringify(json));
      nav("/Login");
    } else {
      console.log("กรุณาใส่ข้อมูลให้ครบด้วยครับ");
    }
  }
//   function getLocal() {
//     console.log(JSON.parse(localStorage.getItem("data")!));
//   }

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
            <h4>Forgot Password Page</h4>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <TextField
                inputRef={usernameRef}
                id="outlined-basic"
                label="Username"
                variant="outlined"
                style={{ marginBottom: "15px" }}
              />
              <TextField
                inputRef={passRef}
                id="outlined-basic"
                label="รหัสผ่านใหม่"
                variant="outlined"
                style={{ marginBottom: "15px" }}
              />
              <TextField
                inputRef={newpassRef}
                id="outlined-basic"
                label="ยืนยันรหัสผ่าน"
                variant="outlined"
                style={{ marginBottom: "15px" }}
              />
              <div style={{display : "flex"}}>
              <Button
                style={{
                  backgroundColor: "#ff5456",
                  color: "black",
                  width: "200px",
                  borderRadius: "5px",
                  fontSize: "16px",
                  marginRight : "20px"
                  
                }}
                onClick={Backclick}
              >
                กลับ
              </Button>
              <Button
                style={{
                  width: "200px",
                  borderRadius: "5px",
                  fontSize: "16px",
                  color : "black",
                  backgroundColor : "#74d56a"
                }}
                onClick={logclick}
              >
                บันทึก
              </Button>
              
              </div>
            </div>
          </div>
        </Card>
        {/* <Button onClick={getLocal}>GetLocal</Button> */}
      </Container>
    </>
  );
}

export default ForgotPassPage;
