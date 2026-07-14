-- ============================================
-- YAHYA KHAN PORTFOLIO — SEED DATA
-- ============================================

-- 1. PROFILE (singleton)
INSERT INTO public.profile (
  name, role, short_bio, long_bio, photo_url, cv_url,
  available_for_work, fiverr_url, github_url
) VALUES (
  'Yahya Khan',
  'Financial Analyst & BI Developer',
  'I build dashboards, financial models & SQL/Python solutions — turning messy data into decisions that grow your business.',
  'My name is Yahya Khan, and I''m a data analyst and BI developer who enjoys turning complex data into clear, actionable insights. With a background in Accounting and Finance, I''ve worked with datasets of all shapes — some clean, many messy — and I approach each project with patience, curiosity, and structure. I spend most of my time exploring data, shaping it into something reliable, and presenting it so that people who don''t live in spreadsheets can understand it. I''m comfortable across the full analytics process: gathering requirements, designing data models, building dashboards, and walking stakeholders through insights. I use SQL, Power BI, Excel, and Python as tools, but my real focus is understanding the business goal and using data to help achieve it.',
  '/profile.png',
  '/cv.pdf',
  true,
  'https://www.fiverr.com/yahya_qureshii',
  'https://github.com/yahya-kq'
);

-- 2. SITE SETTINGS (singleton)
INSERT INTO public.site_settings (
  site_name, monogram, hero_eyebrow,
  hero_line_1, hero_line_2, hero_line_3, hero_subheadline, hero_ticker,
  footer_tagline, footer_bio
) VALUES (
  'Yahya.',
  'YK',
  'AVAILABLE FOR PROJECTS',
  'Turning',
  'Complex Data',
  'Into Clear Decisions.',
  'Your partner in transforming raw numbers into actionable insights — building Power BI dashboards, financial models, and data systems that drive smarter business decisions.',
  'Decoding Data Into Decisions ↗',
  'Let''s Build The Future of Data Decisions Together.',
  'Yahya Khan — Financial Analyst & BI Developer · Available Worldwide · yahyaqureshi012@gmail.com'
);

-- 3. CONTACT INFO (singleton)
INSERT INTO public.contact_info (
  email, whatsapp, whatsapp_display, fiverr_url, fiverr_display,
  response_time, location, availability
) VALUES (
  'yahyaqureshi012@gmail.com',
  '+923331234567',
  '+92 333 123 4567',
  'https://www.fiverr.com/yahya_qureshii',
  'fiverr.com/yahya_qureshii',
  'Within 24 hours',
  'Pakistan 🇵🇰 · Available Worldwide',
  'Open to remote engagements'
);

-- 4. STATS
INSERT INTO public.stats (value, label, display_order) VALUES
  ('11+', 'Projects', 1),
  ('9', 'BI Dashboards', 2),
  ('5.0', 'Rating', 3),
  ('1+', 'Year Experience', 4);

-- 5. SERVICES (5 entries)
INSERT INTO public.services (number, title, description, tools, icon, highlight, display_order) VALUES
  ('01', 'Power BI Dashboards',
   'Interactive dashboards that turn fragmented data into one clear story. Custom KPIs, drill-downs, real-time refresh, and stakeholder-ready visuals built for executives, not engineers.',
   ARRAY['Power BI', 'DAX', 'Power Query', 'M Language']::TEXT[],
   'LayoutDashboard', true, 1),
  ('02', 'Excel & Google Sheets',
   'Advanced spreadsheet systems — automated reports, dynamic templates, pivot models, and clean dashboards. Built to scale from one-off analysis to weekly business cadence.',
   ARRAY['Excel', 'Google Sheets', 'Formulas', 'Pivot Tables']::TEXT[],
   'Sheet', false, 2),
  ('03', 'SQL Data Analysis',
   'Deep-dive analysis on raw databases — customer segmentation, sales trends, performance comparisons, and part-to-whole contribution. Clean queries you can rerun forever.',
   ARRAY['SQL', 'MySQL', 'MS SQL Server', 'Query Optimization']::TEXT[],
   'Database', false, 3),
  ('04', 'Financial Modeling',
   'Income statements, variance analysis, budgeting, and forecasting models. From P&L breakdowns to division-level performance, built with finance-first logic and stakeholder clarity.',
   ARRAY['Financial Statements', 'Budgeting', 'Forecasting', 'Variance']::TEXT[],
   'TrendingUp', false, 4),
  ('05', 'Python Data Cleaning',
   'Messy data, gone. Cleaning, transformation, retention analysis, and exploratory work — Pandas-powered scripts that make your dataset analysis-ready and consistent.',
   ARRAY['Python', 'Pandas', 'Matplotlib', 'Data Cleaning']::TEXT[],
   'Code2', false, 5);

-- 6. DASHBOARDS (10 entries — all real Power BI projects)
INSERT INTO public.dashboards (slug, title, category, image_url, description, tools, live_preview_url, highlight, display_order) VALUES
  ('combat-sports',
   'Combat Sports Business Insights',
   'Sports · B2B Analytics',
   'https://yahya-kq.odoo.com/web/image/1101-f150f86f/454.webp',
   'Power BI solution tracking sales performance, team metrics, and growth comparisons across MoM, QoQ, and YoY trends. Built for a combat sports organization to monitor overall business health from a single dashboard.',
   ARRAY['Power BI', 'DAX', 'Sales Analytics', 'MoM/QoQ/YoY']::TEXT[],
   'https://app.powerbi.com/view?r=eyJrIjoiZDhiYTI4YWUtMTRjNi00MWFjLTliNzYtMjJkY2Q4NjBmZGE3IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9',
   true, 1)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.dashboards (slug, title, category, image_url, description, tools, live_preview_url, highlight, display_order) VALUES
  ('google-trend',
   'Google Trend Analysis',
   'Search Analytics · Career Intelligence',
   'https://yahya-kq.odoo.com/web/image/1143-137d5514/Google%2010.webp',
   'Interactive dashboard tracking global Google search trends for job-related keywords. Users can enter any keyword to update visuals showing top searches, emerging terms, and regional breakdowns — useful for career, hiring, and education planning.',
   ARRAY['Power BI', 'Google Trends', 'Keyword Analysis']::TEXT[],
   'https://app.powerbi.com/view?r=eyJrIjoiNjVmOWVkNWMtZmU1ZC00YmMxLWIxOTItNjc0MTY0YWY2MjFhIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9',
   false, 2)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.dashboards (slug, title, category, image_url, description, tools, live_preview_url, highlight, display_order) VALUES
  ('income-statement',
   'Income Statement Insights',
   'Financial Reporting',
   'https://yahya-kq.odoo.com/web/image/1354-1cc3b588/For%20Portfolio.webp',
   'Real-time insights into revenue, COGS, gross profit, EBIT, expenses, and net income. Year-over-year comparisons (2019–2020), division-level breakdowns (East/North/South/West), monthly trends, dynamic KPIs, and automated variance tracking with conditional formatting.',
   ARRAY['Power BI', 'Financial Modeling', 'Variance Analysis', 'P&L']::TEXT[],
   'https://app.powerbi.com/view?r=eyJrIjoiYjhkNzlkOTgtMjExMi00OWFmLTgzYzMtOGQzZDAwNzdkZmQzIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9',
   true, 3)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.dashboards (slug, title, category, image_url, description, tools, live_preview_url, highlight, display_order) VALUES
  ('personal-finance',
   'Personal Finance Insight',
   'Wealth & Budget Tracking',
   'https://yahya-kq.odoo.com/web/image/1123-5aaf6696/Finance%201.webp',
   'Tracks income, expenses, savings, and yearly trends with clear visibility into revenue streams, spending categories, and budget variance across multiple years. Helps identify patterns, reduce unnecessary expenses, and improve long-term planning.',
   ARRAY['Power BI', 'Personal Finance', 'Budget Variance']::TEXT[],
   'https://app.powerbi.com/view?r=eyJrIjoiNWZhMTJkOWYtNDUzYS00ZTI2LWE4MGQtMjYzNzU2MGI1NmFiIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9',
   false, 4)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.dashboards (slug, title, category, image_url, description, tools, live_preview_url, highlight, display_order) VALUES
  ('pakistan-weather',
   'Pakistan Weather Insights',
   'Real-Time API Integration',
   'https://yahya-kq.odoo.com/web/image/1134-1ad1b4ea/Weather%206.webp',
   'Real-time dashboard using live APIs to track weather across major Pakistani cities — temperature, humidity, wind speed, air quality, sunrise/sunset, and rain probability with short-term forecasts and trend visualizations.',
   ARRAY['Power BI', 'Live API', 'Real-Time Data']::TEXT[],
   'https://app.powerbi.com/view?r=eyJrIjoiZTIxNmM5OGYtMDFkMS00OTFiLWI4Y2QtNTJhMWEwZWY2M2RjIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9',
   false, 5)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.dashboards (slug, title, category, image_url, description, tools, live_preview_url, highlight, display_order) VALUES
  ('workforce-analytics',
   'Workforce Analytics',
   'HR · 1,400+ Employee Dataset',
   'https://yahya-kq.odoo.com/web/image/1121-413846e2/HR%203.webp',
   'Built on a 1,400+ employee dataset to provide insights across the full employee lifecycle. Tracks headcount changes, attrition rates, and demographic breakdowns across age, education, tenure, and job satisfaction.',
   ARRAY['Power BI', 'HR Analytics', 'Attrition Analysis']::TEXT[],
   'https://app.powerbi.com/view?r=eyJrIjoiNGQ3NWZlMTktMjgwMy00OWU3LTgzMzgtZjViNTExYTUxMGY1IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9',
   true, 6)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.dashboards (slug, title, category, image_url, description, tools, live_preview_url, highlight, display_order) VALUES
  ('logistics-operations',
   'Logistics Operations Analysis',
   'Supply Chain · Geographic Mapping',
   'https://yahya-kq.odoo.com/web/image/1157-a44dde62/Logistics%201.webp',
   'Tracks logistics performance across regions, product categories, and shipping modes. Maps state-level demand globally, visualizes seasonal trends in shipping performance, and identifies delivery bottlenecks for better resource planning.',
   ARRAY['Power BI', 'Geo Mapping', 'Supply Chain']::TEXT[],
   'https://app.powerbi.com/view?r=eyJrIjoiMGMyMTg2MmQtMWQ1MC00Mjc4LWE5ZGEtMWNkODAxOGJhMjRiIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9',
   false, 7)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.dashboards (slug, title, category, image_url, description, tools, live_preview_url, highlight, display_order) VALUES
  ('automobile-analysis',
   'Automobile Companies Analysis',
   'Multi-Brand Sales Intelligence',
   'https://yahya-kq.odoo.com/web/image/1114-6912d0b7/Auto%206.webp',
   'Tracks sales performance across leading automobile companies — sales trends over time, comparisons by car maker, and shipping mode evaluations. Customer insights and feedback reveal patterns in buying behavior and satisfaction.',
   ARRAY['Power BI', 'Sales Intelligence', 'Customer Analytics']::TEXT[],
   'https://app.powerbi.com/view?r=eyJrIjoiZTJjYjMzYzAtNWQ2Yi00ODExLWFlNmItOTJjODE3YzRkZmRhIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9',
   false, 8)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.dashboards (slug, title, category, image_url, description, tools, live_preview_url, highlight, display_order) VALUES
  ('project-performance',
   'Project Performance Analysis',
   'PMO · Budget & Status Tracking',
   'https://yahya-kq.odoo.com/web/image/1155-5610f98d/P%204.webp',
   'Monitors projects by status, deadlines, and budgets. Tracks utilization by project type, highlights key expense variances, and compares planned vs. actual performance with drill-down access to project-level details.',
   ARRAY['Power BI', 'Project Management', 'Planned vs Actual']::TEXT[],
   'https://app.powerbi.com/view?r=eyJrIjoiYTA3MTQwMGQtNDRiNC00MjE2LWFmMWQtMDVmZjhkYzMxZmE0IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9',
   false, 9)
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.dashboards (slug, title, category, image_url, description, tools, live_preview_url, highlight, display_order) VALUES
  ('superstore-sales',
   'Superstore Sales Analysis',
   'Retail · Multi-Region Sales',
   'https://yahya-kq.odoo.com/web/image/1159-1265dc07/Superstore%201.webp',
   'Analyzes sales performance across customer segments, regions, and product categories. Visualizes monthly sales and profit trends, top sub-categories, payment preferences, and shipping cost analysis with state-level geographic mapping.',
   ARRAY['Power BI', 'Retail Analytics', 'Geo Mapping']::TEXT[],
   'https://app.powerbi.com/view?r=eyJrIjoiYmViY2IwZjYtNjFjMy00ZjkyLWI0NGEtNGZiZTFlNzI0Mjk1IiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9',
   false, 10)
ON CONFLICT (slug) DO NOTHING;

-- 7. DASHBOARD CAPABILITIES
INSERT INTO public.dashboard_capabilities (title, description, icon, display_order) VALUES
  ('KPI Dashboards', 'Executive-ready visuals with custom KPIs and drill-down filters.', 'Gauge', 1),
  ('Financial Reports', 'Income statements, variance analysis, and P&L breakdowns.', 'DollarSign', 2),
  ('Real-Time APIs', 'Live data refresh via API integrations for current-state monitoring.', 'Zap', 3),
  ('Multi-Source ETL', 'Consolidating fragmented data sources into one user-friendly view.', 'GitMerge', 4),
  ('Geo Analytics', 'State, regional, and country-level demand mapping on a globe.', 'Globe', 5),
  ('Trend Analysis', 'MoM, QoQ, YoY comparisons with conditional formatting and auto-flags.', 'TrendingUp', 6);

-- 8. CODE PROJECTS
INSERT INTO public.code_projects (
  slug, title, subtitle, category, description, features, stack, stats,
  github_url, code_snippet, code_filename, display_order
) VALUES (
  'bike-retail',
  'Bike Retail Business Analysis',
  'Advanced SQL Analytics on Retail Sales Data',
  '📊 Retail Analytics',
  'A complete SQL deep-dive into a bicycle retail business — analyzing customer behavior, product performance, and sales trends. The project covers change-over-time analysis, performance comparisons across customer segments, product segmentation, and part-to-whole contribution assessments. The insights generated help identify top customers, optimize inventory, refine marketing strategies, and support data-driven decisions that improve overall business performance.',
  '[
    {"icon": "📈", "label": "Change-Over-Time Analysis"},
    {"icon": "🎯", "label": "Customer Segmentation"},
    {"icon": "🛒", "label": "Product Performance"},
    {"icon": "📦", "label": "Part-To-Whole Contribution"}
  ]'::JSONB,
  ARRAY['SQL', 'MS SQL Server', 'MySQL', 'Query Optimization', 'Window Functions']::TEXT[],
  '[
    {"value": "20+", "label": "SQL Queries"},
    {"value": "8", "label": "Analysis Modules"},
    {"value": "1", "label": "Repository"}
  ]'::JSONB,
  'https://github.com/yahya-kq/Advance-Analytics/tree/main/Bike%20Retail%20Business%20Analytics',
  '-- Customer Segmentation Analysis\nWITH customer_spending AS (\n  SELECT\n    customer_id,\n    SUM(total_sales) AS lifetime_value,\n    COUNT(DISTINCT order_id) AS orders,\n    AVG(profit_margin) AS avg_margin\n  FROM bike_sales\n  GROUP BY customer_id\n)\nSELECT\n  CASE\n    WHEN lifetime_value > 5000 THEN ''VIP''\n    WHEN lifetime_value > 1000 THEN ''Regular''\n    ELSE ''New''\n  END AS segment,\n  COUNT(*) AS customers,\n  AVG(orders) AS avg_orders\nFROM customer_spending\nGROUP BY segment\nORDER BY customers DESC;',
  'customer_segmentation.sql',
  1
) ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.code_projects (
  slug, title, subtitle, category, description, features, stack, stats,
  github_url, code_snippet, code_filename, display_order
) VALUES (
  'customer-retention',
  'Customer Retention Analysis',
  'Python-Powered Retention Analytics for RDX Sports B2B',
  '🐍 Python Analytics',
  'Built during the iGATE Technologies engagement for RDX Sports'' B2B department — a Python analysis layer used to study customer retention patterns, identify churn risk, and measure repeat-purchase behavior. Combined with Excel pricing data cleanup, this work consolidated multiple data sources into a single analytical view that fed into the executive Power BI dashboard for sales and regional performance.',
  '[
    {"icon": "🔄", "label": "Retention Cohort Analysis"},
    {"icon": "📉", "label": "Churn Risk Scoring"},
    {"icon": "🧹", "label": "Pricing Sheet Cleanup"},
    {"icon": "🔗", "label": "Multi-Source Consolidation"}
  ]'::JSONB,
  ARRAY['Python', 'Pandas', 'Matplotlib', 'Excel', 'Data Cleaning']::TEXT[],
  '[
    {"value": "RDX", "label": "B2B Client"},
    {"value": "Multi", "label": "Data Sources"},
    {"value": "iGATE", "label": "Engagement"}
  ]'::JSONB,
  NULL,
  '# Cohort Retention Analysis - RDX Sports\nimport pandas as pd\nimport matplotlib.pyplot as plt\n\ndf = pd.read_csv(''sales_b2b.csv'')\ndf[''order_period''] = df[''date''].dt.to_period(''M'')\ndf[''cohort''] = df.groupby(''client_id'')[''date''] \\\n    .transform(''min'').dt.to_period(''M'')\n\ncohort_size = df.groupby(''cohort'')[''client_id''] \\\n    .nunique().reset_index()\n\nretention = df.pivot_table(\n    index=''cohort'',\n    columns=''order_period'',\n    values=''client_id'',\n    aggfunc=''nunique''\n)\n\nretention_pct = retention.divide(\n    cohort_size[''client_id''].values, axis=0\n) * 100',
  'retention_analysis.py',
  2
) ON CONFLICT (slug) DO NOTHING;

-- 9. CODE CAPABILITIES
INSERT INTO public.code_capabilities (title, icon, display_order) VALUES
  ('Complex SQL Queries', 'Database', 1),
  ('Customer Segmentation', 'Users', 2),
  ('Cohort Analysis', 'Layers', 3),
  ('Pandas Data Cleaning', 'Wand2', 4),
  ('Statistical Analysis', 'Sigma', 5),
  ('Performance Comparisons', 'GitCompare', 6),
  ('Window Functions', 'ChartLine', 7),
  ('Matplotlib Visualizations', 'BarChart3', 8);

-- 10. TESTIMONIALS
INSERT INTO public.testimonials (name, initials, country, flag, source, rating, quote, service, is_repeat_client, display_order) VALUES
  ('rondo75', 'R', 'United States', '🇺🇸', 'Fiverr', 5,
   'First time working together and very impressed with the work! He is fluent in English and had deep understanding of the task. The work was delivered fast and he was professional. I will definitely be a repeat customer!',
   'Power BI Dashboard', false, 1),
  ('rondo75', 'R', 'United States', '🇺🇸', 'Fiverr', 5,
   'He cares about his work!',
   'Repeat Project', true, 2),
  ('spartan674', 'S', 'United Kingdom', '🇬🇧', 'Fiverr', 5,
   'Khan was very understanding and gave me what I wanted in a timely fashion.',
   'Excel Analysis', false, 3),
  ('wakes89', 'W', 'United States', '🇺🇸', 'Fiverr', 5,
   'Great great job',
   'Data Cleanup', false, 4);

-- 11. WORKED WITH
INSERT INTO public.worked_with (name, monogram, category, display_order) VALUES
  ('iGATE Technologies', 'iG', 'Employer', 1),
  ('SoftTech-IT Institute', 'ST', 'Employer', 2),
  ('CUST University', 'CU', 'Education', 3),
  ('RDX Sports', 'RDX', 'Client', 4),
  ('Fiverr', 'Fi', 'Marketplace', 5),
  ('Power BI', 'PBI', 'Tool', 6),
  ('Microsoft SQL Server', 'MS', 'Tool', 7),
  ('Tableau', 'Tb', 'Tool', 8);

-- 12. SOCIAL LINKS
INSERT INTO public.social_links (label, href, username, icon, display_order) VALUES
  ('LinkedIn', 'https://www.linkedin.com/in/yahya-khan', '/in/yahya-khan', 'Linkedin', 1),
  ('GitHub', 'https://github.com/yahya-kq', '@yahya-kq', 'Github', 2),
  ('Fiverr', 'https://www.fiverr.com/yahya_qureshii', '/yahya_qureshii', 'fiverr', 3),
  ('Instagram', 'https://instagram.com/yahyaqureshi', '@yahyaqureshi', 'Instagram', 4);

-- ============================================
-- END OF SEED DATA
-- ============================================
