import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const navigate = useNavigate();

  const forms = [
    { id: 1, name: 'Form 1', students: 45, color: 'bg-blue-500' },
    { id: 2, name: 'Form 2', students: 42, color: 'bg-green-500' },
    { id: 3, name: 'Form 3', students: 38, color: 'bg-purple-500' },
    { id: 4, name: 'Form 4', students: 40, color: 'bg-orange-500' }
  ];

  const handleCardClick = (formId) => {
    navigate(`/admin/form/${formId}/students`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Admin Dashboard</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {forms.map((form) => (
            <div
              key={form.id}
              onClick={() => handleCardClick(form.id)}
              className={`${form.color} rounded-lg shadow-lg p-8 text-white cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
            >
              <div className="flex flex-col items-center justify-center">
                <h2 className="text-3xl font-bold mb-4">{form.name}</h2>
                <div className="text-6xl font-bold mb-2">{form.students}</div>
                <p className="text-lg opacity-90">Students</p>
              </div>
              
              <div className="mt-6 pt-4 border-t border-white border-opacity-30">
                <button className="w-full bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg py-2 px-4 transition-all duration-200">
                  View Students
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Total Students</p>
              <p className="text-3xl font-bold text-blue-600">165</p>
            </div>
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Total Teachers</p>
              <p className="text-3xl font-bold text-green-600">24</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">Total Subjects</p>
              <p className="text-3xl font-bold text-purple-600">12</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;