import { Button, Card, Container, TextField } from "@mui/material";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();

  const nav = useNavigate();

  async function checkLogin() {
    const url = `http://localhost:3000/user/checklog`;
    // Async/Await
    try {
      const response = await axios.get(url, {
        params: {
          username: localStorage.getItem("email"),
          password: localStorage.getItem("pass"),
          
        },
      });
      console.log(response);
      if (response.data["login"] === "true") {
        console.log(response.data['result']);
        localStorage.setItem("UserData",JSON.stringify(response.data['result']));
        nav("/");
      }
    } catch (eee) {
      console.log("Errorrrrrrr : " + eee);
    }
  }

  function Addclick() {
    nav("/Addmem");
  }
  function logclick() {
    console.log(emailRef.current?.value);
    console.log(passRef.current?.value);

    if (emailRef.current?.value !== "" && passRef.current?.value !== "") {
      const json = {
        email: emailRef.current?.value,
        pass: passRef.current?.value,
      };

      localStorage.setItem("email", emailRef.current!.value);
      localStorage.setItem("pass", passRef.current!.value);
      localStorage.setItem("data", JSON.stringify(json));
      // nav("/");
      checkLogin();
    } else {
      console.log("กรุณาใส่ข้อมูลให้ครบด้วยครับ");
    }
  }
  function getLocal() {
    console.log(JSON.parse(localStorage.getItem("data")!));
  }

  return (
    <>
      <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" ,width : "100vw"}}>
        <Card
          style={{
            width: "500px",
            height: "600px",
            justifyContent: "center",
            borderRadius: "10px",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.12)",
            /* Added styles for centering */
            margin: "0 auto",
            marginTop : "50px"
          }}
        >
          <div style={{ padding: "20px" }}>
            <div style={{display : "flex",textAlign : "center",justifyContent : "center"}}>
            {/* <h4>Login</h4> */}
            <img
                  style={{
                    width: "200px",
                    height: "190px",
                    borderRadius: "50%",
                  }}
                  src="https://cdn.marketingoops.com/wp-content/uploads/2017/12/2017-12-26_13-23-57.jpg.webp" alt="" />
                
            
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
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
                onClick={logclick}
                style={{
                  backgroundColor: "#0073b7",
                  color: "white",
                  width: "100%",
                  padding: "10px",
                  borderRadius: "5px",
                  fontSize: "16px",
                }}
              >
                Login
              </Button>
              <div
                style={{
                  textAlign: "center",
                  marginTop: "10px",
                  fontSize: "14px",
                  color: "#999",
                }}
              >
                <Link to={"/ForgotPass"}>ลืมรหัสผ่าน?</Link>
              </div>
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
      </Container>
        <Button onClick={getLocal}>GetLocal</Button>
    </>
  );
}

export default LoginPage;
