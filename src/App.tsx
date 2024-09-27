import SignUp from "./components/SignUp";
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
import AdminDashboard from "./components/dashboard/AdminDashboard";
import MatchTheWords from "./components/games/MatchTheWords";
import { UserDataProvider } from "./components/helpers/UserDataContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<MainLayout />}>
        <Route index element={<MainHomePage />} />
      </Route>
      <Route path="/library" element={<MainLayout />}>
        <Route index element={<LibraryOfWords />} />
      </Route>
      <Route path="/admin-dashboard" element={<MainLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
      <Route path="/match-the-words" element={<MainLayout />}>
        <Route index element={<MatchTheWords />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <UserDataProvider>
      <RouterProvider router={router} />
    </UserDataProvider>
  );
};

export default App;
