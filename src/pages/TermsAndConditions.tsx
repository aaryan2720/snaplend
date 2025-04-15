
import React from 'react';
import { Container } from '@/components/ui/container';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TermsAndConditions = () => {
  return (
    <>
      <Navbar />
      <Container className="py-12 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
          
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700">
                By accessing or using our rental platform, you agree to be bound by these Terms and Conditions. 
                If you disagree with any part of these terms, you may not access or use our services.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">2. Rental Process</h2>
              <p className="text-gray-700 mb-4">
                Our platform facilitates peer-to-peer rentals of various items. Users may list items for rent 
                or rent items from other users subject to the following conditions:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>All rental agreements are between the renter and the owner of the item.</li>
                <li>Payment must be made through our secure payment system.</li>
                <li>Users must be at least 18 years old to rent or list items.</li>
                <li>Users may not rent their own listed items.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">3. User Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide accurate information about yourself and the items you list.</li>
                <li>Renters must return items in the same condition they were received.</li>
                <li>Owners must ensure items are in good working condition when rented.</li>
                <li>Report any damages or issues immediately through our platform.</li>
                <li>Comply with all applicable laws and regulations.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">4. Fees and Payments</h2>
              <p className="text-gray-700 mb-4">
                Our payment structure includes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Rental fees as specified by the item owner.</li>
                <li>Security deposits may be required for certain items.</li>
                <li>Platform service fees (percentage-based).</li>
                <li>Refunds are processed according to our Refund Policy.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">5. Liability and Insurance</h2>
              <p className="text-gray-700">
                While we take measures to ensure a safe rental experience, our platform is not liable 
                for damages, injuries, or losses resulting from the use of rented items. Users are 
                encouraged to obtain appropriate insurance coverage. Some high-value items may include 
                mandatory insurance options.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">6. Dispute Resolution</h2>
              <p className="text-gray-700">
                In case of disputes between users, our platform provides a mediation process. 
                If mediation is unsuccessful, disputes may be resolved through arbitration as 
                specified in our Dispute Resolution Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">7. Privacy Policy</h2>
              <p className="text-gray-700">
                Our Privacy Policy explains how we collect, use, and protect your personal information. 
                By using our platform, you consent to the practices described in our Privacy Policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-4">8. Modifications to Terms</h2>
              <p className="text-gray-700">
                We reserve the right to modify these Terms and Conditions at any time. 
                Changes will be effective immediately upon posting to our platform. 
                Continued use of our services after changes constitutes acceptance of the modified terms.
              </p>
            </section>
          </div>

          <div className="mt-12 pt-6 border-t border-gray-200">
            <p className="text-gray-500 text-sm">
              Last updated: April 9, 2025
            </p>
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default TermsAndConditions;
