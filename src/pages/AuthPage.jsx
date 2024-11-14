import React from "react";
import { assets } from "@/assets/asset";

const AuthPage = () => {
  return (
    <div className=" flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-20 flex items-center border-b">
        <img src={assets.logo} alt="logo" />
      </header>
    </div>
  );
};

export default AuthPage;
