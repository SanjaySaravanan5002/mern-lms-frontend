import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { filterOptions, sortOptions } from "@/config";
import { AuthContext } from "@/context/auth-context";
import { StudentContext } from "@/context/student-context";
import {
  checkCoursePurchaseInfoService,
  fetchStudentViewCourseListService,
} from "@/services";
import { ArrowUpDownIcon } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

function createSearchParamsHelper(filterParams) {
  const queryParams = [];

  for (const [key, value] of Object.entries(filterParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const paramValue = value.join(",");

      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`);
    }
  }

  return queryParams.join("&");
}

function StudentViewCoursesPage() {
  const [sort, setSort] = useState("price-lowtohigh");
  const [filters, setFilters] = useState({});
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    studentViewCoursesList,
    setStudentViewCoursesList,
    loadingState,
    setLoadingState,
  } = useContext(StudentContext);
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);

  function handleFilterOnChange(getSectionId, getCurrentOption) {
    let cpyFilters = { ...filters };
    const indexOfCurrentSeection =
      Object.keys(cpyFilters).indexOf(getSectionId);

    console.log(indexOfCurrentSeection, getSectionId);
    if (indexOfCurrentSeection === -1) {
      cpyFilters = {
        ...cpyFilters,
        [getSectionId]: [getCurrentOption.id],
      };

      console.log(cpyFilters);
    } else {
      const indexOfCurrentOption = cpyFilters[getSectionId].indexOf(
        getCurrentOption.id
      );

      if (indexOfCurrentOption === -1)
        cpyFilters[getSectionId].push(getCurrentOption.id);
      else cpyFilters[getSectionId].splice(indexOfCurrentOption, 1);
    }

    setFilters(cpyFilters);
    sessionStorage.setItem("filters", JSON.stringify(cpyFilters));
  }

  async function fetchAllStudentViewCourses(filters, sort) {
    const query = new URLSearchParams({
      ...filters,
      sortBy: sort,
    });
    const response = await fetchStudentViewCourseListService(query);
    if (response?.success) {
      setStudentViewCoursesList(response?.data);
      setLoadingState(false);
    }
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
    const buildQueryStringForFilters = createSearchParamsHelper(filters);
    setSearchParams(new URLSearchParams(buildQueryStringForFilters));
  }, [filters]);

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  }, []);

  useEffect(() => {
    if (filters !== null && sort !== null)
      fetchAllStudentViewCourses(filters, sort);
  }, [filters, sort]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem("filters");
    };
  }, []);

  console.log(loadingState, "loadingState");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100">
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-500 to-pink-500 text-transparent bg-clip-text animate-underline">All Courses</h1>
        <div className="flex flex-col md:flex-row gap-4">
          {/* Filter Sidebar */}
          <aside className="w-full md:w-64 space-y-4 animate-fade-in-up">
            <div>
              {Object.keys(filterOptions).map((ketItem) => (
                <div className="p-4 border-b bg-white/80 rounded-xl shadow-sm mb-4">
                  <h3 className="font-bold mb-3 text-purple-600 animate-underline">{ketItem.toUpperCase()}</h3>
                  <div className="grid gap-2 mt-2">
                    {filterOptions[ketItem].map((option) => (
                      <Label className="flex font-medium items-center gap-3 text-blue-700">
                        <Checkbox
                          checked={
                            filters &&
                            Object.keys(filters).length > 0 &&
                            filters[ketItem] &&
                            filters[ketItem].indexOf(option.id) > -1
                          }
                          onCheckedChange={() =>
                            handleFilterOnChange(ketItem, option)
                          }
                        />
                        {option.label}
                      </Label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </aside>
          <main className="flex-1">
            <div className="flex justify-end items-center mb-4 gap-5">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 p-5 bg-gradient-to-r from-blue-100 to-pink-100 text-blue-700 font-semibold shadow hover:from-pink-100 hover:to-blue-100 transition-all duration-300 animate-bounce-once"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span className="text-[16px] font-medium">Sort By</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[180px]">
                  <DropdownMenuRadioGroup
                    value={sort}
                    onValueChange={(value) => setSort(value)}
                  >
                    {sortOptions.map((sortItem) => (
                      <DropdownMenuRadioItem
                        value={sortItem.id}
                        key={sortItem.id}
                      >
                        {sortItem.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <span className="text-sm text-blue-700 font-bold animate-fade-in-up">
                {studentViewCoursesList.length} Results
              </span>
            </div>
            <div className="space-y-6">
              {studentViewCoursesList && studentViewCoursesList.length > 0 ? (
                studentViewCoursesList.map((courseItem, idx) => (
                  <Card
                    onClick={() => handleCourseNavigate(courseItem?._id)}
                    className="cursor-pointer bg-gradient-to-br from-white via-blue-50 to-pink-50 border-0 shadow-xl rounded-2xl hover:scale-[1.025] hover:shadow-2xl transition-all duration-500 animate-fade-in-up"
                    style={{ animationDelay: `${idx * 80}ms` }}
                    key={courseItem?._id}
                  >
                    <CardContent className="flex gap-4 p-4">
                      <div className="w-48 h-32 flex-shrink-0 rounded-xl overflow-hidden shadow-md">
                        <img
                          src={courseItem?.image}
                          className="w-full h-full object-cover animate-fade-in"
                          alt={courseItem?.title}
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-2xl mb-2 bg-gradient-to-r from-blue-500 via-pink-500 to-purple-500 text-transparent bg-clip-text font-extrabold animate-bounce-once">
                          {courseItem?.title}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mb-1 animate-fade-in-up">
                          Created By <span className="font-bold text-pink-600">{courseItem?.instructorName}</span>
                        </p>
                        <p className="text-[16px] text-gray-600 mt-3 mb-2 animate-fade-in-up">
                          {`${courseItem?.curriculum?.length} ${
                            courseItem?.curriculum?.length <= 1
                              ? "Lecture"
                              : "Lectures"
                          } - ${courseItem?.level.toUpperCase()} Level`}
                        </p>
                        <p className="font-bold text-xl text-purple-600 animate-fade-in-up">
                          ${courseItem?.pricing}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : loadingState ? (
                <Skeleton />
              ) : (
                <h1 className="font-extrabold text-4xl text-pink-600 animate-fade-in">No Courses Found</h1>
              )}
            </div>
          </main>
        </div>
      </div>
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
      `}</style>
    </div>
  );
}

export default StudentViewCoursesPage;
