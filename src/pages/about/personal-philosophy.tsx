import React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import BaseLayout from '@/components/layout/BaseLayout';
import Breadcrumb from '@/components/navigation/Breadcrumb';
import TabNavigation from '@/components/navigation/TabNavigation';

const PersonalPhilosophyPage: React.FC<PageProps> = ({ location }) => {
  const seoProps = {
    title: "Personal Philosophy & Approach - Dr. Daniel Sufficool",
    description: "Learn about Dr. Daniel Sufficool's personal philosophy, patient care approach, and the values that guide his medical practice in radiation oncology.",
    url: location.pathname,
    type: 'website' as const,
    isMedicalContent: true,
    keywords: [
      'daniel sufficool personal',
      'medical philosophy',
      'patient care philosophy',
      'radiation oncologist approach',
      'communication first healthcare',
      'multilingual doctor'
    ],
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about/' },
    { label: 'Personal & Philosophy' }
  ];

  const tabs = [
    {
      id: 'professional',
      label: 'Professional',
      href: '/about/professional/'
    },
    {
      id: 'personal',
      label: 'Personal & Philosophy',
      href: '/about/personal-philosophy/'
    }
  ];

  return (
    <BaseLayout seoProps={seoProps}>
      <Breadcrumb items={breadcrumbItems} />
      
      {/* Tab Navigation */}
      <TabNavigation tabs={tabs} activeTab="personal" className="mb-8" />

      {/* Personal Hero Section */}
      <section className="bg-gradient-to-r from-blue-50 to-indigo-50 -mx-6 md:-mx-12 px-6 md:px-12 py-16 mb-16 rounded-lg">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div className="space-y-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Personal Philosophy & Interests
            </h1>
            
            <p className="text-xl text-gray-700 leading-relaxed">
              Beyond medicine, I'm a devoted husband with a baby boy on the way, a lifelong learner, 
              and someone who believes that exceptional patient care begins with genuine human connection.
            </p>
            
            <p className="text-lg text-blue-700 font-medium">
              My approach to medicine is shaped by diverse interests, continuous learning, 
              and an unwavering commitment to compassionate care.
            </p>
          </div>

          {/* Wedding Photo */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-200 rounded-2xl p-8 shadow-lg">
              <div className="bg-white rounded-xl p-6 text-center shadow-md">
                <div className="w-full h-80 mx-auto mb-4 overflow-hidden rounded-xl">
                  <StaticImage
                    src="../../images/personal/weddingpic1.jpg"
                    alt="Dr. Daniel Sufficool and his wife on their wedding day"
                    placeholder="blurred"
                    layout="constrained"
                    width={400}
                    height={320}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-gray-900">
                    Family is My Foundation
                  </p>
                  <p className="text-gray-600 text-sm">
                    With my wonderful wife and our baby boy on the way, family reminds me daily 
                    why compassionate, excellent patient care matters—because everyone's loved one 
                    deserves the best possible treatment.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-200 rounded-full opacity-50"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-200 rounded-full opacity-30"></div>
          </div>
        </div>
      </section>

      {/* Communication as Foundation */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Communication as the Foundation of Healing</h2>
          
          <div className="prose max-w-none text-gray-700 mb-8">
            <p className="text-lg leading-relaxed mb-6">
              I believe that exceptional cancer care begins with exceptional communication. When patients 
              truly understand their diagnosis and treatment options, they become empowered partners in 
              their own care journey. This belief shapes every aspect of my practice.
            </p>
            
            <p className="leading-relaxed mb-8">
              In my experience, the most successful treatments happen when patients feel heard, understood, 
              and confident in their care plan. That's why I:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-blue-600">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">⏱️ Take the Time Needed</h3>
              <p className="text-gray-700">
                I never rush consultations. Your questions deserve thoughtful, complete answers.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-green-600">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">💬 Use Clear Language</h3>
              <p className="text-gray-700">
                Medical jargon creates barriers. I explain complex concepts in ways that make sense.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-purple-600">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">📊 Visual Aids</h3>
              <p className="text-gray-700">
                I draw diagrams and use models—visual aids help clarify anatomy and treatment approaches.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-orange-600">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">👨‍👩‍👧‍👦 Family Involvement</h3>
              <p className="text-gray-700">
                Cancer affects entire families. I welcome loved ones to appointments.
              </p>
            </div>
            
            <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-red-600 md:col-span-2">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">📝 Written Summaries</h3>
              <p className="text-gray-700">
                I provide key points from our discussions, so you can review at home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Multilingual Care */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Multilingual Care</h2>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Having grown up in a multicultural environment and traveled extensively, I understand 
              the importance of communicating in a patient's preferred language. This allows me to 
              provide care to a broader community and ensures that language is never a barrier to 
              understanding your cancer treatment.
            </p>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🇺🇸</span>
                </div>
                <h3 className="font-semibold text-gray-900">English</h3>
                <p className="text-sm text-gray-600">Native fluency</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🇪🇸</span>
                </div>
                <h3 className="font-semibold text-gray-900">Spanish</h3>
                <p className="text-sm text-gray-600">Fluent</p>
              </div>
              
              <div className="text-center p-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-2xl">🇧🇷</span>
                </div>
                <h3 className="font-semibold text-gray-900">Portuguese</h3>
                <p className="text-sm text-gray-600">Fluent</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Beyond Medicine: Lifelong Learner */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Beyond Medicine: A Lifelong Learner</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            My passion for continuous learning extends far beyond the realm of medicine. This curiosity 
            benefits my patients as I bring insights from various fields into my practice:
          </p>

          <div className="space-y-8">
            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">🧠 Psychology & Communication</h3>
              <p className="text-gray-700 leading-relaxed">
                My training at Loma Linda University in whole person care has profoundly shaped my approach to patient treatment. 
                This comprehensive philosophy, rooted in treating the physical, emotional, and spiritual dimensions of health, 
                teaches that true healing extends far beyond targeting cancer cells. The program's emphasis on understanding 
                each patient as a complete person—with unique values, fears, hopes, and support systems—has become the 
                cornerstone of my practice. This holistic perspective ensures that every treatment plan addresses not just 
                the disease, but the human being experiencing it.
              </p>
            </div>

            <div className="bg-white rounded-lg p-8 shadow-md">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">💻 Technology & Innovation</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                As a technology enthusiast and hobbyist data analyst, I stay at the forefront of medical 
                innovation. My programming skills in Python, R, and machine learning allow me to:
              </p>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Analyze treatment outcomes to optimize protocols
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Understand and implement cutting-edge radiation planning systems
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  Translate complex data into meaningful insights for patients
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Interests */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Personal Interests</h2>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              When I'm not in the clinic, you might find me:
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">🏍️ Motorcycling</h3>
                <p className="text-gray-700">
                  Through Ohio's scenic backroads—there's something about the focus and precision 
                  required that mirrors the attention to detail needed in radiation oncology.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">🥾 Hiking</h3>
                <p className="text-gray-700">
                  Local trails provide perspective and remind me of the importance of overall 
                  wellness in the healing process.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">📚 Reading</h3>
                <p className="text-gray-700">
                  Voraciously—from medical journals to philosophy, business strategy to fiction. 
                  Recent favorites include works on mastery, human nature, and effective communication.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">⚙️ Technology Projects</h3>
                <p className="text-gray-700">
                  From data analysis to understanding the latest AI developments—always exploring 
                  how technology can enhance patient care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Family and Community */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Family and Community</h2>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg text-gray-700 leading-relaxed">
                While I maintain privacy about specific family details to protect their personal lives, 
                I can share that my family is my anchor and greatest source of joy. They remind me daily 
                why compassionate, excellent patient care matters—because everyone's loved one deserves 
                the best possible treatment.
              </p>
              
              <p className="text-gray-700 leading-relaxed">
                My decision to practice in Canton reflects my commitment to community. I believe that 
                world-class cancer care shouldn't require traveling to distant cities. By bringing 
                advanced radiation oncology techniques to Aultman, I hope to make a meaningful 
                difference in the lives of local families facing cancer diagnoses.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="text-center">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">👨‍👩‍👦</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Growing Family</h3>
                <p className="text-gray-700">
                  With our baby boy on the way, I'm reminded every day of the precious gift of 
                  life and health, and the responsibility we have to protect and nurture it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy of Hope and Honesty */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">A Philosophy of Hope and Honesty</h2>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Cancer is a challenging journey, but it's one that no patient should walk alone. 
              My philosophy centers on:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">💙 Honest Communication</h3>
                <p className="text-gray-700">I believe in telling the truth with compassion</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🌅 Realistic Hope</h3>
                <p className="text-gray-700">Understanding your prognosis while focusing on possibilities</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">💪 Empowerment through Education</h3>
                <p className="text-gray-700">The more you understand, the stronger you become</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">🎯 Individualized Care</h3>
                <p className="text-gray-700">Every patient's values and goals shape their treatment plan</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md md:col-span-2">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">📈 Continuous Improvement</h3>
                <p className="text-gray-700">Medicine evolves rapidly, and I evolve with it</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why I Chose Radiation Oncology */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why I Chose Radiation Oncology</h2>
          
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Radiation oncology represents the perfect intersection of cutting-edge technology 
            and compassionate patient care. It allows me to:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600">⚡</span>
                </div>
                <p className="text-gray-700">Use advanced physics and biology to fight cancer precisely</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-green-600">🤝</span>
                </div>
                <p className="text-gray-700">Build long-term relationships with patients throughout their treatment</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-purple-600">📚</span>
                </div>
                <p className="text-gray-700">Continuously learn as the field rapidly advances</p>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-orange-600">💫</span>
                </div>
                <p className="text-gray-700">Make a tangible difference in people's lives during their most challenging times</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* My Promise to Patients */}
      <section className="mb-16">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg p-8 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-white">My Promise to Patients</h2>
            
            <p className="text-xl leading-relaxed mb-8 text-blue-50">
              When you enter my office, you're not just another case or appointment slot. You're a 
              person with hopes, fears, and questions that deserve attention and respect.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
              <div className="bg-blue-800/30 border border-blue-400/30 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="font-semibold mb-2 text-white">👂 Listen without judgment</h3>
              </div>
              
              <div className="bg-blue-800/30 border border-blue-400/30 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="font-semibold mb-2 text-white">💬 Explain without condescension</h3>
              </div>
              
              <div className="bg-blue-800/30 border border-blue-400/30 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="font-semibold mb-2 text-white">🛡️ Advocate for your best interests</h3>
              </div>
              
              <div className="bg-blue-800/30 border border-blue-400/30 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="font-semibold mb-2 text-white">🙏 Respect your values and choices</h3>
              </div>
              
              <div className="bg-blue-800/30 border border-blue-400/30 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="font-semibold mb-2 text-white">📱 Be accessible when you need guidance</h3>
              </div>
              
              <div className="bg-blue-800/30 border border-blue-400/30 rounded-lg p-6 backdrop-blur-sm">
                <h3 className="font-semibold mb-2 text-white">🎉 Celebrate your victories, both large and small</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Message */}
      <section className="mb-16">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">A Personal Note</h2>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              This website reflects my commitment to patient education. I hope these resources help you 
              understand your journey better. Remember, while these articles provide valuable information, 
              they're meant to supplement, not replace, our personal discussions about your specific situation.
            </p>
            
            <p className="text-xl font-semibold text-blue-600">
              Thank you for trusting me with your care. Together, we'll navigate this journey with 
              knowledge, compassion, and hope.
            </p>
          </div>
        </div>
      </section>
    </BaseLayout>
  );
};

export default PersonalPhilosophyPage;

export const Head: HeadFC = () => (
  <>
    <title>Personal Philosophy & Approach - Dr. Daniel Sufficool | Radiation Oncologist</title>
    <meta name="description" content="Learn about Dr. Daniel Sufficool's personal philosophy, patient care approach, multilingual abilities, and the values that guide his radiation oncology practice." />
  </>
);