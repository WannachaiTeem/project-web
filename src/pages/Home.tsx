import {
  Box,
  Button,
  Card,
  CardMedia,
  Container,
  TextField,
} from "@mui/material";
import { ImageGetRequest } from "../model/ImageGetRequest";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Header from "../hearder/Hearder";
import { UserGetRequest } from "../model/UserGetRequest";
import { useNavigate } from "react-router-dom";
import { EloRatingRes } from "../model/EloRatingRes";

function HomePage() {
  const [userData, setUserData] = useState<UserGetRequest | null>(null);
  const userDataString = localStorage.getItem("UserData");
  console.log("userData = ", userData);
  // const [search] = useSearchParams();
  // const uid = search.get("UID");
  // console.log("HomePage UID = ", uid);
  const timeRef = useRef<HTMLInputElement>();
  const [randomA, setRandomA] = useState(0);
  const [randomB, setRandomB] = useState(1);
  const [winner, setWinner] = useState<ImageGetRequest | null>(null);
  const [image, setImage] = useState<ImageGetRequest[]>([]);
  const shuffledImage = [...image].sort(() => Math.random() - 0.5);
  const CLICK_COOLDOWN_MS = 5000;
  const [counter, setCounter] = useState(0); // กำหนด counter ให้เริ่มนับจาก CLICK_COOLDOWN_MS / 1000 (แปลงเป็นวินาที)
  const [eloRes, setEloRes] = useState<EloRatingRes | null>(null);

  const nav = useNavigate();

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

  async function AddTime() {
    console.log(timeRef.current?.value);

    const url = "";

    if (timeRef.current?.value !== "") {
      try {
        const body = {
          time: timeRef.current?.value,
        };
        const response = await axios.post(url, body);
        console.log(response);
      } catch (eee) {
        console.log("Errorrrrrrr : " + eee);
      }
      const json = {
        time: timeRef.current?.value,
      };

      localStorage.setItem("data", JSON.stringify(json));
      nav("/");
    } else {
      console.log("กรุณาใส่ข้อมูลให้ครบด้วยครับ");
    }
  }


  useEffect(() => {
    const callapi = async () => {
      // const url = "http://localhost:3000/user/4";
      const url = "http://localhost:3000/image/shuffle";
      const response = await axios.get(url);
      const imageData: ImageGetRequest[] = response.data;
      console.log("ImageData :", imageData);
      setImage(imageData);
    };
    callapi();
  }, []);

  useEffect(() => {
    if (counter === 0) return; // ถ้า counter เป็น 0 ให้ยุติการทำงาน

    const intervalId = setInterval(() => {
      setCounter((prevCounter) => prevCounter - 1); // ลดค่า counter ลงทีละ 1 ทุกๆ 1 วินาที
    }, 1000);

    return () => clearInterval(intervalId); // เมื่อ component unmount ให้ clear interval เพื่อป้องกันการทำงานของ interval ต่อ
  }, [counter]);

  function randomWithout(num: number) {
    let randomNum;
    do {
      randomNum = Math.floor(Math.random() * shuffledImage.length);
      console.log(randomNum);
    } while (randomNum === num);

    return randomNum;
  }


  async function getImageDataID(lid: number) {
    const url = `http://localhost:3000/image/${lid}`;

    try {
      const response = await axios.get(url);
      const imageData: ImageGetRequest[] = response.data;
      console.log(imageData);
      return imageData[0];
    } catch (error) {
      console.log("Error: " + error);
      return null;
    }
  }


  async function CardClickHandle(index: number, isA: boolean) {
    console.log("CLICKIIIIIIII");
    if (!userData?.UID) {
      console.log("userDATANOTFOUND");
      return;
    }
    console.log(winner?.name);
    if (image[index].LID === winner?.LID) {
      return;
    } else {
      setWinner(null);
    }

    const imgDataGetA: ImageGetRequest = await getImageDataID(image[randomA].LID);
    const imgDataGetB: ImageGetRequest = await getImageDataID(image[randomB].LID);
    const A = imgDataGetA.LID;
    const B = imgDataGetB.LID;
    const Ra = imgDataGetA.rate;
    const Rb = imgDataGetB.rate;

    if (isA) {
      setWinner(image[randomA]);
      // setClickableA(false)
      console.log("Loss ID: " + image[randomB].LID)
      setRandomB(randomWithout(randomA));
      console.log("Winner is :" + image[randomA].LID);
    } else {
      setWinner(image[randomB]);
      // setClickableB(false)
      console.log("Loss ID: " + image[randomA].LID)
      setRandomA(randomWithout(randomB));
      console.log("Winner is :" + image[randomB].LID);
    }
    console.log(
      "isA win " +
      isA +
      " A: " +
      A +
      " B" +
      B +
      " Ra" +
      Ra +
      " Rb" +
      Rb +
      " uid " +
      userData.UID
    );

    // callApi
    const url = `http://localhost:3000/vote/addvote/elo`;
    try {
      const body = {
        uid: userData.UID,
        A: A,
        B: B,
        Ra: Ra,
        Rb: Rb,
        aWin: isA,
      };
      const response = await axios.post(url, body);
      const resRate: EloRatingRes = response.data;
      setEloRes(resRate);
      console.log(response.data);
    } catch (eee) {
      console.log("Vote Error : " + eee);
    }
    setTimeout(() => {
      setEloRes(null);
      // setClickableA(true);
      // setClickableB(true); // เปิดให้รับคลิกอีกครั้งหลังจากผ่านไปเวลาที่กำหนดแล้ว
    }, 1500);

    console.log("9999999999");
    setCounter(CLICK_COOLDOWN_MS / 1000);
    console.log("Count" + CLICK_COOLDOWN_MS / 1000)
    setTimeout(() => {
      setWinner(null);
      // setClickableA(true);
      // setClickableB(true); // เปิดให้รับคลิกอีกครั้งหลังจากผ่านไปเวลาที่กำหนดแล้ว
    }, CLICK_COOLDOWN_MS);
  }

  return (
    <>
      {eloRes ? (
        <div style={{
          marginTop: "20%",
          width: '100%', display: 'flex',
          justifyContent: 'space-between', position: 'absolute'
        }}>
          <div style={{ width: '50%', display: 'flex', justifyContent: 'end', marginRight: '10%' }}>
            {eloRes.RaChange > 0 ? (
              <h2 style={{ color: 'greenyellow' }}>+{parseInt(eloRes.RaChange + "")}</h2>
            ) : (
              <h2 style={{ color: 'red' }}>{parseInt(eloRes.RaChange + "")}</h2>
            )
            }
          </div>
          <div style={{ width: '50%', display: 'flex', justifyContent: 'start' }}>

          {eloRes.RbChange > 0 ? (
              <h2 style={{ color: 'greenyellow' }}>+{parseInt(eloRes.RbChange + "")}</h2>
            ) : (
              <h2 style={{ color: 'red' }}>{parseInt(eloRes.RbChange + "")}</h2>
            )
            }
          </div>
        </div>
      ) : null}
      {userData?.type == null && (
        <div>
          <Header></Header>

          <Container>
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h4>คลิกโหวตการ์ตูนที่คุณชื่นชอบ ?</h4>
            </div>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              marginTop={"50px"}
              sx={{ gap: 2 }}
            >
              {/* A */}
              {image[randomA] ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Card
                    style={{
                      width: "200px",
                      height: "300px",
                      borderRadius: "40px",
                    }}
                    onClick={() => {
                      CardClickHandle(randomA, true);
                    }} // เพิ่ม onClick เพื่อเรียกใช้งานฟังก์ชันเมื่อ Card ถูกคลิก
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={image[randomA].img}
                      alt="loading failed"
                      style={{
                        width: "200px",
                        height: "320px",
                        borderRadius: "40px",
                      }}
                    />
                  </Card>
                  <h4>{image[randomA].name}</h4>
                </div>
              ) : null}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                fontSize="24px"
                textAlign="center"
              >
                VS
                {/* B */}
              </Box>
              {image[randomB] ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Card
                    style={{
                      width: "200px",
                      height: "300px",
                      borderRadius: "40px",
                    }}
                    onClick={() => CardClickHandle(randomB, false)}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={image[randomB].img}
                      alt="green iguana"
                      style={{
                        width: "200px",
                        height: "320px",
                        borderRadius: "40px",
                      }}
                    />
                  </Card>
                  <h4>{image[randomB].name}</h4>
                </div>
              ) : null}
            </Box>
          </Container>
        </div>
      )}

      {userData?.type == 0 && (
        <div>
          <Header></Header>

          <Container>
            {counter > 0 && (
              <div style={{ position: "absolute" }}>
                <h4>{counter}</h4>
              </div>
            )}
            <div style={{ textAlign: "center", marginTop: "50px" }}>
              <h4>คลิกโหวตการ์ตูนที่คุณชื่นชอบ ?</h4>
            </div>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              marginTop={"50px"}
              sx={{ gap: 2 }}
            >
              {/* A */}
              {image[randomA] ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Card
                    style={{
                      width: "200px",
                      height: "300px",
                      borderRadius: "40px",
                    }}
                    onClick={() => CardClickHandle(randomA, true)}
                  >

                    <CardMedia
                      component="img"
                      height="250"
                      image={image[randomA].img}
                      alt="green iguana"
                      style={{
                        width: "200px",
                        height: "320px",
                        borderRadius: "40px",
                      }}
                    />
                  </Card>

                  <h4>{image[randomA].name}</h4>
                </div>
              ) : null}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                fontSize="24px"
                textAlign="center"
              >
                VS
                {/* B */}
              </Box>
              {image[randomB] ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Card
                    style={{
                      width: "200px",
                      height: "300px",
                      borderRadius: "40px",
                    }}
                    onClick={() => CardClickHandle(randomB, false)}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={image[randomB].img}
                      alt="green iguana"
                      style={{
                        width: "200px",
                        height: "320px",
                        borderRadius: "40px",
                      }}
                    />
                  </Card>
                  <h4>{image[randomB].name}</h4>
                </div>
              ) : null}
            </Box>
          </Container>
        </div>
      )}
      {userData?.type == 1 && (
        <div>
          <Header></Header>
          <Container>
            {counter > 0 && (
              <div style={{ position: "absolute" }}>
                <h4>{counter}</h4>
              </div>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              <div>
                <h4>คลิกโหวตการ์ตูนที่คุณชื่นชอบ ?</h4>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  position: "absolute",
                  marginLeft: "900px",
                }}
              >
                <TextField
                  inputRef={timeRef}
                  id="outlined-basic"
                  label="เวลา"
                  variant="outlined"
                  style={{
                    marginBottom: "15px",
                    width: "90px",
                    backgroundColor: "white",
                  }}
                />
                <Button
                  onClick={AddTime}
                  style={{ background: "black", color: "white" }}
                >
                  set time
                </Button>
              </div>
            </div>
            {/* A */}
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"center"}
              marginTop={"50px"}
              sx={{ gap: 2 }}
            >
              {image[randomA] ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Card
                    style={{
                      width: "200px",
                      height: "300px",
                      borderRadius: "40px",
                    }}
                    onClick={() => CardClickHandle(randomA, true)}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={image[randomA].img}
                      alt="green iguana"
                      style={{
                        width: "200px",
                        height: "320px",
                        borderRadius: "40px",
                      }}
                    />
                  </Card>
                  <h4>{image[randomA].name}</h4>
                </div>
              ) : null}
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                fontSize="24px"
                textAlign="center"
              >
                VS
                {/* B */}
              </Box>
              {image[randomB] ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Card
                    style={{
                      width: "200px",
                      height: "300px",
                      borderRadius: "40px",
                    }}
                    onClick={() => CardClickHandle(randomB, false)}
                  >
                    <CardMedia
                      component="img"
                      height="250"
                      image={image[randomB].img}
                      alt="green iguana"
                      style={{
                        width: "200px",
                        height: "320px",
                        borderRadius: "40px",
                      }}
                    />
                  </Card>
                  <h4>{image[randomB].name}</h4>
                </div>
              ) : null}
            </Box>
          </Container>
        </div>
      )}
    </>
  );
}

export default HomePage;
