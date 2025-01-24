import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { assets } from "@/assets/asset";
import FeaturesCoursesPage from "../student/course/featuresCoursesPage";

const HomePage = () => {
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

  return (
    <div className="min-h-screen  bg-white dark:bg-gray-900">
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
                <Link to="/courses">
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-indigo-500/25 transition-all duration-200">
                    Get Started
                    <motion.span
                      initial={{ x: 0 }}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.1 }}
                    >
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </motion.span>
                  </Button>
                </Link>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* why this platform section */}
      <section id="benefits" className=" mt-5  mx-auto px-4 ">
        <h2 className="  dark:text-white text-center text-2xl font-bold mb-8">
          Why Choose Personalized Learning?
        </h2>
        <div className="flex flex-wrap justify-around ">
          <Card className="w-[300px] m-5 overflow-hidden dark:bg-gray-800 dark:border-gray-700 ">
            <img
              src={assets.adaptiveCurriculum}
              alt="Adaptive Learning"
              className="w-full h-[200px] object-cover"
            />
            <CardHeader>
              <CardTitle className="flex items-center">
                Adaptive Curriculum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Learn at your own pace with content that adjusts to your needs
              </p>
            </CardContent>
          </Card>
          <Card className="w-[300px] m-5 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <img
              src={assets.trackProgress}
              alt="Track Progress"
              className="w-full h-[200px] object-cover"
            />
            <CardHeader>
              <CardTitle className="flex items-center">
                Track Your Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Visualize your learning journey with detailed analytics</p>
            </CardContent>
          </Card>
          <Card className="w-[300px] m-5 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
            <img
              src={assets.increasedEngaged}
              alt="Increased Engagement"
              className="w-full h-[200px] object-cover"
            />
            <CardHeader>
              <CardTitle className="flex items-center">
                Increased Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Stay motivated with interactive and relevant content</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* ready to transform  section  */}
      <section
        id="signup"
        className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white  py-16"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Learning Experience?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students and educators already benefiting from
            personalized learning
          </p>
          <Link
            to="/signup"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 transition duration-150 ease-in-out shadow-lg hover:shadow-xl"
          >
            Sign Up Now
            <motion.div
              className="ml-2"
              animate={{
                x: [0, 10, 0],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              <ArrowRight className="h-5 w-5" />
            </motion.div>
          </Link>
        </div>
      </section>

      {/* list of  Courses */}
      <section className="py-12 px-4 lg:px-8">
        <h2 className="text-2xll font-bold mb-6">Featured Courses</h2>
        <FeaturesCoursesPage />
      </section>
    </div>
  );
};

export default HomePage;
