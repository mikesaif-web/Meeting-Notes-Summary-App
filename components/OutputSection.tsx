
import React from 'react';
import type { AnalysisResult } from '../types';
import { Loader } from './Loader';
import { DocumentTextIcon } from './icons/DocumentTextIcon';
import { ClipboardListIcon } from './icons/ClipboardListIcon';

interface OutputSectionProps {
  result: AnalysisResult | null;
  isLoading: boolean;
  error: string | null;
}

const EmptyState: React.FC = () => (
    <div className="text-center p-8 border-2 border-dashed border-slate-300 rounded-lg h-full flex flex-col justify-center items-center">
        <div className="bg-slate-100 p-4 rounded-full mb-4">
            <DocumentTextIcon className="w-12 h-12 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold text-slate-600">Analysis Results</h3>
        <p className="text-slate-500 mt-1">Your summary and action items will appear here.</p>
    </div>
);

export const OutputSection: React.FC<OutputSectionProps> = ({ result, isLoading, error }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-md border border-slate-200 mt-8 lg:mt-0 h-full">
            {isLoading && (
                <div className="flex items-center justify-center h-full">
                    <Loader />
                </div>
            )}

            {!isLoading && error && (
                <div className="flex items-center justify-center h-full p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    <p>{error}</p>
                </div>
            )}

            {!isLoading && !error && !result && <EmptyState />}

            {!isLoading && !error && result && (
                <div className="space-y-8">
                    {/* Summary Section */}
                    <div>
                        <div className="flex items-center mb-4">
                            <div className="bg-green-100 text-green-700 p-2 rounded-lg mr-3">
                                <DocumentTextIcon className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Meeting Summary</h2>
                        </div>
                        <div className="space-y-4">
                            {result.summary.map((paragraph, index) => (
                                <p key={index} className="text-slate-600 leading-relaxed">
                                    {paragraph}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* Action Items Section */}
                    <div>
                        <div className="flex items-center mb-4">
                           <div className="bg-purple-100 text-purple-700 p-2 rounded-lg mr-3">
                                <ClipboardListIcon className="w-6 h-6" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-800">Action Items</h2>
                        </div>
                        {result.actionItems.length > 0 ? (
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-slate-200">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Who</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">What</th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">When</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-slate-200">
                                        {result.actionItems.map((item, index) => (
                                            <tr key={index}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{item.who}</td>
                                                <td className="px-6 py-4 whitespace-normal text-sm text-slate-600">{item.what}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">{item.when}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p className="text-slate-500 italic">No action items were identified.</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};