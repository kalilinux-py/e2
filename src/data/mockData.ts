import { User, TestMeta, TestAttempt, Question } from '../types';

export const currentUser: User = {
  id: 'usr_evalo_001',
  name: 'Aditya Vardhan',
  email: 'aditya.nielit@evalo.edu',
  rollNo: 'DL2606004928',
  enrolledCourses: ['CCC'],
  joinedDate: '2026-03-15',
  activeStreak: 12,
  stats: {
    totalTests: 18,
    avgAccuracy: 74.5,
    practiceHours: 32.5,
    readinessGrade: 'B+'
  }
};

export const mockTests: TestMeta[] = [
  {
    id: 'test_ccc_01',
    title: 'CCC Practice Test 1: Core Fundamentals',
    course: 'CCC',
    subject: 'Computer Fundamentals & OS',
    durationMinutes: 10,
    totalQuestions: 10,
    passingAccuracy: 50,
    difficulty: 'Easy',
    description: 'Covers introductory concepts of OS, hardware basics, GUI systems, and common file structures.'
  },
  {
    id: 'test_ccc_02',
    title: 'CCC Practice Test 2: LibreOffice Suite',
    course: 'CCC',
    subject: 'LibreOffice Writer, Calc & Impress',
    durationMinutes: 12,
    totalQuestions: 10,
    passingAccuracy: 50,
    difficulty: 'Medium',
    description: 'Tests proficiency in LibreOffice commands, formulas, formatting tools, and presentation slides matching NIELIT pattern.'
  },
  {
    id: 'test_ccc_03',
    title: 'CCC Practice Test 3: Digital Financial Services',
    course: 'CCC',
    subject: 'Cyber Security & Digital Finance',
    durationMinutes: 10,
    totalQuestions: 10,
    passingAccuracy: 50,
    difficulty: 'Medium',
    description: 'Covers PMJDY, UPI, AEPS, digital wallets, secure browsing practices, and basic cryptography.'
  },
  {
    id: 'test_olevel_m1',
    title: 'O Level M1-R5: IT Tools & Network Basics',
    course: 'O Level',
    subject: 'IT Tools & Network Systems',
    durationMinutes: 15,
    totalQuestions: 10,
    passingAccuracy: 50,
    difficulty: 'Medium',
    description: 'Fundamental course module covering hardware devices, system configuration, and IP addressing protocols.'
  },
  {
    id: 'test_olevel_m2',
    title: 'O Level M2-R5: Web Designing & Publishing',
    course: 'O Level',
    subject: 'HTML5, CSS3, JavaScript & Publishing',
    durationMinutes: 15,
    totalQuestions: 10,
    passingAccuracy: 50,
    difficulty: 'Hard',
    description: 'In-depth assessment of markup elements, layout styling, CSS selectors, Javascript structures, and FTP deployments.'
  },
  {
    id: 'test_olevel_m3',
    title: 'O Level M3-R5: Programming through Python',
    course: 'O Level',
    subject: 'Python Basics, Lists, & Control Flows',
    durationMinutes: 15,
    totalQuestions: 10,
    passingAccuracy: 50,
    difficulty: 'Hard',
    description: 'Comprehensive mock test on loops, lists, dictionaries, built-in functions, and file I/O operations.'
  }
];

export const mockQuestions: Record<string, Question[]> = {
  test_ccc_01: [
    {
      id: 'q_ccc_01_1',
      text: 'Which function key is used to refresh the active desktop screen, or help page in Windows operating system?',
      options: ['F2', 'F3', 'F5', 'F11'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_01_2',
      text: 'What type of software is Linux?',
      options: ['Proprietary System Engine', 'Open Source Operating System', 'Shareware Utility Compiler', 'Closed Application Shell'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_01_3',
      text: 'Which directory structure in Unix/Linux stores system administrative commands and binaries?',
      options: ['/root', '/dev', '/sbin', '/etc'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_01_4',
      text: 'What is the full form of GUI in modern computing systems?',
      options: ['General User Interface', 'Graphical User Interface', 'Global Utility Index', 'Graphic Unified Instrument'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_01_5',
      text: 'Which computer memory type acts as a temporary high-speed holding zone between CPU registers and primary system RAM?',
      options: ['Cache Memory', 'Virtual Memory Buffer', 'Read-Only Core', 'Secondary Flash Storage'],
      correctAnswerIndex: 0,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_01_6',
      text: 'Normally, which mouse button is clicked twice to launch a shortcut or application on the desktop?',
      options: ['Right button', 'Left button', 'Middle wheel', 'Thumb triggers'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_01_7',
      text: 'Which of the following is considered an output hardware peripheral?',
      options: ['Optical Scanner', 'Magnetic Reader', 'Laser Printer', 'Analog Joystick'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_01_8',
      text: 'The core control environment inside an operating system that maintains security, handles resource allocations, and structures process interrupts is:',
      options: ['The Shell', 'The System Registry', 'The Kernel', 'The Scheduler Command'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_01_9',
      text: 'What is the standard temporary virtual extension of primary RAM stored on a hard disk called?',
      options: ['Virtual Memory', 'Dynamic registers', 'Buffer sector', 'Extended stack'],
      correctAnswerIndex: 0,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_01_10',
      text: 'Which computing generation was the first to adopt Microprocessors (such as Intel 4004)?',
      options: ['Second Generation', 'Third Generation', 'Fourth Generation', 'Fifth Generation'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    }
  ],
  test_ccc_02: [
    {
      id: 'q_ccc_02_1',
      text: 'In LibreOffice Writer, which default keyboard shortcut is applied to center-align the cursor text paragraph?',
      options: ['Ctrl + C', 'Ctrl + E', 'Ctrl + J', 'Ctrl + L'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_02_2',
      text: 'How many maximum rows are supported in a single standard LibreOffice Calc spreadsheet?',
      options: ['65,536 Rows', '1,048,576 Rows', '16,384 Rows', '500,000 Rows'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_02_3',
      text: 'What is the default extension of LibreOffice Impress slide presentation files?',
      options: ['.odt', '.ods', '.odp', '.odg'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_02_4',
      text: 'In LibreOffice Calc, what character is mandatory at the beginning of any mathematical formula or function evaluation?',
      options: ['#', '$', '=', '@'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_02_5',
      text: 'What is the maximum zoom percentage limit physically available in LibreOffice Impress presentation tool?',
      options: ['100%', '400%', '600%', '3000%'],
      correctAnswerIndex: 3,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_02_6',
      text: 'In LibreOffice Writer, which key combination is used to perform a page break operation?',
      options: ['Ctrl + Enter', 'Alt + Enter', 'Shift + Enter', 'Ctrl + Shift + Enter'],
      correctAnswerIndex: 0,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_02_7',
      text: 'Which function is used in LibreOffice Calc to calculate the largest value within a given selection?',
      options: ['=LARGE()', '=MAXIMUM()', '=MAX()', '=HIGH()'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_02_8',
      text: 'In LibreOffice Calc, the formula =COUNT(A1:A5) evaluated over cells consisting of value [1, "Text", 3, "", 5] outputs:',
      options: ['5', '3', '2', '4'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_02_9',
      text: "Which of the following describes LibreOffice Writer's default page orientation format?",
      options: ['Landscape', 'Portrait', 'Square Layout', 'Envelope Grid'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_02_10',
      text: 'What is the keyboard shortcut to immediately open developer Macro management commands inside LibreOffice Writer?',
      options: ['Alt + F11', 'Alt + F8', 'Ctrl + F8', 'Shift + F5'],
      correctAnswerIndex: 0,
      state: 'unvisited'
    }
  ],
  test_ccc_03: [
    {
      id: 'q_ccc_03_1',
      text: 'Which financial inclusion program in India offers accidental insurance coverage and life cover with zero balance account facility?',
      options: ['Pradhan Mantri Jan Dhan Yojana (PMJDY)', 'Pradhan Mantri Suraksha Bima Yojana', 'Atal Pension Yojana', 'Sukanya Samriddhi Account'],
      correctAnswerIndex: 0,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_03_2',
      text: 'What does the acronym UPI denote in digital banking framework?',
      options: ['Uni-Purpose Interface', 'Unified Payments Interface', 'Universal Payment Instrument', 'Unified Protocol Integration'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_03_3',
      text: 'Which banking system allows automated fingerprint-based cash withdrawal and deposit services using Aadhaar numbers?',
      options: ['AEPS (Aadhaar Enabled Payment System)', 'IMPS core routing', 'USSD quick-dial', 'RTGS system'],
      correctAnswerIndex: 0,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_03_4',
      text: 'To securely access digital mobile services without internet connectivity, what USSD short-code is dialed?',
      options: ['*121#', '*99#', '*100#', '*999#'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_03_5',
      text: 'Which key safety feature is mandatory to protect internet banking portals from automated credential-stuffing cyber attacks?',
      options: ['CAPTCHA validation', 'Active cookies', 'Session status trackers', 'Custom background overlays'],
      correctAnswerIndex: 0,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_03_6',
      text: 'What character string precedes a fully encrypted secure webpage URL instead of "http://"?',
      options: ['https://', 'http-secure://', 'shttp://', 'http-safe://'],
      correctAnswerIndex: 0,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_03_7',
      text: 'An unsolicited, bulk e-mail message sent to several recipients simultaneously is classified as:',
      options: ['Spam', 'Malware delivery', 'Spoof feed', 'Phishing banner'],
      correctAnswerIndex: 0,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_03_8',
      text: 'Which malicious code can replicate itself dynamically and spread across multiple system directories without user execution?',
      options: ['Trojan Horse', 'Spyware Tracker', 'Worm', 'Keylogger'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_03_9',
      text: 'The absolute maximum transaction amount allowed for standard IMPS transfers per day is typically capped at:',
      options: ['Rs 50,000', 'Rs 1 Lakh', 'Rs 5 Lakhs', 'Rs 10 Lakhs'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ccc_03_10',
      text: 'What type of digital card has structural micro-processing chips embedded on it for dynamic PIN authentication?',
      options: ['Smart Card', 'Magnetic Stripe Card', 'NFC Tag Card', 'Optical Reader Badge'],
      correctAnswerIndex: 0,
      state: 'unvisited'
    }
  ],
  test_olevel_m1: [
    {
      id: 'q_ol1_1',
      text: 'What is the full form of SSID in terms of computer networks and Wi-Fi configurations?',
      options: ['System Service Identifier', 'Service Set Identifier', 'Secure Software Identity', 'Shared Signal Internal Index'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ol1_2',
      text: 'Which networking layer in the standard OSI Reference Model handles frame routing, logical addressing, and path determination?',
      options: ['Data Link Layer', 'Network Layer', 'Transport Layer', 'Physical Layer'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ol1_3',
      text: 'What is the total bit length of an IPv6 (Internet Protocol Version 6) computer address?',
      options: ['32 bits', '64 bits', '128 bits', '256 bits'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol1_4',
      text: 'Which command line utility tool is used to test system-to-system packet latency and fundamental network routing connectivity?',
      options: ['tracert', 'nslookup', 'ping', 'ipconfig'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol1_5',
      text: 'What network device operates at the Physical layer (Layer 1) to replicate signals without interpreting address routing?',
      options: ['Router', 'Hub', 'Bridge', 'Gateway'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ol1_6',
      text: 'Which server environment dynamically leases IP addresses, lease times, subnet masks, and system gateway parameters to clients?',
      options: ['DNS Server', 'DHCP Server', 'FTP Server', 'NAT Gateway'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ol1_7',
      text: 'Which protocol utilizes TCP port 22 by default to support secure shell command actions and file distributions?',
      options: ['TELNET', 'FTP', 'SSH', 'SMTP'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol1_8',
      text: 'What is the maximum physical bandwidth supported under Cat5e ethernet cabling standards?',
      options: ['10 Mbps', '100 Mbps', '1000 Mbps (1 Gbps)', '10 Gbps'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol1_9',
      text: 'What type of network topography requires each individual node to connect to a centralized central switch or core hub?',
      options: ['Ring Topology', 'Bus Topology', 'Star Topology', 'Mesh Topology'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol1_10',
      text: 'Which transmission mode allows signals to flow in both directions, but only in one single direction at any active instant?',
      options: ['Simplex', 'Half Duplex', 'Full Duplex', 'Bi-plex'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    }
  ],
  test_olevel_m2: [
    {
      id: 'q_ol2_1',
      text: 'Which CSS selector possesses the absolute highest structural specificity ranking?',
      options: ['Element Type Selector', 'Class Selector', 'ID Selector', 'Universal Selector'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol2_2',
      text: 'What HTML5 semantic tags should wrap core web page navigational menus?',
      options: ['<navigation>', '<navbar>', '<nav>', '<links>'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol2_3',
      text: 'Inside responsive CSS Grid flexbox models, which property dictates whether elements wrapping triggers across multi-line breaks?',
      options: ['flex-wrap', 'flex-direction', 'flex-flow', 'justify-content'],
      correctAnswerIndex: 0,
      state: 'unvisited'
    },
    {
      id: 'q_ol2_4',
      text: 'Which Javascript console function compiles the absolute primitive type of an active evaluated data object?',
      options: ['instanceof()', 'typeOf()', 'typeof', 'object.type()'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol2_5',
      text: 'Which value specifies relative font sizing scaling calculated against the font size of the root html element?',
      options: ['em', 'rem', 'px', 'vh'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ol2_6',
      text: 'What tag is used in HTML5 to render vector graphics directly onto web interfaces through programming scripts?',
      options: ['<svg>', '<canvas>', '<graphics>', '<draw>'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ol2_7',
      text: 'Which method adds a new terminal element to the absolute end boundary of a JavaScript array?',
      options: ['array.push()', 'array.pop()', 'array.shift()', 'array.unshift()'],
      correctAnswerIndex: 0,
      state: 'unvisited'
    },
    {
      id: 'q_ol2_8',
      text: 'Who acts as the principal consortium organizing definitions for modern HTML, CSS, and general web rendering compliance?',
      options: ['Mozilla Developer Network', 'Google Chromium Team', 'World Wide Web Consortium (W3C)', 'Vercel Assembly'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol2_9',
      text: 'Which HTML attribute specifies an alternate text display when image loaded paths fail to compile?',
      options: ['title', 'alt', 'caption', 'desc'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ol2_10',
      text: "Which CSS property is applied to hide an element layout while preserving its structural space in document streams?",
      options: ['display: none', 'visibility: hidden', 'opacity: 0', 'overflow: hidden'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    }
  ],
  test_olevel_m3: [
    {
      id: 'q_ol3_1',
      text: 'In Python, what is the output of the logical expression: 3 * 1 ** 3 ?',
      options: ['27', '9', '3', '1'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol3_2',
      text: 'Which Python function converts a raw JSON string or structured user input text into native integer numerical structures?',
      options: ['to_int()', 'integer()', 'int()', 'cast_int()'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol3_3',
      text: 'What data structure in Python is declared using curly brackets, comprising unique keys paired to associated records?',
      options: ['List []', 'Tuple ()', 'Dictionary {}', 'Set {} with index'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol3_4',
      text: 'Which method append records safely to dynamic python dynamic structures?',
      options: ['list.insert()', 'list.add()', 'list.append()', 'list.push()'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol3_5',
      text: 'What are the default return types of any standard input() statement in Python versions exceeding 3.x?',
      options: ['Integer', 'Boolean', 'String', 'Object Dynamic'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol3_6',
      text: 'In Python, if my_list = [10, 20, 30], what will my_list[-1] return?',
      options: ['10', '20', '30', 'IndexError'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol3_7',
      text: "Which keyword is used to handle generic exceptions in Python try blocks?",
      options: ['catch', 'except', 'error', 'rescue'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    },
    {
      id: 'q_ol3_8',
      text: 'Which Python package exposes comprehensive numerical analysis, matrix capabilities, and vectorized arrays?',
      options: ['Tensorflow', 'Pandas', 'NumPy', 'SciPy'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol3_9',
      text: 'How can you open a text file "data.txt" for writing text in append block modes?',
      options: ['open("data.txt", "w")', 'open("data.txt", "r+")', 'open("data.txt", "a")', 'open("data.txt", "x")'],
      correctAnswerIndex: 2,
      state: 'unvisited'
    },
    {
      id: 'q_ol3_10',
      text: 'The statement in Python: print("Evalo"[-3:]) outputs:',
      options: ['va', 'alo', 'val', 'Evalo'],
      correctAnswerIndex: 1,
      state: 'unvisited'
    }
  ]
};

export const mockAttempts: TestAttempt[] = [
  {
    id: 'att_001',
    testId: 'test_ccc_01',
    testTitle: 'CCC Practice Test 1: Core Fundamentals',
    course: 'CCC',
    date: '2026-06-18T14:24:00Z',
    score: 8,
    totalQuestions: 10,
    percentage: 80,
    passed: true,
    durationSecondsUsed: 360,
    questionSnapshots: [
      { ...mockQuestions.test_ccc_01[0], selectedAnswerIndex: 2, state: 'answered' }, // Correct (F5)
      { ...mockQuestions.test_ccc_01[1], selectedAnswerIndex: 1, state: 'answered' }, // Correct (Open Source)
      { ...mockQuestions.test_ccc_01[2], selectedAnswerIndex: 3, state: 'answered' }, // Incorrect (Selected /etc, correct is /sbin)
      { ...mockQuestions.test_ccc_01[3], selectedAnswerIndex: 1, state: 'answered' }, // Correct (Graphical UI)
      { ...mockQuestions.test_ccc_01[4], selectedAnswerIndex: 0, state: 'answered' }, // Correct (Cache)
      { ...mockQuestions.test_ccc_01[5], selectedAnswerIndex: 1, state: 'answered' }, // Correct (Left button)
      { ...mockQuestions.test_ccc_01[6], selectedAnswerIndex: 2, state: 'answered' }, // Correct (Laser Printer)
      { ...mockQuestions.test_ccc_01[7], selectedAnswerIndex: 1, state: 'answered' }, // Incorrect (Selected System Registry, correct is Kernel)
      { ...mockQuestions.test_ccc_01[8], selectedAnswerIndex: 0, state: 'answered' }, // Correct (Virtual Memory)
      { ...mockQuestions.test_ccc_01[9], selectedAnswerIndex: 2, state: 'answered' }, // Correct (Fourth Generation)
    ]
  },
  {
    id: 'att_002',
    testId: 'test_ccc_02',
    testTitle: 'CCC Practice Test 2: LibreOffice Suite',
    course: 'CCC',
    date: '2026-06-12T10:15:00Z',
    score: 6,
    totalQuestions: 10,
    percentage: 60,
    passed: true,
    durationSecondsUsed: 480,
    questionSnapshots: [] // Detail omitted for simplicity, but fields structured
  },
  {
    id: 'att_003',
    testId: 'test_olevel_m3',
    testTitle: 'O Level M3-R5: Programming through Python',
    course: 'O Level',
    date: '2026-06-05T16:45:00Z',
    score: 4,
    totalQuestions: 10,
    percentage: 40,
    passed: false,
    durationSecondsUsed: 620,
    questionSnapshots: [] // Detail omitted for simplicity
  }
];

export const topicBreakdowns: { name: string; course: string; progress: number; totalQuestions: number }[] = [
  { name: 'Computer Fundamentals', course: 'CCC', progress: 85, totalQuestions: 40 },
  { name: 'Operating Systems (Linux)', course: 'CCC', progress: 70, totalQuestions: 30 },
  { name: 'LibreOffice Suite Applications', course: 'CCC', progress: 62, totalQuestions: 50 },
  { name: 'Digital Services & Finance security', course: 'CCC', progress: 90, totalQuestions: 25 },
  { name: 'IT Tools & Network foundations', course: 'O Level', progress: 75, totalQuestions: 60 },
  { name: 'Web Designing markup & layout', course: 'O Level', progress: 58, totalQuestions: 45 },
  { name: 'Python Control flow & structures', course: 'O Level', progress: 48, totalQuestions: 80 }
];
