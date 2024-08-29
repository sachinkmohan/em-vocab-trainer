// import SignUp from "./components/SignUp";
import Login from "./components/Login";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainHomePage from "./pages/MainHomePage";
import LibraryOfWords from "./pages/LibraryOfWords";
import MainLayout from "./layouts/MainLayout";
import { WordsProvider } from "./components/helpers/WordsContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<MainLayout />}>
        <Route index element={<MainHomePage />} />
      </Route>
      <Route path="/library" element={<MainLayout />}>
        <Route index element={<LibraryOfWords />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <WordsProvider>
      <RouterProvider router={router} />
    </WordsProvider>
  );
};

export default App;
