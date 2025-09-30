import InstructorCourses from "@/components/instructor-view/courses";
import InstructorDashboard from "@/components/instructor-view/dashboard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { AuthContext } from "@/context/auth-context";
import { InstructorContext } from "@/context/instructor-context";
import { fetchInstructorCourseListService } from "@/services";
import { BarChart, Book, GraduationCap, LogOut } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";

function InstructorDashboardpage() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const { resetCredentials } = useContext(AuthContext);
  const { instructorCoursesList, setInstructorCoursesList } =
    useContext(InstructorContext);

  async function fetchAllCourses() {
    const response = await fetchInstructorCourseListService();
    if (response?.success) setInstructorCoursesList(response?.data);
  }

  useEffect(() => {
    fetchAllCourses();
  }, []);

  const menuItems = [
    {
      icon: BarChart,
      label: "Dashboard",
      value: "dashboard",
      component: <InstructorDashboard listOfCourses={instructorCoursesList} />,
    },
    {
      icon: Book,
      label: "Courses",
      value: "courses",
      component: <InstructorCourses listOfCourses={instructorCoursesList} />,
    },
    {
      icon: LogOut,
      label: "Logout",
      value: "logout",
      component: null,
    },
  ];

  function handleLogout() {
    resetCredentials();
    sessionStorage.clear();
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex h-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white/80 backdrop-blur-sm shadow-lg hidden md:block border-r border-purple-100"
      >
        <div className="p-6">
          <div className="flex items-center mb-8">
            <GraduationCap className="h-8 w-8 mr-3 text-indigo-600" />
            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Instructor</h2>
          </div>
          <nav>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {menuItems.map((menuItem, index) => (
                <motion.div key={menuItem.value} variants={itemVariants}>
                  <Button
                    className="w-full justify-start mb-3 text-base"
                    variant={activeTab === menuItem.value ? "default" : "ghost"}
                    onClick={
                      menuItem.value === "logout"
                        ? handleLogout
                        : () => setActiveTab(menuItem.value)
                    }
                  >
                    <menuItem.icon className="mr-2 h-5 w-5" />
                    {menuItem.label}
                  </Button>
                </motion.div>
              ))}
            </motion.div>
          </nav>
        </div>
      </motion.aside>
      <main className="flex-1 p-8 overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="max-w-7xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {activeTab === "dashboard" ? "Dashboard Overview" : 
             activeTab === "courses" ? "Manage Courses" : ""}
          </h1>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {menuItems.map((menuItem) => (
              <TabsContent key={menuItem.value} value={menuItem.value}>
                {menuItem.component !== null ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    {menuItem.component}
                  </motion.div>
                ) : null}
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>
      </main>
    </div>
  );
}

export default InstructorDashboardpage;
