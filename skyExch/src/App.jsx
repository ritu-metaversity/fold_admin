import { RouterProvider } from "react-router-dom";
import router from "./routes/appRouter";
import { useMediaQuery } from "./component/useMedia";
function App() {
  const isBreakPoint = useMediaQuery("(max-width: 780px)");
  return <RouterProvider router={router(isBreakPoint)} />;
}

export default App;
