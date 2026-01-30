import { createBrowserRouter,RouterProvider } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import Journal from "./pages/Journal"
import Mood from "./pages/Mood"
import Trends from "./pages/Trends"
import Calendar from "./pages/Calendar"

const router = createBrowserRouter([
  {
    path:"/",
    element:<div>
      <Navbar/>
      <Home/>
    </div>
  },
  {
    path:"/journal",
    element:<div>
      <Navbar/>
      <Journal/>
    </div>
  },
  {
    path:"/mood",
    element:<div>
      <Navbar/>
      <Mood/>
    </div>
  },
  {
    path:"/calendar",
    element:<div>
      <Navbar/>
      <Calendar/>
    </div>
  },
  {
    path:"/trends",
    element:<div>
      <Navbar/>
      <Trends/>
    </div>
  },
])

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
