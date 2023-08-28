import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import { useContext, useEffect, useState } from "react";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Withdraw from "./pages/Withdraw";
import { auth, db } from "./config";
import { useAuthState } from "react-firebase-hooks/auth";
import Configure from "./Admin/Configure";
import AllUsers from "./Admin/allusers";
import UserProfile from "./Admin/profile";
import ApproveDepo from "./Admin/approveDepo";
import ApproveWithdraw from "./Admin/approveWithdraw";
import { userContext } from "./contexts/userContext";
import useAuth from './hooks/auth';
import Traders from "./Admin/traders";
import { useToast } from "@chakra-ui/react";
import { Usecheck } from "./hooks/useCheck";
import { EnrollAccountNumber, EnrollDtails } from './pages/Enroll'
import { doc, getDoc, updateDoc } from "firebase/firestore";
import NotRegistered from "./pages/notRegistered";
import Register, { AccountNumber } from "./pages/Register";
import ApproveRegistration from "./Admin/approveRegistration";
import Enroll from "./pages/Enroll";
import Earn from "./components/earn";
import Ads from "./pages/Ads";
import Read from "./pages/read";
import Terms from "./pages/terms";

const App = () => {
  const [authUser] = useAuthState(auth);

  const [loaded, setLoaded] = useState(false)
  const [loaded1, setLoaded1] = useState(false)
  const { user, isLoading: authLoading } = useAuth()

  const { check } = Usecheck()
  const [userDetail, setuserDetail] = useContext(userContext)
  const toast = useToast()

  useEffect(() => {
   
    check()
  }, [user])

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/not-registered" element={<NotRegistered />} />
          <Route path="/register" element={<Register />} />
          <Route path="/payment" element={<AccountNumber />} />
          <Route path="/earn" element={<Earn />} />
          <Route path="/Ads" element={<Ads />} />
          <Route path="/read-articles" element={<Read />} />
          <Route path="/enroll" element={<Enroll />} />
          <Route path="/enrollD" element={<EnrollDtails />} />
          <Route path="/enrollAccount" element={<EnrollAccountNumber />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/registrants" element={<ApproveRegistration />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/protected/configure" element={<Configure />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/approve-withdraw" element={<ApproveWithdraw />} />
          <Route path="/protected/profile/:id" element={<UserProfile />} />
          <Route path="/approve-deposit/" element={<ApproveDepo />} />
          <Route path="/traders" element={<Traders />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<Home />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
};

export default App;