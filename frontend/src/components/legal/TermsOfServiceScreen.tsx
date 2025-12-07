import { ArrowLeft } from 'lucide-react@0.487.0';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface TermsOfServiceScreenProps {
  onBack: () => void;
}

export function TermsOfServiceScreen({ onBack }: TermsOfServiceScreenProps) {
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
          <h1 className="text-4xl mb-2 text-center">MAUV Terms of Use</h1>
          <p className="text-gray-400 text-center mb-8">Effective Date: October 31, 2025</p>

          <div className="space-y-6 text-gray-300 leading-relaxed">
            <section>
              <h2 className="text-2xl text-white mb-3">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the MAUV mobile application or related services (&quot;MAUV&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these Terms of Use. If you do not agree to these terms, do not use MAUV.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">2. Eligibility</h2>
              <p className="mb-3">
                You must be at least 13 years old to use the Services (or 16 years old if you reside in the EEA, UK, or Canada).
              </p>
              <p>
                Some features may be restricted to users aged 18 and above. By using MAUV, you confirm that you meet the age requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">3. Use of Services</h2>
              <p className="mb-2">
                You may use MAUV for personal, non-commercial health tracking only. You agree not to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Reverse-engineer, duplicate, or resell MAUV&apos;s services</li>
                <li>Use the app to collect personal information from others</li>
                <li>Post or transmit unlawful or abusive content</li>
                <li>Misuse any AI-generated content or features</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">4. Account Responsibilities</h2>
              <p className="mb-2">You are responsible for:</p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Maintaining the confidentiality of your login credentials</li>
                <li>Ensuring the information you provide is accurate and up to date</li>
                <li>All activity occurring under your account</li>
              </ul>
              <p className="mt-3">
                You may delete your account at any time from the app settings.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">5. User Contributions and Community Guidelines</h2>
              <p className="mb-3">
                If you participate in shared or interactive areas (e.g., community chats, symptom logs visible to a partner), you agree to:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Post respectful, non-offensive content</li>
                <li>Not disclose personal health information of others</li>
                <li>Avoid medical misinformation, harassment, or spam</li>
              </ul>
              <p className="mt-3">
                MAUV reserves the right to remove content or terminate accounts that violate these standards.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">6. Disclaimer and No Medical Advice</h2>
              <p className="mb-3">
                <strong>MAUV is not a medical service and does not provide medical advice.</strong>
              </p>
              <p className="mb-3">
                All predictions, insights, and symptom interpretations are for informational purposes only.
              </p>
              <p>
                Always consult a licensed healthcare professional before making health-related decisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">7. Limitation of Liability</h2>
              <p className="mb-2">
                To the fullest extent allowed by law, MAUV and its affiliates shall not be liable for:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>Any loss or damage arising from the use or inability to use the app</li>
                <li>Health consequences based on app content or AI interactions</li>
                <li>Unauthorized access to or use of your account or data</li>
              </ul>
              <p className="mt-3">
                <strong>Use of MAUV is at your own risk.</strong>
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">8. Intellectual Property</h2>
              <p>
                All content, design elements, and technology within the MAUV app are owned by MAUV or licensed to us. You may not reproduce, republish, or distribute MAUV content without permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">9. Modifications to the Terms</h2>
              <p className="mb-3">
                We may update these Terms periodically. If we make material changes, we will notify you via the app or email.
              </p>
              <p>
                Continued use of MAUV after changes take effect constitutes your acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">10. Termination</h2>
              <p className="mb-2">
                You may terminate your use of MAUV at any time. We may suspend or terminate your access if:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-2">
                <li>You breach these Terms</li>
                <li>We discontinue the service</li>
                <li>We are required to do so by law</li>
              </ul>
              <p className="mt-3">
                Upon termination, your right to use MAUV ends immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">11. Governing Law</h2>
              <p>
                These Terms are governed by the laws of the jurisdiction in which MAUV operates (e.g., United Kingdom). Disputes will be resolved under applicable local laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl text-white mb-3">12. Contact Us</h2>
              <p className="mb-3">
                For questions about these Terms, reach us at:
              </p>
              <p className="ml-4">
                📧 <strong>support@mauv.io</strong><br />
                📧 <strong>dpo@mauv.io</strong> (Data Protection)
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
