import { useParams, Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../components/ui/accordion";
import { ChevronLeft, FileText, Video, CheckSquare, Download, Clock } from "lucide-react";
import Footer from "../components/ui/Footer"; 
import "./LessonDetail.css";

const LessonDetail = () => {
  const { courseId, lessonId } = useParams();

  // 🔥 Mock data (thay bằng API sau)
  const lesson = {
    id: lessonId,
    title: "Introduction to React Hooks",
    duration: "15:30",
    description: "Learn the fundamentals of React Hooks and how to use them in your applications.",
    documents: [
      { id: 1, title: "React Hooks Cheat Sheet.pdf", size: "2.5 MB" },
      { id: 2, title: "Code Examples.zip", size: "1.2 MB" },
      { id: 3, title: "Additional Resources.pdf", size: "850 KB" },
    ],
    assignments: [
      {
        id: 1,
        title: "Bài tập 1: useState Hook",
        description: "Tạo một counter component sử dụng useState hook",
        dueDate: "2024-12-31",
        status: "pending",
      },
      {
        id: 2,
        title: "Bài tập 2: useEffect Hook",
        description: "Implement data fetching với useEffect",
        dueDate: "2024-12-31",
        status: "completed",
      },
    ],
  };

  return (
    <div className="lesson-wrapper">

      <header className="lesson-header sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
            <Link to={`/course/${courseId}`}>
            <Button variant="ghost" size="sm" className="py-3">
                <ChevronLeft className="mr-2 h-4 w-4" />
                Quay lại khóa học
            </Button>
            </Link>
        </div>
      </header>


      {/* 📚 Main */}
      <div className="container mx-auto px-4 py-8">

        {/* 🏷 Title */}
        <div className="lesson-top">
          <h1 className="lesson-title">{lesson.title}</h1>
          <div className="lesson-meta">
            <Clock className="h-4 w-4" />
            <span>{lesson.duration}</span>
          </div>
        </div>

        {/* 📌 Tabs */}
        <Tabs defaultValue="video" className="w-full">
          <TabsList className="lesson-tabs">
            <TabsTrigger value="video"><Video className="h-4 w-4" />Video bài giảng</TabsTrigger>
            <TabsTrigger value="documents"><FileText className="h-4 w-4" />Tài liệu khóa học</TabsTrigger>
            <TabsTrigger value="assignments"><CheckSquare className="h-4 w-4" />Bài tập</TabsTrigger>
          </TabsList>

          {/* 🎥 Video */}
          <TabsContent value="video" className="space-y-6">
            <Card className="lesson-card">
              <CardContent className="p-0">
                <div className="video-placeholder">
                  <Video className="h-16 w-16 text-muted-foreground" />
                  <p className="ml-4 text-muted-foreground">Video player placeholder</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="lesson-card">
              <CardHeader><CardTitle>Về bài học này</CardTitle></CardHeader>
              <CardContent><p className="text-muted-foreground">{lesson.description}</p></CardContent>
            </Card>
          </TabsContent>

          {/* 📎 Documents */}
          <TabsContent value="documents" className="space-y-4">
            <Card className="lesson-doc-card">
              <CardHeader>
                <CardTitle>Tài liệu khóa học</CardTitle>
                <CardDescription>Tải xuống tài liệu hỗ trợ cho bài học này</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="doc-list">
                  {lesson.documents.map((doc) => (
                    <div key={doc.id} className="doc-item">
                      <div className="doc-info">
                        <FileText className="h-5 w-5 text-primary" />
                        <div>
                          <p className="font-medium">{doc.title}</p>
                          <p className="text-sm text-muted-foreground">{doc.size}</p>
                        </div>
                      </div>
                      <Button className="download-btn" size="sm">
                        <Download className="mr-2 h-4 w-4" />Tải xuống
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 📝 Assignments */}
          <TabsContent value="assignments" className="space-y-4">
            <Card className="lesson-card">
              <CardHeader>
                <CardTitle>Bài tập</CardTitle>
                <CardDescription>Hoàn thành các bài tập để củng cố kiến thức</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                    {lesson.assignments.map((asg) => (
                    <AccordionItem key={asg.id} value={`asg-${asg.id}`}>
                        
                        {/* Trigger Bài tập */}
                        <AccordionTrigger className="assignment-trigger hover:no-underline">
                        <div className="assignment-header">
                            <CheckSquare
                            className={`h-5 w-5 assignment-icon ${
                                asg.status === "completed" ? "completed" : "pending"
                            }`}
                            />
                            <span className="assignment-title">{asg.title}</span>
                        </div>
                        </AccordionTrigger>


                        {/* Nội dung bên trong */}
                        <AccordionContent className="assignment-content">
                        <div className="space-y-4">
                            
                            <p className="text-muted-foreground">{asg.description}</p>

                            <div className="flex items-center justify-between">
                            <p className="text-sm text-muted-foreground">
                                Hạn nộp: {asg.dueDate}
                            </p>

                            {asg.status === "completed" ? (
                            <Button variant="outline" disabled className="done-btn">
                                Đã hoàn thành
                            </Button>
                            ) : (
                            <Button className="submit-btn">Nộp bài</Button>
                            )}

                            </div>

                        </div>
                        </AccordionContent>

                    </AccordionItem>
                    ))}
                </Accordion>
                </CardContent>

            </Card>
          </TabsContent>

        </Tabs>
      </div>
    {/* Footer */}
    <Footer/>
    </div>
  );
};

export default LessonDetail;
