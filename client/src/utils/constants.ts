import { FilterOptionsType, HeaderMenuType } from "../vite-env";

export const headerMenu: HeaderMenuType[] = [
  { name: "Home", link: "/" },
  { name: "Jobs", link: "/jobs" },
  { name: "Browse", link: "/browse" },
];

export const carouselContent = [
  "Full Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "React Js Developer",
];

export const filteOption: FilterOptionsType[] = [
  {
    filterType: "Location",
    filters: ["Pune", "Mumbai", "Delhi NCR", "Hydrabad", "Baglore", "Nagour"],
  },
  {
    filterType: "Industry",
    filters: ["IT", "Finance", "Banking", "Healthcare", "Education"],
  },
  {
    filterType: "Salary",
    filters: ["0-40k", "41k-1lack", "1lack-5lack"],
  },
];


export const allskills = [
  // Technical Skills
  "JavaScript", "Python", "HTML", "CSS", "React.js", "Node.js", "TypeScript", "Git",
  "SQL", "MongoDB", "Express.js", "REST APIs", "GraphQL", "Redux", "Docker",
  "Kubernetes", "AWS", "Azure", "Google Cloud Platform", "Linux", "Bash/Shell Scripting",
  "C++", "Java", "Ruby", "Ruby on Rails", "PHP", "Laravel", "MySQL", "PostgreSQL",
  "NoSQL Databases", "Firebase", "Next.js", "Jest", "Cypress", "SASS", "Less",
  "Webpack", "Gulp", "Grunt", "Bootstrap", "Tailwind CSS", "Material-UI", "Chakra UI",
  "Figma", "Adobe XD", "Photoshop", "Illustrator", "InVision", "Agile Methodologies",
  "Scrum", "Kanban", "Trello", "Jira", "CI/CD", "Jenkins", "Travis CI", "CircleCI",
  "Bitbucket", "GitHub", "GitLab", "OAuth", "JWT", "Microservices", "Service-Oriented Architecture",
  "WebSockets", "Socket.io", "JSON", "XML", "RESTful Services", "APIs", "HTTP/HTTPS",
  "OAuth 2.0", "GraphQL Subscriptions", "Contentful", "Sanity.io", "WordPress", "WooCommerce",
  "Shopify", "Magento", "Drupal", "Salesforce", "HubSpot", "PWA (Progressive Web Apps)",
  "JAMstack", "Headless CMS", "Web Performance Optimization", "SEO", "Google Analytics",
  "Hotjar", "Mixpanel", "A/B Testing", "User Experience (UX)", "User Interface (UI)",
  "Accessibility (A11Y)", "Cross-Browser Compatibility", "Responsive Design", "Mobile-First Design",
  "Serverless Architecture", "Netlify", "Vercel", "Heroku", "DigitalOcean", "Vagrant",
  "Terraform", "Ansible", "Chef", "Puppet", "ElasticSearch", "Logstash", "Kibana",
  "Grafana", "Prometheus", "Splunk", "New Relic", "Sentry", "Nagios", "Zabbix",
  "PowerShell", "Raspberry Pi", "Arduino", "IoT (Internet of Things)", "Machine Learning",
  "Deep Learning", "Artificial Intelligence", "TensorFlow", "PyTorch", "OpenCV",
  "Natural Language Processing (NLP)", "Computer Vision", "Data Science", "Pandas",
  "NumPy", "Matplotlib", "Data Visualization", "Tableau", "Power BI", "Big Data",
  "Hadoop", "Apache Spark", "Kafka", "Cassandra", "HBase", "Blockchain", "Solidity",
  "Smart Contracts", "Ethereum", "Bitcoin", "Cryptography", "Cybersecurity", "Penetration Testing",

  // Soft Skills
  "Communication", "Teamwork", "Problem-Solving", "Time Management",  "Critical Thinking",
  "Leadership", "Work Ethic", "Attention to Detail", "Interpersonal Skills", "Emotional Intelligence",
  "Conflict Resolution", "Active Listening", "Empathy",
  "Public Speaking", "Self-Motivation", "Patience", "Positive Attitude", "Stress Management", "Flexibility",
  "Resourcefulness", "Accountability", "Reliability", "Confidence","Organization",
  "Strategic Thinking", "Delegation", "Multitasking", "Persuasion", "Customer Service",
  "Presentation Skills", "Networking", "Coaching", "Mentoring", "Goal-Oriented", "Resilience", "Cultural Awareness",
  "Change Management", "Collaboration", "Initiative", "Professionalism", "Humility", "Logical Thinking",
  "Decision-Making", "Negotiation", "Analytical Thinking", "Integrity", "Self-Discipline", "Self-Improvement",
  "Conflict Management", "Creativity", "Influence",  "Adaptability",
  "Emotional Stability", "Innovation", "Team Building", "Risk Management", "Stress Tolerance",
  "Self-Awareness", "Work-Life Balance", "Dedication", "Trustworthiness", "Critical Observation",
  "Dependability", "Perseverance", "Curiosity", "Continuous Learning", "Mindfulness", "Diplomacy",
  "Entrepreneurial Mindset", "Open-Mindedness", "Relationship Building", "Conflict Mitigation", "Cross-Functional Collaboration",
  "Visionary Thinking", "Effective Delegation", "Self-Reflection", "Self-Confidence", "Ethical Judgment",
  "Customer Orientation", "Diversity Awareness", "Listening", "Storytelling", "Team Motivation",
  "Social Responsibility", "Self-Care", "Global Perspective", "Lifelong Learning"
];


export  const rupessConverter = (number:number):string => {
  const numberArr = String(number).split("");

  if (number > 999 || number <= 99999) {
    if (numberArr.length == 4) {
      const thousandSingle = numberArr[0];
      const decimal= numberArr[1]
    return   decimal !="0" ? `${thousandSingle}.${decimal}K`   :`${thousandSingle}K`
      ;
    }

    if (numberArr.length == 5) {
      const thousandDouble = numberArr.slice(0,2).join("") ;
      const decimal = numberArr[2]
      
      return   decimal !="0" ? `${thousandDouble}.${decimal}K`   :`${thousandDouble}K`
      ;
    }
  }

  if (number > 99999 ||  number <= 9999999) {
    if (numberArr.length == 6) {
      const thousandSingle = numberArr[0];
      const decimal= numberArr[1]
    return   decimal !="0" ? `${thousandSingle}.${decimal}L`   :`${thousandSingle}L`
      ;
    } 
  
  
    if (numberArr.length == 7) {
      // [1,0,0,0,0,0,0] 
      const thousandDouble = numberArr.slice(0,2).join("") ;
      const decimal = numberArr[2]
  
      return   decimal !="0" ? `${thousandDouble}.${decimal}L`   :`${thousandDouble}L` ;
    }
  }

  return ""
};

 export const  calculateDays = (dateString: string): number=> {
  // Parse the input date
  const inputDate = new Date(dateString);
  
  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in time (milliseconds)
  const differenceInTime = currentDate.getTime() - inputDate.getTime();

  // Convert the difference in time to days
  const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));

  return differenceInDays;
}