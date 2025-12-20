const formatCurrency = (value) => {
    if (!value) return "0 đ";
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
};

const formatDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? '' : date.toLocaleDateString('vi-VN'); 
};

const formatInputDate = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? '' : date.toISOString().split('T')[0];
};

const skillsToString = (skills) => {
    if (!skills) return '';
    return skills.join(', ');
}

const stringToSkills = (skills) => {
    if (!skills) return [];
    let arr = skills.split(',');
    return arr.map(skill => skill.trim());
}

function toDateInputValue(date) {
    if (!date) return "";

    const d = new Date(date);
    return isNaN(d.getTime()) ? '' : d.toISOString().split("T")[0];
}

// Hàm chuyển đổi dữ liệu thô từ API sang format của CourseCard
const mapCoursesData = (apiData) => {
  if (!Array.isArray(apiData)) return [];

  return apiData.map((course) => ({
    id: course.course_id,
    title: course.title,
    level: course.level.charAt(0).toUpperCase() + course.level.slice(1),
    price: parseInt(course.price, 10),
    image: course.thumbnail_url, 
    description: course.description,
    tag: course.category_name && course.category_name.length > 0 
          ? course.category_name[0] 
          : 'General',
    status: course.status
  }));
};

const mapStudentData = (apiData) => {
    if (!Array.isArray(apiData)) return [];

    // id: 1, full_name: 'Nguyễn Minh Tuấn', email: 'tuan.nguyen@email.com', ranking: 'Gold' 
    return apiData.map((student) => ({
        id: student.user_id,
        full_name: student.full_name,
        email: student.email,
        ranking: student.ranking
    }))
}
export { formatDate, formatInputDate, skillsToString, stringToSkills, formatCurrency, toDateInputValue, mapCoursesData, mapStudentData };