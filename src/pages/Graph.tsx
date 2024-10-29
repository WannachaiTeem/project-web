import { Box, Card, Container, MenuItem, Select } from "@mui/material";
import { SetStateAction, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../hearder/Hearder";
import { ImageGetRequest } from "../model/ImageGetRequest";
import axios from "axios";
import { GraphDataRes } from "../model/GraphDataRes";
import { BarChart } from "@mui/x-charts";

function GraphPage() {
  const [search] = useSearchParams();
  const uid = search.get("UID");
  console.log("GraphPage UID = ", uid);
  const [statistic, setStatistic] = useState("rank");
  // const [showGraph, setShowGraph] = useState(false);
  const [graphData, setGraphData] = useState<number[]>([]);
  const [graphString, setGraphString] = useState<string[]>([]);
  const [oneImage, setOneImage] = useState<ImageGetRequest | null>(null);
  const handleChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setStatistic(event.target.value);
  };

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

  async function getGraphData(lid: number, index: number) {
    const url = `http://localhost:3000/vote/${lid}`;
    const response = await axios.get(url);
    const graphData: GraphDataRes[] = response.data;
    const array: number[] = [];
    const date: string[] = [];
    graphData.map((item) => (
      array.push(item.latestScore),
      date.push("" + item.voting_date)
    ));
    console.log(array);
    console.log(date);

    setGraphData(array.reverse());
    setGraphString(date.reverse());
    setOneImage(image[index]);
  }

  console.log("ImageData = ", image);

  return (
    <>
      <Header></Header>
      <Container>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "50px",
          }}
        >
          <h3>สถิติ</h3>
          <div style={{ marginLeft: "auto" }}>
            <Select
              value={statistic}
              onChange={handleChange}
              style={{
                width: "170px",
                height: "40px",
                marginLeft: "10px",
                backgroundColor: "white",
                opacity: 0.9,
              }}
            >
              <MenuItem value="7Days">7 Days</MenuItem>
              <MenuItem value="6Days">6 Days</MenuItem>
              <MenuItem value="5Days">5 Days</MenuItem>
              <MenuItem value="4Days">4 Days</MenuItem>
              <MenuItem value="3Days">3 Days</MenuItem>
              <MenuItem value="2Days">2 Days</MenuItem>
              <MenuItem value="1Days">1 Days</MenuItem>
              {/* Add more options as needed */}
            </Select>
          </div>
        </div>

        {oneImage ? (
          (graphData.length > 0 && graphString.length > 0) && (
            <Box display={"flex"} flexDirection={"row"} sx={{ gap: 2 }}>
              <Card
                style={{
                  backgroundColor: "white",
                  width: "2000px",
                  height: "500px",
                  borderRadius: "40px",
                  marginBottom: "20px",
                }}
              >
                <Box display={"flex"} sx={{ gap: 2 }}>
                  <div
                    style={{
                      marginRight: "300px",
                      marginLeft: "20px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginTop: "50px",
                      }}
                    >
                      <img
                        style={{
                          width: "400px",
                          height: "400px",
                          borderRadius: "40px",
                        }}
                        src={oneImage.img}
                        alt=""
                      />
                      <div style={{ flexDirection: "column" }}>
                        <h4 style={{ marginLeft: "12px" }}>{oneImage.name}</h4>
                        <h4 style={{ marginLeft: "20px" }}>Score : </h4>
                        <h1 style={{ marginLeft: "20px" }}>{parseInt(oneImage.rate + "")}</h1>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          marginLeft: "150px",
                          flexDirection: "column",
                        }}
                      >
                        <BarChart
                          width={500}
                          height={300}
                          series={[
                            { data: graphData, label: 'คะแนน', id: 'pvId' },
                          ]}
                          xAxis={[{ data: graphString, scaleType: 'band' }]}
                        />

                        <h4 style={{ marginLeft: "12px" }}>แพ้ : 0</h4>
                      </div>
                    </div>
                  </div>
                </Box>
              </Card>
            </Box>
          )
        ) : null}

        {/* Image List */}
        {oneImage === null ?
          (
            image.map((item, i) => (
              <Box display={"flex"} flexDirection={"row"} sx={{ gap: 2 }}>
                <Card
                  onClick={() => { getGraphData(item.LID, i) }}
                  style={{
                    backgroundColor: "white",
                    width: "2000px",
                    height: "500px",
                    borderRadius: "40px",
                    marginBottom: "20px",
                  }}
                >
                  <Box display={"flex"} sx={{ gap: 2 }}>
                    <div
                      style={{
                        marginRight: "300px",
                        marginLeft: "20px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "50px",
                        }}
                      >
                        <img
                          style={{
                            width: "400px",
                            height: "400px",
                            borderRadius: "40px",
                          }}
                          src={item.img}
                          alt=""
                        />
                        <div style={{ flexDirection: "column" }}>
                          <h4 style={{ marginLeft: "12px" }}>{item.name}</h4>
                          <h4 style={{ marginLeft: "20px" }}>Score : </h4>
                          <h1 style={{ marginLeft: "20px" }}>{parseInt(item.rate + "")}</h1>
                        </div>
                        
                      </div>
                    </div>
                  </Box>
                </Card>
              </Box>
            ))
          ) : null}

      </Container>
    </>
  );
}

export default GraphPage;
