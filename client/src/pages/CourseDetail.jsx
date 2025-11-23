import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Lock, Clock, PlayCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// UI components đúng import structure gốc của bạn
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import Footer from "../components/ui/Footer";

import logoCourseCamp from "../assets/logo-coursecamp.png";
import "./CourseDetail.css"; 


const CourseDetail = () => {
  const { id } = useParams();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();
  // Mock course (sau này fetch API)
  const course = {
    id,
    title: "Intro to Python",
    instructor: "Prof. Alex",
    price: "1.140.000 VND",
    enrolled: 67,
    level: "Beginner",
    rating: 4.9,
    reviews: 1234,
    description: "Get started with Python programming: syntax, data types, control flow, and mini projects.",
    totalHours: "27h 25m",
    totalLectures: 56,
    topics: ["Programming"],
    satisfaction: 97,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop",
    sections: [
      {
        id: 1,
        title: "Introduction",
        lectures: 3,
        duration: "45m",
        lessons: [
          { id: 1, title: "App Overview", duration: "10 mins", isLocked: false },
          { id: 2, title: "Tech Stack", duration: "15 mins", isLocked: false },
          { id: 3, title: "Project Features", duration: "20 mins", isLocked: false },
        ]
      },
      {
        id: 2,
        title: "Setup Environment",
        lectures: 4,
        duration: "45m",
        lessons: [
          { id: 4, title: "Install Dependencies", duration: "10 mins", isLocked: !isEnrolled },
          { id: 5, title: "Folder Structure", duration: "10 mins", isLocked: !isEnrolled },
          { id: 6, title: "Basic Routing", duration: "12 mins", isLocked: !isEnrolled },
          { id: 7, title: "Config Tailwind", duration: "15 mins", isLocked: !isEnrolled },
        ]
      }
    ]
  };

  return (
    <div className="coursedetail-page">
      {/* Header */}
      <header className="coursedetail-header">
        <Link to="/"><img src={logoCourseCamp} alt="CourseCamp" className="logo" /></Link>
      </header>

      {/* Hero Section */}
      <section className="hero-course flex justify-center items-center text-center">
        <div className="px-4 py-16 text-white max-w-3xl">
          <h1 className="text-5xl font-bold mb-4">{course.title}</h1>

          <p className="course-price">{course.price}</p>

          <Button
            size="lg"
            className="hero-enroll-btn font-semibold px-8 py-3 rounded-full mx-auto"
          >
            Enroll now
          </Button>

          <p className="enrolled-status">
            <span className="font-bold">{course.enrolled}</span> already enrolled
          </p>
        </div>
      </section>




      {/* Stats Section */}
      <section className="coursedetail-stats">
        <div className="stat-box">
          <h3>{course.level} level</h3>
          <p>Recommended experience</p>
        </div>
        <div className="stat-box">
          <h3>{course.rating}</h3>
          <p>({course.reviews} reviews)</p>
        </div>
        <div className="stat-box">
          <h3>Flexible schedule</h3>
          <p>Learning at your own pace</p>
        </div>
        <div className="stat-box">
          <h3>{course.satisfaction}%</h3>
          <p>Most learners liked this course</p>
        </div>
      </section>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="coursedetail-container max-w-[1250px] mx-auto pl-0 pr-4 py-10">
        <div className="grid lg:grid-cols-3 gap-8 coursedetail-layout">
          
          {/* ================= LEFT COLUMN ================= */}
          <div className="lg:col-span-2 coursedetail-main">
            <Tabs defaultValue="structure" className="coursedetail-tabs">

              {/* ===== TABS NAVIGATION ===== */}
              <TabsList className="coursedetail-tabs-nav">
                <TabsTrigger value="structure">Course Structure</TabsTrigger>
                <TabsTrigger value="info">Course Info</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              {/* =============== STRUCTURE TAB =============== */}
              <TabsContent value="structure" className="pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="coursedetail-title">Course Structure</h2>
                  <p className="coursedetail-subtitle">
                    {course.sections.length} sections • {course.totalLectures} lectures • {course.totalHours} total duration
                  </p>
                </div>

                <Accordion type="single" collapsible className="coursedetail-accordion">
                  {course.sections.map(section => {
                    const visibleLessons = isEnrolled ? section.lessons : section.lessons.slice(0, 3);
                    const hiddenCount = section.lessons.length - visibleLessons.length;

                    return (
                      <AccordionItem key={section.id} value={`section-${section.id}`} className="coursedetail-accordion-item">

                        <AccordionTrigger className="coursedetail-accordion-trigger">
                          <span>{section.title}</span>
                          <span className="text-sm text-muted-foreground">
                            {section.lectures} lectures • {section.duration}
                          </span>
                        </AccordionTrigger>

                        <AccordionContent>
                          <div className="space-y-2 pt-2">
                            {visibleLessons.map((lesson, idx) => (
                              <div
                                key={lesson.id}
                                className={`lesson-row ${lesson.isLocked ? "locked" : "unlocked"} ${
                                  idx === 0 && !isEnrolled ? "active-lesson" : ""
                                }`}
                                onClick={() => {
                                    if (!lesson.isLocked) navigate(`/course/${id}/lesson/${lesson.id}`);
                                }}
                                style={{ cursor: lesson.isLocked ? "not-allowed" : "pointer" }}
                              >
                                <div className="lesson-left">
                                  {lesson.isLocked ? <Lock size={16} /> : <PlayCircle size={16} />}
                                  <span>{lesson.title}</span>
                                </div>

                                <div className="lesson-time">
                                  <Clock size={14} />
                                  <span>{lesson.duration}</span>
                                </div>
                              </div>
                            ))}



                            {/* ==== LOCKED BOX ==== */}
                            {!isEnrolled && hiddenCount > 0 && (
                              <div className="coursedetail-locked-box">
                                <Lock size={28} />
                                <p className="font-semibold mt-2">Enroll to unlock full lessons</p>
                                <p className="text-sm text-muted-foreground">
                                  {hiddenCount} more {hiddenCount === 1 ? "lesson" : "lessons"}
                                </p>
                              </div>
                            )}
                          </div>
                        </AccordionContent>

                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </TabsContent>

              {/* =============== INFO TAB =============== */}
              <TabsContent value="info" className="pt-6">
                <h2 className="coursedetail-title mb-4">Course Description</h2>
                <p className="text-foreground mb-6">{course.description}</p>

                <h2 className="coursedetail-title mb-6">Course Info</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-muted-foreground uppercase mb-2">INSTRUCTOR</h3>
                      <p className="text-lg font-medium">{course.instructor}</p>
                    </div>

                    <div>
                      <h3 className="text-sm text-muted-foreground uppercase mb-2">LEVEL</h3>
                      <p className="text-lg font-medium">{course.level}</p>
                    </div>

                    <div>
                      <h3 className="text-sm text-muted-foreground uppercase mb-2">TOPICS</h3>
                      <p className="text-lg font-medium">{course.topics.join(", ")}</p>
                    </div>
                  </div>

                </div>
              </TabsContent>

              {/* =============== REVIEWS TAB =============== */}
              <TabsContent value="reviews" className="pt-6">
                <h2 className="coursedetail-title mb-2">Student Reviews</h2>
                <p className="text-muted-foreground">Student reviews will be displayed here.</p>
              </TabsContent>

            </Tabs>
          </div>

          {/* ================= RIGHT COLUMN (SIDEBAR) ================= */}
          <div className="lg:col-span-1 coursedetail-sidebar">
            <Card className="sticky top-4 p-6 space-y-6">
              <img 
                src={course.image} 
                alt={course.title}
                className="coursedetail-preview-image"
              />
              
              {!isEnrolled ? (
                <>
                  <div>
                    <p className="sidebar-timeleft">5 days left at this price!</p>

                    <div className="sidebar-price-box">
                      <span className="sidebar-price">{course.price}</span>
                      <span className="sidebar-oldprice">2.280.000 VND</span>
                      <span className="sidebar-discount">50% off</span>
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={() => setIsEnrolled(true)}
                  >
                    Enroll Now
                  </Button>

                  <div className="space-y-3">
                    <h3 className="sidebar-benefits-title">What's in the course?</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> Lifetime access with free updates</li>
                      <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> Step-by-step, hands-on project guidance</li>
                      <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> Downloadable resources and source code</li>
                      <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> Quizzes to test your knowledge</li>
                      <li className="flex items-start gap-2"><span className="text-primary mt-1">✓</span> Certificate of completion</li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200 text-center font-semibold">
                    ✓ You're enrolled in this course!
                  </div>
                  
                  <Button
                    className="w-full border-orange-500 text-orange-500 hover:bg-orange-50"
                    size="lg"
                    variant="outline"
                  >
                    Forum trao đổi
                  </Button>

                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="font-semibold">Your Progress</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Completed</span>
                        <span className="font-medium lecture-count">0 of {course.totalLectures} lectures</span>
                      </div>
                      <div className="w-full h-2 bg-muted rounded-full">
                        <div className="h-full bg-primary rounded-full" style={{ width: '0%' }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>

        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CourseDetail;