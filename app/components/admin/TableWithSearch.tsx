import React, { useState } from 'react';

interface TableProps {
  data: Array<Record<string, any>>;
  columns: string[];
}

const TableWithSearch: React.FC<TableProps> = ({ data, columns }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredData = data.filter(row =>
    columns.some(column => 
      String(row[column]).toLowerCase().includes(searchTerm)
    )
  );

  return (
    <div className="p-4">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
        className="mb-4 p-2 border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-400"
      />
      <table className="min-w-full divide-y divide-gray-700 bg-gray-900 text-white">
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-800">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap">
                    {row[col]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithSearch;
