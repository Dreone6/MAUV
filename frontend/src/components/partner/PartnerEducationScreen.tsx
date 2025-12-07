import { BookOpen, Calendar, Heart, Activity, Moon, Sun, Sunrise, Sunset, ChevronRight } from 'lucide-react@0.487.0';
import { useState } from 'react';
import mauvLogo from 'figma:asset/6ef1ddd1de4618a9d43c80d42ea305e9848fbf52.png';

interface PartnerEducationScreenProps {
  onBack: () => void;
}

interface EducationTopic {
  id: string;
  title: string;
  icon: any;
  color: string;
  bgColor: string;
  description: string;
  content: string[];
}

export function PartnerEducationScreen({ onBack }: PartnerEducationScreenProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const topics: EducationTopic[] = [
    {
      id: 'menstrual',
      title: 'Menstrual Phase',
      icon: Moon,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      description: 'Days 1-5 of the cycle',
      content: [
        'The menstrual phase is when bleeding occurs, typically lasting 3-7 days.',
        'Energy levels may be lower during this time.',
        'How to support: Be understanding of fatigue, offer comfort items like heating pads, and avoid planning strenuous activities.',
        'This is a time for rest and self-care.',
      ],
    },
    {
      id: 'follicular',
      title: 'Follicular Phase',
      icon: Sunrise,
      color: 'text-pink-600',
      bgColor: 'bg-pink-100',
      description: 'Days 6-14 of the cycle',
      content: [
        'Energy and mood typically increase during this phase.',
        'This is often when people feel most social and outgoing.',
        'How to support: Great time for active dates, trying new things, and engaging conversations.',
        'Creativity and productivity are often high.',
      ],
    },
    {
      id: 'ovulation',
      title: 'Ovulation Phase',
      icon: Sun,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100',
      description: 'Days 14-16 of the cycle',
      content: [
        'Peak fertility occurs during ovulation, typically mid-cycle.',
        'Energy and confidence are often at their highest.',
        'How to support: This is often the best time for physical intimacy and connection.',
        'Communication may feel easier during this phase.',
      ],
    },
    {
      id: 'luteal',
      title: 'Luteal Phase',
      icon: Sunset,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      description: 'Days 17-28 of the cycle',
      content: [
        'Energy gradually decreases as the body prepares for the next cycle.',
        'PMS symptoms may appear in the later part of this phase.',
        'How to support: Be patient with mood changes, offer comfort foods, and plan relaxing activities.',
        'Extra emotional support can be helpful during this time.',
      ],
    },
  ];

  const generalTips = {
    id: 'general',
    title: 'General Support Tips',
    icon: Heart,
    color: 'text-fuchsia-600',
    bgColor: 'bg-fuchsia-100',
    description: 'Universal ways to be supportive',
    content: [
      'Ask how she\'s feeling and listen without trying to fix things.',
      'Track her cycle so you can be proactive with support.',
      'Keep favorite comfort items on hand (chocolate, heating pad, etc.).',
      'Be patient and understanding during difficult days.',
      'Educate yourself about hormonal changes and their effects.',
      'Avoid dismissing symptoms or emotions as "just hormones".',
      'Celebrate the good days and be there for the challenging ones.',
    ],
  };

  const allTopics = [...topics, generalTips];
  const currentTopic = allTopics.find(t => t.id === selectedTopic);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-fuchsia-50 text-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white p-6 pb-24 rounded-b-[3rem] shadow-2xl">
        <div className="max-w-md mx-auto">
          <button
            onClick={selectedTopic ? () => setSelectedTopic(null) : onBack}
            className="mb-6 hover:opacity-80 transition-opacity"
          >
            ← {selectedTopic ? 'Back to Topics' : 'Back'}
          </button>

          <div className="flex items-center gap-2 mb-6">
            <img src={mauvLogo} alt="MAUV Logo" className="h-10" />
          </div>

          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8" />
            <h1 className="text-3xl">Partner Education</h1>
          </div>
          <p className="text-pink-100 mt-2">
            Understanding the menstrual cycle
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 -mt-16 pb-8">
        {!selectedTopic ? (
          <>
            {/* Cycle Overview Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
              <h2 className="text-xl text-gray-900 mb-4">The Menstrual Cycle</h2>
              <p className="text-gray-600 mb-6">
                The menstrual cycle is typically 28 days long and consists of four distinct phases. Each phase brings different physical and emotional changes.
              </p>

              {/* Cycle Visualization */}
              <div className="bg-gradient-to-r from-purple-100 via-pink-100 to-yellow-100 rounded-2xl p-1 mb-4">
                <div className="bg-white rounded-xl p-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>Day 1</span>
                    <span>Day 14</span>
                    <span>Day 28</span>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-purple-400 via-pink-400 via-yellow-400 to-orange-400 rounded-full" />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>Menstrual</span>
                    <span>Ovulation</span>
                    <span>Luteal</span>
                  </div>
                </div>
              </div>

              <p className="text-sm text-gray-500 text-center">
                Tap any phase below to learn more
              </p>
            </div>

            {/* Topic Cards */}
            <div className="space-y-4">
              {allTopics.map((topic) => {
                const Icon = topic.icon;
                return (
                  <button
                    key={topic.id}
                    onClick={() => setSelectedTopic(topic.id)}
                    className="w-full bg-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-102"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 rounded-full ${topic.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-7 h-7 ${topic.color}`} />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="text-lg text-gray-900 mb-1">
                          {topic.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {topic.description}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : currentTopic && (
          <>
            {/* Topic Detail Card */}
            <div className="bg-white rounded-3xl p-6 shadow-xl mb-6">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-full ${currentTopic.bgColor} flex items-center justify-center`}>
                  {(() => {
                    const Icon = currentTopic.icon;
                    return <Icon className={`w-8 h-8 ${currentTopic.color}`} />;
                  })()}
                </div>
                <div>
                  <h2 className="text-2xl text-gray-900">
                    {currentTopic.title}
                  </h2>
                  <p className="text-gray-500">
                    {currentTopic.description}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {currentTopic.content.map((paragraph, index) => (
                  <p key={index} className="text-gray-700 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-br from-fuchsia-50 to-pink-50 rounded-2xl p-6 shadow-lg border border-fuchsia-100">
              <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-fuchsia-500" />
                Quick Reference
              </h3>
              <div className="bg-white rounded-xl p-4 space-y-3 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Communication:</span>
                  <span className="text-gray-900">Listen actively</span>
                </div>
                <div className="flex justify-between">
                  <span>Physical Support:</span>
                  <span className="text-gray-900">Offer comfort</span>
                </div>
                <div className="flex justify-between">
                  <span>Emotional Support:</span>
                  <span className="text-gray-900">Be patient</span>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
