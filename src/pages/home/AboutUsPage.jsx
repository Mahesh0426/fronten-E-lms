import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Brain,
  Target,
  Users,
  Zap,
  Globe,
  Network,
  Rocket,
} from "lucide-react";
import sujanImage from "../../assets/sujan.png";
import { Link } from "react-router-dom";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen  dark:bg-gray-900  dark:text-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">About gyanX</h1>

        {/* Introduction */}
        <section className="mb-16">
          <p className="text-xl text-center text-gray-700 dark:text-white mb-6">
            gyanX is a cutting-edge e-learning recommendation system designed to
            revolutionize your educational journey.
          </p>
          <div className="flex justify-center">
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Empowering Learners, One Recommendation at a Time
            </Badge>
          </div>
        </section>

        {/* Mission Statement Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Our Mission
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Personalized Learning",
                icon: Target,
                description:
                  "Deliver tailored educational experiences that adapt to individual learning styles and goals.",
              },
              {
                title: "Accessibility",
                icon: Globe,
                description:
                  "Make high-quality education accessible to learners worldwide, breaking geographical barriers.",
              },
              {
                title: "Community Empowerment",
                icon: Network,
                description:
                  "Foster a collaborative learning environment that connects students, educators, and experts.",
              },
              {
                title: "Continuous Innovation",
                icon: Rocket,
                description:
                  "Continuously evolve our platform using cutting-edge AI and technology to enhance learning.",
              },
            ].map((mission, index) => (
              <Card
                key={index}
                className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
              >
                <CardHeader>
                  <mission.icon className="w-10 h-10 text-blue-500 mb-2" />
                  <CardTitle>{mission.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">
                    {mission.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Smart Recommendations",
                icon: Brain,
                description:
                  "AI-powered content suggestions based on your learning style and goals",
              },
              {
                title: "Vast Library",
                icon: BookOpen,
                description:
                  "Access to a wide range of courses, tutorials, and educational resources",
              },
              {
                title: "Community Learning",
                icon: Users,
                description:
                  "Connect with peers and experts in collaborative learning environments",
              },
              {
                title: "Adaptive Learning Paths",
                icon: Zap,
                description:
                  "Personalized learning journeys that evolve with your progress",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="dark:bg-gray-800 dark:border-gray-700 "
              >
                <CardHeader>
                  <feature.icon className="w-10 h-10 text-blue-500 mb-2" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-white">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-center mb-8">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "janamurty HK",
                role: "Founder ",
                image: "",
              },
              {
                name: "Bindu Ghimire",
                role: "CEO",
                image:
                  "https://strapi-wasabi-bucket.apyhi.com/7_Features_Ai_powered_design_3_c153e8079b.webp",
              },
              {
                name: "Sujit Maharjan",
                role: "Chief Learning Officer",
                image:
                  "https://plus.unsplash.com/premium_photo-1664536392896-cd1743f9c02c?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                name: "Sujan Banjara",
                role: "Head of AI Development",
                image: sujanImage,
              },
              {
                name: "Barsha Rai",
                role: "Marketing Manager",
                image:
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                name: "Rubin Duwal",
                role: "Functional Manager",
                image:
                  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              },
              {
                name: "Mahesh Kunwar",
                role: "Chief Technical Officer",
                image:
                  "https://media.licdn.com/dms/image/v2/D5603AQFSi_RU8JukFw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1718243745328?e=1739404800&v=beta&t=3JSMgrGIXUW2dSjekbTHuk9TiBGE-duxyq_9tPGog18",
              },
            ].map((member, index) => (
              <Card
                key={index}
                className="dark:bg-gray-800 dark:border-gray-700 "
              >
                <CardContent className="flex flex-col items-center pt-6">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-gray-600 dark:text-white">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to Transform Your Learning Experience?
          </h2>
          <Link to="/login">
            <Button
              size="lg"
              className="bg-blue-500 hover:bg-blue-600 text-white"
            >
              Get Started with gyanX
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AboutUsPage;
