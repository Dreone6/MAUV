import { FeatureCard } from './FeatureCard';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface OnboardingSlideProps {
  title: string;
  features: Feature[];
}

export function OnboardingSlide({ title, features }: OnboardingSlideProps) {
  return (
    <div className="px-2">
      <h2 className="text-center mb-8 px-4">
        {title}
      </h2>
      
      <div className="space-y-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
}
