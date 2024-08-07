import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create Users
  const user1 = await prisma.user.create({
    data: {
      email: 'alice@example.com',
      name: 'Alice Doe',
      role: 'Employer',
      address: '123 Maple Street',
      phone: '555-1234',
      position: 'CEO',
      company: 'TechCorp',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'bob@example.com',
      name: 'Bob Smith',
      role: 'Employee',
      address: '456 Oak Avenue',
      phone: '555-5678',
      position: 'Developer',
      company: 'DevWorks',
    },
  });

  // Create Dashboards
  const dashboard1 = await prisma.dashboard.create({
    data: {
      userId: user1.id,
      widgets: JSON.stringify({ widget1: 'chart', widget2: 'list' }),
    },
  });

  // Create Contracts
  const contract1 = await prisma.contract.create({
    data: {
      employerId: user1.id,
      employeeId: user2.id,
      title: 'Software Engineer Contract',
      description: 'Contract for Software Engineer position.',
      contractType: 'Full-time',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2025-01-01'),
      terms: JSON.stringify({ term1: 'Confidentiality', term2: 'Non-compete' }),
      status: 'Active',
    },
  });

  // Create Signatures
  const signature1 = await prisma.signature.create({
    data: {
      contractId: contract1.id,
      userId: user1.id,
      signature: 'AliceSignature',
      signedAt: new Date(),
    },
  });

  // Create Payrolls
  const payroll1 = await prisma.payroll.create({
    data: {
      employerId: user1.id,
      employeeId: user2.id,
      contractId: contract1.id,
      salary: 80000,
      bonuses: 5000,
      deductions: 2000,
      netPay: 75000,
      currency: 'USD',
      paymentDate: new Date(),
      status: 'Processed',
      payslip: 'payroll-slip-001',
    },
  });

  // Create Payments
  const payment1 = await prisma.payment.create({
    data: {
      payerId: user1.id,
      payeeId: user2.id,
      amount: 75000,
      currency: 'USD',
      paymentMethod: 'Bank Transfer',
      status: 'Completed',
      transactionId: 'txn123456789',
    },
  });

  // Create Compliances
  const compliance1 = await prisma.compliance.create({
    data: {
      userId: user2.id,
      contractId: contract1.id,
      country: 'USA',
      complianceIssues: JSON.stringify({ issue1: 'Documentation pending' }),
      documents: JSON.stringify({ doc1: 'compliance-doc.pdf' }),
    },
  });

  // Create Taxes
  const tax1 = await prisma.tax.create({
    data: {
      userId: user2.id,
      contractId: contract1.id,
      taxForm: 'W-2',
      taxAmount: 10000,
      currency: 'USD',
      filedDate: new Date(),
      documents: JSON.stringify({ doc1: 'tax-form.pdf' }),
    },
  });

  // Create Notifications
  const notification1 = await prisma.notification.create({
    data: {
      userId: user2.id,
      message: 'Your payroll has been processed.',
      type: 'Payroll',
      status: 'Sent',
    },
  });

  // Create Email Logs
  const emailLog1 = await prisma.emailLog.create({
    data: {
      userId: user2.id,
      emailType: 'Payroll Notification',
      sentAt: new Date(),
      status: 'Delivered',
      message: 'Your payroll slip is attached.',
    },
  });

  // Create Relocations
  const relocation1 = await prisma.relocation.create({
    data: {
      userId: user2.id,
      currentLocation: 'New York',
      newLocation: 'San Francisco',
      relocationDate: new Date('2024-03-01'),
      visaRequired: false,
      visaDetails: JSON.stringify({ visaType: 'N/A' }),
      housing: JSON.stringify({ type: 'Apartment', address: '789 Pine Street' }),
      status: 'Completed',
      notes: 'Relocation completed successfully.',
    },
  });

  console.log('Data seeded successfully.');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
