import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllStudentCoursesAction } from "@/redux/student-course/studentCourseAction";
import { useEffect } from "react";

const HomePage = () => {
  const { studentCourses } = useSelector((state) => state.studentCourse);

  const dispatch = useDispatch();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const gradientTextVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  // use effect to fetch courses
  useEffect(() => {
    dispatch(fetchAllStudentCoursesAction());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-white">
      {/* hero section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50" />
        </motion.div>

        {/* Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1
            className="text-2xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            variants={itemVariants}
          >
            <motion.span
              variants={gradientTextVariants}
              className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200 inline-block"
            >
              Personalized Recommendation Learning
            </motion.span>
            <br />
            <motion.span
              variants={itemVariants}
              className="text-white inline-block"
            >
              for Everyone
            </motion.span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto"
          >
            Unlock your potential with tailored education experiences designed
            just for you
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link to="/login">
              <motion.div
                variants={buttonVariants}
                whileHover="hover"
                className="inline-block"
              >
                <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-indigo-500/25 transition-all duration-200">
                  Get Started
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </motion.span>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* list of  Courses */}
      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xll font-bold mb-6">Featured Courses</h2>
        <div className="grid grid-cols1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {studentCourses && studentCourses.length > 0 ? (
            studentCourses.map((courseItem) => (
              <div
                key={courseItem?._id}
                className="border rounded-lg overflow-hidden shadow cursor-pointer transition-all duration-300 ease-in hover:shadow-lg hover:scale-105"
              >
                <img
                  src={courseItem?.image}
                  alt="thumbnail"
                  width={300}
                  height={150}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-bold mb-2">{courseItem?.title}</h3>
                  <p className="text-sm text-gray-700 mb-2">
                    Created by{" "}
                    <span className="font-bold">
                      {courseItem?.instructorName.charAt(0).toUpperCase() +
                        courseItem?.instructorName.slice(1)}
                    </span>
                  </p>
                  <p className="font-bold text-[16px]">
                    ${courseItem?.pricing}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1>NO Course available</h1>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
