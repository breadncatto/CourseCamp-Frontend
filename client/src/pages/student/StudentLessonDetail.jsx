import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "../../components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import {
  ChevronLeft,
  FileText,
  Video,
  CheckSquare,
  Download,
  Clock,
  PlayCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Menu,
} from "lucide-react";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import "./StudentLessonDetail.css";

// 🔥 Giả lập dữ liệu API trả về như cấu trúc bạn cung cấp
const MOCK_COURSE_DATA = {
  status: "OK",
  code: 200,
  message: "Lấy khóa học thành công",
  meta: {
    course_id: 4,
    title: "NodeJS Masterclass",
    description: "Khóa học Fullstack",
    modules: [
      {
        module_id: 5,
        title: "Chương 1: Khởi động",
        lessons: [
          { lesson_id: 7, title: "Cài đặt Node", duration: "10:00" },
          { lesson_id: 8, title: "VS Code Setup", duration: "05:30" },
        ],
      },
      {
        module_id: 6,
        title: "Chương 2: ExpressJS",
        lessons: [
          { lesson_id: 9, title: "Route là gì?", duration: "15:20" },
          //   { lesson_id: 10, title: "HTTP Methods", duration: "12:45" } // Fake thêm để test
        ],
      },
    ],
  },
};

const LessonDetail = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  // --- STATE ---
  const [course, setCourse] = useState(MOCK_COURSE_DATA.meta);
  const [activeLessonId, setActiveLessonId] = useState(parseInt(lessonId) || 7); // Mặc định bài đầu tiên
  const [completedLessons, setCompletedLessons] = useState([]); // Giả sử bài 7 đã học xong
  const [expandedModules, setExpandedModules] = useState([]); // Mở sẵn các chương
  const [openUpload, setOpenUpload] = useState(false);
  const [uploadFile, setUploadFile] = useState(null);

  // Tìm bài học hiện tại
  const currentLesson = useMemo(() => {
    if (!course || !course.modules) return null;

    for (const module of course.modules) {
      const found = module.lessons.find(
        (l) => String(l.lesson_id) === String(activeLessonId)
      );
      if (found) return { ...found, moduleTitle: module.title };
    }
    return null;
  }, [course, activeLessonId]);

  // Sync URL params với State
  useEffect(() => {
    if (lessonId) setActiveLessonId(parseInt(lessonId));
  }, [lessonId]);

  // --- HANDLERS ---
  const handleLessonChange = (id) => {
    setActiveLessonId(id);
    navigate(`/course/${String(courseId)}/lesson/${id}`); // Update URL (Giả định route)
    window.scrollTo(0, 0);
  };

  const toggleModule = (modId) => {
    setExpandedModules((prev) =>
      prev.includes(modId)
        ? prev.filter((id) => id !== modId)
        : [...prev, modId]
    );
  };

  const handleMarkCompleted = () => {
    if (!completedLessons.includes(activeLessonId)) {
      setCompletedLessons([...completedLessons, activeLessonId]);
    }
    // Logic: Tự động chuyển bài tiếp theo (Optional)
  };

  const isCompleted = (id) => completedLessons.includes(id);

  // --- RENDER SIDEBAR ---
  const renderSidebar = () => (
    <aside className="course-sidebar">
      <div className="sidebar-header">
        <h2 className="course-name">{course.title}</h2>
        <p className="progress-text">
          Hoàn thành {completedLessons.length}/
          {course.modules.reduce((acc, m) => acc + m.lessons.length, 0)} bài học
        </p>
      </div>

      <div className="sidebar-content">
        {course.modules.map((module) => (
          <div key={module.module_id} className="module-group">
            <div
              className="module-header"
              onClick={() => toggleModule(module.module_id)}
            >
              <span className="module-title">
                <strong>{module.title}</strong>
              </span>
              {expandedModules.includes(module.module_id) ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </div>

            {expandedModules.includes(module.module_id) && (
              <div className="module-lessons">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.lesson_id}
                    className={`sidebar-lesson-item ${
                      activeLessonId === lesson.lesson_id ? "active" : ""
                    }`}
                    onClick={() => handleLessonChange(lesson.lesson_id)}
                  >
                    <div className="lesson-check">
                      {isCompleted(lesson.lesson_id) ? (
                        <CheckCircle className="icon-completed" size={16} />
                      ) : (
                        <PlayCircle className="icon-pending" size={16} />
                      )}
                    </div>
                    <div className="lesson-info-side">
                      <p className="lesson-name">{lesson.title}</p>
                      <span className="lesson-duration">
                        {lesson.duration || "10:00"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );

  if (!currentLesson) return <div>Đang tải bài học...</div>;

  return (
    <div className="learning-layout">
      {/* SIDEBAR (Left) */}
      {renderSidebar()}

      {/* MAIN CONTENT (Right) */}
      <main className="learning-main">
        <Header />

        {/* Header nhỏ breadcrumb */}
        <header className="learning-header">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/student/my-courses")}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Thoát
          </Button>
          <span className="header-breadcrumbs">
            {course.title} / {currentLesson.moduleTitle} / {currentLesson.title}
          </span>
        </header>

        <div className="lesson-container">
          {/* Video Player */}
          <div className="video-area">
            <div className="video-placeholder-large">
              <Video className="h-20 w-20 text-white opacity-80" />
              <p className="text-white mt-4 font-medium">
                Video Player: {currentLesson.title}
              </p>
            </div>
          </div>

          {/* Title & Action */}
          <div className="lesson-control-bar">
            <h1 className="current-lesson-title">{currentLesson.title}</h1>
            <Button
              className={`mark-complete-btn ${
                isCompleted(activeLessonId) ? "completed" : ""
              }`}
              onClick={handleMarkCompleted}
            >
              {isCompleted(activeLessonId) ? (
                <>
                  {" "}
                  <CheckCircle className="mr-2 h-4 w-4" /> Đã hoàn thành{" "}
                </>
              ) : (
                <>
                  {" "}
                  <CheckSquare className="mr-2 h-4 w-4" /> Đánh dấu hoàn thành{" "}
                </>
              )}
            </Button>
          </div>

          {/* Tabs Content (Giữ lại logic cũ của bạn) */}
          <Tabs defaultValue="description" className="w-full mt-8">
            <TabsList className="lesson-tabs">
              <TabsTrigger value="description">Mô tả & Tài liệu</TabsTrigger>
              <TabsTrigger value="assignments">Bài tập</TabsTrigger>
              <TabsTrigger value="discussion">Thảo luận</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="space-y-6">
              <Card className="lesson-card">
                <CardHeader>
                  <CardTitle>Mô tả bài học</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Đây là nội dung chi tiết cho bài học{" "}
                    <b>{currentLesson.title}</b>. Trong bài này chúng ta sẽ tìm
                    hiểu về các khái niệm cơ bản...
                  </p>

                  {/* Mock Documents */}
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Tài liệu đính kèm</h3>
                    <div className="doc-item">
                      <div className="doc-info">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>Slide_Bai_Giang.pdf</span>
                      </div>
                      <Button variant="outline" size="sm">
                        Tải xuống
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments">
              <Card className="lesson-card">
                <CardHeader>
                  <CardTitle>Bài tập thực hành</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 mb-4">
                    Hoàn thành bài tập để mở khóa bài tiếp theo.
                  </p>
                  {/* Reuse Accordion Logic cũ của bạn ở đây nếu cần */}
                  <Button
                    onClick={() => setOpenUpload(1)}
                    className="submit-btn"
                  >
                    Nộp bài ngay
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion">
              <Card className="lesson-card">
                <CardHeader>
                  <CardTitle>Thảo luận khóa học</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Thảo luận khóa học sẽ được thêm vào sau</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Footer />
      </main>

      {/* Dialog Nộp bài (Giữ nguyên logic cũ) */}
      <Dialog open={openUpload !== false} onOpenChange={setOpenUpload}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nộp bài tập</DialogTitle>
          </DialogHeader>
          <input type="file" className="block w-full border p-2 rounded" />
          <DialogFooter>
            <Button
              onClick={() => {
                setOpenUpload(false);
                alert("Nộp bài thành công!");
              }}
            >
              Nộp bài
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LessonDetail;
