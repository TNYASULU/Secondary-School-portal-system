import React, { useState, useEffect } from 'react';
import { DollarSign, Download, AlertCircle, CheckCircle, Receipt } from 'lucide-react';
import ParentLayout from '../../components/layout/ParentLayout';
import Card from '../../components/common/TempCard';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/TempButton';
import { mockParentService, mockFeesService } from '../../services/mockData';

export default function Fees() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [feesData, setFeesData] = useState(null);
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
      mockFeesService.getFeeBalance(parseInt(selectedStudent))
        .then(setFeesData)
        .finally(() => setLoading(false));
    }
  }, [selectedStudent]);

  if (initialLoading) {
    return (
      <ParentLayout>
        <Loading message="Loading students..." />
      </ParentLayout>
    );
  }

  const isOverdue = feesData?.currentTerm?.balance > 0 && 
    new Date(feesData.currentTerm.dueDate) < new Date();

  return (
    <ParentLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">School Fees</h2>
          <p className="text-gray-600">View fee balances and payment history</p>
        </div>

        {/* Student Selector */}
        <Card className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Student
          </label>
          <select 
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            className="w-full md:w-1/3 p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          >
            {students.map(s => (
              <option key={s.id} value={s.id}>{s.fullName} - Form {s.formLevel}</option>
            ))}
          </select>
        </Card>

        {loading ? (
          <Loading message="Loading fees information..." />
        ) : feesData ? (
          <>
            {/* Current Balance */}
            <Card className={`mb-6 ${feesData.currentTerm.balance > 0 ? 'border-l-4 border-red-500' : 'border-l-4 border-green-500'}`}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">Current Term Balance</h3>
                  <p className="text-sm text-gray-600">
                    Term {feesData.currentTerm.term}, {feesData.currentTerm.year} • 
                    Due: {new Date(feesData.currentTerm.dueDate).toLocaleDateString()}
                  </p>
                </div>
                {feesData.currentTerm.balance === 0 ? (
                  <CheckCircle className="text-green-500" size={32} />
                ) : (
                  <AlertCircle className={`${isOverdue ? 'text-red-500' : 'text-yellow-500'}`} size={32} />
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Fees</p>
                  <p className="text-2xl font-bold text-gray-900">
                    MWK {feesData.currentTerm.totalFees.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
                  <p className="text-2xl font-bold text-green-600">
                    MWK {feesData.currentTerm.amountPaid.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Balance Due</p>
                  <p className={`text-2xl font-bold ${feesData.currentTerm.balance === 0 ? 'text-green-600' : 'text-red-600'}`}>
                    MWK {feesData.currentTerm.balance.toLocaleString()}
                  </p>
                </div>
              </div>

              {feesData.currentTerm.balance > 0 && (
                <div className={`mt-6 p-4 rounded-lg ${isOverdue ? 'bg-red-50 border border-red-200' : 'bg-yellow-50 border border-yellow-200'}`}>
                  <div className="flex items-start gap-3">
                    <AlertCircle className={`flex-shrink-0 ${isOverdue ? 'text-red-600' : 'text-yellow-600'}`} size={20} />
                    <div>
                      <p className={`font-semibold ${isOverdue ? 'text-red-800' : 'text-yellow-800'}`}>
                        {isOverdue ? 'Payment Overdue' : 'Payment Reminder'}
                      </p>
                      <p className={`text-sm ${isOverdue ? 'text-red-600' : 'text-yellow-600'} mt-1`}>
                        {isOverdue 
                          ? 'Your payment is overdue. Please make arrangements to settle the balance as soon as possible.'
                          : `Payment is due by ${new Date(feesData.currentTerm.dueDate).toLocaleDateString()}. Please ensure timely payment.`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* Payment History */}
            <Card>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-gray-900">Payment History</h3>
                <Button size="sm" variant="outline">
                  <Download size={16} />
                  Download Statement
                </Button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                      <th className="text-right py-3 px-4 font-semibold text-gray-700">Amount</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Method</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Receipt No.</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-700">Recorded By</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feesData.paymentHistory.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4 text-gray-900">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-green-600">
                          MWK {payment.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                            {payment.method}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-gray-600 font-mono text-sm">
                          {payment.receiptNumber}
                        </td>
                        <td className="py-3 px-4 text-gray-600 text-sm">
                          {payment.recordedBy}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {feesData.paymentHistory.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  <Receipt size={48} className="mx-auto mb-4 text-gray-300" />
                  <p>No payment history available</p>
                </div>
              )}
            </Card>
          </>
        ) : (
          <Card className="text-center py-12">
            <DollarSign size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Fee Information</h3>
            <p className="text-gray-600">Fee information is not available at this time.</p>
          </Card>
        )}
      </div>
    </ParentLayout>
  );
}