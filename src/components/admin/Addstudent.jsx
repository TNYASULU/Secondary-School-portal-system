import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AddStudent() {
  const navigate = useNavigate();
  const { formId } = useParams();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    regNumber: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    guardianRelation: '',
    bloodGroup: '',
    allergies: '',
    medicalConditions: '',
    enrollmentDate: new Date().toISOString().split('T')[0],
    formClass: formId || '1'
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

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.regNumber.trim()) {
      newErrors.regNumber = 'Registration number is required';
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address';
    }
    if (!formData.guardianName.trim()) {
      newErrors.guardianName = 'Guardian name is required';
    }
    if (!formData.guardianPhone.trim()) {
      newErrors.guardianPhone = 'Guardian phone is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Here you would make an API call to create the student
      console.log('New Student Data:', formData);

      // Show success message and navigate back
      alert('Student added successfully!');
      navigate(-1);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
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
          <h1 className="text-4xl font-bold text-gray-800">Add New Student</h1>
          <p className="text-gray-600 mt-2">Enter student information to register them in the system</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Personal Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registration Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="regNumber"
                  value={formData.regNumber}
                  onChange={handleChange}
                  placeholder="e.g., REG001"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.regNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.regNumber && (
                  <p className="mt-1 text-sm text-red-500">{errors.regNumber}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.dateOfBirth && (
                  <p className="mt-1 text-sm text-red-500">{errors.dateOfBirth}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-500">{errors.gender}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Form/Class <span className="text-red-500">*</span>
                </label>
                <select
                  name="formClass"
                  value={formData.formClass}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="1">Form 1</option>
                  <option value="2">Form 2</option>
                  <option value="3">Form 3</option>
                  <option value="4">Form 4</option>
                </select>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="student@example.com"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+265 123 456 789"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State/Region
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State or Region"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Guardian Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Guardian Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guardian Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="guardianName"
                  value={formData.guardianName}
                  onChange={handleChange}
                  placeholder="Full name of guardian"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.guardianName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.guardianName && (
                  <p className="mt-1 text-sm text-red-500">{errors.guardianName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guardian Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="guardianPhone"
                  value={formData.guardianPhone}
                  onChange={handleChange}
                  placeholder="+265 123 456 789"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.guardianPhone ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.guardianPhone && (
                  <p className="mt-1 text-sm text-red-500">{errors.guardianPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Guardian Email
                </label>
                <input
                  type="email"
                  name="guardianEmail"
                  value={formData.guardianEmail}
                  onChange={handleChange}
                  placeholder="guardian@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relationship
                </label>
                <select
                  name="guardianRelation"
                  value={formData.guardianRelation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Relationship</option>
                  <option value="father">Father</option>
                  <option value="mother">Mother</option>
                  <option value="guardian">Legal Guardian</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Medical Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Group
                </label>
                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enrollment Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="enrollmentDate"
                  value={formData.enrollmentDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Allergies
                </label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  rows="3"
                  placeholder="List any known allergies (e.g., peanuts, penicillin, etc.)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical Conditions
                </label>
                <textarea
                  name="medicalConditions"
                  value={formData.medicalConditions}
                  onChange={handleChange}
                  rows="3"
                  placeholder="List any medical conditions (e.g., asthma, diabetes, etc.)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md"
            >
              Add Student
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors duration-200 shadow-md"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddStudent;