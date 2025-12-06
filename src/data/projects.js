export const projects = [
  {
    id: 1,
    title: "CLARITY",
    category: "AI Healthcare",
    image: "/clarity.png",
    period: "April 2025 - November 2025",
    tech: [
      "React",
      "FastAPI",
      "Python",
      "DenseNet121",
      "ResNet152",
      "Grad-CAM",
    ],
    description:
      "A hospital-ready AI system for chest X-ray diagnosis integrating CNN, RNN, and Generative AI models.",
    details: `Developed a hospital-ready AI system for chest X-ray diagnosis integrating CNN, RNN, and Generative AI models.
    Implemented dual-model inference (DenseNet121 & ResNet152) with Grad-CAM explainability and automated report generation.
    Built a full-stack solution using React and FastAPI, producing clinician-grade PDF reports.
    Achieved 93% accuracy and AUC above 0.83 on the NIH ChestX-ray14 dataset with 112k+ images.`,
    liveLink: "https://clarity-project.netlify.app/",
    githubLink: "https://github.com/PavanDayanand/Clarity-FrontEnd",
  },
  {
    id: 2,
    title: "EduGenie",
    category: "Generative AI",
    image: "/edugenie.png",
    period: "March 2025 - May 2025",
    tech: [
      "Gemini API",
      "LangChain",
      "LLMs",
      "Tailwind CSS",
      "PyMuPDF",
      "FastAPI",
    ],
    description:
      "Generative AI-powered application to deliver intelligent academic insights from educational documents.",
    details: `Engineered a Generative AI-powered application to deliver intelligent academic insights from educational documents.
    The system uses an OCR pipeline built with PyMuPDF to automate data extraction, which reduced manual data entry efforts by 60%.
    Integrated Google Gemini API and LangChain with a FastAPI backend to process user queries, providing personalized feedback to students.`,
    liveLink: "#", // Not yet published
    githubLink: "https://github.com/harshakl03/EduGenie",
  },
  {
    id: 3,
    title: "Diabetes Risk Prediction",
    category: "Machine Learning",
    image: "/diabetes.png",
    period: "November 2024 - December 2024",
    tech: ["Python", "NumPy", "Scikit-learn", "Matplotlib", "Seaborn"],
    description: "Efficient Diabetes Risk Prediction Using KNR Models.",
    details: `Built a machine learning-based diabetes risk prediction system using Random Forest and KNN, achieving 84% accuracy and F1-score of 0.80.
    Applied feature engineering, data preprocessing, and class imbalance handling.
    Implemented with Python, Scikit-learn, and Pandas for early healthcare diagnostics.`,
    liveLink:
      "https://drive.google.com/drive/folders/1WcwnOQjC_kCf3QtBbdu10tXQp75lHlHc?usp=sharing", // Demo files
    githubLink: "#", // No GitHub link provided
  },
  {
    id: 4,
    title: "InterConnect",
    category: "Data Analytics",
    image: "/interconnect.png",
    period: "October 2024 - December 2024",
    tech: ["ETL", "Google BigQuery", "Power BI", "Google Forms"],
    description:
      "Interactive Power BI dashboard analyzing opinion gaps between students, faculty, and clubs.",
    details: `Managed data design and storytelling to build an interactive Power BI dashboard that analyzed opinion gaps between students, faculty, and clubs.
    Contributed to the data collection using Google Forms and performed ETL processing using BigQuery to clean and structure the data for analysis.
    The project was awarded 2nd place among 22 teams in a technical competition.`,
    liveLink:
      "https://drive.google.com/drive/folders/15mC4JnLKT4pJb5Dqf_wJ0H94SixWsBR0?usp=drive_link", // Assets
    githubLink: "#", // No GitHub link provided
  },
];
