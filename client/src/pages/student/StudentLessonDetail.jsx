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
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  ChevronLeft,
  FileText,
  Video,
  CheckSquare,
  PlayCircle,
  CheckCircle,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import Footer from "../../components/ui/Footer";
import Header from "../../components/ui/Header";
import "./StudentLessonDetail.css";
import { getCourseById } from "../../api/courseService";
import { getEnrollment, updateProgress } from "../../api/studentService";

const LessonDetail = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();

  // --- STATE ---
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [showCongratModal, setShowCongratModal] = useState(false);
  const [activeLessonId, setActiveLessonId] = useState(parseInt(lessonId) || 0);
  
  // Lưu danh sách ID các bài đã hoàn thành (được parse từ lesson_progress)
  const [completedLessons, setCompletedLessons] = useState([]); 
  
  const [expandedModules, setExpandedModules] = useState([]); 
  const [openUpload, setOpenUpload] = useState(false);

  // --- FETCH DATA ---
  useEffect(() => {
    const fetchData = async () => {
      if (!courseId) return;
      try {
        setLoading(true);

        // 1. Gọi API lấy thông tin khóa học
        const courseRes = await getCourseById(courseId);
        if (courseRes && courseRes.meta) {
          setCourse(courseRes.meta);
          
          // Mặc định mở chương đầu tiên nếu có
          if (courseRes.meta.modules && courseRes.meta.modules.length > 0) {
            setExpandedModules([courseRes.meta.modules[0].module_id]);
          }
        }

        // 2. Gọi API lấy tiến độ học tập (Enrollment)
        const enrollmentRes = await getEnrollment(courseId);
        if (enrollmentRes && enrollmentRes.meta && enrollmentRes.meta.lesson_progress) {
          const progressObj = enrollmentRes.meta.lesson_progress;
          
          const finishedIds = Object.keys(progressObj)
            .filter((key) => progressObj[key] === true)
            .map((key) => parseInt(key));
            
          setCompletedLessons(finishedIds);
        }

      } catch (error) {
        console.error("Lỗi tải dữ liệu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [courseId]);

  // Sync URL params với State khi lessonId thay đổi trên URL
  useEffect(() => {
    if (lessonId) {
      setActiveLessonId(parseInt(lessonId));
    }
  }, [lessonId]);

  // ---Tìm bài học hiện tại dựa trên activeLessonId ---
  const currentLesson = useMemo(() => {
    if (!course || !course.modules) return null;

    for (const module of course.modules) {
      if (module.lessons) {
        const found = module.lessons.find(
          (l) => l.lesson_id === activeLessonId
        );
        if (found) return { ...found, moduleTitle: module.title };
      }
    }
    return null;
  }, [course, activeLessonId]);

  // Nếu chưa chọn bài nào (activeLessonId = 0) và dữ liệu đã tải xong,
  // tự động chọn bài đầu tiên của chương đầu tiên.
  useEffect(() => {
    if (!loading && course && course.modules && activeLessonId === 0) {
        const firstModule = course.modules[0];
        if (firstModule && firstModule.lessons && firstModule.lessons.length > 0) {
            const firstLessonId = firstModule.lessons[0].lesson_id;
            handleLessonChange(firstLessonId);
        }
    }
  }, [loading, course]);


  // --- HANDLERS ---
  const handleLessonChange = (id) => {
    setActiveLessonId(id);
    navigate(`/course/${courseId}/lesson/${id}`);
    window.scrollTo(0, 0);
  };

  const toggleModule = (modId) => {
    setExpandedModules((prev) =>
      prev.includes(modId)
        ? prev.filter((id) => id !== modId)
        : [...prev, modId]
    );
  };

  const handleMarkCompleted = async () => {
    // Gọi API để đưa lên server.
    // Cập nhật state ở Local
    // Cho phép không cập nhật 
    if(updating) return;

    const isCurrentlyStatus = isCompleted(activeLessonId);
    const newStatus = !isCurrentlyStatus;

    try {
      setUpdating(true);

      const payload = {
        courseId: courseId,
        lessonId: activeLessonId,
        isCompleted: newStatus,
      }

      await updateProgress(payload);

      if(newStatus) {
        // Khi bài học đã được cập nhật thành công và hoàn thành
        const newCompletedList = [...completedLessons, activeLessonId];
        setCompletedLessons(newCompletedList);

        if(newCompletedList.length === getTotalLessons()) {
          // Hiển thị modal thông báo học khóa học thành công
          setShowCongratModal(true);
        }
      } else {
        // Xóa khỏi danh sách hoàn thành.
        setCompletedLessons((prev) => prev.filter((id) => id !== activeLessonId));
      }
    } catch (error) {
      console.error("Lỗi cập nhật tiến độ:", error);
      alert("Có lỗi xảy ra khi cập nhật tiến độ học tập!");
    } finally {
      setUpdating(false);
    }

  };

  const isCompleted = (id) => completedLessons.includes(id);

  // Hàm tính tổng số bài học
  const getTotalLessons = () => {
    if (!course || !course.modules) return 0;
    return course.modules.reduce((acc, m) => acc + (m.lessons ? m.lessons.length : 0), 0);
  };

  // --- RENDER SIDEBAR ---
  const renderSidebar = () => (
    <aside className="course-sidebar">
      <div className="sidebar-header">
        <h2 className="course-name">{course.title}</h2>
        <p className="progress-text">
          Hoàn thành {completedLessons.length}/{getTotalLessons()} bài học
        </p>
      </div>

      <div className="sidebar-content">
        {course.modules?.map((module) => (
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
                {module.lessons?.map((lesson) => (
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
                        {/* API trả về duration_minutes hoặc estimated_duration_hours có thể null */}
                        {lesson.estimated_duration_hours 
                            ? `${lesson.estimated_duration_hours}h` 
                            : "Video"}
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

  // --- LOADING / NULL CHECKS ---
  if (loading) return <div className="p-8">Đang tải dữ liệu khóa học...</div>;
  if (!course) return <div className="p-8">Không tìm thấy thông tin khóa học.</div>;
  
  // Trường hợp course load xong nhưng chưa xác định được currentLesson (ví dụ ID trên URL sai)
  if (!currentLesson && activeLessonId !== 0) return <div className="p-8">Không tìm thấy bài học này.</div>;

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
            {course.title} / {currentLesson?.moduleTitle} / {currentLesson?.title}
          </span>
        </header>

        <div className="lesson-container">
          {/* Video Player */}
          <div className="video-area">
            <div className="video-placeholder-large">
              <Video className="h-20 w-20 text-white opacity-80" />
              <p className="text-white mt-4 font-medium">
                Video Player: {currentLesson?.title}
              </p>
            </div>
          </div>

          {/* Title & Action */}
          <div className="lesson-control-bar">
            <h1 className="current-lesson-title">{currentLesson?.title}</h1>
            <Button
              disabled={updating}
              className={`mark-complete-btn ${
                isCompleted(activeLessonId) ? "completed" : ""
              }`}
              onClick={handleMarkCompleted}
            >
              {updating ? (<>Đang lưu quá trình...</>) 
              : isCompleted(activeLessonId) ? (
                <>
                  <CheckCircle className="mr-2 h-4 w-4" /> Đã hoàn thành
                </>
              ) : (
                <>
                  <CheckSquare className="mr-2 h-4 w-4" /> Đánh dấu hoàn thành
                </>
              )}
            </Button>
          </div>

          {/* Tabs Content */}
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
                    {currentLesson?.description || "Chưa có mô tả cho bài học này."}
                  </p>

                  {/* Mock Documents - Phần này giữ nguyên vì API chưa có field documents */}
                  <div className="mt-6">
                    <h3 className="font-semibold mb-3">Tài liệu đính kèm</h3>
                    <div className="doc-item">
                      <div className="doc-info">
                        <FileText className="h-5 w-5 text-primary" />
                        <span>Tai_lieu_tham_khao.pdf</span>
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
                    Nộp bài tập thực hành cho bài học này (nếu có yêu cầu).
                  </p>
                  <Button
                    onClick={() => setOpenUpload(true)}
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
                  <p>Tính năng thảo luận đang được phát triển.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Footer />
      </main>

      {/* Dialog Nộp bài */}
      <Dialog open={openUpload} onOpenChange={setOpenUpload}>
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

      {/* Dialog thông báo hoàn thành khóa học */}
      <Dialog open={showCongratModal} onOpenChange={setShowCongratModal}>
        <DialogContent className="sm:max-w-md text-center">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-primary">
              Xin chúc mừng! 🎉
            </DialogTitle>
          </DialogHeader>
          
          <div className="py-4">
            <p className="text-lg font-medium text-gray-700">
              Bạn đã hoàn thành xuất sắc khóa học <br/>
              <span className="text-blue-600">"{course.title}"</span>
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Bạn đã nỗ lực rất nhiều. Hãy tiếp tục giữ vững tinh thần học tập này nhé!
            </p>
          </div>

          <DialogFooter className="sm:justify-center gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowCongratModal(false)}
            >
              Ở lại xem lại bài
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => navigate('/student/my-courses')}
            >
              Về danh sách khóa học
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LessonDetail;