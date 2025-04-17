import { Briefcase, Code, Brush, BarChartIcon as ChartBar, Users } from 'lucide-react';
import "../jobscreens/dashboardcss.css"
import Navbar from '../../../widgets/navbar';
import JobListingPage from './joblist';
const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar/>
      {/* <header className="header">
        <div className="header-content">
          <h1>Talent Hive</h1>
          <p className="subtitle">Connecting professionals to opportunities</p>
        </div>
      </header> */}

      <div className="search-container">
        <h2 className="search-title">Find the perfect job or talent</h2>
        <div className="search-bar">
          <input type="text" placeholder="Search for jobs, skills, or freelancers..." className="search-input" />
          <button className="search-btn">Search</button>
        </div>
      </div>

      <div className="main-content">
        <div className="categories">
          <CategoryCard icon={<Briefcase size={24} />} title="Full-time Jobs" description="Find stable employment with top companies worldwide" />
          <CategoryCard icon={<Code size={24} />} title="Development" description="Connect with skilled developers for your projects" />
          <CategoryCard icon={<Brush size={24} />} title="Design" description="Discover creative designers to bring your vision to life" />
          <CategoryCard icon={<ChartBar size={24} />} title="Marketing" description="Find experts to grow your business and audience" />
        </div>

        <JobListingPage/>
      </div>

     
    </div>
  );
}

const CategoryCard = ({ icon, title, description }) => (
  <div className="category-card">
    <div className="category-icon">{icon}</div>
    <h3 className="category-title">{title}</h3>
    <p className="category-description">{description}</p>
  </div>
);

const FeaturedCard = ({ title, description, type, salary }) => (
  <div className="featured-card">
    <div className="featured-image">
      <Users size={48} color="#3b82f6" />
    </div>
    <div className="featured-content">
      <h3 className="featured-title">{title}</h3>
      <p className="featured-description">{description}</p>
      <div className="featured-meta">
        <span>{type}</span>
        <span>{salary}</span>
      </div>
    </div>
  </div>
);

export default Dashboard;
