import React, { useState, useEffect } from 'react';
import { Download, TrendingUp, Award } from 'lucide-react';
import ParentLayout from '../../components/layout/ParentLayout';
import Card from '../../components/common/TempCard';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/TempButton';
import { mockParentService, mockResultsService } from '../../services/mockData';

export default function Results() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [term, setTerm] = useState(3);
  const [year, setYear] = useState(2024);
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    mockParentService.getChildren()
      .then(data => {
        setStudents(data);
        if (data.length > 0) {
          setSelectedStudent(data[0].id.toString());
        }
      })
      .finally(() => setInitialLoading(false));
  }, []);

  useEffect(() => {
    if (selectedStudent) {
      setLoading(true);
      mockResultsService.getResults(parseInt(selectedStudent), term, year)
        .then(setResults)
        .finally(() => setLoading(false));
    }
  }, [selectedStudent, term, year]);

  if (initialLoading) {
    return (
      <ParentLayout>
        <Loading message="Loading students..." />
      </ParentLayout>
    );
  }

  const getGradeColor = (marks) => {
    if (marks >= 80) return 'text-green-600 bg-green-50';
    if (marks >= 70) return 'text-blue-600 bg-blue-50';
    if (marks >= 60) return 'text-yellow-600 bg-yellow-50';
    if (marks >= 50) return 'text-orange-600 bg-orange-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <ParentLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Exam Results</h2>
          <p className="text-gray-600">View and download your child's academic performance</p>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Student
              </label>
              <select 
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                {students.map(s => (
                  <option key={s.id} value={s.id}>{s.fullName} - Form {s.formLevel}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Term
              </label>
              <select 
                value={term}
                onChange={(e) => setTerm(Number(e.target.value))}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value={1}>Term 1</option>
                <option value={2}>Term 2</option>
                <option value={3}>Term 3</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Year
              </label>
              <select 
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
              </select>
            </div>
          </div>
        </Card>

        {loading ? (
          <Loading message="Loading results..." />
        ) : results && results.results.length > 0 ? (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Average Marks</p>
                    <p className="text-2xl font-bold text-gray-900">{results.average.toFixed(1)}%</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Award className="text-green-600" size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Overall Grade</p>
                    <p className="text-2xl font-bold text-gray-900">{results.overallGrade}</p>
                  </div>
                </div>
              </Card>

              <Card>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Download className="text-purple-600" size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">Report Card</p>
                    <Button size="sm" fullWidth>
                      <Download size={16} />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Results Table */}
            <Card>
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Subject Performance - Term {term}, {year}
              </h3>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Subject</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Marks</th>
                      <th className="text-center py-3 px-4 font-semibold text-gray-700">Grade</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Teacher's Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.results.map((result) => (
                      <tr key={result.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 font-medium text-gray-900">{result.subject}</td>
                        <td className="py-3 px-4 text-center">
                          <span className={`inline-block px-3 py-1 rounded-full font-semibold ${getGradeColor(result.marks)}`}>
                            {result.marks}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="inline-block px-3 py-1 rounded-full font-semibold bg-blue-50 text-blue-700">
                            {result.grade}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">{result.comment}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-gray-50 font-semibold">
                      <td className="py-3 px-4 text-gray-900">Average</td>
                      <td className="py-3 px-4 text-center text-blue-600">{results.average.toFixed(1)}%</td>
                      <td className="py-3 px-4 text-center text-blue-600">{results.overallGrade}</td>
                      <td className="py-3 px-4"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Card>
          </>
        ) : (
          <Card className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Award size={64} className="mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Results Available</h3>
            <p className="text-gray-600">Results for the selected term have not been published yet.</p>
          </Card>
        )}
      </div>
    </ParentLayout>
  );
}