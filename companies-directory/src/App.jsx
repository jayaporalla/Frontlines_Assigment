import Filters from './components/Filters';
import CompaniesTable from './components/CompaniesTable';
import Pagination from './components/Pagination';
import './App.css';

function App() {
  return (
    <>
      <div className="app-container">
        {/* Header */}
        <header className="app-header">
          <div className="header-content">
            <h1>🏢 Companies Directory</h1>
            <p>Browse and filter companies from around the world</p>
          </div>
        </header>

        {/* Main Content */}
        <main className="app-main">
          {/* Filters Section */}
          <section className="filters-section">
            <Filters />
          </section>

          {/* Table Section */}
          <section className="table-section">
            <CompaniesTable />
          </section>

          {/* Pagination Section */}
          <section className="pagination-section">
            <Pagination />
          </section>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <p>&copy; 2025 Companies Directory</p>
        </footer>
      </div>
    </>
  );
}

export default App;
