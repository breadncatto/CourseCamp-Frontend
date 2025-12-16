import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, Lock, Clock, PlayCircle, Star, User, 
  CheckCircle2, Globe, BarChart, BookOpen, BadgeCheck
} from "lucide-react";
import { useEffect, useState } from "react";

// UI components
import { Button } from "../../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Card } from "../../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../../components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "../../components/ui/dialog";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";

import "./CourseDetail.css"; 
import { getCourseById } from "../../api/courseService";
import { formatCurrency } from "../../helper/util";
import { useAuth } from "../../context/AuthContext";
import { getMyCourses } from "../../api/studentService";
import { createPayment } from "../../api/paymentService";

const CourseDetail = () => {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const navigate = useNavigate();
  
  // State lưu dữ liệu từ API
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [openPayment, setOpenPayment] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        const response = await getCourseById(id);

        if(response && response.meta) {
          setApiData(response.meta);
        }
        // Nếu đã login, xử lý để tìm các khóa học đã ghi danh vào
        if (isLoggedIn) {
          const mycourse = await getMyCourses();
          
          let enrolled = false;
          mycourse.meta.forEach( (c) =>
            {
              if(c.course_id == id) {
                enrolled = true;
              }
            }
          );

          if (enrolled) {
            setIsEnrolled(true);
          }
        }

      } catch (error) {
        console.error("Error fetching course:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourse();
  }, [id]);

  // Nếu đang load hoặc chưa có dữ liệu
  if (loading) return <div className="p-10 text-center">Đang tải dữ liệu khóa học...</div>;
  if (!apiData) return <div className="p-10 text-center">Không tìm thấy khóa học</div>;

  // --- CHUẨN HÓA DỮ LIỆU TỪ API SANG UI ---
  const totalLecturesCount = apiData.modules?.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0) || 0;

  // Map dữ liệu API sang cấu trúc UI cũ để không phải sửa JSX quá nhiều
  const course = {
    id: apiData.course_id,
    title: apiData.title,
    // Xử lý Instructor
    instructor: apiData.instructors?.instructor_name || "Unknown Instructor",
    instructor_detail: {
      name: apiData.instructors?.instructor_name || "Unknown Instructor",
      avatar: apiData.instructors?.instructor_avatar || null,
      role: "Senior Developer", // API chưa có thì hardcode hoặc mock
      rating: apiData.instructors?.avg_rating || 5.0,
      ranking: apiData.instructors?.ranking || "Instructor",
      exp: apiData.instructors?.exp_years || 1
    },
    // Format giá tiền
    price: apiData.price ? Number(apiData.price).toLocaleString('vi-VN') + " VND" : "Liên hệ",
    enrolled: 67, // API chưa có trường này, giữ mock
    level: apiData.level || "Beginner",
    rating: apiData.rating || 0,
    reviews: apiData.reviews?.length || 0,
    reviewsList: apiData.reviews || [],
    description: apiData.description || "Chưa có mô tả cho khóa học này.",
    totalHours: apiData.estimated_duration_hours ? `${apiData.estimated_duration_hours}h` : "Updating",
    totalLectures: totalLecturesCount,
    // Lấy category name làm topic
    topics: apiData.category_name ? [apiData.category_name] : ["General"], 
    satisfaction: 97, // Mock
    // Xử lý ảnh (nếu null dùng ảnh mặc định)
    image: apiData.thumbnail_url || "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800&h=400&fit=crop",
    
    // MAP MODULES (API) -> SECTIONS (UI)
    sections: apiData.modules?.map(module => ({
      id: module.module_id,
      title: module.title,
      lectures: module.lessons?.length || 0,
      duration: module.duration_minutes ? `${module.duration_minutes}m` : "",
      lessons: module.lessons?.map(lesson => ({
        id: lesson.lesson_id,
        title: lesson.title,
        duration: lesson.estimated_duration_hours || "10 min",
        isLocked: !isEnrolled
      })) || []
    })) || []
  };

  const handleEnrollClick = () => {
    if(!isEnrolled) {
      // Thêm api fetch về BE để tạo enrollment cho khóa học
      // Đây là luồng khi chưa đăng ký vào khóa học
      setOpenPayment(true);

    } else {
      // navigate("/course/" + id + "/lesson/" + id);
      // Luồng khi khóa học đã được đăng ký:
      setIsEnrolled(true);
      navigate("/course/" + id + "/lesson/" + id);
    }
  };

  const handlePaymentCreate = async () => {
    try {
      const payload = {
        courseId: apiData.course_id,
        price: apiData.price,
      }
      const url = await createPayment(payload);
      console.log("url" + url);
      if(url) {
        const paymentUrl = url;
        window.location.href = paymentUrl;
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="coursedetail-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero-course flex justify-center items-center text-center">
        <div className="px-4 py-16 text-white max-w-3xl">
          {/* Sử dụng course.title đã chuẩn hóa */}
          <h1 className="text-5xl font-bold mb-4">{course.title}</h1>

          <p className="course-price">{course.price}</p>

          <Button
            size="lg"
            className="hero-enroll-btn font-semibold px-8 py-3 rounded-full mx-auto"
            onClick={handleEnrollClick}
          >
            {isEnrolled ? "Go to Learning" : "Enroll now"}
          </Button>

          <p className="enrolled-status">
            <span className="font-bold">{course.enrolled}</span> already enrolled
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="coursedetail-stats">
        <div className="detail-stat-box">
          <h3 className="capitalize">{course.level} level</h3>
          <p>Recommended experience</p>
        </div>
        <div className="detail-stat-box">
          <h3>{course.rating}</h3>
          <p>({course.reviews} reviews)</p>
        </div>
        <div className="detail-stat-box">
          <h3>Flexible schedule</h3>
          <p>Learning at your own pace</p>
        </div>
        <div className="detail-stat-box">
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
                  {course.sections.length > 0 ? (
                    course.sections.map(section => {
                      const visibleLessons = isEnrolled ? section.lessons : section.lessons.slice(0, 3);
                      const hiddenCount = section.lessons.length - visibleLessons.length;

                      return (
                        <AccordionItem key={section.id} value={`section-${section.id}`} className="coursedetail-accordion-item">

                          <AccordionTrigger className="coursedetail-accordion-trigger">
                            <span>{section.title}</span>
                            <span className="text-sm text-muted-foreground">
                              {section.lectures} lectures {section.duration && `• ${section.duration}`}
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
                    })
                  ) : (
                    <p className="text-muted-foreground italic">Chưa có bài học nào trong khóa này.</p>
                  )}
                </Accordion>
              </TabsContent>

              {/* =============== INFO TAB =============== */}
              <TabsContent value="info" className="pt-6">
                <h2 className="coursedetail-title mb-4">Course Description</h2>
                <p className="text-foreground mb-6 whitespace-pre-line">{course.description}</p>

                <h2 className="coursedetail-title mb-6">Course Info</h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm text-muted-foreground uppercase mb-2">INSTRUCTOR</h3>
                      <p className="text-lg font-medium">{course.instructor}</p>
                    </div>

                    <div>
                      <h3 className="text-sm text-muted-foreground uppercase mb-2">LEVEL</h3>
                      <p className="text-lg font-medium capitalize">{course.level}</p>
                    </div>

                    <div>
                      <h3 className="text-sm text-muted-foreground uppercase mb-2">TOPICS</h3>
                      <p className="text-lg font-medium">{course.topics.join(", ")}</p>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* =============== REVIEWS TAB =============== */}
              {/* =============== REVIEWS TAB (ĐÃ CẬP NHẬT) =============== */}
              <TabsContent value="reviews" className="pt-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="coursedetail-title">Student Reviews</h2>
                  <span className="text-lg font-bold text-yellow-500 flex items-center gap-1">
                    Đánh giá:{course.rating} <Star className="fill-yellow-500 text-yellow-500" size={20} />
                  </span>
                </div>

                {course.reviewsList.length > 0 ? (
                  <div className="space-y-6">
                    {course.reviewsList.map((review, index) => (
                      <div key={index} className="review-item border-b pb-6 last:border-0">
                        <div className="flex items-start gap-4">
                          {/* Avatar giả lập (do API chưa trả về info user) */}
                          <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0">
                            <User size={20} />
                          </div>

                          <div className="space-y-1 flex-1">
                            {/* Tên và Ngày tháng */}
                            <div className="flex justify-between items-center">
                              <h4 className="font-semibold text-sm">Học viên {index + 1}</h4>
                              <span className="text-xs text-muted-foreground">
                                {new Date(review.created_at).toLocaleDateString('vi-VN')}
                              </span>
                            </div>

                            {/* Số sao đánh giá */}
                            <div className="flex items-center gap-0.5">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  // Logic hiển thị màu sao: Nếu index < rating thì tô vàng
                                  className={`${
                                    i < Math.floor(review.rating) 
                                      ? "fill-yellow-400" 
                                      : "!fill-gray-200 text-gray-200"
                                  }`}
                                />
                              ))}
                              <span className="text-xs text-muted-foreground ml-2">
                                  ({review.rating})
                              </span>
                            </div>

                            {/* Nội dung comment */}
                            <p className="text-sm text-foreground mt-2 leading-relaxed">
                              {review.comment}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>Chưa có đánh giá nào cho khóa học này.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          {/* ================= RIGHT COLUMN (SIDEBAR) ================= */}
          <div className="lg:col-span-1 coursedetail-sidebar">
            <Card className="sticky top-4 p-6 space-y-6">
              <img 
                src={course.image} 
                alt={course.title}
                className="coursedetail-preview-image object-cover w-full h-48 rounded-md"
              />
              
              {!isEnrolled ? (
                <>
                  <div>
                    <p className="sidebar-timeleft">Lifetime access</p>

                    <div className="sidebar-price-box">
                      <span className="sidebar-price">{course.price}</span>
                      {/* Có thể thêm logic giảm giá nếu API trả về old_price */}
                    </div>
                  </div>

                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handleEnrollClick}
                  >
                    Enroll Now
                  </Button>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="check-icon text-green-600 font-semibold flex items-center gap-2">
                    <span>✓</span> You're enrolled in this course!
                  </div>
                  
                  <Button
                    className="w-full forum-btn text-white font-semibold"
                    size="lg"
                  >
                    Go to learning
                  </Button>


                  <div className="space-y-3 pt-4 border-t">
                    <h3 className="progress-title">Your Progress</h3>
                    <div className="space-y-2">
                      <div className="progress-row">
                        <span>Completed 0 of {course.totalLectures} lectures</span>
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

      <Footer />
      <Dialog open={openPayment === true} onOpenChange={setOpenPayment}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thanh toán khóa học: <div className="bold">{course.price}</div></DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setOpenPayment(false);
              }}
            >
              Không
            </Button>
            <Button
              onClick={() => {
                alert("Chuyển hướng sang cổng thanh toán")
                handlePaymentCreate()
                setOpenPayment(false);
              }}
            >
              Có
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

  );
};

export default CourseDetail;