import { Outlet } from "react-router-dom"
import Navbar2 from "./Navbar"
import Footer2 from "./Footer"


function App() {

  return (
    <>
    <Navbar2></Navbar2>
    <div className="xl:mx-40 lg:mx-12 mx-2">
    <Outlet></Outlet>
    </div>
    <Footer2></Footer2>
    </>
  )
}

export default App
