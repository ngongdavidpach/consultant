import React, { useState } from 'react';
import { Database, Download, Shield, TrendingUp, Search, Filter, Star, Clock } from 'lucide-react';

export const DataMarketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const datasets = [
    {
      id: 1,
      title: 'Water Access Survey Data - Central Equatoria',
      description: 'Comprehensive household survey data on water access patterns, quality measurements, and usage statistics from 2,500 households.',
      category: 'Water & Sanitation',
      provider: 'Water for South Sudan',
      price: 299,
      rating: 4.8,
      downloads: 45,
      dataPoints: 25000,
      lastUpdated: '2024-01-15',
      license: 'Standard Commercial',
      format: 'CSV, JSON',
      timeframe: '2023-2024',
      geographical: 'Central Equatoria State',
      tags: ['water-access', 'survey', 'household', 'quality'],
      featured: true,
    },
    {
      id: 2,
      title: 'Healthcare Facility Mapping Dataset',
      description: 'Geospatial data of healthcare facilities across South Sudan with capacity, services, and accessibility information.',
      category: 'Healthcare',
      provider: 'International Medical Corps',
      price: 450,
      rating: 4.9,
      downloads: 32,
      dataPoints: 15000,
      lastUpdated: '2024-01-10',
      license: 'Extended Commercial',
      format: 'GeoJSON, KML',
      timeframe: '2023-2024',
      geographical: 'National Coverage',
      tags: ['healthcare', 'facilities', 'mapping', 'accessibility'],
      featured: false,
    },
    {
      id: 3,
      title: 'Agricultural Production Statistics',
      description: 'Crop yield data, seasonal patterns, and market prices from 500 agricultural cooperatives across multiple states.',
      category: 'Agriculture',
      provider: 'FAO South Sudan',
      price: 199,
      rating: 4.6,
      downloads: 67,
      dataPoints: 18000,
      lastUpdated: '2024-01-12',
      license: 'Standard Commercial',
      format: 'CSV, Excel',
      timeframe: '2022-2024',
      geographical: 'Multi-State',
      tags: ['agriculture', 'yield', 'market', 'cooperatives'],
      featured: true,
    },
    {
      id: 4,
      title: 'Education Enrollment and Outcomes',
      description: 'Student enrollment, attendance, and learning outcome data from primary and secondary schools.',
      category: 'Education',
      provider: 'Education Partnership',
      price: 350,
      rating: 4.7,
      downloads: 28,
      dataPoints: 30000,
      lastUpdated: '2024-01-08',
      license: 'Academic Research',
      format: 'CSV, SPSS',
      timeframe: '2023-2024',
      geographical: 'Regional Coverage',
      tags: ['education', 'enrollment', 'outcomes', 'schools'],
      featured: false,
    },
    {
      id: 5,
      title: 'Gender-Based Violence Prevention Program Data',
      description: 'Program impact data from GBV prevention initiatives including training effectiveness and community engagement metrics.',
      category: 'Social Protection',
      provider: 'UN Women South Sudan',
      price: 175,
      rating: 4.5,
      downloads: 19,
      dataPoints: 8000,
      lastUpdated: '2024-01-14',
      license: 'Research Only',
      format: 'CSV, JSON',
      timeframe: '2023-2024',
      geographical: 'Urban Centers',
      tags: ['gbv', 'prevention', 'training', 'community'],
      featured: false,
    },
    {
      id: 6,
      title: 'Conflict-Sensitive Programming Indicators',
      description: 'Risk assessment data and conflict sensitivity indicators for development programming in high-risk areas.',
      category: 'Security',
      provider: 'Conflict Prevention Network',
      price: 525,
      rating: 4.9,
      downloads: 15,
      dataPoints: 12000,
      lastUpdated: '2024-01-11',
      license: 'Restricted Commercial',
      format: 'JSON, XML',
      timeframe: '2023-2024',
      geographical: 'High-Risk Areas',
      tags: ['conflict', 'risk', 'programming', 'security'],
      featured: true,
    },
  ];

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.tags.some(tag => tag.includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || dataset.category === selectedCategory;
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === 'low' && dataset.price < 200) ||
                        (priceRange === 'medium' && dataset.price >= 200 && dataset.price < 400) ||
                        (priceRange === 'high' && dataset.price >= 400);

    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedDatasets = [...filteredDatasets].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.downloads - a.downloads;
      case 'rating':
        return b.rating - a.rating;
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'newest':
        return new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime();
      default:
        return 0;
    }
  });

  const categories = ['all', 'Water & Sanitation', 'Healthcare', 'Agriculture', 'Education', 'Social Protection', 'Security'];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Data Marketplace
        </h1>
        <p className="text-gray-600">
          Access and monetize development data through secure digital licensing
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search datasets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <select
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Prices</option>
            <option value="low">Under $200</option>
            <option value="medium">$200 - $400</option>
            <option value="high">Over $400</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="popular">Most Popular</option>
            <option value="rating">Highest Rated</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="newest">Newest First</option>
          </select>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-gray-600">
            Showing {sortedDatasets.length} of {datasets.length} datasets
          </span>
          <div className="flex space-x-2">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
              Sell Your Data
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm">
              Bulk Purchase
            </button>
          </div>
        </div>
      </div>

      {/* Featured Datasets */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Datasets</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedDatasets.filter(dataset => dataset.featured).slice(0, 3).map((dataset) => (
            <div key={dataset.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Database className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-600">{dataset.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600">{dataset.rating}</span>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{dataset.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{dataset.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{dataset.dataPoints.toLocaleString()}</span> data points
                  </div>
                  <div className="text-sm text-gray-600">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {formatDate(dataset.lastUpdated)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900">${dataset.price}</span>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Datasets */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">All Datasets</h2>
        </div>
        <div className="divide-y divide-gray-200">
          {sortedDatasets.map((dataset) => (
            <div key={dataset.id} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {dataset.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-600">{dataset.rating}</span>
                    </div>
                    <span className="text-sm text-gray-600">
                      {dataset.downloads} downloads
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{dataset.title}</h3>
                  <p className="text-gray-600 mb-3">{dataset.description}</p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                    <div>
                      <span className="font-medium">Provider:</span> {dataset.provider}
                    </div>
                    <div>
                      <span className="font-medium">Data Points:</span> {dataset.dataPoints.toLocaleString()}
                    </div>
                    <div>
                      <span className="font-medium">Format:</span> {dataset.format}
                    </div>
                    <div>
                      <span className="font-medium">Coverage:</span> {dataset.geographical}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {dataset.tags.map((tag, index) => (
                      <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="ml-6 text-right">
                  <div className="text-2xl font-bold text-gray-900 mb-2">${dataset.price}</div>
                  <div className="text-sm text-gray-600 mb-3">{dataset.license}</div>
                  <div className="flex flex-col space-y-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors text-sm">
                      Request License
                    </button>
                    <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-sm">
                      Preview Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selling Section */}
      <div className="mt-12 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Have Data to Sell?
          </h2>
          <p className="text-gray-600 mb-6">
            Monetize your development data through our secure marketplace with automated licensing
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-lg p-6">
              <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Secure Licensing</h3>
              <p className="text-sm text-gray-600">Automated digital licensing with usage tracking</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <TrendingUp className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Revenue Sharing</h3>
              <p className="text-sm text-gray-600">Competitive revenue sharing with transparent pricing</p>
            </div>
            <div className="bg-white rounded-lg p-6">
              <Database className="w-8 h-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Quality Control</h3>
              <p className="text-sm text-gray-600">Automated quality checks and metadata validation</p>
            </div>
          </div>
          <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
            Start Selling Your Data
          </button>
        </div>
      </div>
    </div>
  );
};