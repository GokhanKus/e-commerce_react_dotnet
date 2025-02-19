import Header from './Header'
import { Container, CssBaseline } from "@mui/material";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container>
        <Outlet />
        {/* pageler degisken olarak gelir yani buraya gelecek olan page routea gore degisecek (Outlet) */}
      </Container>
    </>
  )
}
export default App
