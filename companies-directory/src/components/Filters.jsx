import { useCompany } from '../context/CompanyContext';
import '../styles/Filters.css';

const Filters = () => {
  const {
    searchTerm,
    setSearchTerm,
    selectedIndustry,
    setSelectedIndustry,
    selectedLocation,
    setSelectedLocation,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    getUniqueIndustries,
    getUniqueLocations,
    filteredCompanies,
  } = useCompany();

  const industries = getUniqueIndustries();
  const locations = getUniqueLocations();

  const handleReset = () => {
    setSearchTerm('');
    setSelectedIndustry('');
    setSelectedLocation('');
    setSortBy('name');
    setSortOrder('asc');
  };

  return (
    <div className="filters-container">
      <div className="filters-header">
        <h2>Filters & Search</h2>
        <p className="results-count">Found {filteredCompanies?.length} companies</p>
      </div>

      <div className="filters-grid">
        {/* Search Input */}
        <div className="filter-group">
          <label htmlFor="search">Search by Name</label>
          <input
            id="search"
            type="text"
            placeholder="Enter company name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="filter-input"
          />
        </div>

        {/* Industry Filter */}
        <div className="filter-group">
          <label htmlFor="industry">Industry</label>
          <select
            id="industry"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="filter-select"
          >
            <option value="">All Industries</option>
            {industries.map((industry) => (
              <option key={industry} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        {/* Location Filter */}
        <div className="filter-group">
          <label htmlFor="location">Location</label>
          <select
            id="location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="filter-select"
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        {/* Sort By */}
        <div className="filter-group">
          <label htmlFor="sortBy">Sort By</label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="name">Company Name</option>
            <option value="industry">Industry</option>
            <option value="founded">Founded Year</option>
            <option value="employees">Number of Employees</option>
          </select>
        </div>

        {/* Sort Order */}
        <div className="filter-group">
          <label htmlFor="sortOrder">Order</label>
          <select
            id="sortOrder"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="filter-select"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>

        {/* Reset Button */}
        <div className="reset-group">
          <button onClick={handleReset} className="reset-button">
            Reset Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default Filters;
