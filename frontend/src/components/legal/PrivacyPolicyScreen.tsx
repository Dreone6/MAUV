import { ArrowLeft } from 'lucide-react@0.487.0';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface PrivacyPolicyScreenProps {
  onBack: () => void;
}

export function PrivacyPolicyScreen({ onBack }: PrivacyPolicyScreenProps) {
  return (
    <div className="min-h-screen bg-[#1a0f2e] text-white p-6 flex flex-col">
      <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col">
        {/* Header */}
        <div className="mb-8 pt-6">
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <img src={mauvLogo} alt="MAUV Logo" className="w-10 h-10" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto pb-8">
          <h1 className="text-4xl mb-2 text-center">MAUV Privacy Policy & Terms of Use</h1>
          <p className="text-gray-400 text-center mb-8">Effective Date: October 31, 2025</p>

          {/* Table of Contents */}
          <div className="bg-white/5 rounded-2xl p-6 mb-8">
            <h2 className="text-xl text-white mb-4">Table of Contents</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-300">
              <li>Introduction</li>
              <li>Personal Data We Collect</li>
              <li>How We Use Your Data</li>
              <li>Legal Bases for Processing</li>
              <li>Data Sharing and Third Parties</li>
              <li>Data Retention</li>
              <li>Data Security</li>
              <li>Your Privacy Rights</li>
              <li>Children&apos;s Privacy</li>
              <li>International Data Transfers</li>
              <li>Communication and Marketing</li>
              <li>Anonymous Mode</li>
              <li>User Contributions and Community Guidelines</li>
              <li>Limitation of Liability</li>
              <li>Changes to This Policy</li>
              <li>Contact Information</li>
              <li>Effective Date</li>
            </ol>
          </div>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl text-white mb-3">1. Introduction</h2>
              <p className="mb-3">
                Welcome to MAUV — a personalized health and cycle tracking app designed to help users better understand their bodies through intuitive, secure, and privacy-first technology.
              </p>
              <p className="mb-3">
                This Privacy Policy and Terms of Use explains how we collect, use, store, and share your information, and what choices you have regarding your data.
              </p>
              <p className="mb-3">
                By using the MAUV mobile application (the "App"), website, or any affiliated services (collectively, the "Services"), you agree to these terms. If you do not agree, please do not use the Services.
              </p>
              <p>
                We are committed to protecting your privacy and being transparent about how your data is handled. MAUV adheres to data protection laws including the General Data Protection Regulation (GDPR), California Consumer Privacy Act (CCPA), and other relevant frameworks.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">2. Personal Data We Collect</h2>
              <p className="mb-3">
                We collect personal data to deliver and enhance the Services, support your user experience, and comply with applicable legal obligations. This data may be provided directly by you or collected automatically when you interact with the App.
              </p>

              <h3 className="text-xl text-white mb-2 mt-4">Data You Provide Directly:</h3>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Account Details:</strong> Name or alias, email address, password, date of birth, and preferred language.</li>
                <li><strong>Health & Wellness Data:</strong> Menstrual cycle information, symptoms, mood, physical and mental well-being, pregnancy details, water intake, sleep data, and custom notes.</li>
                <li><strong>Partner Mode Data (if used):</strong> Information voluntarily shared with a linked partner account.</li>
                <li><strong>Feedback & Support:</strong> Information you provide when contacting customer support.</li>
              </ul>

              <h3 className="text-xl text-white mb-2 mt-4">Data From Third-Party Integrations:</h3>
              <p className="ml-4">
                With your permission, MAUV may integrate with third-party apps or wearables (e.g., Apple HealthKit, Google Health Connect).
              </p>

              <h3 className="text-xl text-white mb-2 mt-4">Automatically Collected Data:</h3>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Device type, model, and operating system</li>
                <li>Time zone and language settings</li>
                <li>IP address (for approximate location)</li>
                <li>Usage data (features used, session frequency)</li>
                <li>Crash logs and diagnostic data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">3. How We Use Your Data</h2>
              <p className="mb-3">
                We use your data only to the extent necessary to provide, maintain, and improve the MAUV App and related services, and for legitimate legal and operational reasons.
              </p>
              
              <p className="mb-2">Uses include:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Personalizing your experience</li>
                <li>Predicting and tracking your cycle</li>
                <li>Sending notifications and health content</li>
                <li>Delivering customer support</li>
                <li>Improving functionality</li>
                <li>Conducting anonymized analytics</li>
              </ul>

              <p className="mt-3">
                We do not use your sensitive health data for advertising or marketing without your explicit consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">4. Legal Bases for Processing</h2>
              <p className="mb-2">We process your personal data based on the following legal foundations:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li><strong>Consent:</strong> For processing health data and optional communications.</li>
                <li><strong>Contractual Necessity:</strong> To provide core services.</li>
                <li><strong>Legitimate Interests:</strong> For fraud prevention, performance monitoring.</li>
                <li><strong>Legal Obligation:</strong> Where required by law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">5. Data Sharing and Third Parties</h2>
              <p className="mb-3">
                <strong>MAUV does not sell your personal data.</strong>
              </p>
              
              <p className="mb-2">We may share data with:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Trusted service providers (e.g., for cloud storage, analytics, support)</li>
                <li>With your consent (e.g., partner mode, research)</li>
                <li>Legal authorities if required</li>
              </ul>

              <p className="mt-3">
                We may use aggregated, de-identified data for research, insights, or statistics.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">6. Data Retention</h2>
              <p className="mb-2">Data is retained as long as necessary for:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Active accounts</li>
                <li>Legal compliance</li>
                <li>Operational needs</li>
              </ul>

              <p className="mt-3">
                Deleted accounts are purged within 30–90 days. Inactive accounts are removed after 36 months.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">7. Data Security</h2>
              <p className="mb-3">
                We employ strong safeguards to protect your data:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Encryption in transit and at rest</li>
                <li>Access controls and secure login</li>
                <li>Routine security scans and audits</li>
              </ul>

              <p className="mt-3">
                No system is completely immune, but we respond promptly to potential breaches.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">8. Your Privacy Rights</h2>
              <p className="mb-2">You have the right to:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Access, correct, or delete your data</li>
                <li>Restrict or object to processing</li>
                <li>Port your data</li>
                <li>Withdraw consent</li>
              </ul>

              <p className="mt-3">
                Request these via app settings or privacy@mauv.app. Identity verification may be required.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">9. Children&apos;s Privacy</h2>
              <p className="mb-3">
                MAUV is not for users under 13 (or under 16 in the EEA/UK/Canada).
              </p>
              <p>
                We do not knowingly collect data from minors. If we do, it will be deleted immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">10. International Data Transfers</h2>
              <p className="mb-3">
                We transfer data globally under strong legal safeguards like:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Standard Contractual Clauses (SCCs)</li>
                <li>UK Transfer Addendums</li>
                <li>Secure hosting and encryption</li>
              </ul>

              <p className="mt-3">
                We ensure compliance with GDPR, UK GDPR, and other international laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">11. Communication and Marketing</h2>
              <p className="mb-2">You may receive:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Reminders and insights</li>
                <li>Promotional content (if opted in)</li>
                <li>Service-related notices</li>
              </ul>

              <p className="mt-3">
                You can opt out anytime via email links or app settings. Health data is never used for ads.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">12. Anonymous Mode</h2>
              <p className="mb-3">
                Anonymous Mode lets you track without sharing personal identifiers.
              </p>
              
              <p className="mb-2">Limitations include:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Limited feature access</li>
                <li>No account recovery</li>
              </ul>

              <p className="mt-3">
                Personal identifiers are scrubbed from stored data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">13. User Contributions and Community Guidelines</h2>
              <p className="mb-3">
                Community spaces (forums, chats) are moderated.
              </p>
              
              <p className="mb-2">Prohibited content includes:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Personally identifiable info</li>
                <li>Abuse or misinformation</li>
              </ul>

              <p className="mt-3">
                Inappropriate content may be removed. Users may be banned for violations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">14. Limitation of Liability</h2>
              <p className="mb-3">
                MAUV is provided &quot;as is.&quot;
              </p>
              
              <p className="mb-2">We are not liable for:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Indirect or incidental damages</li>
                <li>Health consequences based on app use</li>
                <li>User behavior or third-party services</li>
              </ul>

              <p className="mt-3">
                Consult medical professionals for clinical decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">15. Changes to This Policy</h2>
              <p className="mb-3">
                We may update this policy. Material changes will be notified via app or email.
              </p>
              <p>
                Continued use of MAUV after changes means acceptance of the new terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">16. Contact Information</h2>
              <p className="mb-3">Contact us at:</p>
              <p className="ml-4">
                <strong>Email:</strong> support@mauv.io<br />
                <strong>Privacy:</strong> privacy@mauv.io<br />
                <strong>Data Protection Officer:</strong> dpo@mauv.io
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">17. Effective Date</h2>
              <p>
                October 31, 2025
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
