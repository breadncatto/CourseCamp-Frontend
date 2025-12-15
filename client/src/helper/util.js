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

export { formatDate, formatInputDate, skillsToString, stringToSkills, formatCurrency, toDateInputValue };