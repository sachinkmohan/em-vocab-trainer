import SignUp from "./components/SignUp";
import Login from "./components/Login";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainHomePage from "./pages/MainHomePage";
import LearnedWords from "./pages/LearnedWords";
import MainLayout from "./layouts/MainLayout";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import UserAllTimeDashboard from "./components/dashboard/UserAllTimeDashboard";
import LearnWordsContainer from "./components/games/LearnWords/LearnWordsContainer";
import LearnWordsGame from "./components/games/LearnWords/LearnWordsGame";
import LearnWordsEndScreen from "./components/games/LearnWords/LearnWordsEndScreen";
import UserWelcomeScreen from "./components/user/UserWelcomeScreen";
import { UserDataProvider } from "./components/helpers/UserDataContext";
import { EditModeProvider } from "./components/helpers/EditModeContext";
import ForgotPassword from "./components/ForgotPassword";
import MasterWordList from "../src/components/words/MasterWordList";
import CreditContributors from "./pages/CreditContributors";
import UserFeed from "../src/pages/UserFeed";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/credits" element={<MainLayout />}>
        <Route index element={<CreditContributors />} />
      </Route>

      <Route path="/home" element={<MainLayout />}>
        <Route index element={<MainHomePage />} />
      </Route>

      <Route path="/feed" element={<MainLayout />}>
        <Route index element={<UserFeed />} />
      </Route>

      <Route path="/learned-words" element={<MainLayout />}>
        <Route index element={<LearnedWords />} />
      </Route>

      <Route path="/user-home" element={<MainLayout />}>
        <Route index element={<UserWelcomeScreen />} />
      </Route>

      <Route path="/admin-dashboard" element={<MainLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>

      <Route path="/user-all-time-dashboard" element={<MainLayout />}>
        <Route index element={<UserAllTimeDashboard />} />
      </Route>

      <Route path="/learn-new-words" element={<MainLayout />}>
        <Route index element={<LearnWordsContainer />} />
      </Route>

      <Route path="/start-words-game" element={<MainLayout />}>
        <Route index element={<LearnWordsGame />} />
      </Route>

      <Route path="/learn-words-end-screen" element={<MainLayout />}>
        <Route index element={<LearnWordsEndScreen />} />
      </Route>

      <Route path="/library" element={<MainLayout />}>
        <Route index element={<MasterWordList />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <UserDataProvider>
      <EditModeProvider>
        <RouterProvider router={router} />
      </EditModeProvider>
    </UserDataProvider>
  );
};

export default App;
