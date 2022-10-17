import "./css/main.css";
import ListOfNotes from "./components/ListOfNotes";
import Summary from "./components/Summary";

import { Container } from "@mui/material";

function App() {
  return (
    <Container
      sx={{
        mt: "1rem",
      }}
    >
      <ListOfNotes />
      <Summary />
    </Container>
  );
}

export default App;