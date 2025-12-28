import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function PrivacyPolicyScreen() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-serif font-semibold text-foreground">
              Privacy Policy
            </CardTitle>
            <p className="text-muted-foreground">
              Last updated: January 1, 2025
            </p>
          </CardHeader>

          <CardContent className="prose prose-slate max-w-none">
            <div className="space-y-8 text-sm leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Information We Collect</h2>
                <h3 className="text-lg font-medium text-foreground mb-2">Personal Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Name, email address, and contact information</li>
                  <li>Financial account information (encrypted and tokenized)</li>
                  <li>Investment preferences and risk tolerance</li>
                  <li>Transaction history and portfolio data</li>
                </ul>
                <h3 className="text-lg font-medium text-foreground mb-2">Usage Information</h3>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Device information and IP address</li>
                  <li>Browser type and version</li>
                  <li>Usage patterns and feature interactions</li>
                  <li>Log files and analytics data</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">2. How We Use Your Information</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>To provide and maintain our financial management services</li>
                  <li>To process transactions and manage your portfolio</li>
                  <li>To send important account notifications and updates</li>
                  <li>To improve our services and develop new features</li>
                  <li>To comply with legal and regulatory requirements</li>
                  <li>To prevent fraud and ensure platform security</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">3. Information Sharing</h2>
                <p className="text-muted-foreground mb-4">
                  We do not sell, trade, or rent your personal information to third parties. We may share your information only in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>With your explicit consent</li>
                  <li>With trusted service providers who assist in our operations</li>
                  <li>To comply with legal obligations or court orders</li>
                  <li>To protect our rights, privacy, safety, or property</li>
                  <li>In connection with a merger, acquisition, or sale of assets</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Data Security</h2>
                <p className="text-muted-foreground mb-4">
                  We implement robust security measures to protect your financial data:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Bank-level encryption (AES-256) for all sensitive data</li>
                  <li>Multi-factor authentication for account access</li>
                  <li>Regular security audits and penetration testing</li>
                  <li>Secure data centers with 24/7 monitoring</li>
                  <li>Strict access controls for our employees</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Your Rights and Choices</h2>
                <p className="text-muted-foreground mb-4">
                  You have the following rights regarding your personal information:
                </p>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>Access and review your personal data</li>
                  <li>Request corrections to inaccurate information</li>
                  <li>Delete your account and associated data</li>
                  <li>Opt-out of non-essential communications</li>
                  <li>Export your data in a portable format</li>
                  <li>Restrict certain processing activities</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Cookies and Tracking</h2>
                <p className="text-muted-foreground mb-4">
                  We use cookies and similar technologies to enhance your experience and analyze usage patterns. You can control cookie settings through your browser preferences.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Data Retention</h2>
                <p className="text-muted-foreground mb-4">
                  We retain your personal information for as long as necessary to provide our services and comply with legal obligations. Financial records may be retained for up to 7 years as required by law.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">8. International Transfers</h2>
                <p className="text-muted-foreground mb-4">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place for international data transfers.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">9. Changes to Privacy Policy</h2>
                <p className="text-muted-foreground mb-4">
                  We may update this Privacy Policy periodically. We will notify you of significant changes via email or through our service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">10. Contact Us</h2>
                <p className="text-muted-foreground">
                  For questions about this Privacy Policy or to exercise your rights, contact us at privacy@wealthorchestrator.com or write to us at our privacy office.
                </p>
              </section>
            </div>

            <div className="mt-8 pt-6 border-t">
              <Button
                onClick={handleBack}
                variant="outline"
                className="w-full sm:w-auto"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 Wealth Orchestrator. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
