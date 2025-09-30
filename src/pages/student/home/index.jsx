import { courseCategories } from "@/config";
import banner from "/banner-img.jpg";
import { Button } from "@/components/ui/button";
import { useContext, useEffect } from "react";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";

function StudentHomePage() {
  const { studentViewCoursesList, setStudentViewCoursesList } =
    useContext(StudentContext);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  function handleNavigateToCoursesPage(getCurrentId) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      category: [getCurrentId],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/courses");
  }

  async function fetchAllStudentViewCourses() {
    const response = await fetchStudentViewCourseListService();
    if (response?.success) setStudentViewCoursesList(response?.data);
  }

  async function handleCourseNavigate(getCurrentCourseId) {
    const response = await checkCoursePurchaseInfoService(
      getCurrentCourseId,
      auth?.user?._id
    );
    if (response?.success) {
      if (response?.data) {
        navigate(`/course-progress/${getCurrentCourseId}`);
      } else {
        navigate(`/course/details/${getCurrentCourseId}`);
      }
    }
  }

  useEffect(() => {
    fetchAllStudentViewCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-blue-100 to-purple-100 relative overflow-x-hidden">
      {/* Modern Animated Logo and Restored Banner Image */}
      <header className="flex flex-col items-center justify-center py-10 animate-fade-in-down">
        <div className="flex items-center gap-4 mb-4">
          {/* Modern SVG Logo */}
          <span className="relative animate-bounce">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="28" cy="28" r="28" fill="url(#paint0_linear)" />
              <path d="M28 14L38 22V36C38 37.1046 37.1046 38 36 38H20C18.8954 38 18 37.1046 18 36V22L28 14Z" fill="#fff"/>
              <circle cx="28" cy="28" r="4" fill="#a78bfa"/>
              <defs>
                <linearGradient id="paint0_linear" x1="0" y1="0" x2="56" y2="56" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f472b6" />
                  <stop offset="1" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
          </span>
          <span className="text-4xl font-extrabold bg-gradient-to-r from-pink-500 via-blue-500 to-purple-500 text-transparent bg-clip-text animate-gradient-x drop-shadow-lg">
            Student Portal
          </span>
        </div>
        {/* Restore the previous banner image */}
        <div className="w-full flex justify-center mt-6">
          <div className="relative group">
            <img
              src={banner}
              width={600}
              height={400}
              className="w-[400px] h-[260px] md:w-[500px] md:h-[320px] rounded-2xl shadow-lg border-2 border-white/80 group-hover:scale-[1.02] transition-transform duration-300"
              alt="Banner"
            />
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-white/10 pointer-events-none"></div>
          </div>
        </div>
      </header>
      {/* Course Categories */}
      <section className="py-8 px-4 lg:px-8 bg-white/80 rounded-2xl shadow-xl max-w-5xl mx-auto mt-8 animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-6 text-blue-500 animate-underline">Course Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {courseCategories.map((categoryItem) => (
            <Button
              className="justify-start font-semibold text-lg py-4 rounded-xl shadow-md bg-gradient-to-r from-pink-100 to-blue-100 hover:from-pink-200 hover:to-blue-200 text-blue-700 hover:text-pink-700 transition-all duration-300 animate-bounce-once"
              variant="outline"
              key={categoryItem.id}
              onClick={() => handleNavigateToCoursesPage(categoryItem.id)}
            >
              {categoryItem.label}
            </Button>
          ))}
        </div>
      </section>
      {/* Featured Courses */}
      <section className="py-12 px-4 lg:px-8 max-w-7xl mx-auto animate-fade-in-up">
        <h2 className="text-3xl font-bold mb-6 text-blue-500 animate-underline">Featured Courses</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
            studentViewCoursesList.map((courseItem, idx) => (
              <div
                onClick={() => handleCourseNavigate(courseItem?._id)}
                className="border rounded-2xl overflow-hidden shadow-xl cursor-pointer bg-white/90 hover:scale-105 hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
                style={{ animationDelay: `${idx * 80}ms` }}
                key={courseItem?._id}
              >
                <img
                  src={courseItem?.image}
                  width={300}
                  height={150}
                  className="w-full h-48 object-cover animate-fade-in"
                  alt={courseItem?.title}
                />
                <div className="p-5">
                  <h3 className="font-bold mb-2 text-lg text-blue-700 animate-fade-in-up">
                    {courseItem?.title}
                  </h3>
                  <p className="text-sm text-gray-700 mb-2 animate-fade-in-up">
                    {courseItem?.instructorName}
                  </p>
                  <p className="font-bold text-[18px] text-pink-600 animate-fade-in-up">
                    ${courseItem?.pricing}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-xl text-gray-500 animate-fade-in">No Courses Found</h1>
          )}
        </div>
      </section>
      {/* Tailwind custom keyframes for animation */}
      <style>{`
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes fade-in-down {
          0% { opacity: 0; transform: translateY(-40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down { animation: fade-in-down 0.8s cubic-bezier(0.4,0,0.2,1) both; }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x { background-size: 200% 200%; animation: gradient-x 4s ease-in-out infinite; }
        @keyframes bounce-once {
          0%, 100% { transform: scale(1); }
          20% { transform: scale(1.08); }
          40% { transform: scale(0.97); }
          60% { transform: scale(1.03); }
          80% { transform: scale(0.99); }
        }
        .animate-bounce-once { animation: bounce-once 0.7s 1; }
        @keyframes underline {
          0% { width: 0; }
          100% { width: 100%; }
        }
        .animate-underline { position: relative; }
        .animate-underline::after {
          content: "";
          display: block;
          position: absolute;
          left: 0; bottom: -4px;
          height: 3px;
          width: 100%;
          background: linear-gradient(90deg, #60a5fa, #f472b6);
          border-radius: 2px;
          animation: underline 1s cubic-bezier(0.4,0,0.2,1) both;
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-fade-in { animation: fade-in 1s both; }
        .animate-pulse-slow { animation: pulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite; }
      `}</style>
    </div>
  );
}

export default StudentHomePage;
