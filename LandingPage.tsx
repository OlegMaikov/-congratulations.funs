
import React from 'react';
import { BookIcon, SparklesIcon, DownloadIcon, WandIcon, ImageIcon, FileTextIcon, SunIcon, GlobeIcon } from './IconComponents';
import { useAppContext } from '../contexts/AppContext';

interface LandingPageProps {
  onStart: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  const { t } = useAppContext();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0B1120] text-slate-900 dark:text-white overflow-x-hidden transition-colors duration-500 selection:bg-indigo-500 selection:text-white font-sans">
      
      {/* Navbar Overlay */}
      <nav className="absolute top-0 w-full p-6 flex justify-between items-center z-50 max-w-7xl mx-auto left-0 right-0">
        <div className="flex items-center gap-2 backdrop-blur-md bg-white/30 dark:bg-black/30 px-4 py-2 rounded-full border border-white/20">
          <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg">
             <BookIcon className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight">BookCraft <span className="text-indigo-600 dark:text-indigo-400">AI</span></span>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/10 dark:bg-indigo-500/20 rounded-full blur-[120px] animate-blob"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 dark:bg-purple-500/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
            <div className="absolute top-[20%] right-[20%] w-[30%] h-[30%] bg-pink-500/10 dark:bg-pink-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          
          {/* Hero Text */}
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600 dark:bg-indigo-400"></span>
              </span>
              {t.landing.badge}
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1]">
              {t.landing.title} <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-400 drop-shadow-sm">
                {t.landing.titleHighlight}
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {t.landing.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <button 
                onClick={onStart}
                className="group relative px-8 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-full font-bold text-lg shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ mixBlendMode: 'overlay' }}></div>
                <span className="relative flex items-center justify-center gap-2">
                   {t.landing.start} <span className="group-hover:translate-x-1 transition-transform">→</span>
                </span>
              </button>
              
              <button 
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white dark:bg-white/5 text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 rounded-full font-bold text-lg hover:bg-slate-50 dark:hover:bg-white/10 transition-all duration-300 w-full sm:w-auto backdrop-blur-sm"
              >
                {t.landing.learnMore}
              </button>
            </div>

            {/* Mini Stats */}
            <div className="mt-12 flex items-center justify-center lg:justify-start gap-8 border-t border-slate-200 dark:border-slate-800 pt-8">
               <StatItem value="15k+" label={t.landing.stats.books} />
               <StatItem value="8k+" label={t.landing.stats.writers} />
               <StatItem value="4.9/5" label="Rating" />
            </div>
          </div>

          {/* Hero 3D Visual */}
          <div className="relative hidden lg:block perspective-1000 animate-fade-in delay-200">
             <div className="relative w-[380px] h-[520px] mx-auto transform rotate-y-[-15deg] rotate-x-[5deg] transition-transform duration-700 hover:rotate-y-[-5deg] hover:rotate-x-[0deg] preserve-3d group">
                {/* Book Cover */}
                <div className="absolute inset-0 bg-slate-900 rounded-r-2xl rounded-l-sm shadow-[20px_20px_60px_rgba(0,0,0,0.3)] flex flex-col items-center justify-center text-center p-8 text-white z-20 backface-hidden border-l border-white/10 overflow-hidden">
                   {/* Cover Art Gradient */}
                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-700 to-slate-900 opacity-80"></div>
                   <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 mix-blend-overlay"></div>
                   
                   <div className="relative z-10 flex flex-col items-center h-full">
                       <div className="mt-12 w-24 h-24 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center mb-6 shadow-inner border border-white/20">
                          <BookIcon className="w-12 h-12 text-white drop-shadow-md" />
                       </div>
                       <h3 className="font-serif text-4xl font-bold mb-2 drop-shadow-lg">{t.landing.demoTitle}</h3>
                       <p className="opacity-80 uppercase tracking-[0.2em] text-xs font-semibold">{t.landing.demoAuthor}</p>
                       
                       <div className="mt-auto mb-12 w-full space-y-3 opacity-60">
                          <div className="h-1 w-12 bg-white rounded-full mx-auto"></div>
                          <p className="text-[10px] uppercase tracking-widest">Best Seller Edition</p>
                       </div>
                   </div>

                   {/* Floating Cards simulating App UI */}
                   <div className="absolute -right-16 top-24 bg-white/90 dark:bg-slate-800/90 p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-float backdrop-blur-xl border border-white/20 z-30 w-48">
                      <div className="bg-indigo-100 dark:bg-indigo-900/50 p-2.5 rounded-lg"><SparklesIcon className="w-5 h-5 text-indigo-600" /></div>
                      <div>
                        <div className="text-xs text-slate-400 font-semibold uppercase">Status</div>
                        <div className="text-sm text-slate-800 dark:text-white font-bold">Generating Plot...</div>
                      </div>
                   </div>

                   <div className="absolute -left-12 bottom-32 bg-white/90 dark:bg-slate-800/90 p-4 rounded-xl shadow-2xl flex items-center gap-3 animate-float animation-delay-2000 backdrop-blur-xl border border-white/20 z-30 w-48">
                      <div className="bg-green-100 dark:bg-green-900/50 p-2.5 rounded-lg"><DownloadIcon className="w-5 h-5 text-green-600" /></div>
                      <div>
                        <div className="text-xs text-slate-400 font-semibold uppercase">Export</div>
                        <div className="text-sm text-slate-800 dark:text-white font-bold">Ready to Publish</div>
                      </div>
                   </div>
                </div>

                {/* Pages (Thickness) */}
                <div className="absolute top-1 bottom-1 right-2 w-12 bg-[#fffcf5] rounded-r-md transform translate-z-[-20px] shadow-inner border-r border-slate-200" style={{backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 1px, #e5e5e5 1px, #e5e5e5 2px)'}}></div>
                <div className="absolute top-1 bottom-1 right-1 w-10 bg-[#fffcf5] rounded-r-md transform translate-z-[-10px]"></div>
                
                {/* Back Cover */}
                <div className="absolute inset-0 bg-slate-800 rounded-l-md transform translate-z-[-25px] shadow-2xl"></div>
             </div>
             
             {/* Floor Shadow */}
             <div className="absolute bottom-[-50px] left-1/2 -translate-x-1/2 w-[300px] h-[40px] bg-indigo-900/40 blur-2xl rounded-[100%]"></div>
          </div>
        </div>
      </div>

      {/* --- HOW IT WORKS SECTION --- */}
      <div id="how-it-works" className="py-24 bg-slate-50 dark:bg-[#0f172a] border-y border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 max-w-2xl mx-auto">
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 dark:text-white">{t.landing.steps.title}</h2>
                <div className="h-1.5 w-20 bg-indigo-600 rounded-full mx-auto"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                <StepCard number="01" title={t.landing.steps.step1} desc={t.landing.steps.step1Desc} icon={<SparklesIcon />} />
                <StepCard number="02" title={t.landing.steps.step2} desc={t.landing.steps.step2Desc} icon={<FileTextIcon />} />
                <StepCard number="03" title={t.landing.steps.step3} desc={t.landing.steps.step3Desc} icon={<WandIcon />} />
                <StepCard number="04" title={t.landing.steps.step4} desc={t.landing.steps.step4Desc} icon={<DownloadIcon />} />
                
                {/* Connecting Line (Desktop) */}
                <div className="hidden lg:block absolute top-12 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-indigo-200 via-purple-200 to-indigo-200 dark:from-indigo-800 dark:via-purple-800 dark:to-indigo-800 -z-10 border-t border-dashed border-indigo-400/30"></div>
            </div>
        </div>
      </div>

      {/* --- FEATURES GRID --- */}
      <div className="py-24 bg-white dark:bg-[#0B1120]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
             <span className="text-indigo-600 dark:text-indigo-400 font-bold tracking-wider uppercase text-sm">{t.landing.features.subtitle}</span>
             <h2 className="text-3xl lg:text-4xl font-bold mt-2 text-slate-900 dark:text-white max-w-lg">{t.landing.features.title}</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
               icon={<FileTextIcon className="w-6 h-6 text-white" />}
               color="bg-indigo-500"
               title={t.landing.features.structure}
               desc={t.landing.features.structureDesc}
            />
            <FeatureCard 
               icon={<WandIcon className="w-6 h-6 text-white" />}
               color="bg-purple-500"
               title={t.landing.features.writing}
               desc={t.landing.features.writingDesc}
            />
            <FeatureCard 
               icon={<DownloadIcon className="w-6 h-6 text-white" />}
               color="bg-blue-500"
               title={t.landing.features.export}
               desc={t.landing.features.exportDesc}
            />
            <FeatureCard 
               icon={<ImageIcon className="w-6 h-6 text-white" />}
               color="bg-pink-500"
               title={t.landing.features.cover}
               desc={t.landing.features.coverDesc}
            />
            <FeatureCard 
               icon={<SparklesIcon className="w-6 h-6 text-white" />}
               color="bg-amber-500"
               title={t.landing.features.cloud}
               desc={t.landing.features.cloudDesc}
            />
            <FeatureCard 
               icon={<BookIcon className="w-6 h-6 text-white" />}
               color="bg-teal-500"
               title={t.landing.features.focus}
               desc={t.landing.features.focusDesc}
            />
          </div>
        </div>
      </div>

      {/* --- TESTIMONIALS --- */}
      <div className="py-24 bg-slate-50 dark:bg-[#0f172a] border-t border-slate-200 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-16 text-slate-900 dark:text-white">{t.landing.testimonials.title}</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <TestimonialCard 
                    text={t.landing.testimonials.t1} 
                    author={t.landing.testimonials.a1} 
                    role={t.landing.testimonials.r1} 
                    initial="A"
                />
                <TestimonialCard 
                    text={t.landing.testimonials.t2} 
                    author={t.landing.testimonials.a2} 
                    role={t.landing.testimonials.r2} 
                    initial="M"
                />
                <TestimonialCard 
                    text={t.landing.testimonials.t3} 
                    author={t.landing.testimonials.a3} 
                    role={t.landing.testimonials.r3} 
                    initial="D"
                />
            </div>
        </div>
      </div>

      {/* --- CTA BOTTOM --- */}
      <div className="py-24 px-6">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-12 text-center text-white shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-multiply"></div>
             <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] bg-white/10 rounded-full blur-[80px]"></div>
             
             <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl font-bold mb-6">{t.landing.cta.title}</h2>
                 <p className="text-indigo-100 text-lg mb-8 max-w-2xl mx-auto">{t.landing.cta.subtitle}</p>
                 <button 
                    onClick={onStart}
                    className="px-10 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:bg-indigo-50 hover:-translate-y-1 transition-all duration-300"
                 >
                    {t.landing.cta.btn}
                 </button>
             </div>
          </div>
      </div>

      {/* Footer */}
      <footer className="py-12 text-center text-slate-500 dark:text-slate-500 text-sm bg-white dark:bg-[#0B1120] border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <BookIcon className="w-5 h-5" />
            <span className="font-bold">BookCraft AI</span>
        </div>
        <p>{t.landing.footer}</p>
      </footer>

      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .perspective-1000 { perspective: 1000px; }
        .translate-z-\\[-20px\\] { transform: translateZ(-20px); }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 10s infinite; }
      `}</style>
    </div>
  );
};

// --- Subcomponents ---

const StatItem: React.FC<{ value: string; label: string }> = ({ value, label }) => (
    <div className="flex flex-col">
        <span className="text-2xl font-bold text-slate-900 dark:text-white">{value}</span>
        <span className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-wider font-medium">{label}</span>
    </div>
);

const StepCard: React.FC<{ number: string; title: string; desc: string; icon: React.ReactNode }> = ({ number, title, desc, icon }) => (
    <div className="relative bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow z-10">
        <div className="text-5xl font-black text-slate-100 dark:text-slate-700 absolute top-4 right-4 -z-10 select-none">
            {number}
        </div>
        <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl flex items-center justify-center mb-6">
            <div className="w-6 h-6">{icon}</div>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{title}</h3>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
            {desc}
        </p>
    </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, desc: string, color: string }> = ({ icon, title, desc, color }) => (
  <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-700 hover:border-indigo-200 dark:hover:border-indigo-800 transition-all hover:-translate-y-1 hover:shadow-lg group">
    <div className={`w-12 h-12 rounded-xl ${color} shadow-lg shadow-indigo-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{title}</h3>
    <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm">
      {desc}
    </p>
  </div>
);

const TestimonialCard: React.FC<{ text: string; author: string; role: string; initial: string }> = ({ text, author, role, initial }) => (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col h-full">
        <div className="flex gap-1 mb-6">
            {[1,2,3,4,5].map(i => <svg key={i} className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
        </div>
        <p className="text-slate-700 dark:text-slate-300 italic mb-6 flex-1 text-sm leading-relaxed">"{text}"</p>
        <div className="flex items-center gap-4 mt-auto pt-6 border-t border-slate-100 dark:border-slate-700">
            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500 dark:text-slate-400">
                {initial}
            </div>
            <div>
                <div className="font-bold text-slate-900 dark:text-white text-sm">{author}</div>
                <div className="text-xs text-indigo-500 font-medium">{role}</div>
            </div>
        </div>
    </div>
);
