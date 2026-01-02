import { useAppStore } from '@/lib/store';
import { AppLayout } from '@/components/layout/AppLayout';
import { LandingScreen, WhyMultiflyScreen, HowItWorksScreen } from '@/components/screens/NarrativeScreens';
import {
  ClientHomeScreen,
  WealthBlueprintScreen,
  ClientRecommendationsScreen,
  PortfolioOverviewScreen,
  ReportsScreen,
  SecureMessagingScreen,
} from '@/components/screens/ClientScreens';
import {
  RMDashboardScreen,
  Client360Screen,
  OnboardingChecklistScreen,
  FACollaborationScreen,
  RecommendationsPipelineScreen,
  StructuringCasesScreen,
  ExecutionTrackerScreen,
  AlertsNextActionsScreen,
  QuarterlyReportBuilderScreen,
} from '@/components/screens/RMScreens';
import {
  FADashboardScreen,
  BlueprintBuilderScreen,
  DealDossiersScreen,
  RecommendationDraftsScreen,
  QAChecklistScreen,
} from '@/components/screens/FAScreens';
import {
  StructuringSummaryScreen,
  CountryChecklistScreen,
  DocumentPacketScreen,
  SignatureTrackerScreen,
  ExecutionTicketScreen,
} from '@/components/screens/StructuringScreens';
import {
  CountryCatalogScreen,
  EligibilityRulesScreen,
} from '@/components/screens/AdminScreens';

const Index = () => {
  const { currentScreen } = useAppStore();

  const renderScreen = () => {
    switch (currentScreen) {
      // Narrative
      case 'landing': return <LandingScreen />;
      case 'why-multifly': return <WhyMultiflyScreen />;
      case 'how-it-works': return <HowItWorksScreen />;
      // Client Portal
      case 'client-home': return <ClientHomeScreen />;
      case 'wealth-blueprint': return <WealthBlueprintScreen />;
      case 'recommendations': return <ClientRecommendationsScreen />;
      case 'portfolio-overview': return <PortfolioOverviewScreen />;
      case 'reports': return <ReportsScreen />;
      case 'secure-messaging': return <SecureMessagingScreen />;
      // RM Console
      case 'rm-dashboard': return <RMDashboardScreen />;
      case 'client-360': return <Client360Screen />;
      case 'onboarding-checklist': return <OnboardingChecklistScreen />;
      case 'fa-collaboration': return <FACollaborationScreen />;
      case 'recommendations-pipeline': return <RecommendationsPipelineScreen />;
      case 'structuring-cases': return <StructuringCasesScreen />;
      case 'execution-tracker': return <ExecutionTrackerScreen />;
      case 'alerts-next-actions': return <AlertsNextActionsScreen />;
      case 'quarterly-report-builder': return <QuarterlyReportBuilderScreen />;
      // FA Workbench
      case 'fa-dashboard': return <FADashboardScreen />;
      case 'blueprint-builder': return <BlueprintBuilderScreen />;
      case 'deal-dossiers': return <DealDossiersScreen />;
      case 'recommendation-drafts': return <RecommendationDraftsScreen />;
      case 'qa-checklist': return <QAChecklistScreen />;
      // Structuring
      case 'structuring-summary': return <StructuringSummaryScreen />;
      case 'country-checklist': return <CountryChecklistScreen />;
      case 'document-packet': return <DocumentPacketScreen />;
      case 'signature-tracker': return <SignatureTrackerScreen />;
      case 'execution-ticket': return <ExecutionTicketScreen />;
      // Admin
      case 'country-catalog': return <CountryCatalogScreen />;
      case 'eligibility-rules': return <EligibilityRulesScreen />;
      default: return <LandingScreen />;
    }
  };

  return (
    <AppLayout>
      {renderScreen()}
    </AppLayout>
  );
};

export default Index;
