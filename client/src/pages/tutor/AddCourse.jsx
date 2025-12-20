import React, { useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/ui/Footer';
import Header from '../../components/Header';
import './AddCourse.css';
import { getCategories } from '../../api/courseService';
import { createCourse } from '../../api/instructorService';

// Mock danh mục để demo chọn ID (Thực tế bạn sẽ gọi API lấy list này)
const CATEGORIES = [
  { id: 1, name: 'Backend' },
  { id: 2, name: 'Frontend' },
  { id: 3, name: 'Fullstack' },
  { id: 4, name: 'DevOps' },
];

const LEVEL = [
  { id: 1, name: 'beginner' },
  { id: 2, name: 'intermediate' },
  { id: 3, name: 'advanced' },
]
const AddCourse = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [courseData, setCourseData] = useState({
    title: '',
    description: '',
    price: 0,
    level: '',
    categoryIds: [],
    modules: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
      setLoading(true);

      const response = await getCategories();
      if(response && response.meta) {
        setCategories(response.meta);
      }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [])

  const handleBasicChange = (e) => {
  const { name, value } = e.target;
  
  setCourseData(prev => ({
    ...prev,
    [name]: name === 'price'
      ? (value === '' ? '' : Number(value)) 
      : value
  }));
};

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    const newCategoryIds = value === "" ? [] : [Number(value)];

    setCourseData(prev => ({ 
      ...prev, 
      categoryIds: newCategoryIds 
    }));
  };

  const handleLevelChange = (e) => {
    const value = e.target.value;
    setCourseData(prev => ({ ...prev, level: value === '' ? "beginner" : value }));
  }

  // --- HANDLERS CHO MODULES (CHƯƠNG) ---
  const addModule = () => {
    const newModule = {
      title: '',
      orderIndex: courseData.modules.length + 1,
      lessons: []
    };
    setCourseData(prev => ({ ...prev, modules: [...prev.modules, newModule] }));
  };

  const updateModule = (index, field, value) => {
    const updatedModules = [...courseData.modules];
    updatedModules[index][field] = value;
    setCourseData(prev => ({ ...prev, modules: updatedModules }));
  };

  const removeModule = (index) => {
    const updatedModules = courseData.modules.filter((_, i) => i !== index);
    // Cập nhật lại orderIndex sau khi xóa
    updatedModules.forEach((mod, i) => mod.orderIndex = i + 1);
    setCourseData(prev => ({ ...prev, modules: updatedModules }));
  };

  // --- HANDLERS CHO LESSONS (BÀI HỌC) ---
  const addLesson = (moduleIndex) => {
    const updatedModules = [...courseData.modules];
    const currentLessons = updatedModules[moduleIndex].lessons;
    
    const newLesson = {
      title: '',
      estimatedDurationHours: 0,
      orderIndex: currentLessons.length + 1
    };

    updatedModules[moduleIndex].lessons.push(newLesson);
    setCourseData(prev => ({ ...prev, modules: updatedModules }));
  };

  const updateLesson = (moduleIndex, lessonIndex, field, value) => {
    const updatedModules = [...courseData.modules];
    const lesson = updatedModules[moduleIndex].lessons[lessonIndex];
    
    // Xử lý field số
    lesson[field] = field === 'estimatedDurationHours' ? Number(value) : value;
    
    setCourseData(prev => ({ ...prev, modules: updatedModules }));
  };

  const removeLesson = (moduleIndex, lessonIndex) => {
    const updatedModules = [...courseData.modules];
    updatedModules[moduleIndex].lessons = updatedModules[moduleIndex].lessons.filter((_, i) => i !== lessonIndex);
    
    updatedModules[moduleIndex].lessons.forEach((les, i) => les.orderIndex = i + 1);
    
    setCourseData(prev => ({ ...prev, modules: updatedModules }));
  };

  // --- SUBMIT ---
  const handleSubmit = async () => {

    console.log("JSON to Send:", JSON.stringify(courseData, null, 2));
    try {
      if(!courseData.categoryIds) {
        alert("Không được để trống danh mục khóa học!");
        return;
      }
      if(!courseData.title) {
        alert("Không được để trống tiêu đề khóa học!");
        return;
      }
      const response = await createCourse(courseData);
      if(response) {
        alert("Tạo khóa học thành công!");
      }

      setCourseData({ title: '', description: '', price: 0, categoryIds: [], modules: [] })
    } catch (error) {
      console.error("Failed to create course", error);
      alert("Tạo khóa học thất bại!");
    }
  };

  if(loading) return <div className="loading-state">Đang tải dữ liệu...</div>

  return (
    <div className="dashboard-layout">
      <div className="body-container">
        <Sidebar activePage="add-course" />
        <main className="main-content">
          <Header />
          <div className="content-body">
            <div className="header-section">
               <h1>Add New Course</h1>
            </div>

            {/* PHẦN 1: THÔNG TIN CƠ BẢN */}
            <div className="card form-card">
              <h3>Basic Information</h3>
              <div className="form-group">
                <label>Title</label>
                <input 
                  type="text" name="title" className="form-control" 
                  placeholder="Enter course title" 
                  value={courseData.title} onChange={handleBasicChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea 
                  name="description" className="form-control" rows="3" 
                  placeholder="Short description"
                  value={courseData.description} onChange={handleBasicChange}
                ></textarea>
              </div>
              <div className="form-row">
                <div className="form-group col-6">
                  <label>Price (VND)</label>
                  <input 
                    type="number" name="price" className="form-control" 
                    value={courseData.price} onChange={handleBasicChange}
                  />
                </div>
                <div className="form-group col-6">
                  <label>Category</label>
                  <select 
                    className="form-control" 
                    name="categoryIds"
                    value={courseData.categoryIds[0] || ""}
                    onChange={handleCategoryChange}
                    style={{ height: '100px' }}
                  >
                    <option value="">-- Select a Category --</option>
                    {categories.map(cat => (
                      <option key={cat.category_id} value={cat.category_id}>{cat.category_name}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-6">
                  <label>Level</label>
                  <select 
                    className="form-control" 
                    name="level"
                    value={courseData.level}
                    onChange={handleLevelChange}
                    style={{ height: '100px' }}
                  >
                    <option value="">-- Select aLevel</option>
                    {LEVEL.map(lv => (
                      <option key={lv.id} value={lv.name}>{lv.name.toUpperCase()}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* PHẦN 2: CURRICULUM (MODULES & LESSONS) */}
            <div className="curriculum-section">
              <div className="section-header-row">
                <h3>Curriculum</h3>
                <button className="btn btn-secondary" onClick={addModule}>+ Add Module</button>
              </div>

              {courseData.modules.map((module, mIndex) => (
                <div key={mIndex} className="card module-card">
                  {/* Module Header */}
                  <div className="module-header">
                    <div className="form-group" style={{ flex: 1, marginBottom: 0 }}>
                      <label>Module {mIndex + 1} Title</label>
                      <input 
                        type="text" className="form-control" 
                        placeholder="e.g. Chapter 1: Intro"
                        value={module.title}
                        onChange={(e) => updateModule(mIndex, 'title', e.target.value)}
                      />
                    </div>
                    <button className="btn-icon delete" onClick={() => removeModule(mIndex)}>🗑️</button>
                  </div>

                  {/* Lessons List */}
                  <div className="lessons-container">
                    {module.lessons.map((lesson, lIndex) => (
                      <div key={lIndex} className="lesson-row">
                        <span className="lesson-number">Lesson {lIndex + 1}</span>
                        <input 
                          type="text" className="form-control lesson-title" 
                          placeholder="Lesson title"
                          value={lesson.title}
                          onChange={(e) => updateLesson(mIndex, lIndex, 'title', e.target.value)}
                        />
                        <input 
                          type="number" className="form-control lesson-duration" 
                          placeholder="Hours" step="0.1"
                          value={lesson.estimatedDurationHours}
                          onChange={(e) => updateLesson(mIndex, lIndex, 'estimatedDurationHours', e.target.value)}
                        />
                        <button className="btn-icon delete-small" onClick={() => removeLesson(mIndex, lIndex)}>✕</button>
                      </div>
                    ))}
                    
                    <button className="btn-text-only" onClick={() => addLesson(mIndex)}>+ Add Lesson</button>
                  </div>
                </div>
              ))}
            </div>

            {/* BUTTON GROUP */}
            <div className="button-group sticky-footer">
              <button className="btn btn-primary" onClick={handleSubmit}>Save & Create Course</button>
              <button className="btn btn-danger" onClick={() => setCourseData({ title: '', description: '', price: 0, categoryIds: [], modules: [] })}>Reset</button>
            </div>

          </div> 
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default AddCourse;