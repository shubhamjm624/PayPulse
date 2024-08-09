import React from 'react';
import Link from 'next/link';

const EmployeeHomeComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center text-gray-300 p-4">
      <h2 className="text-3xl font-bold mb-6">Employee Dashboard</h2>
      <p className="text-lg mb-8">
        Manage your contracts, payrolls, payments, compliance, taxes, and relocations from here.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Link href="/contracts" passHref>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Contracts</h3>
            <p className="text-base">Create, manage, and review your contracts.</p>
          </div>
        </Link>
        <Link href="/payroll" passHref>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Payroll</h3>
            <p className="text-base">View and manage your payroll details.</p>
          </div>
        </Link>
        <Link href="/payments" passHref>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Payments</h3>
            <p className="text-base">Check the status of your payments.</p>
          </div>
        </Link>
        <Link href="/compliance" passHref>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Compliance</h3>
            <p className="text-base">Work with compliance-related tasks.</p>
          </div>
        </Link>
        <Link href="/taxes" passHref>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Taxes</h3>
            <p className="text-base">Manage your tax-related information.</p>
          </div>
        </Link>
        <Link href="/relocation" passHref>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Relocation</h3>
            <p className="text-base">Handle relocation-related processes.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default EmployeeHomeComponent;
