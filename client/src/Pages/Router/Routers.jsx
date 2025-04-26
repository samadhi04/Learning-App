import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useLocation } from "react-router-dom";


import HomePage from "../HomePage/HomePage";
import Story from "../Story/Story";
import CreateStory from "../../Components/Story/CreateStory";




const Routers = () => {
  const location =useLocation();
  const reqUser = useSelector(store=>store.user.reqUser);
  const token=localStorage.getItem("token");
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getUserProfileAction(token));
 },[token])
  return (
    <div>
      {}

{(location.pathname !== "/login" && location.pathname !=="/signup")&& (
    <div className="flex">
      {location.pathname!=="/reels" && <div className="sidebarBox border border-l-slate-500 w-[20%]">
        <Sidebar />
      </div>}
      <div className="w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/p/:postId" element={<HomePage />} />
          <Route path="/p/:postId/edit" element={<HomePage />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/demo" element={<StoryPage />} />
          <Route path="/story/:userId" element={<Story />} />
          <Route path="/account/edit" element={<EditProfilePage />} />
          <Route path="/reels" element={<ReelViewer />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/create-story" element={<CreateStory />} />
          <Route path="/learning_plan" element={<LearningPlan />} />
          <Route path="/learning-progress" element={<LearningProgress />} />
          <Route path="/oauth-success" element={<OAuthSuccess />} />
        </Routes>
      </div>
    </div>
  )}
  {(location.pathname === "/login" || location.pathname==="/signup") && (
    <Routes>
      <Route path="/login" element={<Auth />} />
      <Route path="/signup" element={<Auth />} />
    </Routes>
  )}
    </div>
    
  );
};

export default Routers;
