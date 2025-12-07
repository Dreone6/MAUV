import { PartnerSharingSettings } from './PartnerSharingSettings';

interface PartnerSharingSettingsDarkProps {
  onBack: () => void;
  onNavigate: (screen: string) => void;
}

export function PartnerSharingSettingsDark({ onBack, onNavigate }: PartnerSharingSettingsDarkProps) {
  return <PartnerSharingSettings onBack={onBack} onNavigate={onNavigate} darkMode={true} />;
}
