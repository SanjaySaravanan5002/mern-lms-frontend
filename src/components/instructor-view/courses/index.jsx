import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  courseCurriculumInitialFormData,
  courseLandingInitialFormData,
} from "@/config";
import { InstructorContext } from "@/context/instructor-context";
import { BookOpen, Delete, Edit, PlusCircle } from "lucide-react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function InstructorCourses({ listOfCourses = [] }) {
  const navigate = useNavigate();
  const {
    setCurrentEditedCourseId,
    setCourseLandingFormData,
    setCourseCurriculumFormData,
  } = useContext(InstructorContext);

  const handleCreateCourse = () => {
    setCurrentEditedCourseId(null);
    setCourseLandingFormData(courseLandingInitialFormData);
    setCourseCurriculumFormData(courseCurriculumInitialFormData);
    navigate("/instructor/create-new-course");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <CardHeader className="flex justify-between flex-row items-center border-b border-gray-100 pb-6">
          <CardTitle className="flex items-center text-2xl font-bold">
            <BookOpen className="mr-2 h-6 w-6 text-indigo-600" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              My Courses
            </span>
          </CardTitle>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={handleCreateCourse}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Course
            </Button>
          </motion.div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            {listOfCourses && listOfCourses.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow className="bg-gradient-to-r from-blue-50 to-purple-50">
                    <TableHead className="font-semibold">Course</TableHead>
                    <TableHead className="font-semibold">Students</TableHead>
                    <TableHead className="font-semibold">Revenue</TableHead>
                    <TableHead className="text-right font-semibold">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {listOfCourses.map((course, index) => (
                    <motion.tr
                      key={course?._id || index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      className="border-b border-gray-100"
                    >
                      <TableCell className="font-medium text-gray-800">
                        {course?.title}
                      </TableCell>
                      <TableCell className="text-gray-700">
                        <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                          {course?.students?.length || 0}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-700">
                        <span className="font-medium text-green-700">
                          ${(course?.students?.length || 0) * course?.pricing}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              onClick={() => {
                                navigate(`/instructor/edit-course/${course?._id}`);
                              }}
                              variant="outline"
                              size="sm"
                              className="border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </motion.div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-red-200 hover:bg-red-50 hover:text-red-700"
                            >
                              <Delete className="h-4 w-4" />
                            </Button>
                          </motion.div>
                        </div>
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.2 }}
                className="text-center py-12 px-4 border rounded-lg border-dashed border-gray-300"
              >
                <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No courses found</h3>
                <p className="text-gray-500 mb-4">Get started by creating your first course</p>
                <Button
                  onClick={handleCreateCourse}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create New Course
                </Button>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export default InstructorCourses;
