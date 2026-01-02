import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function StudentsList() {
  const { formId } = useParams();
  const navigate = useNavigate();

  // Dummy data - replace with actual API call
  const [students] = useState([
    { id: 1, name: 'John Doe', regNumber: 'REG001', performance: 'Excellent', average: 85 },
    { id: 2, name: 'Jane Smith', regNumber: 'REG002', performance: 'Good', average: 75 },
    { id: 3, name: 'Mike Johnson', regNumber: 'REG003', performance: 'Average', average: 65 },
    { id: 4, name: 'Sarah Williams', regNumber: 'REG004', performance: 'Excellent', average: 90 },
    { id: 5, name: 'David Brown', regNumber: 'REG005', performance: 'Good', average: 78 },
    { id: 6, name: 'Emily Davis', regNumber: 'REG006', performance: 'Average', average: 60 },
    { id: 7, name: 'James Wilson', regNumber: 'REG007', performance: 'Excellent', average: 88 },
    { id: 8, name: 'Lisa Anderson', regNumber: 'REG008', performance: 'Good', average: 72 },
  ]);

  const getPerformanceColor = (performance) => {
    switch (performance) {
      case 'Excellent':
        return 'bg-green-100 text-green-800';
      case 'Good':
        return 'bg-blue-100 text-blue-800';
      case 'Average':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddGrade = (student) => {
    navigate(`/admin/student/${student.id}/add-grade`, { state: { student } });
  };

  const handleEdit = (student) => {
    navigate(`/admin/student/${student.id}/edit`, { state: { student } });
  };

   const handleAddNewStudent = () => {
    navigate('/admin/student/add');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => navigate('/admin/dashboard')}
              className="text-blue-600 hover:text-blue-800 mb-2 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Dashboard
            </button>
            <h1 className="text-4xl font-bold text-gray-800">Form {formId} - Students</h1>
            <p className="text-gray-600 mt-2">Manage student information and grades</p>
          </div>
          <button 
           onClick={handleAddNewStudent}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-colors duration-200">
            + Add New Student
          </button>
        </div>

        {/* Students Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Reg Number
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Performance
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Average
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{student.regNumber}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
                          {student.name.charAt(0)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{student.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getPerformanceColor(student.performance)}`}>
                        {student.performance}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900 font-semibold">{student.average}%</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => handleAddGrade(student)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                          Add Grade
                        </button>
                        <button
                          onClick={() => handleEdit(student)}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                        >
                          Edit
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm">Total Students</p>
            <p className="text-2xl font-bold text-gray-800">{students.length}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm">Excellent</p>
            <p className="text-2xl font-bold text-green-600">
              {students.filter(s => s.performance === 'Excellent').length}
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm">Good</p>
            <p className="text-2xl font-bold text-blue-600">
              {students.filter(s => s.performance === 'Good').length}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg shadow-md">
            <p className="text-gray-600 text-sm">Average</p>
            <p className="text-2xl font-bold text-yellow-600">
              {students.filter(s => s.performance === 'Average').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudentsList;