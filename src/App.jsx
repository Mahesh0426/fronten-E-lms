import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/Auth/SignUpPage";
import LoginPage from "./pages/Auth/LoginPage";
import PageNotFound from "./pages/pageNotFound/PageNotFound";
import ForgetPassword from "./components/forget-password/ForgetPassword";
import { ToastContainer } from "react-toastify";
import RouteGuard from "./components/Route-Guard/RouteGuard";
import InstructorLayout from "./components/instructor-view/Instructor-layout/InstructorLayout";
import HomePage from "./pages/home/HomePage";
import InstructorDashboardPage from "./pages/Instructor/InstructorDashboardPage";
import InstructorQuizesPage from "./pages/Instructor/InstructorQuizeAndAssignmentPage";
import ResetPassword from "./components/forget-password/ResetPassword";
import CreateNewCoursePage from "./pages/Instructor/course-management/CreateNewCoursePage";
import StudentLayout from "./components/student-view/StudentLayout";
import StudentAllCoursepage from "./pages/student/StudentAllCoursespage";
import StudentCourseDetailspage from "./pages/student/StudentCourseDetailspage";
import MyCoursePage from "./pages/student/MyCoursePage";
import PaypalPaymentReturnPage from "./pages/student/PaymentReturnPage";
import CourseProgressPage from "./pages/student/CourseProgressPage";

function App() {
  return (
    <>
      <Routes>
        {/* public Routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/*" element={<PageNotFound />} />

        {/* ptivate Routes */}

        <Route
          path="/instructor"
          element={<RouteGuard element={<InstructorLayout />} />}
        />
        <Route
          path="/instructor/create-new-course"
          element={<RouteGuard element={<CreateNewCoursePage />} />}
        />
        <Route
          path="/instructor/edit-course/:courseId"
          element={<RouteGuard element={<CreateNewCoursePage />} />}
        />

        <Route
          path="/instructor/dashboard"
          element={<RouteGuard element={<InstructorDashboardPage />} />}
        />
        <Route
          path="/instructor/quizes"
          element={
            <RouteGuard>
              <InstructorQuizesPage />
            </RouteGuard>
          }
        />
        <Route path="/" element={<StudentLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="" element={<HomePage />} />
          <Route path="courses" element={<StudentAllCoursepage />} />
          <Route
            path="course/details/:id"
            element={<StudentCourseDetailspage />}
          />
          <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
          <Route path="student-courses" element={<MyCoursePage />} />
          <Route path="course-progress/:id" element={<CourseProgressPage />} />
        </Route>
      </Routes>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
