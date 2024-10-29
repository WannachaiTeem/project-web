import { Button, Card, Container } from "@mui/material";
import Header from "../hearder/Hearder";

function ViewProfilePage() {
  return (
    <>
      <Header></Header>
      <Container style={{ marginTop: "60px" }}>
        <Card
          style={{
            width: "900px",
            height: "150px",
            justifyContent: "center",
            borderRadius: "10px",
            /* Added styles for centering */
            margin: "0 auto",
            display: "flex",
          }}
        >
          <div
            style={{
              display: "flex",
              marginTop: "10px",
              marginLeft: "20px",
              alignItems: "center",
            }}
          >
            <img
              style={{ borderRadius: "50%" }}
              width={"120px"}
              height={"100px"}
              src="https://staticg.sportskeeda.com/editor/2023/06/c8108-16880550686799-1920.jpg?w=840"
              alt=""
            />
            <h3 style={{ margin: "0 auto" }}>Gojo Satoru</h3>{" "}
            {/* Add margin: 0 auto to center horizontally */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div>
                <Button
                  style={{
                    width: "200px",
                    borderRadius: "5px",
                    fontSize: "16px",
                    color: "black",
                    backgroundColor: "#0073b7",
                  }}
                >
                  View Profile
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </Container>
    </>
  );
}

export default ViewProfilePage;
