export interface Site {
  name: string;
  title: string;
  description: string;
  email: string;
  whatsapp: string;
  location: string;
  monogram: string;
}

export interface NavLink {
  id: string;
  label: string;
  href: string;
}

export interface Service {
  number: string;
  title: string;
  description: string;
  tools: string[];
  icon: string;
  highlight?: boolean;
}

export interface Dashboard {
  slug: string;
  title: string;
  category: string;
  image: string;
  description: string;
  tools: string[];
  livePreview?: string;
  highlight?: boolean;
}

export interface DashboardCapability {
  title: string;
  description: string;
  icon: string;
}

export interface SqlProject {
  title: string;
  description: string;
  language: "SQL" | "Python";
  href?: string;
  tags?: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  initials: string;
  country: string;
  flag: string;
  source: "Fiverr" | "Web Client";
  rating: number;
  quote: string;
  service: string;
  repeat?: boolean;
}

export interface TestimonialStat {
  value: string;
  label: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Skill {
  category: string;
  items: string[];
}

export interface WorkedWith {
  name: string;
  monogram: string;
  category: string;
  accent?: string;
}

export const SITE: Site = {
  name: "Yahya.",
  title: "Yahya Khan — Financial Analyst & BI Developer",
  description:
    "Portfolio of Yahya Khan — Financial Analyst & BI Developer specializing in Power BI dashboards, SQL, and Python-driven analytics.",
  email: "yahyaqureshi012@gmail.com",
  whatsapp: "+92XXXXXXXXXX",
  location: "Pakistan",
  monogram: "YK",
};

export const NAV_LINKS = [
  { id: "home", label: "Home", href: "#home" },
  { id: "about", label: "About", href: "#about" },
  { id: "services", label: "Services", href: "#services" },
  { id: "dashboards", label: "Dashboards", href: "#dashboards" },
  { id: "sql-python", label: "SQL & Python", href: "#sql-python" },
  { id: "testimonials", label: "Testimonials", href: "#testimonials" },
] as const satisfies readonly NavLink[];

export const SERVICES: Service[] = [
  {
    number: "01",
    title: "Power BI Dashboards",
    description:
      "Interactive dashboards that turn fragmented data into one clear story. Custom KPIs, drill-downs, real-time refresh, and stakeholder-ready visuals built for executives, not engineers.",
    tools: ["Power BI", "DAX", "Power Query", "M Language"],
    icon: "LayoutDashboard",
    highlight: true,
  },
  {
    number: "02",
    title: "Excel & Google Sheets",
    description:
      "Advanced spreadsheet systems — automated reports, dynamic templates, pivot models, and clean dashboards. Built to scale from one-off analysis to weekly business cadence.",
    tools: ["Excel", "Google Sheets", "Formulas", "Pivot Tables"],
    icon: "Sheet",
  },
  {
    number: "03",
    title: "SQL Data Analysis",
    description:
      "Deep-dive analysis on raw databases — customer segmentation, sales trends, performance comparisons, and part-to-whole contribution. Clean queries you can rerun forever.",
    tools: ["SQL", "MySQL", "MS SQL Server", "Query Optimization"],
    icon: "Database",
  },
  {
    number: "04",
    title: "Financial Modeling",
    description:
      "Income statements, variance analysis, budgeting, and forecasting models. From P&L breakdowns to division-level performance, built with finance-first logic and stakeholder clarity.",
    tools: ["Financial Statements", "Budgeting", "Forecasting", "Variance"],
    icon: "TrendingUp",
  },
  {
    number: "05",
    title: "Python Data Cleaning",
    description:
      "Messy data, gone. Cleaning, transformation, retention analysis, and exploratory work — Pandas-powered scripts that make your dataset analysis-ready and consistent.",
    tools: ["Python", "Pandas", "Matplotlib", "Data Cleaning"],
    icon: "Code2",
  },
];
export const DASHBOARDS: Dashboard[] = [
  {
    slug: "combat-sports",
    title: "Combat Sports Business Insights",
    category: "Sports · B2B Analytics",
    image: "https://yahya-kq.odoo.com/web/image/1101-f150f86f/454.webp",
    description:
      "Power BI solution tracking sales performance, team metrics, and growth comparisons across MoM, QoQ, and YoY trends. Built for a combat sports organization to monitor overall business health from a single dashboard.",
    tools: ["Power BI", "DAX", "Sales Analytics", "MoM/QoQ/YoY"],
    livePreview:
      "https://app.powerbi.com/view?r=eyJrIjoiZDhiYTI4YWUtMTRjNi00MWFjLTliNzYtMjJkY2Q4NjBmZGE3IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
    highlight: true,
  },
  {
    slug: "google-trend",
    title: "Google Trend Analysis",
    category: "Search Analytics · Career Intelligence",
    image: "https://yahya-kq.odoo.com/web/image/1143-137d5514/Google%2010.webp",
    description:
      "Interactive dashboard tracking global Google search trends for job-related keywords. Users can enter any keyword to update visuals showing top searches, emerging terms, and regional breakdowns — useful for career, hiring, and education planning.",
    tools: ["Power BI", "Google Trends", "Keyword Analysis"],
    livePreview:
      "https://app.powerbi.com/view?r=eyJrIjoiNjVmOWVkNWMtZmU1ZC00YmMxLWIxOTItNjc0MTY0YWY2MjFhIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
  },
  {
    slug: "income-statement",
    title: "Income Statement Insights",
    category: "Financial Reporting",
    image: "https://yahya-kq.odoo.com/web/image/1354-1cc3b588/For%20Portfolio.webp",
    description:
      "Real-time insights into revenue, COGS, gross profit, EBIT, expenses, and net income. Year-over-year comparisons (2019–2020), division-level breakdowns (East/North/South/West), monthly trends, dynamic KPIs, and automated variance tracking with conditional formatting.",
    tools: ["Power BI", "Financial Modeling", "Variance Analysis", "P&L"],
    livePreview:
      "https://app.powerbi.com/view?r=eyJrIjoiYjhkNzlkOTgtMjExMi00OWFmLTgzYzMtOGQzZDAwNzdkZmQzIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
    highlight: true,
  },
  {
    slug: "personal-finance",
    title: "Personal Finance Insight",
    category: "Wealth & Budget Tracking",
    image: "https://yahya-kq.odoo.com/web/image/1123-5aaf6696/Finance%201.webp",
    description:
      "Tracks income, expenses, savings, and yearly trends with clear visibility into revenue streams, spending categories, and budget variance across multiple years. Helps identify patterns, reduce unnecessary expenses, and improve long-term planning.",
    tools: ["Power BI", "Personal Finance", "Budget Variance"],
    livePreview:
      "https://app.powerbi.com/view?r=eyJrIjoiNWZhMTJkOWYtNDUzYS00ZTI2LWE4MGQtMjYzNzU2MGI1NmFiIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
  },
  {
    slug: "pakistan-weather",
    title: "Pakistan Weather Insights",
    category: "Real-Time API Integration",
    image: "https://yahya-kq.odoo.com/web/image/1134-1ad1b4ea/Weather%206.webp",
    description:
      "Real-time dashboard using live APIs to track weather across major Pakistani cities — temperature, humidity, wind speed, air quality, sunrise/sunset, and rain probability with short-term forecasts and trend visualizations.",
    tools: ["Power BI", "Live API", "Real-Time Data"],
    livePreview:
      "https://app.powerbi.com/view?r=eyJrIjoiZTIxNmM5OGYtMDFkMS00OTFiLWI4Y2QtNTJhMWEwZWY2M2RjIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
  },
  {
    slug: "workforce-analytics",
    title: "Workforce Analytics",
    category: "HR · 1,400+ Employee Dataset",
    image: "https://yahya-kq.odoo.com/web/image/1121-413846e2/HR%203.webp",
    description:
      "Built on a 1,400+ employee dataset to provide insights across the full employee lifecycle. Tracks headcount changes, attrition rates, and demographic breakdowns across age, education, tenure, and job satisfaction.",
    tools: ["Power BI", "HR Analytics", "Attrition Analysis"],
    livePreview:
      "https://app.powerbi.com/view?r=eyJrIjoiNGQ3NWZlMTktMjgwMy00OWU3LTgzMzgtZjViNTExYTUxMGY1IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
    highlight: true,
  },
  {
    slug: "logistics-operations",
    title: "Logistics Operations Analysis",
    category: "Supply Chain · Geographic Mapping",
    image: "https://yahya-kq.odoo.com/web/image/1157-a44dde62/Logistics%201.webp",
    description:
      "Tracks logistics performance across regions, product categories, and shipping modes. Maps state-level demand globally, visualizes seasonal trends in shipping performance, and identifies delivery bottlenecks for better resource planning.",
    tools: ["Power BI", "Geo Mapping", "Supply Chain"],
    livePreview:
      "https://app.powerbi.com/view?r=eyJrIjoiMGMyMTg2MmQtMWQ1MC00Mjc4LWE5ZGEtMWNkODAxOGJhMjRiIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
  },
  {
    slug: "automobile-analysis",
    title: "Automobile Companies Analysis",
    category: "Multi-Brand Sales Intelligence",
    image: "https://yahya-kq.odoo.com/web/image/1114-6912d0b7/Auto%206.webp",
    description:
      "Tracks sales performance across leading automobile companies — sales trends over time, comparisons by car maker, and shipping mode evaluations. Customer insights and feedback reveal patterns in buying behavior and satisfaction.",
    tools: ["Power BI", "Sales Intelligence", "Customer Analytics"],
    livePreview:
      "https://app.powerbi.com/view?r=eyJrIjoiZTJjYjMzYzAtNWQ2Yi00ODExLWFlNmItOTJjODE3YzRkZmRhIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
  },
  {
    slug: "project-performance",
    title: "Project Performance Analysis",
    category: "PMO · Budget & Status Tracking",
    image: "https://yahya-kq.odoo.com/web/image/1155-5610f98d/P%204.webp",
    description:
      "Monitors projects by status, deadlines, and budgets. Tracks utilization by project type, highlights key expense variances, and compares planned vs. actual performance with drill-down access to project-level details.",
    tools: ["Power BI", "Project Management", "Planned vs Actual"],
    livePreview:
      "https://app.powerbi.com/view?r=eyJrIjoiYTA3MTQwMGQtNDRiNC00MjE2LWFmMWQtMDVmZjhkYzMxZmE0IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
  },
  {
    slug: "superstore-sales",
    title: "Superstore Sales Analysis",
    category: "Retail · Multi-Region Sales",
    image: "https://yahya-kq.odoo.com/web/image/1159-1265dc07/Superstore%201.webp",
    description:
      "Analyzes sales performance across customer segments, regions, and product categories. Visualizes monthly sales and profit trends, top sub-categories, payment preferences, and shipping cost analysis with state-level geographic mapping.",
    tools: ["Power BI", "Retail Analytics", "Geo Mapping"],
    livePreview:
      "https://app.powerbi.com/view?r=eyJrIjoiYmViY2IwZjYtNjFjMy00ZjkyLWI0NGEtNGZiZTFlNzI0Mjk1IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9",
  },
];

export const DASHBOARD_CAPABILITIES: DashboardCapability[] = [
  {
    title: "KPI Dashboards",
    description: "Executive-ready visuals with custom KPIs and drill-down filters.",
    icon: "Gauge",
  },
  {
    title: "Financial Reports",
    description: "Income statements, variance analysis, and P&L breakdowns.",
    icon: "DollarSign",
  },
  {
    title: "Real-Time APIs",
    description: "Live data refresh via API integrations for current-state monitoring.",
    icon: "Zap",
  },
  {
    title: "Multi-Source ETL",
    description: "Consolidating fragmented data sources into one user-friendly view.",
    icon: "GitMerge",
  },
  {
    title: "Geo Analytics",
    description: "State, regional, and country-level demand mapping on a globe.",
    icon: "Globe",
  },
  {
    title: "Trend Analysis",
    description: "MoM, QoQ, YoY comparisons with conditional formatting and auto-flags.",
    icon: "TrendingUp",
  },
];

export const DATA_STACK: string[] = [
  "Power BI",
  "DAX",
  "Power Query",
  "M Language",
  "SQL",
  "Python",
  "Pandas",
  "Excel",
  "Tableau",
  "MySQL",
  "MS SQL Server",
  "Figma",
];
export const SQL_PROJECTS: SqlProject[] = [];

export interface CodeProject {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  features: { icon: string; label: string }[];
  stack: string[];
  stats: { value: string; label: string }[];
  github?: string;
  livePreview?: string;
}

export const CODE_PROJECTS: CodeProject[] = [
  {
    slug: "bike-retail",
    title: "Bike Retail Business Analysis",
    subtitle: "Advanced SQL Analytics on Retail Sales Data",
    category: "📊 Retail Analytics",
    description:
      "A complete SQL deep-dive into a bicycle retail business — analyzing customer behavior, product performance, and sales trends. The project covers change-over-time analysis, performance comparisons across customer segments, product segmentation, and part-to-whole contribution assessments. The insights generated help identify top customers, optimize inventory, refine marketing strategies, and support data-driven decisions that improve overall business performance.",
    features: [
      { icon: "📈", label: "Change-Over-Time Analysis" },
      { icon: "🎯", label: "Customer Segmentation" },
      { icon: "🛒", label: "Product Performance" },
      { icon: "📦", label: "Part-To-Whole Contribution" },
    ],
    stack: ["SQL", "MS SQL Server", "MySQL", "Query Optimization", "Window Functions"],
    stats: [
      { value: "20+", label: "SQL Queries" },
      { value: "8", label: "Analysis Modules" },
      { value: "1", label: "Repository" },
    ],
    github:
      "https://github.com/yahya-kq/Advance-Analytics/tree/main/Bike%20Retail%20Business%20Analytics",
  },
  {
    slug: "customer-retention",
    title: "Customer Retention Analysis",
    subtitle: "Python-Powered Retention Analytics for RDX Sports B2B",
    category: "🐍 Python Analytics",
    description:
      "Built during the iGATE Technologies engagement for RDX Sports' B2B department — a Python analysis layer used to study customer retention patterns, identify churn risk, and measure repeat-purchase behavior. Combined with Excel pricing data cleanup, this work consolidated multiple data sources into a single analytical view that fed into the executive Power BI dashboard for sales and regional performance.",
    features: [
      { icon: "🔄", label: "Retention Cohort Analysis" },
      { icon: "📉", label: "Churn Risk Scoring" },
      { icon: "🧹", label: "Pricing Sheet Cleanup" },
      { icon: "🔗", label: "Multi-Source Consolidation" },
    ],
    stack: ["Python", "Pandas", "Matplotlib", "Excel", "Data Cleaning"],
    stats: [
      { value: "RDX", label: "B2B Client" },
      { value: "Multi", label: "Data Sources" },
      { value: "iGATE", label: "Engagement" },
    ],
  },
];

export interface CodeCapability {
  title: string;
  icon: string;
}

export const CODE_CAPABILITIES: CodeCapability[] = [
  { title: "Complex SQL Queries", icon: "Database" },
  { title: "Customer Segmentation", icon: "Users" },
  { title: "Cohort Analysis", icon: "Layers" },
  { title: "Pandas Data Cleaning", icon: "Wand2" },
  { title: "Statistical Analysis", icon: "Sigma" },
  { title: "Performance Comparisons", icon: "GitCompare" },
  { title: "Window Functions", icon: "ChartLine" },
  { title: "Matplotlib Visualizations", icon: "BarChart3" },
];

export const CODE_STACK: string[] = [
  "Python",
  "SQL",
  "Pandas",
  "Matplotlib",
  "MS SQL Server",
  "MySQL",
  "Excel",
  "Window Functions",
  "Cohort Analysis",
  "Data Cleaning",
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "rondo75",
    initials: "R",
    country: "United States",
    flag: "🇺🇸",
    source: "Fiverr",
    rating: 5,
    quote:
      "First time working together and very impressed with the work! He is fluent in English and had deep understanding of the task. The work was delivered fast and he was professional. I will definitely be a repeat customer!",
    service: "Power BI Dashboard",
  },
  {
    id: "t2",
    name: "rondo75",
    initials: "R",
    country: "United States",
    flag: "🇺🇸",
    source: "Fiverr",
    rating: 5,
    quote: "He cares about his work!",
    service: "Repeat Project",
    repeat: true,
  },
  {
    id: "t3",
    name: "spartan674",
    initials: "S",
    country: "United Kingdom",
    flag: "🇬🇧",
    source: "Fiverr",
    rating: 5,
    quote: "Khan was very understanding and gave me what I wanted in a timely fashion.",
    service: "Excel Analysis",
  },
  {
    id: "t4",
    name: "wakes89",
    initials: "W",
    country: "United States",
    flag: "🇺🇸",
    source: "Fiverr",
    rating: 5,
    quote: "Great great job",
    service: "Data Cleanup",
  },
];

export const TESTIMONIAL_STATS: TestimonialStat[] = [
  { value: "5.0", label: "Avg Rating" },
  { value: "4", label: "5-Star Reviews" },
  { value: "100%", label: "Satisfaction" },
  { value: "1", label: "Repeat Client" },
];

export const STATS: Stat[] = [
  { value: "11+", label: "Projects" },
  { value: "9", label: "BI Dashboards" },
  { value: "5.0", label: "Rating" },
  { value: "1+", label: "Year Experience" },
];

export const SKILLS: Skill[] = [
  { category: "Languages", items: ["Python", "SQL"] },
  { category: "BI & Visualization", items: ["Power BI", "Tableau", "Excel", "Figma"] },
  { category: "Databases", items: ["MySQL", "Microsoft SQL Server"] },
  { category: "Libraries", items: ["Pandas", "Matplotlib"] },
  { category: "Finance Tools", items: ["QuickBooks", "SAP"] },
  { category: "Analytics", items: ["BI", "Statistical Analysis", "Data Modeling", "Financial Modeling"] },
];

export const ABOUT_BIO =
  "I'm Yahya Khan, a Financial Analyst & BI Developer who turns complex data into clear, actionable insights. With a background in Accounting and Finance, I've worked across the full analytics process — from messy datasets to polished dashboards. I use SQL, Power BI, Excel, and Python as tools, but my real focus is understanding the business goal and using data to help achieve it.";

export const WORKED_WITH: WorkedWith[] = [
  { name: "iGATE Technologies", monogram: "iG", category: "Employer" },
  { name: "SoftTech-IT Institute", monogram: "ST", category: "Employer" },
  { name: "CUST University", monogram: "CU", category: "Education" },
  { name: "RDX Sports", monogram: "RDX", category: "Client" },
  { name: "Fiverr", monogram: "Fi", category: "Marketplace" },
  { name: "Power BI", monogram: "PBI", category: "Tool" },
  { name: "Microsoft SQL Server", monogram: "MS", category: "Tool" },
  { name: "Tableau", monogram: "Tb", category: "Tool" },
];

export const QUICK_FACTS = [
  { label: "Education", value: "BS Accounting & Finance, CUST University" },
  { label: "Specialization", value: "Power BI & Financial Modeling" },
  { label: "Status", value: "Open to Work · Available Worldwide" },
  { label: "Location", value: "Pakistan 🇵🇰" },
];

export interface SocialLink {
  label: string;
  href: string;
  username: string;
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/yahya-khan",
    username: "/in/yahya-khan",
    icon: "Linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/yahya-kq",
    username: "@yahya-kq",
    icon: "Github",
  },
  {
    label: "Fiverr",
    href: "https://www.fiverr.com/yahya_qureshii",
    username: "/yahya_qureshii",
    icon: "fiverr",
  },
  {
    label: "Instagram",
    href: "https://instagram.com/yahyaqureshi",
    username: "@yahyaqureshi",
    icon: "Instagram",
  },
];

export const FOOTER_TAGLINE = "Let's Build The Future of Data Decisions Together.";

export const FOOTER_BIO =
  "Yahya Khan — Financial Analyst & BI Developer · Available Worldwide · yahyaqureshi012@gmail.com";

export const CONTACT_INFO = {
  email: "yahyaqureshi012@gmail.com",
  whatsapp: "+923331234567",
  whatsappDisplay: "+92 333 123 4567",
  fiverrUrl: "https://www.fiverr.com/yahya_qureshii",
  fiverrDisplay: "fiverr.com/yahya_qureshii",
  responseTime: "Within 24 hours",
  location: "Pakistan 🇵🇰 · Available Worldwide",
  availability: "Open to remote engagements",
} as const;
