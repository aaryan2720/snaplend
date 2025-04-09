
import React from "react";
import { Container } from "@/components/ui/container";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsAndConditions = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-12">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-display font-semibold text-snaplend-900 mb-8">Terms and Conditions</h1>
            
            <div className="prose prose-slate max-w-none">
              <h2 className="text-xl font-medium mb-4">1. Introduction</h2>
              <p>
                Welcome to SnapLend. These Terms and Conditions govern your use of the SnapLend platform and services, 
                including the website, mobile applications, and other related services (collectively, the "Services").
              </p>
              
              <h2 className="text-xl font-medium mt-6 mb-4">2. Acceptance of Terms</h2>
              <p>
                By accessing or using the Services, you agree to be bound by these Terms and Conditions. 
                If you do not agree to these terms, please do not use our Services.
              </p>
              
              <h2 className="text-xl font-medium mt-6 mb-4">3. User Accounts</h2>
              <p>
                You must create an account to use certain features of our Services. You are responsible for maintaining 
                the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              
              <h2 className="text-xl font-medium mt-6 mb-4">4. Renting and Lending</h2>
              <p>
                SnapLend provides a platform for users to list items for rent ("Lenders") and for other users to rent those items ("Renters"). 
                SnapLend is not responsible for the condition of items, the accuracy of listings, or the conduct of users.
              </p>
              <p className="mt-2">
                Lenders must provide accurate descriptions and images of their items. Renters must return items in the same condition they received them.
              </p>
              
              <h2 className="text-xl font-medium mt-6 mb-4">5. Fees and Payments</h2>
              <p>
                SnapLend charges service fees for the use of our platform. All fees are clearly disclosed before you complete a transaction.
                All payments are processed securely through our payment providers.
              </p>
              
              <h2 className="text-xl font-medium mt-6 mb-4">6. Prohibited Conduct</h2>
              <p>
                You agree not to engage in any of the following activities:
              </p>
              <ul className="list-disc pl-6 mt-2">
                <li>Violating any applicable laws or regulations</li>
                <li>Posting false, misleading, or deceptive content</li>
                <li>Impersonating any person or entity</li>
                <li>Harassing, threatening, or intimidating other users</li>
                <li>Using the platform for illegal purposes</li>
                <li>Attempting to circumvent any security features</li>
              </ul>
              
              <h2 className="text-xl font-medium mt-6 mb-4">7. Privacy Policy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and disclose information about you.
              </p>
              
              <h2 className="text-xl font-medium mt-6 mb-4">8. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, SnapLend and its officers, employees, agents, and affiliates shall not be liable for any indirect, 
                incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill.
              </p>
              
              <h2 className="text-xl font-medium mt-6 mb-4">9. Changes to Terms</h2>
              <p>
                We may modify these Terms and Conditions at any time. We will provide notice of significant changes. 
                Your continued use of the Services after such modifications constitutes your acceptance of the revised terms.
              </p>
              
              <h2 className="text-xl font-medium mt-6 mb-4">10. Contact Information</h2>
              <p>
                If you have any questions about these Terms and Conditions, please contact us at support@snaplend.com.
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
