// ==========================================================
// BC CareerCraft - data.js
// Suggestion lists for the Target Job Role and College fields.
// Users can still type anything that isn't listed.
// Add or remove items freely. College format: "Name, City"
// ==========================================================

const JOB_ROLES = [
  // Customer support & operations
  "Customer Support Executive", "Customer Service Representative", "Customer Support Associate",
  "Senior Customer Support Executive", "Customer Support Team Lead", "Customer Success Manager",
  "Customer Success Executive", "Customer Experience Manager", "Technical Support Engineer",
  "Technical Support Executive", "Chat Support Executive", "Voice Process Executive",
  "Non-Voice Process Executive", "Email Support Executive", "Help Desk Executive",
  "Service Desk Analyst", "Call Center Agent", "Call Center Team Leader", "Process Associate",
  "Senior Process Associate", "Process Trainer", "Process Manager", "Quality Analyst",
  "Quality Auditor", "Operations Executive", "Senior Operations Executive", "Operations Manager",
  "Assistant Operations Manager", "Operations Analyst", "Operations Coordinator",
  "Back Office Executive", "Data Entry Operator", "MIS Executive", "Escalation Manager",
  "Workforce Management Analyst", "Support Operations Specialist", "Client Servicing Executive",
  "Account Manager", "Relationship Manager", "Client Relationship Executive",

  // Education & EdTech
  "Academic Counsellor", "Admissions Counsellor", "Education Counsellor", "Academic Coordinator",
  "Academic Operations Executive", "Academic Operations Manager", "Content Developer",
  "Instructional Designer", "Curriculum Designer", "Subject Matter Expert", "Teacher",
  "Primary School Teacher", "PGT (Post Graduate Teacher)", "TGT (Trained Graduate Teacher)",
  "Lecturer", "Assistant Professor", "Associate Professor", "Professor", "Trainer",
  "Corporate Trainer", "Learning and Development Executive", "Learning and Development Manager",
  "Learning Experience Designer", "School Coordinator", "Principal", "Vice Principal", "Librarian",
  "Research Assistant", "Research Scholar", "Online Tutor", "Teaching Assistant",
  "Program Manager (Education)",

  // Human resources
  "HR Executive", "Senior HR Executive", "HR Generalist", "HR Manager", "HR Business Partner",
  "HR Operations Executive", "HR Administrator", "HR Analyst", "HRIS Analyst", "Head of HR",
  "Talent Acquisition Specialist", "Talent Acquisition Executive", "Recruiter",
  "Technical Recruiter", "Recruitment Consultant", "Recruitment Coordinator", "Payroll Executive",
  "Payroll Specialist", "Compensation and Benefits Executive", "Benefits Administrator",
  "Employee Relations Executive", "Onboarding Specialist", "Training Coordinator",

  // IT & software
  "Software Engineer", "Associate Software Engineer", "Senior Software Engineer",
  "Software Developer", "Full Stack Developer", "Front End Developer", "Back End Developer",
  "Web Developer", "Mobile App Developer", "Android Developer", "iOS Developer", "Java Developer",
  "Python Developer", ".NET Developer", "PHP Developer", "React Developer", "Node.js Developer",
  "DevOps Engineer", "Cloud Engineer", "Site Reliability Engineer", "QA Engineer", "Test Engineer",
  "Automation Test Engineer", "Manual Tester", "Data Analyst", "Data Scientist", "Data Engineer",
  "Business Analyst", "Business Intelligence Analyst", "Machine Learning Engineer", "AI Engineer",
  "Database Administrator", "System Administrator", "Network Engineer", "Cybersecurity Analyst",
  "Information Security Analyst", "IT Support Engineer", "IT Support Executive", "Technical Lead",
  "Engineering Manager", "Solutions Architect", "Product Manager", "Product Owner",
  "Project Manager", "Scrum Master", "UI/UX Designer", "UX Researcher", "Technical Writer",
  "ERP Consultant", "SAP Consultant", "Salesforce Developer", "Embedded Engineer", "IT Manager",

  // Engineering & manufacturing
  "Mechanical Engineer", "Design Engineer", "Production Engineer", "Maintenance Engineer",
  "Quality Engineer", "Manufacturing Engineer", "Process Engineer", "Project Engineer",
  "Site Engineer", "Civil Engineer", "Structural Engineer", "Electrical Engineer",
  "Electronics Engineer", "Instrumentation Engineer", "Chemical Engineer", "Automobile Engineer",
  "CAD Engineer", "CAD Draughtsman", "Graduate Engineer Trainee", "Diploma Engineer Trainee",
  "Service Engineer", "Field Engineer", "Supervisor", "Safety Officer", "HSE Officer",
  "Plant Manager", "Production Manager", "Quality Manager", "R&D Engineer", "Research Engineer",
  "Tool Design Engineer", "Estimation Engineer", "Planning Engineer", "Quantity Surveyor",
  "Architect", "Interior Designer",

  // Finance & accounts
  "Accountant", "Senior Accountant", "Accounts Executive", "Accounts Assistant",
  "Finance Executive", "Finance Manager", "Financial Analyst", "Chartered Accountant",
  "Company Secretary", "Auditor", "Internal Auditor", "Tax Consultant", "GST Executive",
  "Accounts Payable Executive", "Accounts Receivable Executive", "Credit Analyst",
  "Investment Analyst", "Banking Relationship Officer", "Loan Officer", "Bank Probationary Officer",
  "Bank Clerk", "Insurance Advisor", "Underwriter", "Claims Executive", "Treasury Executive",
  "FP&A Analyst", "Cost Accountant", "Billing Executive",

  // Sales & marketing
  "Sales Executive", "Senior Sales Executive", "Sales Manager", "Business Development Executive",
  "Business Development Manager", "Inside Sales Executive", "Field Sales Executive",
  "Area Sales Manager", "Regional Sales Manager", "Key Account Manager", "Telesales Executive",
  "Pre-Sales Consultant", "Marketing Executive", "Marketing Manager", "Digital Marketing Executive",
  "Digital Marketing Manager", "SEO Specialist", "Social Media Manager", "Content Writer",
  "Copywriter", "Content Strategist", "Brand Manager", "Performance Marketing Manager",
  "Email Marketing Specialist", "Growth Manager", "Market Research Analyst",
  "Public Relations Executive", "Event Manager", "Graphic Designer", "Video Editor",
  "Motion Graphics Designer", "Photographer",

  // Admin & office
  "Office Administrator", "Administrative Assistant", "Executive Assistant", "Personal Assistant",
  "Secretary", "Receptionist", "Front Office Executive", "Office Assistant", "Office Manager",
  "Admin Executive", "Document Controller", "Store Keeper", "Procurement Executive",
  "Purchase Executive", "Vendor Manager", "Facilities Manager", "Coordinator",

  // Supply chain & logistics
  "Supply Chain Executive", "Supply Chain Manager", "Logistics Executive", "Logistics Manager",
  "Warehouse Executive", "Warehouse Manager", "Inventory Controller", "Import Export Executive",
  "Shipping Executive", "Fleet Manager", "Delivery Executive", "Driver",

  // Healthcare
  "Doctor (MBBS)", "Staff Nurse", "Nursing Officer", "Pharmacist", "Physiotherapist",
  "Lab Technician", "Medical Representative", "Medical Coder", "Hospital Administrator",
  "Dietitian", "Radiographer", "Healthcare Assistant", "Clinical Research Associate",
  "Dental Surgeon",

  // Legal & compliance
  "Legal Executive", "Legal Advisor", "Lawyer / Advocate", "Compliance Officer", "Paralegal",
  "Contract Manager",

  // Hospitality, retail & others
  "Hotel Manager", "Front Desk Executive", "Chef", "Customer Relationship Officer",
  "Store Manager", "Retail Sales Associate", "Cashier", "Travel Consultant", "Flight Attendant",
  "Security Supervisor",

  // Entry level & general
  "Fresher / Trainee", "Management Trainee", "Intern", "Graduate Trainee", "Apprentice",
  "Freelancer", "Consultant", "Team Lead", "Assistant Manager", "Manager", "Senior Manager",
  "General Manager", "Director", "Entrepreneur / Founder"
];

const COLLEGES = [
  // IITs
  "IIT Madras, Chennai", "IIT Bombay, Mumbai", "IIT Delhi, New Delhi", "IIT Kanpur, Kanpur",
  "IIT Kharagpur, Kharagpur", "IIT Roorkee, Roorkee", "IIT Guwahati, Guwahati",
  "IIT Hyderabad, Hyderabad", "IIT (BHU) Varanasi, Varanasi", "IIT (ISM) Dhanbad, Dhanbad",
  "IIT Indore, Indore", "IIT Mandi, Mandi", "IIT Gandhinagar, Gandhinagar", "IIT Ropar, Rupnagar",
  "IIT Patna, Patna", "IIT Bhubaneswar, Bhubaneswar", "IIT Jodhpur, Jodhpur",
  "IIT Tirupati, Tirupati", "IIT Palakkad, Palakkad", "IIT Dharwad, Dharwad", "IIT Bhilai, Bhilai",
  "IIT Goa, Farmagudi", "IIT Jammu, Jammu",

  // NITs
  "NIT Tiruchirappalli, Tiruchirappalli", "NIT Warangal, Warangal", "NIT Karnataka (Surathkal), Mangaluru",
  "NIT Calicut, Kozhikode", "NIT Rourkela, Rourkela", "MNNIT Allahabad, Prayagraj",
  "NIT Durgapur, Durgapur", "NIT Kurukshetra, Kurukshetra", "NIT Silchar, Silchar",
  "NIT Hamirpur, Hamirpur", "NIT Jalandhar, Jalandhar", "NIT Jamshedpur, Jamshedpur",
  "MANIT Bhopal, Bhopal", "VNIT Nagpur, Nagpur", "SVNIT Surat, Surat", "MNIT Jaipur, Jaipur",
  "NIT Patna, Patna", "NIT Raipur, Raipur", "NIT Srinagar, Srinagar", "NIT Agartala, Agartala",
  "NIT Meghalaya, Shillong", "NIT Delhi, New Delhi", "NIT Goa, Cuncolim",
  "NIT Puducherry, Karaikal", "NIT Andhra Pradesh, Tadepalligudem", "NIT Manipur, Imphal",
  "NIT Mizoram, Aizawl", "NIT Nagaland, Dimapur", "NIT Sikkim, Ravangla",
  "NIT Arunachal Pradesh, Yupia", "NIT Uttarakhand, Srinagar (Garhwal)",

  // IIITs
  "IIIT Hyderabad, Hyderabad", "IIIT Bangalore, Bengaluru", "IIIT Delhi, New Delhi",
  "IIIT Allahabad, Prayagraj", "IIITDM Kancheepuram, Chennai", "IIITDM Jabalpur, Jabalpur",
  "ABV-IIITM Gwalior, Gwalior", "IIIT Kota, Kota", "IIIT Sri City, Sri City",
  "IIIT Vadodara, Vadodara", "IIIT Lucknow, Lucknow", "IIIT Pune, Pune", "IIIT Nagpur, Nagpur",
  "IIIT Tiruchirappalli, Tiruchirappalli", "IIIT Kottayam, Kottayam", "IIIT Dharwad, Dharwad",
  "IIIT Kalyani, Kalyani", "IIIT Ranchi, Ranchi", "IIIT Una, Una", "IIIT Guwahati, Guwahati",
  "IIIT Manipur, Imphal", "IIIT Bhopal, Bhopal", "IIIT Surat, Surat", "IIIT Sonepat, Sonepat",
  "IIIT Bhagalpur, Bhagalpur", "IIIT Raichur, Raichur",

  // IIMs and top management schools
  "IIM Ahmedabad, Ahmedabad", "IIM Bangalore, Bengaluru", "IIM Calcutta, Kolkata",
  "IIM Lucknow, Lucknow", "IIM Kozhikode, Kozhikode", "IIM Indore, Indore", "IIM Shillong, Shillong",
  "IIM Rohtak, Rohtak", "IIM Ranchi, Ranchi", "IIM Raipur, Raipur", "IIM Tiruchirappalli, Tiruchirappalli",
  "IIM Kashipur, Kashipur", "IIM Udaipur, Udaipur", "IIM Nagpur, Nagpur", "IIM Amritsar, Amritsar",
  "IIM Bodh Gaya, Bodh Gaya", "IIM Jammu, Jammu", "IIM Sambalpur, Sambalpur",
  "IIM Sirmaur, Sirmaur", "IIM Visakhapatnam, Visakhapatnam",
  "XLRI, Jamshedpur", "FMS Delhi, New Delhi", "MDI Gurgaon, Gurugram", "ISB, Hyderabad",
  "SPJIMR, Mumbai", "JBIMS, Mumbai", "NMIMS, Mumbai", "IMT Ghaziabad, Ghaziabad",
  "IMI Delhi, New Delhi", "TAPMI, Manipal", "SIBM Pune, Pune", "SCMHRD, Pune", "XIMB, Bhubaneswar",
  "Great Lakes Institute of Management, Chennai", "Loyola Institute of Business Administration, Chennai",
  "MICA, Ahmedabad", "Welingkar Institute of Management, Mumbai", "Krea University, Sri City",

  // Science, research and medical institutes
  "IISc Bangalore, Bengaluru", "IISER Pune, Pune", "IISER Kolkata, Kolkata", "IISER Mohali, Mohali",
  "IISER Bhopal, Bhopal", "IISER Thiruvananthapuram, Thiruvananthapuram", "IISER Tirupati, Tirupati",
  "NISER, Bhubaneswar", "Indian Statistical Institute, Kolkata", "IIEST Shibpur, Howrah",
  "AIIMS New Delhi, New Delhi", "AIIMS Bhopal, Bhopal", "AIIMS Bhubaneswar, Bhubaneswar",
  "AIIMS Jodhpur, Jodhpur", "AIIMS Patna, Patna", "AIIMS Raipur, Raipur", "AIIMS Rishikesh, Rishikesh",
  "JIPMER, Puducherry", "PGIMER, Chandigarh", "Christian Medical College, Vellore",
  "Armed Forces Medical College, Pune", "Maulana Azad Medical College, New Delhi",
  "Lady Hardinge Medical College, New Delhi", "Madras Medical College, Chennai",
  "Stanley Medical College, Chennai", "Kasturba Medical College, Manipal",
  "Grant Medical College, Mumbai", "Seth GS Medical College, Mumbai", "BJ Medical College, Pune",
  "Bangalore Medical College, Bengaluru", "St. John's Medical College, Bengaluru",
  "Osmania Medical College, Hyderabad", "King George's Medical University, Lucknow",

  // Central universities and national institutes
  "University of Delhi, New Delhi", "Jawaharlal Nehru University, New Delhi",
  "Jamia Millia Islamia, New Delhi", "Jamia Hamdard, New Delhi", "IGNOU, New Delhi",
  "Aligarh Muslim University, Aligarh", "Banaras Hindu University, Varanasi",
  "University of Hyderabad, Hyderabad", "EFLU, Hyderabad", "Maulana Azad National Urdu University, Hyderabad",
  "Pondicherry University, Puducherry", "Visva-Bharati, Santiniketan",
  "University of Allahabad, Prayagraj", "Central University of Tamil Nadu, Thiruvarur",
  "Central University of Kerala, Kasaragod", "Central University of Karnataka, Kalaburagi",
  "Central University of Gujarat, Gandhinagar", "Central University of Rajasthan, Ajmer",
  "Central University of Punjab, Bathinda", "Central University of Haryana, Mahendragarh",
  "Central University of Himachal Pradesh, Dharamshala", "Central University of Jharkhand, Ranchi",
  "Central University of South Bihar, Gaya", "Central University of Jammu, Jammu",
  "University of Kashmir, Srinagar", "Tezpur University, Tezpur", "Assam University, Silchar",
  "North-Eastern Hill University, Shillong", "Rajiv Gandhi University, Itanagar",
  "Manipur University, Imphal", "Mizoram University, Aizawl", "Nagaland University, Lumami",
  "Sikkim University, Gangtok", "Tripura University, Agartala", "Guru Ghasidas Vishwavidyalaya, Bilaspur",
  "Dr. Harisingh Gour University, Sagar", "Babasaheb Bhimrao Ambedkar University, Lucknow",
  "Delhi Technological University, New Delhi", "Netaji Subhas University of Technology, New Delhi",
  "IGDTUW, New Delhi", "School of Planning and Architecture, New Delhi",
  "Indian Agricultural Research Institute, New Delhi", "NID Ahmedabad, Ahmedabad",
  "NIFT Delhi, New Delhi", "NIFT Chennai, Chennai", "FTII, Pune",

  // Tamil Nadu and Puducherry
  "Anna University, Chennai", "University of Madras, Chennai", "Madurai Kamaraj University, Madurai",
  "Bharathiar University, Coimbatore", "Bharathidasan University, Tiruchirappalli",
  "Annamalai University, Chidambaram", "Alagappa University, Karaikudi",
  "Manonmaniam Sundaranar University, Tirunelveli", "Periyar University, Salem",
  "Thiruvalluvar University, Vellore", "Mother Teresa Women's University, Kodaikanal",
  "Tamil University, Thanjavur", "Tamil Nadu Agricultural University, Coimbatore",
  "Tamil Nadu Open University, Chennai", "Tamil Nadu Dr. MGR Medical University, Chennai",
  "SASTRA University, Thanjavur", "VIT, Vellore", "SRM Institute of Science and Technology, Chennai",
  "Amrita Vishwa Vidyapeetham, Coimbatore", "Saveetha University, Chennai",
  "Sathyabama Institute of Science and Technology, Chennai",
  "Hindustan Institute of Technology and Science, Chennai", "Chettinad Academy of Research and Education, Kelambakkam",
  "Karunya Institute of Technology and Sciences, Coimbatore", "Kalasalingam Academy of Research and Education, Krishnankoil",
  "Vels Institute of Science, Technology and Advanced Studies, Chennai",
  "College of Engineering Guindy, Chennai", "Madras Institute of Technology, Chennai",
  "SSN College of Engineering, Chennai", "Sri Venkateswara College of Engineering, Sriperumbudur",
  "Velammal Engineering College, Chennai", "Rajalakshmi Engineering College, Chennai",
  "Easwari Engineering College, Chennai", "PSG College of Technology, Coimbatore",
  "PSG College of Arts and Science, Coimbatore", "Coimbatore Institute of Technology, Coimbatore",
  "Kumaraguru College of Technology, Coimbatore", "Government College of Technology, Coimbatore",
  "Sri Krishna College of Engineering and Technology, Coimbatore", "Sri Ramakrishna Engineering College, Coimbatore",
  "Kongu Engineering College, Erode", "Bannari Amman Institute of Technology, Sathyamangalam",
  "Thiagarajar College of Engineering, Madurai", "Thiagarajar School of Management, Madurai",
  "Mepco Schlenk Engineering College, Sivakasi", "Alagappa Chettiar Government College of Engineering and Technology, Karaikudi",
  "Pondicherry Engineering College, Puducherry", "Loyola College, Chennai", "Madras Christian College, Chennai",
  "Presidency College, Chennai", "Pachaiyappa's College, Chennai", "Stella Maris College, Chennai",
  "Ethiraj College for Women, Chennai", "Women's Christian College, Chennai", "Queen Mary's College, Chennai",
  "St. Joseph's College, Tiruchirappalli", "Bishop Heber College, Tiruchirappalli",
  "Jamal Mohamed College, Tiruchirappalli", "National College, Tiruchirappalli",
  "American College, Madurai", "Lady Doak College, Madurai", "Jawahar Science College, Neyveli",

  // Karnataka
  "Bangalore University, Bengaluru", "University of Mysore, Mysuru", "Visvesvaraya Technological University, Belagavi",
  "Manipal Academy of Higher Education, Manipal", "RV College of Engineering, Bengaluru",
  "BMS College of Engineering, Bengaluru", "PES University, Bengaluru", "MS Ramaiah Institute of Technology, Bengaluru",
  "Christ University, Bengaluru", "Mount Carmel College, Bengaluru", "St. Joseph's University, Bengaluru",
  "Jain University, Bengaluru", "REVA University, Bengaluru", "Presidency University, Bengaluru",
  "Dayananda Sagar College of Engineering, Bengaluru", "Bangalore Institute of Technology, Bengaluru",
  "National Law School of India University, Bengaluru", "Karnataka State Open University, Mysuru",

  // Maharashtra and Goa
  "University of Mumbai, Mumbai", "Savitribai Phule Pune University, Pune", "COEP Technological University, Pune",
  "VJTI, Mumbai", "Institute of Chemical Technology, Mumbai", "Sardar Patel College of Engineering, Mumbai",
  "Symbiosis International University, Pune", "MIT World Peace University, Pune",
  "Vishwakarma Institute of Technology, Pune", "Cummins College of Engineering for Women, Pune",
  "Fergusson College, Pune", "Deccan College, Pune", "St. Xavier's College, Mumbai", "Ruia College, Mumbai",
  "Wilson College, Mumbai", "Jai Hind College, Mumbai", "HR College of Commerce and Economics, Mumbai",
  "Sydenham College of Commerce and Economics, Mumbai", "Tata Institute of Social Sciences, Mumbai",
  "Walchand College of Engineering, Sangli", "Yashwantrao Chavan Maharashtra Open University, Nashik",
  "BITS Pilani Goa Campus, Zuarinagar", "Goa University, Taleigao",

  // Delhi NCR
  "St. Stephen's College, New Delhi", "Hindu College, New Delhi", "Miranda House, New Delhi",
  "Lady Shri Ram College for Women, New Delhi", "Shri Ram College of Commerce, New Delhi",
  "Hansraj College, New Delhi", "Kirori Mal College, New Delhi", "Ramjas College, New Delhi",
  "Sri Venkateswara College, New Delhi", "Daulat Ram College, New Delhi", "Gargi College, New Delhi",
  "Jesus and Mary College, New Delhi", "Delhi School of Economics, New Delhi",
  "Guru Gobind Singh Indraprastha University, New Delhi", "Amity University, Noida",
  "Shiv Nadar University, Greater Noida", "Bennett University, Greater Noida", "Sharda University, Greater Noida",
  "Galgotias University, Greater Noida", "Jaypee Institute of Information Technology, Noida",

  // West Bengal and East India
  "University of Calcutta, Kolkata", "Jadavpur University, Kolkata", "Presidency University, Kolkata",
  "St. Xavier's College, Kolkata", "Scottish Church College, Kolkata", "University of Kalyani, Kalyani",
  "Netaji Subhas Open University, Kolkata", "WBNUJS, Kolkata", "Utkal University, Bhubaneswar",
  "KIIT University, Bhubaneswar", "Siksha 'O' Anusandhan, Bhubaneswar", "Ravenshaw University, Cuttack",
  "Sambalpur University, Sambalpur", "XIM University, Bhubaneswar", "Patna University, Patna",
  "BIT Mesra, Ranchi", "Ranchi University, Ranchi", "Gauhati University, Guwahati",
  "Cotton University, Guwahati", "Dibrugarh University, Dibrugarh",

  // Kerala
  "University of Kerala, Thiruvananthapuram", "Cochin University of Science and Technology, Kochi",
  "Mahatma Gandhi University, Kottayam", "University of Calicut, Malappuram",
  "College of Engineering Trivandrum, Thiruvananthapuram", "Government Engineering College Thrissur, Thrissur",
  "TKM College of Engineering, Kollam", "Rajagiri College of Social Sciences, Kochi",
  "St. Teresa's College, Kochi", "Maharaja's College, Kochi", "Mar Ivanios College, Thiruvananthapuram",
  "Christ College, Irinjalakuda", "NUALS, Kochi",

  // Andhra Pradesh and Telangana
  "Osmania University, Hyderabad", "JNTU Hyderabad, Hyderabad", "Andhra University, Visakhapatnam",
  "Sri Venkateswara University, Tirupati", "GITAM University, Visakhapatnam", "Kakatiya University, Warangal",
  "BITS Pilani Hyderabad Campus, Hyderabad", "Chaitanya Bharathi Institute of Technology, Hyderabad",
  "Vasavi College of Engineering, Hyderabad", "Anurag University, Hyderabad", "Mahindra University, Hyderabad",
  "KL University, Vaddeswaram", "Vignan's Foundation for Science, Technology and Research, Guntur",
  "SRKR Engineering College, Bhimavaram", "St. Francis College for Women, Hyderabad",
  "Nizam College, Hyderabad", "Dr. B.R. Ambedkar Open University, Hyderabad", "NALSAR University of Law, Hyderabad",

  // Gujarat and Rajasthan
  "Gujarat University, Ahmedabad", "Maharaja Sayajirao University, Vadodara", "Nirma University, Ahmedabad",
  "CEPT University, Ahmedabad", "Ahmedabad University, Ahmedabad", "Pandit Deendayal Energy University, Gandhinagar",
  "DA-IICT, Gandhinagar", "Sardar Patel University, Vallabh Vidyanagar", "LD College of Engineering, Ahmedabad",
  "Gujarat National Law University, Gandhinagar", "BITS Pilani, Pilani", "University of Rajasthan, Jaipur",
  "Manipal University Jaipur, Jaipur", "LNMIIT, Jaipur", "Mohanlal Sukhadia University, Udaipur",
  "MBM University, Jodhpur", "Banasthali Vidyapith, Banasthali", "National Law University, Jodhpur",

  // Uttar Pradesh, Uttarakhand, Himachal
  "University of Lucknow, Lucknow", "Dr. A.P.J. Abdul Kalam Technical University, Lucknow",
  "Chaudhary Charan Singh University, Meerut", "MMM University of Technology, Gorakhpur",
  "Harcourt Butler Technical University, Kanpur", "Institute of Engineering and Technology, Lucknow",
  "Integral University, Lucknow", "Dr. Ram Manohar Lohia National Law University, Lucknow",
  "GB Pant University of Agriculture and Technology, Pantnagar", "Graphic Era University, Dehradun",
  "UPES, Dehradun", "Doon University, Dehradun", "Himachal Pradesh University, Shimla",
  "Jaypee University of Information Technology, Waknaghat",

  // Madhya Pradesh and Chhattisgarh
  "Devi Ahilya Vishwavidyalaya, Indore", "SGSITS, Indore", "Vikram University, Ujjain",
  "Jiwaji University, Gwalior", "Rajiv Gandhi Proudyogiki Vishwavidyalaya, Bhopal",
  "National Law Institute University, Bhopal", "Hidayatullah National Law University, Raipur",

  // Punjab, Haryana, Chandigarh
  "Panjab University, Chandigarh", "Punjab Engineering College, Chandigarh", "Thapar Institute of Engineering and Technology, Patiala",
  "Guru Nanak Dev University, Amritsar", "Punjabi University, Patiala", "Lovely Professional University, Phagwara",
  "Chitkara University, Rajpura", "Chandigarh University, Mohali", "Punjab Agricultural University, Ludhiana",
  "Maharshi Dayanand University, Rohtak", "Kurukshetra University, Kurukshetra", "Ashoka University, Sonipat",
  "OP Jindal Global University, Sonipat", "Guru Jambheshwar University, Hisar",
  "Deenbandhu Chhotu Ram University of Science and Technology, Murthal"
];

const EXPERTISE_AREAS = [
  // Customer support & operations
  "Customer Support", "Customer Service Excellence", "Customer Success", "Customer Retention",
  "Customer Experience Management", "Escalation Management", "Ticket Management", "CRM Management",
  "SLA Management", "Quality Assurance", "Quality Monitoring and Audits", "Process Improvement",
  "Operations Management", "Back Office Operations", "MIS Reporting", "Workforce Management",
  "Vendor Management", "Stakeholder Management", "Client Relationship Management",
  "Account Management", "Service Delivery", "Complaint Resolution", "Technical Troubleshooting",

  // HR & people
  "Talent Acquisition", "Recruitment", "Onboarding and Induction", "HR Operations",
  "Payroll Processing", "Benefits Administration", "Compensation and Benefits",
  "Employee Relations", "Employee Engagement", "Performance Management", "HR Analytics",
  "Labour Law Compliance", "Training and Development", "Learning and Development",
  "Organisational Development", "Policy Development", "HR Business Partnering",

  // Education & EdTech
  "EdTech Operations", "Academic Operations", "Instructional Design", "Curriculum Development",
  "E-Learning Content Creation", "Learning Management Systems (LMS)", "Student Counselling",
  "Admissions Management", "Teacher Training", "Assessment Design", "School Partnerships",
  "Technical Documentation", "Tutorial and Knowledge Base Creation",

  // Data, IT & product
  "Data Analysis", "Data Visualisation", "Reporting and Dashboards", "Advanced Excel",
  "SQL and Databases", "Business Analysis", "Requirements Gathering", "Project Management",
  "Agile and Scrum", "Product Management", "Software Development", "Web Development",
  "Quality Testing", "Cloud Computing", "Cybersecurity", "IT Support", "Automation",
  "Artificial Intelligence Tools", "ERP Systems",

  // Engineering & manufacturing
  "Mechanical Design", "CAD / CAM", "Production Planning", "Quality Control",
  "Lean Manufacturing", "Six Sigma", "Root Cause Analysis", "Preventive Maintenance",
  "Manufacturing Processes", "Product Development", "Technical Research", "Research and Publication",
  "Health, Safety and Environment (HSE)", "Project Execution", "Cost Estimation",

  // Finance & admin
  "Accounting", "Accounts Payable and Receivable", "Financial Reporting", "Budgeting and Forecasting",
  "Taxation and GST", "Auditing", "Banking Operations", "Credit Analysis", "Insurance Operations",
  "Office Administration", "Documentation and Record Keeping", "Procurement", "Inventory Management",
  "Supply Chain Management", "Logistics Management", "Warehouse Operations",

  // Sales & marketing
  "Sales", "Lead Generation", "Business Development", "Key Account Management", "Negotiation",
  "Digital Marketing", "SEO", "Social Media Marketing", "Content Marketing", "Content Writing",
  "Email Marketing", "Brand Management", "Market Research", "Event Management",
  "Graphic Design", "Video Editing", "Public Relations",

  // General professional strengths
  "Team Leadership", "Team Management", "People Management", "Coaching and Mentoring",
  "Communication Skills", "Public Speaking", "Presentation Skills", "Problem Solving",
  "Decision Making", "Time Management", "Cross-functional Collaboration", "Change Management",
  "Strategic Planning", "Risk Management", "Compliance", "Conflict Resolution",
  "Training Delivery", "Documentation", "Multilingual Communication"
];

const CERTIFICATIONS = [
  // Project, process & quality
  "Project Management Professional (PMP), PMI", "Certified Associate in Project Management (CAPM), PMI",
  "PRINCE2 Foundation", "PRINCE2 Practitioner", "Certified ScrumMaster (CSM)",
  "Professional Scrum Master I (PSM I)", "SAFe Agilist", "ITIL 4 Foundation",
  "Lean Six Sigma Yellow Belt", "Lean Six Sigma Green Belt", "Lean Six Sigma Black Belt",
  "Google Project Management Professional Certificate", "ISO 9001 Lead Auditor",
  "ISO 14001 Lead Auditor", "ISO 45001 Lead Auditor", "ASQ Certified Quality Engineer (CQE)",

  // Cloud, IT & data
  "AWS Certified Cloud Practitioner", "AWS Certified Solutions Architect - Associate",
  "AWS Certified Developer - Associate", "Microsoft Azure Fundamentals (AZ-900)",
  "Microsoft Azure Administrator (AZ-104)", "Microsoft Azure Developer (AZ-204)",
  "Microsoft Azure AI Fundamentals (AI-900)", "Microsoft Power BI Data Analyst (PL-300)",
  "Microsoft Office Specialist (MOS)", "Google Cloud Digital Leader", "Google Associate Cloud Engineer",
  "Google Data Analytics Professional Certificate", "Google IT Support Professional Certificate",
  "IBM Data Science Professional Certificate", "IBM Data Analyst Professional Certificate",
  "Meta Front-End Developer Professional Certificate", "CompTIA A+", "CompTIA Network+",
  "CompTIA Security+", "Cisco Certified Network Associate (CCNA)", "Certified Ethical Hacker (CEH)",
  "CISSP", "CISA", "Oracle Certified Java SE Programmer", "Salesforce Certified Administrator",
  "Salesforce Certified Platform App Builder", "Salesforce Certified Service Cloud Consultant",
  "Red Hat Certified System Administrator (RHCSA)", "Certified Kubernetes Administrator (CKA)",
  "HashiCorp Terraform Associate", "ISTQB Certified Tester - Foundation Level",
  "Tableau Desktop Specialist", "Tableau Data Analyst", "Python Institute PCEP", "Python Institute PCAP",

  // Digital marketing
  "Google Analytics Certification", "Google Ads Search Certification", "Google Digital Garage - Fundamentals of Digital Marketing",
  "HubSpot Inbound Marketing", "HubSpot Content Marketing", "HubSpot Digital Marketing",
  "Meta Certified Digital Marketing Associate", "Semrush SEO Toolkit Certification",

  // HR & training
  "SHRM Certified Professional (SHRM-CP)", "SHRM Senior Certified Professional (SHRM-SCP)",
  "Professional in Human Resources (PHR), HRCI", "Senior Professional in Human Resources (SPHR), HRCI",
  "Associate Professional in Human Resources (aPHR), HRCI", "Certified Professional in Talent Development (CPTD), ATD",
  "LinkedIn Recruiter Certification", "HR Analytics Certification", "Train the Trainer Certification",
  "Diploma in Human Resource Management", "Labour Laws and Compliance Certificate",

  // Customer service
  "HDI Customer Service Representative (HDI-CSR)", "HDI Support Center Analyst (HDI-SCA)",
  "Certified Customer Experience Professional (CCXP)", "Customer Service Excellence Certificate",

  // Finance, banking & accounts
  "Tally Prime Certification", "Tally ERP 9 Certification", "GST Practitioner Certification",
  "Advanced Excel Certification", "Certified Financial Planner (CFP)", "CFA Level 1", "CFA Level 2",
  "CFA Level 3", "Financial Risk Manager (FRM)", "ACCA", "Certified Management Accountant (CMA)",
  "Certified Public Accountant (CPA)", "NISM Series V-A: Mutual Fund Distributors",
  "NISM Series VIII: Equity Derivatives", "NISM Series XV: Research Analyst",

  // Engineering, safety & design
  "Autodesk Certified Professional: AutoCAD", "Autodesk Certified Professional: Revit",
  "SolidWorks CSWA", "SolidWorks CSWP", "PLC and SCADA Certification", "NDT Level II",
  "OSHA 30-Hour", "NEBOSH International General Certificate", "IOSH Managing Safely",
  "Industrial Safety Diploma", "LEED Green Associate",

  // Education & teaching
  "CTET (Central Teacher Eligibility Test)", "TET (Teacher Eligibility Test)", "UGC NET",
  "State Eligibility Test (SET)", "GATE Qualified", "Google Certified Educator Level 1",
  "Google Certified Educator Level 2", "Microsoft Certified Educator", "TESOL", "TEFL", "CELTA",
  "Montessori Teacher Training", "Instructional Design Certificate",

  // Healthcare
  "Basic Life Support (BLS)", "Advanced Cardiac Life Support (ACLS)", "Certified Professional Coder (CPC), AAPC",
  "First Aid and CPR Certification",

  // Language, computer and general
  "IELTS", "TOEFL", "PTE Academic", "Spoken English Certificate", "NIELIT O Level", "NIELIT CCC",
  "Diploma in Computer Applications (DCA)", "Post Graduate Diploma in Computer Applications (PGDCA)",
  "MS Office Certification", "Typewriting (Higher Grade)", "Typewriting (Lower Grade)"
];

// ==========================================================
// Education: level -> degree -> branch / specialization
// ==========================================================

const EDUCATION_LEVELS = [
  { value: "preprimary", label: "Pre-Primary (LKG / UKG)" },
  { value: "primary", label: "Primary (Class 1 - 5)" },
  { value: "middle", label: "Middle (Class 6 - 8)" },
  { value: "10th", label: "SSLC / 10th" },
  { value: "12th", label: "HSC / 12th" },
  { value: "diploma", label: "Diploma / ITI" },
  { value: "ug", label: "Bachelor's degree" },
  { value: "pg", label: "Master's degree" },
  { value: "pgdiploma", label: "PG Diploma" },
  { value: "doctorate", label: "Doctorate (PhD)" },
  { value: "other", label: "Certificate / Other" }
];

// stream decides which specialization list is suggested for that degree
const EDUCATION_CATALOG = [
  // Pre-primary, primary and middle school
  { level: "preprimary", name: "Pre-Primary (Nursery / LKG / UKG)", stream: "" },
  { level: "preprimary", name: "Montessori / Kindergarten", stream: "" },
  { level: "primary", name: "Primary School (Class I - V)", stream: "" },
  { level: "middle", name: "Middle School (Class VI - VIII)", stream: "" },
  { level: "middle", name: "Upper Primary School (Class VI - VIII)", stream: "" },

  // 10th
  { level: "10th", name: "Secondary School Leaving Certificate (SSLC)", stream: "" },
  { level: "10th", name: "Matriculation (Class X)", stream: "" },
  { level: "10th", name: "CBSE (Class X)", stream: "" },
  { level: "10th", name: "ICSE (Class X)", stream: "" },
  { level: "10th", name: "State Board (Class X)", stream: "" },

  // 12th
  { level: "12th", name: "Higher Secondary Certificate (HSC)", stream: "school12" },
  { level: "12th", name: "CBSE (Class XII)", stream: "school12" },
  { level: "12th", name: "ISC (Class XII)", stream: "school12" },
  { level: "12th", name: "State Board (Class XII)", stream: "school12" },
  { level: "12th", name: "Vocational Higher Secondary", stream: "" },

  // Diploma / ITI
  { level: "diploma", name: "Diploma in Engineering (Polytechnic)", stream: "engineering" },
  { level: "diploma", name: "Industrial Training Institute (ITI)", stream: "iti" },
  { level: "diploma", name: "Diploma in Pharmacy (D.Pharm)", stream: "" },
  { level: "diploma", name: "Diploma in Nursing (GNM)", stream: "" },
  { level: "diploma", name: "Diploma in Computer Applications (DCA)", stream: "" },
  { level: "diploma", name: "Diploma in Elementary Education (D.El.Ed)", stream: "" },
  { level: "diploma", name: "Diploma in Hotel Management", stream: "" },

  // Bachelor's
  { level: "ug", name: "Bachelor of Engineering (B.E.)", stream: "engineering" },
  { level: "ug", name: "Bachelor of Technology (B.Tech)", stream: "engineering" },
  { level: "ug", name: "Bachelor of Science (B.Sc)", stream: "science" },
  { level: "ug", name: "Bachelor of Arts (B.A.)", stream: "arts" },
  { level: "ug", name: "Bachelor of Commerce (B.Com)", stream: "commerce" },
  { level: "ug", name: "Bachelor of Business Administration (BBA)", stream: "management" },
  { level: "ug", name: "Bachelor of Computer Applications (BCA)", stream: "computer" },
  { level: "ug", name: "Bachelor of Architecture (B.Arch)", stream: "" },
  { level: "ug", name: "Bachelor of Design (B.Des)", stream: "design" },
  { level: "ug", name: "Bachelor of Pharmacy (B.Pharm)", stream: "" },
  { level: "ug", name: "Bachelor of Medicine and Bachelor of Surgery (MBBS)", stream: "" },
  { level: "ug", name: "Bachelor of Dental Surgery (BDS)", stream: "" },
  { level: "ug", name: "Bachelor of Ayurvedic Medicine and Surgery (BAMS)", stream: "" },
  { level: "ug", name: "Bachelor of Homoeopathic Medicine and Surgery (BHMS)", stream: "" },
  { level: "ug", name: "Bachelor of Science in Nursing (B.Sc Nursing)", stream: "" },
  { level: "ug", name: "Bachelor of Physiotherapy (BPT)", stream: "" },
  { level: "ug", name: "Bachelor of Laws (LL.B)", stream: "law" },
  { level: "ug", name: "Bachelor of Education (B.Ed)", stream: "teaching" },
  { level: "ug", name: "Bachelor of Hotel Management (BHM)", stream: "" },
  { level: "ug", name: "Bachelor of Vocation (B.Voc)", stream: "" },

  // Master's
  { level: "pg", name: "Master of Engineering (M.E.)", stream: "engineering" },
  { level: "pg", name: "Master of Technology (M.Tech)", stream: "engineering" },
  { level: "pg", name: "Master of Business Administration (MBA)", stream: "management" },
  { level: "pg", name: "Post Graduate Diploma in Management (PGDM)", stream: "management" },
  { level: "pg", name: "Master of Science (M.Sc)", stream: "science" },
  { level: "pg", name: "Master of Arts (M.A.)", stream: "arts" },
  { level: "pg", name: "Master of Commerce (M.Com)", stream: "commerce" },
  { level: "pg", name: "Master of Computer Applications (MCA)", stream: "computer" },
  { level: "pg", name: "Master of Architecture (M.Arch)", stream: "" },
  { level: "pg", name: "Master of Design (M.Des)", stream: "design" },
  { level: "pg", name: "Master of Pharmacy (M.Pharm)", stream: "pharmacy" },
  { level: "pg", name: "Doctor of Medicine (MD)", stream: "medicalpg" },
  { level: "pg", name: "Master of Surgery (MS)", stream: "medicalpg" },
  { level: "pg", name: "Master of Education (M.Ed)", stream: "teaching" },
  { level: "pg", name: "Master of Laws (LL.M)", stream: "law" },
  { level: "pg", name: "Master of Social Work (MSW)", stream: "" },
  { level: "pg", name: "Master of Philosophy (M.Phil)", stream: "" },
  { level: "pg", name: "Master of Science in Nursing (M.Sc Nursing)", stream: "nursing" },
  { level: "pg", name: "Master of Physiotherapy (MPT)", stream: "" },

  // PG Diploma
  { level: "pgdiploma", name: "PG Diploma in Human Resource Management", stream: "" },
  { level: "pgdiploma", name: "PG Diploma in Business Management", stream: "" },
  { level: "pgdiploma", name: "PG Diploma in Financial Management", stream: "" },
  { level: "pgdiploma", name: "PG Diploma in Marketing Management", stream: "" },
  { level: "pgdiploma", name: "PG Diploma in Computer Applications (PGDCA)", stream: "" },
  { level: "pgdiploma", name: "PG Diploma in Data Science", stream: "" },
  { level: "pgdiploma", name: "PG Diploma in Journalism and Mass Communication", stream: "" },

  // Doctorate
  { level: "doctorate", name: "Doctor of Philosophy (Ph.D)", stream: "" },
  { level: "doctorate", name: "Doctor of Science (D.Sc)", stream: "" },

  // Other
  { level: "other", name: "Certificate Course", stream: "" },
  { level: "other", name: "Online Programme", stream: "" },
  { level: "other", name: "Other", stream: "" }
];

const SPECIALIZATIONS = {
  engineering: [
    "Aeronautical Engineering", "Agricultural Engineering", "Artificial Intelligence and Data Science",
    "Artificial Intelligence and Machine Learning", "Automobile Engineering", "Biomedical Engineering",
    "Biotechnology", "CAD/CAM", "Chemical Engineering", "Civil Engineering", "Computer Science and Engineering",
    "Cyber Security", "Electrical and Electronics Engineering", "Electronics and Communication Engineering",
    "Embedded Systems", "Environmental Engineering", "Food Technology", "Industrial Engineering",
    "Information Technology", "Instrumentation and Control Engineering", "Marine Engineering",
    "Mechanical Engineering", "Mechatronics", "Metallurgical Engineering", "Mining Engineering",
    "Petroleum Engineering", "Power Systems Engineering", "Production Engineering",
    "Robotics and Automation", "Structural Engineering", "Textile Technology", "Thermal Engineering", "VLSI Design"
  ],
  management: [
    "Business Analytics", "Entrepreneurship", "Finance", "Healthcare and Hospital Administration",
    "Human Resource Management (HRM)", "International Business", "Information Systems",
    "Logistics and Supply Chain Management", "Marketing", "Operations Management", "Retail Management",
    "Rural Management", "Systems Management", "Tourism and Hospitality Management"
  ],
  science: [
    "Agriculture", "Applied Mathematics", "Biochemistry", "Biotechnology", "Botany", "Chemistry",
    "Computer Science", "Data Science", "Electronics", "Environmental Science", "Food Science and Nutrition",
    "Forensic Science", "Geology", "Home Science", "Information Technology", "Mathematics", "Microbiology",
    "Nutrition and Dietetics", "Physics", "Psychology", "Statistics", "Visual Communication", "Zoology"
  ],
  arts: [
    "Economics", "English", "Fine Arts", "Geography", "Hindi", "History", "Journalism and Mass Communication",
    "Library and Information Science", "Philosophy", "Political Science", "Psychology",
    "Public Administration", "Social Work", "Sociology", "Tamil"
  ],
  commerce: [
    "Accounting and Finance", "Banking and Insurance", "Business Analytics", "Commerce (General)",
    "Computer Applications", "Corporate Secretaryship", "E-Commerce", "International Business",
    "Professional Accounting", "Taxation"
  ],
  computer: [
    "Artificial Intelligence", "Cloud Computing", "Computer Applications", "Cyber Security", "Data Science"
  ],
  design: [
    "Animation", "Communication Design", "Fashion Design", "Graphic Design", "Interior Design",
    "Product Design", "UX Design"
  ],
  law: [
    "Business Law", "Constitutional Law", "Corporate Law", "Criminal Law", "Intellectual Property Law",
    "International Law", "Labour Law", "Taxation Law"
  ],
  teaching: [
    "Biological Science", "Computer Science", "English", "Mathematics", "Physical Science",
    "Social Science", "Tamil"
  ],
  pharmacy: [
    "Pharmaceutical Chemistry", "Pharmaceutics", "Pharmacognosy", "Pharmacology", "Pharmacy Practice"
  ],
  medicalpg: [
    "Anaesthesiology", "Dermatology", "General Medicine", "General Surgery", "Obstetrics and Gynaecology",
    "Orthopaedics", "Paediatrics", "Radiology"
  ],
  nursing: [
    "Community Health Nursing", "Medical Surgical Nursing", "Obstetrics and Gynaecological Nursing",
    "Paediatric Nursing", "Psychiatric Nursing"
  ],
  school12: [
    "Science (Physics, Chemistry, Mathematics, Biology)",
    "Science (Physics, Chemistry, Mathematics, Computer Science)",
    "Commerce", "Arts / Humanities"
  ],
  iti: [
    "COPA (Computer Operator and Programming Assistant)", "Diesel Mechanic", "Draughtsman (Mechanical)",
    "Electrician", "Electronics Mechanic", "Fitter", "Machinist", "Mechanic Motor Vehicle", "Plumber",
    "Turner", "Welder", "Wireman"
  ]
};

// Levels that use the school list instead of the college search
const SCHOOL_LEVELS = ["preprimary", "primary", "middle", "10th", "12th"];

// ==========================================================
// Well-known schools ("Name, City"). Not complete: India has
// well over a million schools, so users can always type their own.
// Add more schools by adding lines here.
// ==========================================================
const SCHOOLS = [
  // Tamil Nadu
  "A.K.T. Matriculation Higher Secondary School, Kallakurichi",
  "Jawahar Higher Secondary School, Neyveli",
  "Padma Seshadri Bala Bhavan (PSBB), Chennai",
  "DAV Boys Senior Secondary School, Chennai",
  "Don Bosco Matriculation Higher Secondary School, Chennai",
  "Chettinad Vidyashram, Chennai",
  "Sir Sivaswami Kalalaya Senior Secondary School, Chennai",
  "St. Bede's Anglo Indian Higher Secondary School, Chennai",
  "Sishya School, Chennai",
  "Vidya Mandir Senior Secondary School, Chennai",
  "The School KFI, Chennai",
  "Hindu Senior Secondary School, Chennai",
  "Stanes Anglo Indian Higher Secondary School, Coimbatore",
  "PSG Public Schools, Coimbatore",

  // Delhi NCR
  "Delhi Public School, R.K. Puram, New Delhi",
  "Modern School, Barakhamba Road, New Delhi",
  "The Mother's International School, New Delhi",
  "Springdales School, Pusa Road, New Delhi",
  "Sanskriti School, New Delhi",
  "Bal Bharati Public School, New Delhi",
  "Delhi Public School, Noida",
  "Delhi Public School, Gurugram",

  // Karnataka
  "Bishop Cotton Boys' School, Bengaluru",
  "Bishop Cotton Girls' School, Bengaluru",
  "National Public School, Indiranagar, Bengaluru",
  "Baldwin Boys' High School, Bengaluru",
  "Frank Anthony Public School, Bengaluru",
  "Vidya Niketan School, Bengaluru",
  "Delhi Public School, Bengaluru",

  // Maharashtra
  "Cathedral and John Connon School, Mumbai",
  "Bombay Scottish School, Mumbai",
  "Campion School, Mumbai",
  "Dhirubhai Ambani International School, Mumbai",
  "St. Mary's School, Mumbai",
  "St. Mary's School, Pune",
  "Delhi Public School, Pune",

  // West Bengal and East
  "St. Xavier's Collegiate School, Kolkata",
  "La Martiniere for Boys, Kolkata",
  "La Martiniere for Girls, Kolkata",
  "Don Bosco School, Kolkata",
  "Delhi Public School, Ranchi",
  "Delhi Public School, Patna",

  // North, West and Central
  "The Doon School, Dehradun",
  "Welham Girls' School, Dehradun",
  "Mayo College, Ajmer",
  "Scindia School, Gwalior",
  "Daly College, Indore",
  "Delhi Public School, Jaipur",
  "St. Xavier's School, Jaipur",
  "City Montessori School, Lucknow",
  "La Martiniere College, Lucknow",
  "Delhi Public School, Ahmedabad",
  "Delhi Public School, Chandigarh",
  "St. John's High School, Chandigarh",

  // South
  "Hyderabad Public School, Hyderabad",
  "Delhi Public School, Hyderabad",
  "Oakridge International School, Hyderabad",
  "Rishi Valley School, Rishi Valley",
  "St. George's Grammar School, Hyderabad",
  "Devagiri CMI Public School, Kozhikode",
  "Rajagiri Public School, Kochi",
  "Loyola School, Thiruvananthapuram",
  "Bhavan's Vidya Mandir, Kochi"
];

// ==========================================================
// Companies for Work Experience (users can type any company)
// ==========================================================
const COMPANIES = [
  // EdTech
  "LEAD School", "BYJU'S", "Unacademy", "Vedantu", "PhysicsWallah", "upGrad", "Simplilearn",
  "Great Learning", "Eruditus", "Toppr", "Embibe", "Coursera", "Khan Academy", "Teachmint",
  "Classplus", "Eduvanz", "Extramarks", "Educomp", "Tata Class Edge", "Pearson India",
  "Cuemath", "Scaler", "Masai School", "NIIT", "Aptech", "Jaro Education", "Amity University Online",

  // IT services and product
  "Tata Consultancy Services (TCS)", "Infosys", "Wipro", "HCLTech", "Tech Mahindra", "Cognizant",
  "Accenture", "Capgemini", "IBM India", "Oracle India", "SAP Labs India", "Microsoft India",
  "Google India", "Amazon", "Zoho", "Freshworks", "Mphasis", "LTIMindtree", "Hexaware",
  "Persistent Systems", "Cyient", "Mindtree", "Virtusa", "CGI", "DXC Technology", "Dell Technologies",
  "HP India", "Cisco India", "Intel India", "Qualcomm India", "Adobe India", "Salesforce India",
  "ServiceNow", "Atlassian", "Thoughtworks", "Kissflow", "Chargebee", "Ness Digital Engineering",
  "Sonata Software", "Zensar Technologies", "Birlasoft", "Coforge", "Happiest Minds", "L&T Technology Services",

  // BPO and customer support
  "Concentrix", "Teleperformance", "Genpact", "WNS Global Services", "Firstsource", "Conduent",
  "TaskUs", "Alorica", "iEnergizer", "Startek", "Sutherland Global Services", "Hinduja Global Solutions",
  "Foundever (Sitel)", "TTEC", "Tech Mahindra BPS", "Infosys BPM", "Wipro BPS", "Aegis", "Intelenet",
  "Qualfon", "Xerox BPO", "EXL Service", "Vserv", "Grassroots BPO Pvt. Ltd.", "Transcom", "Webhelp",
  "IBEX", "24/7 Customer", "Mphasis BPO", "Hexaware BPO", "Cognizant BPO",

  // Banking, finance and insurance
  "State Bank of India (SBI)", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank",
  "Indian Bank", "Canara Bank", "Bank of Baroda", "Punjab National Bank", "Union Bank of India",
  "Bank of India", "Indian Overseas Bank", "IDFC FIRST Bank", "Yes Bank", "IndusInd Bank",
  "Federal Bank", "South Indian Bank", "Karur Vysya Bank", "City Union Bank", "Tamilnad Mercantile Bank",
  "Equitas Small Finance Bank", "Ujjivan Small Finance Bank", "Bajaj Finance", "Muthoot Finance",
  "Manappuram Finance", "Shriram Finance", "Cholamandalam Investment and Finance", "Tata Capital",
  "HDFC Life", "ICICI Prudential Life Insurance", "SBI Life Insurance", "Max Life Insurance",
  "Life Insurance Corporation of India (LIC)", "Star Health Insurance", "Bajaj Allianz", "New India Assurance",
  "Policybazaar", "Paytm", "PhonePe", "Razorpay", "CRED", "Zerodha", "Groww", "American Express",
  "Standard Chartered", "HSBC", "Citi", "JPMorgan Chase", "Goldman Sachs", "Deutsche Bank",

  // Consulting, HR and corporate services
  "Deloitte", "EY", "KPMG", "PwC", "McKinsey & Company", "Boston Consulting Group", "Bain & Company",
  "Randstad India", "Adecco India", "Quess Corp", "TeamLease", "ManpowerGroup", "Info Edge (Naukri)",
  "Sodexo", "People Service Group (PSG)", "ADP India", "Mercer", "Aon", "Willis Towers Watson",
  "Alight Solutions", "Ceridian", "Paycor", "Zeta",

  // E-commerce, retail and consumer
  "Flipkart", "Myntra", "Meesho", "Swiggy", "Zomato", "BigBasket", "Nykaa", "Ola", "Uber", "Urban Company",
  "Reliance Retail", "Avenue Supermarts (DMart)", "Tata Trent", "Aditya Birla Fashion and Retail",
  "Shoppers Stop", "Lifestyle International", "IKEA India", "Decathlon India", "Croma", "Vijay Sales",
  "Hindustan Unilever", "ITC", "Nestle India", "Britannia Industries", "Dabur", "Godrej Consumer Products",
  "Procter & Gamble India", "Colgate-Palmolive India", "Marico", "Tata Consumer Products", "Amul (GCMMF)",
  "Aavin", "Hatsun Agro Product", "Parle Products", "Haldiram's",

  // Telecom and media
  "Reliance Jio", "Bharti Airtel", "Vodafone Idea (Vi)", "BSNL", "Tata Communications", "Sun TV Network",
  "Zee Entertainment", "Star India", "Sony Pictures Networks India", "The Hindu Group", "Times of India Group",

  // Manufacturing, auto and engineering
  "Tata Motors", "Mahindra & Mahindra", "Maruti Suzuki", "Hyundai Motor India", "Ashok Leyland",
  "TVS Motor Company", "Royal Enfield (Eicher Motors)", "Bajaj Auto", "Hero MotoCorp", "Renault Nissan Technology",
  "Ford India", "Toyota Kirloskar Motor", "Honda Cars India", "Kia India", "Daimler India Commercial Vehicles",
  "Tractors and Farm Equipment Limited (TAFE)", "Mahindra Tractors", "Sundaram Fasteners", "Sundram Clayton",
  "Wheels India", "Brakes India", "Rane Group", "Lucas TVS", "Bosch India", "Siemens India", "ABB India",
  "Schneider Electric India", "Honeywell India", "Caterpillar India", "Cummins India", "Larsen & Toubro (L&T)",
  "Godrej & Boyce", "Thermax", "Kirloskar Brothers", "Ingersoll Rand", "Saint-Gobain India", "Saint-Gobain Glass India",
  "Tata Steel", "JSW Steel", "Jindal Steel and Power", "Hindalco", "Vedanta", "UltraTech Cement", "Ambuja Cement",
  "Dalmia Bharat", "Asian Paints", "Pidilite", "Havells India", "Voltas", "Blue Star", "Whirlpool of India",
  "Samsung India", "LG Electronics India", "Foxconn India", "Dixon Technologies", "Flex India", "Jabil India",
  "Pegatron", "Titan Company", "MRF", "Apollo Tyres", "CEAT",

  // Public sector and government
  "NLC India Limited (Neyveli Lignite Corporation)", "Bharat Heavy Electricals Limited (BHEL)",
  "Oil and Natural Gas Corporation (ONGC)", "Indian Oil Corporation (IOCL)", "Bharat Petroleum (BPCL)",
  "Hindustan Petroleum (HPCL)", "GAIL (India)", "NTPC", "Power Grid Corporation of India", "Steel Authority of India (SAIL)",
  "Coal India Limited", "Hindustan Aeronautics Limited (HAL)", "Bharat Electronics Limited (BEL)",
  "Indian Railways", "Southern Railway", "Integral Coach Factory (ICF), Chennai", "Defence Research and Development Organisation (DRDO)",
  "Indian Space Research Organisation (ISRO)", "Tamil Nadu Generation and Distribution Corporation (TANGEDCO)",
  "Tamil Nadu State Transport Corporation", "Chennai Metro Rail Limited", "Airports Authority of India",
  "India Post", "Neyveli Lignite Corporation India Limited", "Tamil Nadu Government",

  // Healthcare and pharma
  "Apollo Hospitals", "Fortis Healthcare", "Manipal Hospitals", "Max Healthcare", "Narayana Health", "MIOT International",
  "Kauvery Hospital", "Sankara Nethralaya", "Aravind Eye Care System", "Christian Medical College, Vellore",
  "Dr. Reddy's Laboratories", "Sun Pharma", "Cipla", "Lupin", "Biocon", "Zydus Lifesciences", "Cadila", "Mankind Pharma",
  "Torrent Pharma", "Aurobindo Pharma", "Glenmark", "Syngene", "Dr. Lal PathLabs", "Metropolis Healthcare",
  "Practo", "1mg", "PharmEasy", "Medanta", "AIIMS",

  // Logistics, travel and hospitality
  "Delhivery", "Blue Dart", "DHL", "FedEx", "Maersk", "Gati", "Ecom Express", "Shadowfax", "XpressBees",
  "IHCL (Taj Hotels)", "Marriott", "Hyatt", "ITC Hotels", "Oberoi Hotels", "Lemon Tree Hotels", "OYO",
  "MakeMyTrip", "IRCTC", "Cleartrip", "IndiGo", "Air India", "SpiceJet", "Cox & Kings", "Thomas Cook India",

  // Real estate, energy and others
  "Reliance Industries", "Adani Group", "Tata Power", "Adani Green Energy", "Suzlon", "Vestas India", "Siemens Gamesa",
  "DLF", "Godrej Properties", "Prestige Group", "Brigade Group", "Sobha", "Puravankara", "L&T Construction",
  "Shapoorji Pallonji", "Tata Projects", "Punj Lloyd", "Self-employed / Freelance", "Family business", "Startup"
];

// ==========================================================
// Skills (tools, technical and soft skills, languages)
// ==========================================================
const SKILLS = [
  // CRM, support and productivity tools
  "HubSpot", "Salesforce", "Zoho CRM", "One-CRM", "Freshdesk", "Zendesk", "Freshservice", "ServiceNow",
  "Jira", "Confluence", "Trello", "Asana", "Slack", "Microsoft Teams", "Zoom", "Google Workspace",
  "Microsoft Office", "Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Microsoft Outlook",
  "Google Sheets", "Google Docs", "Power Automate", "Notion", "Canva", "Intercom", "Ozonetel", "Five9", "Genesys",
  "Avaya", "Salesforce Service Cloud", "Zoho Desk", "LiveChat", "WhatsApp Business", "Call Center Software",

  // ERP, accounting and HR systems
  "ERP Systems", "SAP", "SAP FICO", "SAP MM", "SAP HR", "Oracle ERP", "Microsoft Dynamics", "Tally Prime",
  "Tally ERP 9", "QuickBooks", "Zoho Books", "GST Filing", "TDS", "Payroll Software", "Darwinbox", "Keka", "Workday",
  "SuccessFactors", "Greythr", "Zoho People", "Naukri RMS", "LinkedIn Recruiter", "ATS (Applicant Tracking Systems)",

  // Data and analytics
  "SQL", "MySQL", "PostgreSQL", "MongoDB", "Power BI", "Tableau", "Google Analytics", "Looker Studio", "Advanced Excel",
  "Pivot Tables", "VLOOKUP / XLOOKUP", "Macros (VBA)", "Data Analysis", "Data Visualisation", "MIS Reporting",
  "Statistics", "R", "Excel Dashboards", "Google Apps Script",

  // Programming and IT
  "Python", "Java", "JavaScript", "TypeScript", "C", "C++", "C#", ".NET", "PHP", "HTML", "CSS", "React", "Angular",
  "Node.js", "Django", "Flask", "Spring Boot", "REST APIs", "Git", "GitHub", "Linux", "Windows Server", "Networking",
  "Cloud Computing", "AWS", "Microsoft Azure", "Google Cloud", "Docker", "Kubernetes", "CI/CD", "Selenium",
  "Manual Testing", "Automation Testing", "Cybersecurity", "Android Development", "Flutter", "Arduino", "Raspberry Pi",
  "Embedded C", "IoT", "Machine Learning", "Artificial Intelligence", "Prompt Engineering", "ChatGPT / AI Tools",
  "Software Installation and Configuration", "Technical Troubleshooting", "Hardware Troubleshooting",

  // Engineering and design
  "AutoCAD", "SolidWorks", "CATIA", "Creo", "ANSYS", "MATLAB", "Fusion 360", "Revit", "STAAD Pro", "PLC Programming",
  "SCADA", "3D Printing", "Lean Manufacturing", "Six Sigma", "5S", "Kaizen", "Root Cause Analysis", "FMEA",
  "Preventive Maintenance", "Quality Control", "Technical Drawing", "GD&T", "Photoshop", "Illustrator", "Figma",
  "Premiere Pro", "After Effects", "Video Editing", "Graphic Design",

  // Marketing and sales
  "SEO", "Google Ads", "Meta Ads", "Social Media Marketing", "Email Marketing", "Content Writing", "Copywriting",
  "Lead Generation", "Cold Calling", "Negotiation", "Sales Pipeline Management", "Market Research",
  "Digital Marketing", "WordPress", "Mailchimp", "Telesales", "B2B Sales", "Account Management",

  // Customer success and operations
  "Customer Support", "Customer Success", "Customer Onboarding", "Escalation Handling", "Ticket Management",
  "SLA Management", "Complaint Resolution", "Product Knowledge", "Technical Support", "Chat Support", "Email Support",
  "Voice Support", "Order Processing", "Process Documentation", "Knowledge Base Writing", "Quality Audits",
  "Vendor Coordination", "Inventory Management", "Procurement", "Logistics Coordination", "Project Coordination",
  "Stakeholder Management", "Cross-functional Coordination", "Documentation",

  // HR and training
  "Recruitment", "Talent Acquisition", "Onboarding", "Payroll Processing", "Employee Engagement", "Performance Management",
  "Labour Law Compliance", "Training and Development", "Training Delivery", "Instructional Design", "E-Learning Development",
  "Articulate Storyline", "Learning Management Systems (LMS)", "Employee Relations", "HR Policies",

  // Soft skills
  "Communication", "Verbal Communication", "Written Communication", "Teamwork", "Leadership", "Problem Solving",
  "Critical Thinking", "Time Management", "Adaptability", "Attention to Detail", "Customer Focus", "Empathy",
  "Active Listening", "Conflict Resolution", "Decision Making", "Presentation Skills", "Public Speaking",
  "Multitasking", "Work Ethic", "Creativity", "Analytical Thinking", "Negotiation Skills", "Mentoring",

  // Languages
  "Tamil", "English", "Hindi", "Telugu", "Malayalam", "Kannada", "Marathi", "Bengali", "Gujarati", "Punjabi",
  "Odia", "Urdu", "French", "German", "Spanish", "Japanese", "Arabic"
];

// ==========================================================
// Site settings
// ==========================================================
const SITE_CONFIG = {
  // Paste your Google Form link here (must start with https://). Leave "" to hide the feedback link.
  feedbackUrl: "",

  // Optional: an email address for feedback (it will be visible to everyone).
  // Used only when feedbackUrl is empty. Leave "" to hide.
  feedbackEmail: ""
};
