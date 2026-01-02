import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

function AddGrade() {
  const location = useLocation();
  const navigate = useNavigate();
  const { studentId } = useParams();
  const student = location.state?.student;

  // Available subjects
  const subjects = [
    { id: 1, name: 'Mathematics', code: 'MATH' },
    { id: 2, name: 'English', code: 'ENG' },
    { id: 3, name: 'Science', code: 'SCI' },
    { id: 4, name: 'Social Studies', code: 'SS' },
    { id: 5, name: 'Physical Education', code: 'PE' },
    { id: 6, name: 'Computer Science', code: 'CS' },
    { id: 7, name: 'Arts', code: 'ART' },
    { id: 8, name: 'Music', code: 'MUS' },
    { id: 9, name: 'Geography', code: 'GEO' },
    { id: 10, name: 'History', code: 'HIST' },
    { id: 11, name: 'Biology', code: 'BIO' },
    { id: 12, name: 'Chemistry', code: 'CHEM' }
  ];

  const [formData, setFormData] = useState({
    subject: '',
    term: '1',
    year: new Date().getFullYear(),
    assessmentType: 'exam',
    score: '',
    maxScore: 100,
    comments: ''
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.subject) {
      newErrors.subject = 'Please select a subject';
    }
    if (!formData.score) {
      newErrors.score = 'Score is required';
    } else if (isNaN(formData.score) || formData.score < 0 || formData.score > formData.maxScore) {
      newErrors.score = `Score must be between 0 and ${formData.maxScore}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would make an API call to save the grade
      console.log('Grade Data:', {
        studentId: student.id,
        ...formData
      });

      // Show success message and navigate back
      alert('Grade added successfully!');
      navigate(-1);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-xl mb-4">Student information not found</p>
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const percentage = formData.score && formData.maxScore ? 
    ((parseFloat(formData.score) / parseFloat(formData.maxScore)) * 100).toFixed(1) : 0;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleCancel}
            className="text-blue-600 hover:text-blue-800 mb-4 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Students
          </button>
          <h1 className="text-4xl font-bold text-gray-800">Add Grade</h1>
        </div>

        {/* Student Info Card */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Student Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Student Name</p>
              <p className="text-lg font-semibold text-gray-800">{student.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Registration Number</p>
              <p className="text-lg font-semibold text-gray-800">{student.regNumber}</p>
            </div>
          </div>
        </div>

        {/* Grade Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Grade Details</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Subject Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject <span className="text-red-500">*</span>
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.subject ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select a subject</option>
                {subjects.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name} ({subject.code})
                  </option>
                ))}
              </select>
              {errors.subject && (
                <p className="mt-1 text-sm text-red-500">{errors.subject}</p>
              )}
            </div>

            {/* Term and Year */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Term <span className="text-red-500">*</span>
                </label>
                <select
                  name="term"
                  value={formData.term}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1">Term 1</option>
                  <option value="2">Term 2</option>
                  <option value="3">Term 3</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Year <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Assessment Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assessment Type <span className="text-red-500">*</span>
              </label>
              <select
                name="assessmentType"
                value={formData.assessmentType}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="exam">Final Exam</option>
                <option value="midterm">Midterm Exam</option>
                <option value="quiz">Quiz</option>
                <option value="assignment">Assignment</option>
                <option value="project">Project</option>
              </select>
            </div>

            {/* Score */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Score <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="score"
                  value={formData.score}
                  onChange={handleChange}
                  placeholder="Enter score"
                  step="0.01"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.score ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.score && (
                  <p className="mt-1 text-sm text-red-500">{errors.score}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Maximum Score <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="maxScore"
                  value={formData.maxScore}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Percentage Display */}
            {formData.score && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-gray-700">Percentage</p>
                <p className="text-3xl font-bold text-blue-600">{percentage}%</p>
              </div>
            )}

            {/* Comments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Comments (Optional)
              </label>
              <textarea
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                rows="4"
                placeholder="Add any additional comments about the student's performance..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Save Grade
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddGrade;