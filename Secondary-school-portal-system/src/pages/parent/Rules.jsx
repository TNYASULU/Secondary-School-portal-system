import React, { useState, useEffect } from 'react';
import { Book, Download, Search, ChevronDown, ChevronUp } from 'lucide-react';
import ParentLayout from '../../components/layout/ParentLayout';
import Card from '../../components/common/TempCard';
import Loading from '../../components/common/Loading';
import Button from '../../components/common/TempButton';
import { mockRulesService } from '../../services/mockData';

export default function Rules() {
  const [rules, setRules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCategories, setExpandedCategories] = useState([]);

  useEffect(() => {
    mockRulesService.getRules()
      .then(data => {
        setRules(data);
        // Expand first category by default
        if (data.length > 0) {
          setExpandedCategories([data[0].id]);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const toggleCategory = (categoryId) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const filteredRules = rules.map(category => ({
    ...category,
    rules: category.rules.filter(rule =>
      rule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rule.content.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.rules.length > 0);

  if (loading) {
    return (
      <ParentLayout>
        <Loading message="Loading school rules..." />
      </ParentLayout>
    );
  }

  return (
    <ParentLayout>
      <div className="animate-fade-in">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">School Rules & Regulations</h2>
          <p className="text-gray-600">Important policies and guidelines for students</p>
        </div>

        {/* Search and Download */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <Search size={20} />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search rules..."
              className="w-full pl-11 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          <Button variant="outline">
            <Download size={20} />
            Download Handbook
          </Button>
        </div>

        {/* Rules by Category */}
        <div className="space-y-4">
          {filteredRules.map((category) => (
            <Card key={category.id} padding="p-0">
              <button
                onClick={() => toggleCategory(category.id)}
                className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Book className="text-blue-600" size={24} />
                  </div>
                  <div className="text-left">
                    <h3 className="text-lg font-bold text-gray-900">{category.category}</h3>
                    <p className="text-sm text-gray-600">{category.rules.length} rules</p>
                  </div>
                </div>
                {expandedCategories.includes(category.id) ? (
                  <ChevronUp className="text-gray-400" size={24} />
                ) : (
                  <ChevronDown className="text-gray-400" size={24} />
                )}
              </button>

              {expandedCategories.includes(category.id) && (
                <div className="border-t border-gray-200">
                  {category.rules.map((rule, index) => (
                    <div
                      key={rule.id}
                      className={`p-6 ${index !== category.rules.length - 1 ? 'border-b border-gray-100' : ''}`}
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">{rule.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{rule.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          ))}
        </div>

        {filteredRules.length === 0 && (
          <Card className="text-center py-12">
            <Book size={64} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Rules Found</h3>
            <p className="text-gray-600">
              {searchTerm
                ? `No rules match your search "${searchTerm}"`
                : 'No school rules are available at this time.'
              }
            </p>
          </Card>
        )}

        {/* Important Notice */}
        <Card className="mt-8 bg-blue-50 border border-blue-200">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Book className="text-white" size={20} />
            </div>
            <div>
              <h4 className="font-semibold text-blue-900 mb-2">Important Notice</h4>
              <p className="text-blue-700 text-sm leading-relaxed">
                All students and parents are expected to read and understand these rules and regulations. 
                Violation of school rules may result in disciplinary action. For clarification on any rule, 
                please contact the school administration.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </ParentLayout>
  );
}