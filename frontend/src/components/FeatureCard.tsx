interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gradient-to-br from-purple-900/20 to-purple-950/20 backdrop-blur-sm border border-purple-800/30 rounded-3xl p-6 transition-all duration-300 hover:border-purple-600/50 hover:shadow-lg hover:shadow-purple-900/20 hover:scale-[1.02]">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-900/40 to-purple-950/40 border border-purple-700/30 flex items-center justify-center text-purple-300">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="mb-2 text-white">
            {title}
          </h3>
          <p className="text-gray-300 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
