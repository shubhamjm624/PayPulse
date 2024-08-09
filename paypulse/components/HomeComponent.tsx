import React from 'react'; // Import React
import EmployeeHomeComponent from "@/components/home/EmployeeHomeComponent";
import EmployerHomeComponent from "@/components/home/EmployerHomeComponent"; // Fixed import

const HomeComponent: React.FC<{ user: any }> = ({ user }) => {
  const profileType = 'employee';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="flex flex-col items-center justify-center w-full max-w-4xl p-6 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-4">Welcome to PayPulse</h1>
        <p className="text-lg mb-8">
          Streamline your payroll, contracts, and payments with ease.
        </p>
        {profileType === 'employee' ? (
          <>
            {console.log('Rendering EmployeeHomeComponent')}
            <EmployeeHomeComponent />
          </>
        ) : profileType === 'employer' ? (
          <>
            {console.log('Rendering EmployerHomeComponent')}
            <EmployerHomeComponent />
          </>
        ) : (
          <>
            {console.log('Profile type is not recognized')}
            <div className="text-red-500">Profile type is not recognized.</div>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeComponent;
