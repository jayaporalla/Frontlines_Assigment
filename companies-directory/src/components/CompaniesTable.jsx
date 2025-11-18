import { useCompany } from '../context/CompanyContext';
import '../styles/CompaniesTable.css';

const CompaniesTable = () => {
  const { paginatedCompanies, loading, error } = useCompany();

  if (loading) {
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading companies...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-state">
        <p className="error-message">⚠️ {error}</p>
      </div>
    );
  }

  if (paginatedCompanies.length === 0) {
    return (
      <div className="empty-state">
        <p>No companies found matching your filters.</p>
      </div>
    );
  }

  return (
    <div className="companies-table-container">
      <table className="companies-table">
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Industry</th>
            <th>Location</th>
            <th>Founded</th>
            <th>Employees</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {paginatedCompanies.map((company) => (
            <tr key={company.id} className="company-row">
              <td className="company-name">{company.name}</td>
              <td className="company-industry">{company.industry}</td>
              <td className="company-location">{company.location}</td>
              <td className="company-founded">{company.founded}</td>
              <td className="company-employees">
                {company.employees.toLocaleString()}
              </td>
              <td className="company-website">
                <a href={company.website} target="_blank" rel="noopener noreferrer">
                  Visit
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompaniesTable;
