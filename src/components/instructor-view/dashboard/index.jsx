import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GraduationCap, Users, DollarSign, BookOpen, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

function InstructorDashboard({ listOfCourses = [] }) {
  function calculateStudentList() {
    if (!listOfCourses || listOfCourses.length === 0) {
      return [];
    }
    const studentList = [];
    listOfCourses.forEach((course) => {
      if (course.students && course.students.length > 0) {
        course.students.forEach((student) => {
          studentList.push({
            courseTitle: course.title,
            studentName: student.studentName,
            studentEmail: student.studentEmail,
          });
        });
      }
    });
    return studentList;
  }

  // Example data for cards
  const stats = [
    {
      label: "Total Students",
      value: 6,
      icon: <Users className="h-6 w-6 text-white" />, bg: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
      label: "Total Revenue",
      value: "$159",
      icon: <DollarSign className="h-6 w-6 text-white" />, bg: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      label: "Total Courses",
      value: 8,
      icon: <BookOpen className="h-6 w-6 text-white" />, bg: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      label: "Avg. Students",
      value: 1,
      icon: <TrendingUp className="h-6 w-6 text-white" />, bg: "bg-gradient-to-br from-orange-400 to-orange-500"
    },
  ];

  const studentList = calculateStudentList();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: {
            staggerChildren: 0.1
          }
        }
      }}
      className="min-h-screen bg-gradient-to-br from-blue-100/60 via-purple-100/60 to-white/80 py-8 px-2 md:px-8"
      style={{
        background: 'radial-gradient(circle at 80% 20%, #e0e7ff 0%, #f3e8ff 100%)',
        minHeight: '100vh',
      }}
    >
      {/* Stats Cards Row */}
      <div className="flex flex-wrap gap-6 mb-10">
        {stats.map((stat, idx) => (
          <div key={stat.label} className="flex-1 min-w-[220px] max-w-xs rounded-2xl p-6 shadow-lg bg-white/80 backdrop-blur-md flex items-center gap-4 animate-fade-in-up" style={{ animationDelay: `${idx * 80}ms` }}>
            <div className={`rounded-full p-3 ${stat.bg} shadow-md flex items-center justify-center`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-md text-gray-500 font-semibold mb-1">{stat.label}</div>
              <div className="text-2xl font-extrabold text-gray-800">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Students Table Only */}
      <motion.div variants={itemVariants}>
        <Card className="border-0 shadow-2xl rounded-2xl bg-white/90 backdrop-blur-md hover:shadow-2xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center text-lg font-semibold text-indigo-700">
              <GraduationCap className="h-5 w-5 mr-2 text-indigo-600" />
              <span>Students List</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              {studentList.length > 0 ? (
                <Table className="w-full">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50">
                      <TableHead className="font-semibold">Course Name</TableHead>
                      <TableHead className="font-semibold">Student Name</TableHead>
                      <TableHead className="font-semibold">Student Email</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {studentList.map((studentItem, index) => (
                      <TableRow 
                        key={index}
                        className="hover:bg-indigo-50 transition-colors duration-150"
                      >
                        <TableCell className="font-medium">
                          {studentItem.courseTitle}
                        </TableCell>
                        <TableCell>{studentItem.studentName}</TableCell>
                        <TableCell>{studentItem.studentEmail}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  No students enrolled yet
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}

export default InstructorDashboard;

