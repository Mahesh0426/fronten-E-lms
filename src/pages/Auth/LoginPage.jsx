import { Badge } from "@/components/ui/badge";
import { assets } from "@/assets/asset";
import LoginForm from "@/components/log-in/LoginForm";
import { Link } from "react-router-dom";
import { MoveLeftIcon } from "lucide-react";

const LoginPage = () => {
  return (
    <div className="container mx-auto min-h-screen mt-5 flex flex-col md:flex-row">
      <Link to="/home">
        {" "}
        <div className="flex items-center justify-center gap-4 text-blue-600">
          <MoveLeftIcon /> Back to Home
        </div>
      </Link>
      {/* left side */}
      <div className="flex flex-1 items-center justify-center mb-8 md:mb-0">
        <div className="flex flex-col items-center justify-center">
          <img
            src={assets.auth}
            alt="Auth Image"
            className="h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-full"
          />
          <div className="flex items-center justify-center space-x-2 mt-4">
            <Badge className=" font-semibold bg-blue-600">gyanX</Badge>
          </div>
          <pre className="text-center mt-4 text-sm md:text-base whitespace-pre-line">
            <span className="md:hidden">
              {
                "Empower your learning journey\nwhere every step brings you\ncloser to knowledge and success."
              }
            </span>
            <span className="hidden md:inline">
              {
                "Empower your learning journey\nwhere every step brings you closer to knowledge and success."
              }
            </span>
          </pre>
        </div>
      </div>

      {/* right side */}
      <div className="flex flex-1 items-center justify-center ">
        {/* login form here  */}
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
