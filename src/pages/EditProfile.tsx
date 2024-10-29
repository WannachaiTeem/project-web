import { Button, Card, Container, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "../hearder/Hearder";
import { UserGetRequest } from "../model/UserGetRequest";

function EditProfilePage() {
  const [userData, setUserData] = useState<UserGetRequest | null>(null);
  const userDataString = localStorage.getItem("UserData");

  const fullnameRef = useRef<HTMLInputElement>();
  const emailRef = useRef<HTMLInputElement>();
  const passRef = useRef<HTMLInputElement>();
  const urlimageRef = useRef<HTMLInputElement>();

  const [search] = useSearchParams();
  const uid = search.get("UID");
  console.log("EditProfilePage UID = ", uid);

  const nav = useNavigate();
  function Backclick() {
    nav("/Profile/?UID=" + uid);
  }
  async function recordclick() {
    console.log(urlimageRef.current?.value);
    console.log(fullnameRef.current?.value);
    console.log(emailRef.current?.value);
    console.log(passRef.current?.value);

    // const url = "http://localhost:3000/user/1"
    const url = `http://localhost:3000/user/${uid}`;

    if (
      emailRef.current?.value !== "" &&
      passRef.current?.value !== "" &&
      fullnameRef.current?.value !== "" &&
      urlimageRef.current?.value !== ""
    ) {
      try {
        const body = {
          username: emailRef.current?.value,
          password: passRef.current?.value,
          name: fullnameRef.current?.value,
          avatar: urlimageRef.current?.value,
        };
        const response = await axios.put(url, body);
        console.log(response);
      } catch (eee) {
        console.log("Errorrrrrrr : " + eee);
      }
      const json = {
        email: emailRef.current?.value,
        pass: passRef.current?.value,
        full: fullnameRef.current?.value,
        img: urlimageRef.current?.value,
      };

      localStorage.setItem("data", JSON.stringify(json));
      nav("/Profile/?UID=" + uid);
    } else {
      console.log("กรุณาใส่ข้อมูลให้ครบด้วยครับ");
    }
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = localStorage.getItem("UserData");
        if (userDataString) {
          const userData: UserGetRequest = JSON.parse(userDataString);
          setUserData(userData);
          console.log("22222");
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userDataString]);

  console.log("555555", userData);

  return (
    <>
      <Header></Header>
      <Container style={{ marginTop: "60px" }}>
        <Card
          style={{
            width: "900px",
            height: "500px",
            justifyContent: "center",
            borderRadius: "10px",
            boxShadow: "0 5px 10px rgba(0, 0, 0, 0.12)",
            /* Added styles for centering */
            margin: "0 auto",
          }}
        >
          <div style={{ padding: "20px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {userData ? (
                <>
                <TextField
                  inputRef={emailRef}
                  id="outlined-basic"
                  label="Username"
                  variant="outlined"
                  defaultValue={userData?.username} // กำหนดค่าเริ่มต้นของ TextField เป็น username จาก userData
                  style={{ marginBottom: "15px" }}
                />
                <TextField
                inputRef={passRef}
                id="outlined-basic"
                label="Password"
                variant="outlined"
                defaultValue={userData?.password} // กำหนดค่าเริ่มต้นของ TextField เป็น password จาก userData
                style={{ marginBottom: "15px" }}
              />
              <TextField
                inputRef={fullnameRef}
                id="outlined-basic"
                label="ชื่อ-สกุล"
                variant="outlined"
                defaultValue={userData?.name} // กำหนดค่าเริ่มต้นของ TextField เป็น name จาก userData
                style={{ marginBottom: "15px" }}
              />
              <TextField
                inputRef={urlimageRef}
                id="outlined-basic"
                label="URL-รูปภาพ"
                variant="outlined"
                defaultValue={userData?.avatar} // กำหนดค่าเริ่มต้นของ TextField เป็น avatar จาก userData
                style={{ marginBottom: "15px" }}
              />
                </>
              ) : null}
              <div>
                <Button
                  style={{
                    backgroundColor: "#ff5456",
                    color: "black",
                    width: "200px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    marginRight: "20px",
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
                    color: "black",
                    backgroundColor: "#74d56a",
                  }}
                  onClick={recordclick}
                >
                  บันทึก
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
}

export default EditProfilePage;
