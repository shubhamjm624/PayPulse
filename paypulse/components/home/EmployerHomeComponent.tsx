
import React from 'react';
import Link from 'next/link';

const EmployerHomeComponent: React.FC = () => {
  return (
    <div className="flex flex-col items-center text-center text-gray-300 p-4">
      <h2 className="text-3xl font-bold mb-6">Employer Dashboard</h2>
      <p className="text-lg mb-8">
        Manage your contracts, payrolls, payments, compliance, taxes, and relocations from here.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Link href="/dashboard" passHref>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
            <p className="text-base">Get an overview of key metrics, recent activities, and pending actions.</p>
          </div>
        </Link>
        <Link href="/contracts" passHref>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Contracts</h3>
            <p className="text-base">Create, manage, and review contracts with your employees.</p>
          </div>
        </Link>
        <Link href="/payroll" passHref>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Payroll</h3>
            <p className="text-base">Review and manage payroll, including calculations and approvals.</p>
          </div>
        </Link>
        <Link href="/payments" passHref>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Payments</h3>
            <p className="text-base">Handle payments to employees and track their status.</p>
          </div>
        </Link>
        <Link href="/compliance" passHref>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Compliance</h3>
            <p className="text-base">Ensure that your contracts and operations comply with relevant regulations.</p>
          </div>
        </Link>
        <Link href="/taxes" passHref>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Taxes</h3>
            <p className="text-base">Generate tax forms, manage withholdings, and review tax reports.</p>
          </div>
        </Link>
        <Link href="/relocation" passHref>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:bg-gray-700 transition-colors cursor-pointer">
            <h3 className="text-xl font-semibold mb-2">Relocation</h3>
            <p className="text-base">Manage employee relocations including visa processing and housing.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default EmployerHomeComponent;

