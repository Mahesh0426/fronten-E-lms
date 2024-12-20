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
import InstructorQuizesPage from "./pages/Instructor/quiz-assignment/Quize&AssignmentPage";
import CreateNewCoursePage from "./pages/Instructor/course-management/CreateNewCoursePage";
import StudentLayout from "./components/student-view/StudentLayout";
import StudentAllCoursepage from "./pages/student/course/StudentAllCoursespage";
import StudentCourseDetailspage from "./pages/student/course/StudentCourseDetailsPage";
import MyCoursePage from "./pages/student/course/MyCoursePage";
import PaypalPaymentReturnPage from "./pages/student/course/PaymentReturnPage";
import CourseProgressPage from "./pages/student/course/CourseProgressPage";
import QuizAttemptPage from "./pages/student/quiz and assignment/QuizAttemptPage";
import AssignmentSubmissionPage from "./pages/student/quiz and assignment/AssignmentSubmissionPage";
import ViewSubmittedAssignmentsPage from "./pages/Instructor/quiz-assignment/SubmittedAssignmentPage";
import ViewSubmittedQuizPage from "./pages/Instructor/quiz-assignment/SubmittedQuizPage";
import ChangePassword from "./components/forget-password/ChangePassword";
import InstructorProfilePage from "./pages/Instructor/instructor-profile/InstructorProfilePage";
import AboutUsPage from "./pages/home/AboutUsPage";
import StudentProfilePage from "./pages/student/profile/StudentProfile";

function App() {
  return (
    <>
      <Routes>
        {/* public Routes */}
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/*" element={<PageNotFound />} />

        {/* private Routes */}

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

        {/* <Route
          path="/instructor/dashboard"
          element={<RouteGuard element={<InstructorDashboardPage />} />}
        /> */}

        <Route
          path="/instructor/instructor-profile"
          element={<RouteGuard element={<InstructorProfilePage />} />}
        />
        {/* <Route
          path="/instructor/quizes"
          element={<RouteGuard element={<QuizAndAssignmentPage />} />}
        /> */}
        <Route
          path="/instructor/submitted-assignment/:assignmentId"
          element={<RouteGuard element={<ViewSubmittedAssignmentsPage />} />}
        />
        <Route
          path="/instructor/submitted-quiz/:quizId"
          element={<RouteGuard element={<ViewSubmittedQuizPage />} />}
        />

        {/* student layout */}
        <Route path="/" element={<StudentLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/aboutUs" element={<AboutUsPage />} />
          <Route path="" element={<HomePage />} />
          <Route path="courses" element={<StudentAllCoursepage />} />
          <Route
            path="course/details/:id"
            element={<StudentCourseDetailspage />}
          />
          <Route path="payment-return" element={<PaypalPaymentReturnPage />} />
          <Route path="student-courses" element={<MyCoursePage />} />
          <Route path="course-progress/:id" element={<CourseProgressPage />} />
          <Route path="student-quiz/:quizId" element={<QuizAttemptPage />} />
          <Route
            path="student-assignment/:assignmentId"
            element={<AssignmentSubmissionPage />}
          />
          <Route path="profile" element={<StudentProfilePage />} />
        </Route>
      </Routes>

      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
