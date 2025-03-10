import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AppContext } from '../content/AppContext';

const Lawyers = () => {
  const { speciality } = useParams();
  const { lawyers } = useContext(AppContext);
  const navigate = useNavigate();
  const [filterLawyers, setFilterLawyers] = useState([]);
  const [showFilter,setShowFilter] = useState(false)

  useEffect(() => {
    if (speciality) {
      setFilterLawyers(lawyers.filter((lawyer) => lawyer.speciality === speciality));
    } else {
      setFilterLawyers(lawyers);
    }
  }, [lawyers, speciality]); // ✅ Correct dependency list

  return (
    <div className="px-5">
      <p className="text-gray-600">Browse through the lawyers' specialties.</p>
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
      <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${showFilter ? 'bg-primary text-white' : ''}`} onClick={() => setShowFilter(prev => !prev)}>Filters
      </button>

        {/* Sidebar for Specialties */}
        <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showFilter ? 'flex' : 'hidden sm:flex'}`}>

          {[
            "Property law",
            "Civil law",
            "Family law",
            "International law",
            "Criminal law",
            "Human rights law",
          ].map((lawType) => (
            <p
              key={lawType}
              onClick={() => navigate(speciality === lawType ? "/lawyers" : `/lawyers/${lawType}`)}
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === lawType ? "bg-indigo-100 text-black" : ""
              }`}
            >
              {lawType}
            </p>
          ))}
        </div>

        {/* Lawyers List */}
        <div className="w-full grid grid-cols-auto gap-4 gap-y-6">
          {filterLawyers.length > 0 ? (
            filterLawyers.map((item) => (
              <div
                key={item._id} // ✅ Use `_id` instead of index
                onClick={() => navigate(`/appointment/${item._id}`)}
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              >
                <img className="bg-blue-50 w-full h-40 object-cover" src={item.image} alt={item.name} />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No lawyers available for this specialty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lawyers;
