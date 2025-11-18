import { createContext, useState, useEffect, useCallback, useContext } from 'react';
import companiesData from '../api/companies.json';

export const CompanyContext = createContext();

export const CompanyProvider = ({ children }) => {
  const [companies, setCompanies] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const itemsPerPage = 5;

  // API call to load companies
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setCompanies(companiesData);
        setError(null);
      } catch (err) {
        setError('Failed to load companies');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, []);

  // Filter and sort companies
  useEffect(() => {
    let result = [...companies];
    if (searchTerm) {
      result = result.filter((company) =>
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // industry filter
    if (selectedIndustry) {
      result = result.filter((company) => company.industry === selectedIndustry);
    }

    // location filter
    if (selectedLocation) {
      result = result.filter((company) =>
        company.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // sorting
    result.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];

      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = bValue.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    setFilteredCompanies(result);
    setCurrentPage(1); // Reset to first page when filters change
  }, [companies, searchTerm, selectedIndustry, selectedLocation, sortBy, sortOrder]);

  // Get unique industries
  const getUniqueIndustries = useCallback(() => {
    return [...new Set(companies.map((company) => company.industry))].sort();
  }, [companies]);

  // Get unique locations
  const getUniqueLocations = useCallback(() => {
    return [...new Set(companies.map((company) => company.location))].sort();
  }, [companies]);

  // Get paginated companies
  const getPaginatedCompanies = useCallback(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredCompanies.slice(startIndex, endIndex);
  }, [filteredCompanies, currentPage, itemsPerPage]);

  // Get total pages
  const getTotalPages = useCallback(() => {
    return Math.ceil(filteredCompanies.length / itemsPerPage);
  }, [filteredCompanies, itemsPerPage]);

  const value = {
    // Data
    companies,
    filteredCompanies,
    paginatedCompanies: getPaginatedCompanies(),
    loading,
    error,

    // Filters
    searchTerm,
    setSearchTerm,
    selectedIndustry,
    setSelectedIndustry,
    selectedLocation,
    setSelectedLocation,

    // Sorting
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,

    // Pagination
    currentPage,
    setCurrentPage,
    totalPages: getTotalPages(),
    itemsPerPage,

    // Helpers
    getUniqueIndustries,
    getUniqueLocations,
  };

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  );
};

export const useCompany = () => useContext(CompanyContext);