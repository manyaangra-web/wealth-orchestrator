import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TermsOfServiceScreen() {
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
              <FileText className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-3xl font-serif font-semibold text-foreground">
              Terms of Service
            </CardTitle>
            <p className="text-muted-foreground">
              Last updated: January 1, 2025
            </p>
          </CardHeader>

          <CardContent className="prose prose-slate max-w-none">
            <div className="space-y-8 text-sm leading-relaxed">
              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
                <p className="text-muted-foreground mb-4">
                  By accessing and using Wealth Orchestrator ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">2. Description of Service</h2>
                <p className="text-muted-foreground mb-4">
                  Wealth Orchestrator is a financial management platform that provides tools for tracking investments, managing portfolios, and financial planning. The service is provided "as is" and we reserve the right to modify or discontinue the service at any time.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">3. User Responsibilities</h2>
                <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
                  <li>You must provide accurate and complete information when creating your account</li>
                  <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                  <li>You must not use the service for any illegal or unauthorized purposes</li>
                  <li>You must not attempt to gain unauthorized access to our systems</li>
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">4. Financial Information Disclaimer</h2>
                <p className="text-muted-foreground mb-4">
                  The information provided by Wealth Orchestrator is for informational purposes only and should not be considered as financial advice. We are not licensed financial advisors, and you should consult with qualified professionals before making financial decisions.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">5. Data Security</h2>
                <p className="text-muted-foreground mb-4">
                  We implement industry-standard security measures to protect your financial data. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
                <p className="text-muted-foreground mb-4">
                  In no event shall Wealth Orchestrator be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">7. Termination</h2>
                <p className="text-muted-foreground mb-4">
                  We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">8. Changes to Terms</h2>
                <p className="text-muted-foreground mb-4">
                  We reserve the right to modify these terms at any time. We will notify users of any material changes via email or through the service.
                </p>
              </section>

              <section>
                <h2 className="text-xl font-semibold text-foreground mb-4">9. Contact Information</h2>
                <p className="text-muted-foreground">
                  If you have any questions about these Terms of Service, please contact us at legal@wealthorchestrator.com
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
