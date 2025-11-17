
import React from 'react';
import { DocumentTextIcon } from './icons/DocumentTextIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 md:px-6 lg:px-8 flex items-center">
        <div className="bg-blue-100 text-blue-600 p-2 rounded-lg">
           <DocumentTextIcon className="w-8 h-8"/>
        </div>
        <div className="ml-4">
            <h1 className="text-2xl font-bold text-slate-900">Meeting Analyzer</h1>
            <p className="text-sm text-slate-500">Transform meeting minutes into clear summaries and actionable tasks.</p>
        </div>
      </div>
    </header>
  );
};
