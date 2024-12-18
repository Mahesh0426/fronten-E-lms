import {
  fetchAllMarksByInstructorId,
  fetchMarksByStudentId,
} from "@/axios/marks/marksAxios";
import {
  setAllStudentMarks,
  setLoading,
  setStudentMarks,
  setUniqueCourses,
} from "./gradeSlice";
import { toast } from "react-toastify";

// get quiz and assignmnet score by instuctor id | for turor
export const fetchAllMarksByInstructorIdAction =
  (instructorId) => async (dispatch) => {
    try {
      dispatch(setLoading(true));

      const response = await fetchAllMarksByInstructorId(instructorId);

      if (response?.status === "success") {
        const combinedData = [];
        const assignments = response.data.assignments || [];
        const quizzes = response.data.quizzes || [];

        // Combine Assignments and Quizzes
        assignments.forEach((assignment) => {
          combinedData.push({
            name: assignment.studentName,
            email: assignment.studentEmail,
            course: assignment.courseTitle,
            assignmentScore: assignment.score,
            assignmentMaxScore: assignment.maxScore,
            quizScore: 0,
            quizTotalMarks: 0,
          });
        });

        quizzes.forEach((quiz) => {
          const existing = combinedData.find(
            (item) =>
              item.name === quiz.studentName &&
              item.email === quiz.studentEmail &&
              item.course === quiz.courseTitle
          );

          if (existing) {
            existing.quizScore = quiz.obtainedMarks;
            existing.quizTotalMarks = quiz.totalMarks;
          } else {
            combinedData.push({
              name: quiz.studentName,
              email: quiz.studentEmail,
              course: quiz.courseTitle,
              assignmentScore: 0,
              assignmentMaxScore: 0,
              quizScore: quiz.obtainedMarks,
              quizTotalMarks: quiz.totalMarks,
            });
          }
        });

        // Extract Unique Courses for dropdowm
        const courses = [...new Set(combinedData.map((data) => data.course))];

        dispatch(setAllStudentMarks(combinedData));
        dispatch(setUniqueCourses(courses));
      } else {
        toast.error("Failed to fetch marks");
      }
    } catch (error) {
      toast.error("Error fetching marks");
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

// get quiz and assignmnet score by student id | for student
export const fetchMarksByStudentIdAction = (studentId) => async (dispatch) => {
  try {
    dispatch(setLoading(true));

    const response = await fetchMarksByStudentId(studentId);

    if (response?.status === "error") {
      toast.error(response.message);
      return;
    }
    // Combine assignments and quizzes by courseTitle
    const { assignments, quizzes } = response.data;

    const combinedData = assignments.map((assignment) => ({
      course: assignment.courseTitle,
      assignmentScore: assignment.score,
      assignmentMaxScore: assignment.maxScore,
      quizScore: 0,
      quizTotalMarks: 0,
    }));

    quizzes.forEach((quiz) => {
      const existing = combinedData.find(
        (item) => item.course === quiz.courseTitle
      );
      if (existing) {
        existing.quizScore = quiz.obtainedMarks;
        existing.quizTotalMarks = quiz.totalMarks;
      } else {
        combinedData.push({
          course: quiz.courseTitle,
          assignmentScore: 0,
          assignmentMaxScore: 0,
          quizScore: quiz.obtainedMarks,
          quizTotalMarks: quiz.totalMarks,
        });
      }
    });

    dispatch(setStudentMarks(combinedData));
  } catch (error) {
    toast.error("An error occurred while fetching the marks.");
    console.error(error);
  } finally {
    dispatch(setLoading(false));
  }
};
