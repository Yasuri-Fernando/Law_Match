import React, { useState } from 'react';
import { Search, Building, Globe, Heart, Filter, ExternalLink, Download } from 'lucide-react';
import { NGO, sriLankaNGOs, getAllCategories, getAllFocusAreas } from '../data/ngoDatabase';

export default function NGODirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFocus, setSelectedFocus] = useState('all');

  // Get unique categories
  const categories = getAllCategories();
  
  // Get unique focus areas
  const uniqueFocusAreas = getAllFocusAreas();

  // Filter NGOs based on search term, category, and focus area
  const filteredNGOs = sriLankaNGOs.filter(ngo => {
    const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ngo.category === selectedCategory;
    const matchesFocus = selectedFocus === 'all' || ngo.focus.includes(selectedFocus);
    
    return matchesSearch && matchesCategory && matchesFocus;
  });

  // Function to export NGO data as CSV
  const exportToCSV = () => {
    // Create CSV header
    const headers = ['Name', 'Category', 'Focus Areas', 'Description', 'Website', 'Contact', 'Address', 'Established'];
    
    // Convert NGO data to CSV rows
    const csvRows = filteredNGOs.map(ngo => [
      ngo.name,
      ngo.category,
      ngo.focus.join('; '),
      ngo.description,
      ngo.website || '',
      ngo.contact || '',
      ngo.address || '',
      ngo.established || ''
    ].map(value => `"${value.replace(/"/g, '""')}"`).join(','));
    
    // Combine header and rows
    const csvContent = [headers.join(','), ...csvRows].join('\n');
    
    // Create a Blob and download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'sri_lanka_ngos.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2 mb-4">
            <Heart className="h-8 w-8 text-red-600" />
            NGOs in Sri Lanka
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Explore non-governmental organizations (NGOs) working across Sri Lanka in various sectors including humanitarian aid, development, education, health, environmental protection, and more.
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search NGOs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Filter className="h-4 w-4 inline mr-1" /> Filter by Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Filter className="h-4 w-4 inline mr-1" /> Filter by Focus Area
              </label>
              <select
                value={selectedFocus}
                onChange={(e) => setSelectedFocus(e.target.value)}
                className="w-full border border-gray-300 rounded-md shadow-sm px-4 py-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Focus Areas</option>
                {uniqueFocusAreas.map(focus => (
                  <option key={focus} value={focus}>{focus}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count and Export Button */}
        <div className="mb-4 flex justify-between items-center">
          <div className="text-gray-600">
            Showing {filteredNGOs.length} of {sriLankaNGOs.length} NGOs
          </div>
          <button 
            onClick={exportToCSV}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download className="h-5 w-5" />
            Export to CSV
          </button>
        </div>

        {/* NGO List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNGOs.length > 0 ? (
            filteredNGOs.map((ngo) => (
              <div key={ngo.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{ngo.name}</h3>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mt-1">
                        {ngo.category}
                      </span>
                    </div>
                    {ngo.logo && (
                      <img 
                        src={ngo.logo} 
                        alt={`${ngo.name} logo`} 
                        className="w-12 h-12 object-contain rounded"
                      />
                    )}
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                    {ngo.description}
                  </p>
                  
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-1 mt-2">
                      {ngo.focus.slice(0, 3).map((focus, index) => (
                        <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          {focus}
                        </span>
                      ))}
                      {ngo.focus.length > 3 && (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          +{ngo.focus.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-500">
                    {ngo.established && (
                      <div className="flex items-center gap-1 mb-1">
                        <span className="font-medium">Established:</span> {ngo.established}
                      </div>
                    )}
                    {ngo.address && (
                      <div className="flex items-center gap-1 mb-1">
                        <Building className="h-4 w-4" />
                        <span className="truncate">{ngo.address}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 flex justify-between items-center">
                    {ngo.website ? (
                      <a 
                        href={ngo.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-blue-600 hover:text-blue-800"
                      >
                        <Globe className="h-4 w-4 mr-1" />
                        Visit Website
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                    ) : (
                      <span className="text-gray-400 text-sm">No website available</span>
                    )}
                    
                    {ngo.contact && (
                      <span className="text-sm text-gray-500">{ngo.contact}</span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-12 text-gray-500">
              No NGOs found matching your criteria. Try adjusting your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}