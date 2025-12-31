// Mock data for frontend-only development

export const mockParentData = {
  id: 1,
  name: "Mr. Joseph Banda",
  email: "joseph.banda@example.com",
  phone: "+265 991 234 567",
  children: [
    {
      id: 1,
      studentNumber: "STD-2023-001",
      firstName: "Chisomo",
      lastName: "Banda",
      fullName: "Chisomo Banda",
      formLevel: 3,
      className: "3A",
      dateOfBirth: "2008-05-15",
      gender: "Female",
      recentGrade: "B+",
      attendance: "95%"
    },
    {
      id: 2,
      studentNumber: "STD-2023-002",
      firstName: "Mphatso",
      lastName: "Banda",
      fullName: "Mphatso Banda",
      formLevel: 1,
      className: "1C",
      dateOfBirth: "2012-09-20",
      gender: "Male",
      recentGrade: "A",
      attendance: "98%"
    }
  ],
  totalBalance: 285000,
  announcements: [
    {
      id: 1,
      title: "Mid-Term Exam Schedule Released",
      message: "Mid-term examinations will begin on January 15th, 2025. Please ensure students are prepared.",
      priority: "high",
      date: "Dec 20, 2024"
    },
    {
      id: 2,
      title: "School Fees Reminder",
      message: "Term 1 fees are due by January 31st. Please make arrangements for payment.",
      priority: "medium",
      date: "Dec 18, 2024"
    },
    {
      id: 3,
      title: "New Sports Program",
      message: "We're excited to announce new after-school sports activities starting next term.",
      priority: "low",
      date: "Dec 15, 2024"
    }
  ],
  upcomingEvents: [
    { id: 1, title: "Term 1 Begins", date: "Jan 8, 2025", type: "event" },
    { id: 2, title: "Mid-Term Exams", date: "Jan 15-19, 2025", type: "exam" },
    { id: 3, title: "Parent-Teacher Meeting", date: "Feb 5, 2025", type: "meeting" },
    { id: 4, title: "Sports Day", date: "Feb 20, 2025", type: "event" }
  ]
};

export const mockResults = {
  1: { // Chisomo's results
    term3_2024: {
      term: 3,
      year: 2024,
      results: [
        { id: 1, subject: "Mathematics", marks: 78, grade: "B+", comment: "Good progress in algebra" },
        { id: 2, subject: "English", marks: 85, grade: "A", comment: "Excellent comprehension skills" },
        { id: 3, subject: "Biology", marks: 72, grade: "B", comment: "Keep improving lab work" },
        { id: 4, subject: "Chemistry", marks: 68, grade: "B-", comment: "Needs more practice in equations" },
        { id: 5, subject: "Physics", marks: 75, grade: "B+", comment: "Good understanding of mechanics" },
        { id: 6, subject: "History", marks: 80, grade: "A-", comment: "Well researched essays" },
        { id: 7, subject: "Geography", marks: 77, grade: "B+", comment: "Good map work" },
        { id: 8, subject: "Chichewa", marks: 82, grade: "A-", comment: "Excellent oral skills" }
      ],
      average: 77.1,
      overallGrade: "B+"
    }
  },
  2: { // Mphatso's results
    term3_2024: {
      term: 3,
      year: 2024,
      results: [
        { id: 1, subject: "Mathematics", marks: 88, grade: "A", comment: "Exceptional problem solving" },
        { id: 2, subject: "English", marks: 90, grade: "A*", comment: "Outstanding writing skills" },
        { id: 3, subject: "Biology", marks: 85, grade: "A", comment: "Excellent lab reports" },
        { id: 4, subject: "General Science", marks: 82, grade: "A-", comment: "Very good understanding" },
        { id: 5, subject: "History", marks: 78, grade: "B+", comment: "Good historical analysis" },
        { id: 6, subject: "Geography", marks: 84, grade: "A", comment: "Excellent map interpretation" },
        { id: 7, subject: "Chichewa", marks: 86, grade: "A", comment: "Very good language skills" }
      ],
      average: 84.7,
      overallGrade: "A"
    }
  }
};

export const mockFees = {
  1: { // Chisomo's fees
    studentId: 1,
    studentName: "Chisomo Banda",
    currentTerm: {
      term: 1,
      year: 2025,
      totalFees: 150000,
      amountPaid: 50000,
      balance: 100000,
      dueDate: "2025-01-31"
    },
    paymentHistory: [
      {
        id: 1,
        date: "2024-12-15",
        amount: 50000,
        method: "Mobile Money",
        receiptNumber: "RCP-2024-001",
        recordedBy: "School Admin"
      },
      {
        id: 2,
        date: "2024-09-10",
        amount: 150000,
        method: "Bank Transfer",
        receiptNumber: "RCP-2024-002",
        recordedBy: "School Admin"
      },
      {
        id: 3,
        date: "2024-05-20",
        amount: 150000,
        method: "Cash",
        receiptNumber: "RCP-2024-003",
        recordedBy: "School Admin"
      }
    ]
  },
  2: { // Mphatso's fees
    studentId: 2,
    studentName: "Mphatso Banda",
    currentTerm: {
      term: 1,
      year: 2025,
      totalFees: 150000,
      amountPaid: 150000,
      balance: 0,
      dueDate: "2025-01-31"
    },
    paymentHistory: [
      {
        id: 1,
        date: "2024-12-10",
        amount: 150000,
        method: "Mobile Money",
        receiptNumber: "RCP-2024-004",
        recordedBy: "School Admin"
      },
      {
        id: 2,
        date: "2024-09-05",
        amount: 150000,
        method: "Cash",
        receiptNumber: "RCP-2024-005",
        recordedBy: "School Admin"
      }
    ]
  }
};

export const mockCalendarEvents = [
  {
    id: 1,
    title: "Term 1 Begins",
    description: "First day of Term 1, 2025",
    startDate: "2025-01-08",
    endDate: "2025-01-08",
    type: "event"
  },
  {
    id: 2,
    title: "Mid-Term Examinations",
    description: "Mid-term exams for all forms",
    startDate: "2025-01-15",
    endDate: "2025-01-19",
    type: "exam"
  },
  {
    id: 3,
    title: "Parent-Teacher Meeting",
    description: "Quarterly parent-teacher conference",
    startDate: "2025-02-05",
    endDate: "2025-02-05",
    type: "meeting"
  },
  {
    id: 4,
    title: "Sports Day",
    description: "Annual inter-house sports competition",
    startDate: "2025-02-20",
    endDate: "2025-02-20",
    type: "event"
  },
  {
    id: 5,
    title: "Science Fair",
    description: "Student science project presentations",
    startDate: "2025-03-10",
    endDate: "2025-03-10",
    type: "event"
  },
  {
    id: 6,
    title: "End of Term 1",
    description: "Last day of Term 1",
    startDate: "2025-03-28",
    endDate: "2025-03-28",
    type: "event"
  }
];

export const mockSchoolRules = [
  {
    id: 1,
    category: "Uniform Policy",
    rules: [
      {
        id: 1,
        title: "School Uniform Requirements",
        content: "All students must wear the official school uniform at all times during school hours. Boys: white shirt, grey trousers, black shoes. Girls: white blouse, grey skirt, black shoes. The school tie must be worn properly at all times."
      },
      {
        id: 2,
        title: "Uniform Maintenance",
        content: "Uniforms must be clean, pressed, and in good condition. Torn or damaged uniforms must be repaired or replaced immediately. Students with improper uniform will not be allowed to attend classes."
      },
      {
        id: 3,
        title: "Hair and Grooming",
        content: "Boys must maintain short, neat haircuts. Girls' hair must be neatly tied back. Excessive jewelry, makeup, or nail polish is not permitted."
      }
    ]
  },
  {
    id: 2,
    category: "Attendance Policy",
    rules: [
      {
        id: 4,
        title: "Daily Attendance",
        content: "Students must arrive at school by 7:30 AM. Classes begin promptly at 7:45 AM. Late arrivals must report to the office for a late pass before proceeding to class."
      },
      {
        id: 5,
        title: "Absence Notification",
        content: "Parents must notify the school of student absences by 8:00 AM on the day of absence. A medical certificate is required for absences exceeding 3 consecutive days."
      },
      {
        id: 6,
        title: "Attendance Requirements",
        content: "Students must maintain at least 90% attendance to be eligible for end-of-term examinations. Excessive absences may result in repeating the year."
      }
    ]
  },
  {
    id: 3,
    category: "Discipline Code",
    rules: [
      {
        id: 7,
        title: "Code of Conduct",
        content: "Students must show respect to teachers, staff, and fellow students at all times. Bullying, fighting, or disruptive behavior will not be tolerated and may result in suspension or expulsion."
      },
      {
        id: 8,
        title: "Mobile Phone Policy",
        content: "Mobile phones are not allowed during class hours. Phones must be switched off and kept in bags. Confiscated phones will only be returned to parents."
      },
      {
        id: 9,
        title: "Academic Integrity",
        content: "Cheating, plagiarism, or any form of academic dishonesty is strictly prohibited. Violations will result in zero marks for the assignment and disciplinary action."
      }
    ]
  },
  {
    id: 4,
    category: "Examination Rules",
    rules: [
      {
        id: 10,
        title: "Examination Conduct",
        content: "Students must arrive 15 minutes before examination time. No talking or cheating is permitted during exams. Any form of malpractice will result in immediate disqualification."
      },
      {
        id: 11,
        title: "Required Materials",
        content: "Students must bring their own pens, pencils, rulers, and calculators (where permitted). Sharing of materials during exams is not allowed."
      }
    ]
  }
];

// Mock authentication users
export const mockUsers = [
  {
    email: "parent@example.com",
    password: "password123",
    userType: "parent",
    data: mockParentData
  },
  {
    email: "admin@example.com",
    password: "admin123",
    userType: "admin"
  }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock API services
export const mockAuthService = {
  login: async (email, password) => {
    await delay(800);
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password');
    }
    
    const token = 'mock-jwt-token-' + Date.now();
    
    localStorage.setItem('token', token);
    localStorage.setItem('userType', user.userType);
    localStorage.setItem('userData', JSON.stringify(user.data || {}));
    
    return {
      token,
      user: {
        email: user.email,
        userType: user.userType,
        name: user.data?.name || 'User'
      }
    };
  },
  
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('userData');
  },
  
  getCurrentUser: () => {
    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    
    if (!token) return null;
    
    return {
      token,
      userType,
      name: userData.name || 'User',
      email: userData.email
    };
  }
};

export const mockParentService = {
  getDashboard: async () => {
    await delay(500);
    return mockParentData;
  },
  
  getChildren: async () => {
    await delay(300);
    return mockParentData.children;
  }
};

export const mockResultsService = {
  getResults: async (studentId, term, year) => {
    await delay(600);
    const key = `term${term}_${year}`;
    return mockResults[studentId]?.[key] || { results: [], average: 0, overallGrade: 'N/A' };
  }
};

export const mockFeesService = {
  getFeeBalance: async (studentId) => {
    await delay(400);
    return mockFees[studentId] || null;
  }
};

export const mockCalendarService = {
  getEvents: async () => {
    await delay(300);
    return mockCalendarEvents;
  }
};

export const mockRulesService = {
  getRules: async () => {
    await delay(400);
    return mockSchoolRules;
  }
};