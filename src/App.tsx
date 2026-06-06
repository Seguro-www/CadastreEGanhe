/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { HomePage } from './pages/HomePage';
import { AdminPage } from './pages/AdminPage';
import { DynamicCampaignPage } from './pages/DynamicCampaignPage';
import { DashboardPage } from './pages/DashboardPage';
import { IphoneLandingPage } from './pages/IphoneLandingPage';
import { SorteioStatusCard } from './components/SorteioStatusCard';
import { WinnerInfoSection } from './components/WinnerInfoSection';
import { useFirebase } from './hooks/useFirebase';
import { loginWithEmail, registerWithEmail, resetPassword, signInWithGoogle, signInWithAnonymous, auth } from './lib/firebase';
import { LoginModal, Navbar, TrustIndicators, HowItWorks, Footer } from './components/NavigationLayout';
import { 
  BellRing, 
  CheckCircle2, 
  ChevronRight, 
  Clock, 
  Gift, 
  Lock, 
  Smartphone, 
  Zap,
  ArrowRight,
  ShieldCheck,
  X,
  User
} from 'lucide-react';



function VASTAdPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let player: any;
    // Fluid Player initialization
    if (videoRef.current && (window as any).fluidPlayer) {
      player = (window as any).fluidPlayer(videoRef.current, {
        layoutControls: {
          primaryColor: false,
          playButtonShowing: true,
          playPauseAnimation: true,
          fillToContainer: true,
          autoPlay: true,
          mute: true,
          allowDownload: false,
          logo: { imageUrl: null },
        },
        vastOptions: {
          allowVPAID: true,
          adList: [
            {
              roll: 'preRoll',
              vastTag: 'https://s.magsrv.com/v1/vast.php?idzone=5920248'
            },
            {
              roll: 'preRoll',
              vastTag: 'https://s.magsrv.com/v1/vast.php?idzone=5920250'
            }
          ]
        }
      });
    }

    return () => {
      if (player) {
         player.destroy();
      }
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <video ref={videoRef} controls style={{ width: '100%', height: '100%' }}>
        <source src="data:video/mp4;base64,AAAAHGZ0eXBpc29tAAACAGlzb21pc28yYXZjMQAAAAhmcmVl" type="video/mp4" />
      </video>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sorteio-de-iPhone" element={<SorteioIphonePage />} />
          <Route path="/sorteio-Mouse-Gamer-Logitech-G403-HERO-Sensor-Hero-25K" element={<SorteioMousePage />} />
          <Route path="/Jogo-de-cartas-colecionáveis-Yu-Gi-Oh!-carta-Battle-of-legends-Monster-Mayhem-de-mazos-com-20-cartas" element={<SorteioYugiohPage />} />
          <Route path="/sorteio-Smartwatch-S10" element={<SorteioSmartwatchPage />} />
          <Route path="/sorteios/:id" element={<DynamicCampaignPage />} />
          <Route path="/iphone-17-pro-max" element={<IphoneLandingPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/adm" element={<AdminPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}

function SorteioIphonePage() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-orange-500/30 selection:text-orange-200">
      <Helmet>
        <title>Sorteio iPhone 17 Pro Max Grátis | CadastreEGanhe</title>
        <meta name="description" content="Concorra ao novo iPhone 17 Pro Max de forma totalmente gratuita. Participe do nosso sorteio exclusivo, cadastre seu e-mail e ganhe chances reais." />
        <meta name="keywords" content="sorteio iphone 17, ganhar iphone grátis, sorteio de celular, iphone 17 pro max, prêmios grátis" />
        <link rel="canonical" href="https://jogueeganhee.com.br/sorteio-de-iPhone" />
        <meta property="og:title" content="Sorteio iPhone 17 Pro Max Grátis | CadastreEGanhe" />
        <meta property="og:description" content="Participe e concorra ao iPhone 17 Pro Max!" />
        <meta property="og:url" content="https://jogueeganhee.com.br/sorteio-de-iPhone" />
        <meta property="og:type" content="product" />
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <TrustIndicators />
        <WinnerInfoSection />
        <HowItWorks />
        <ProductShowcase />
        <MercadoLivreAdIphone />
        <UrgencySection />
      </main>
      <Footer />

      {/* Sticky Mobile CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10 z-50 flex justify-center pb-safe"
          >
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full max-w-sm bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-colors"
            >
              Quero participar
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Hero() {
  const { user, registrations, registerParticipation } = useFirebase();
  const reg = registrations.find(r => r.sweepstakesId === 'iphone');
  const tickets = reg?.tickets || 0;
  
  const [dailyLimitReached, setDailyLimitReached] = useState(false);

  const checkDailyLimit = () => {
    if (!reg) return false;
    const now = new Date();
    const lastUpdate = reg.lastDailyUpdate?.toDate ? reg.lastDailyUpdate.toDate() : new Date(reg.lastDailyUpdate);
    const isNewDay = now.toDateString() !== lastUpdate.toDateString();
    return !isNewDay && reg.dailyTickets >= 100;
  };

  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'idle' | 'soft_prompt' | 'ad_1' | 'success'>('idle');
  const [showInstallPanel, setShowInstallPanel] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (tickets > 0 && step === 'idle') {
      setStep('success');
    }
    if (user && user.email && !email) {
      setEmail(user.email);
    }

    if (checkDailyLimit()) {
      setDailyLimitReached(true);
    } else {
      setDailyLimitReached(false);
    }

    const checkPrompt = () => { if ((window as any).deferredPrompt) { setDeferredPrompt((window as any).deferredPrompt); } }; checkPrompt(); window.addEventListener('app-install-ready', checkPrompt); return () => { window.removeEventListener('app-install-ready', checkPrompt); };
  }, [tickets, user]);

  const handleRegisterAgain = () => {
    setEmail(user?.email || '');
    setStep('idle');
  };

  const handleInstallClick = async () => { const promptEvent = deferredPrompt || (window as any).deferredPrompt; if (promptEvent) { promptEvent.prompt(); const { outcome } = await promptEvent.userChoice; if (outcome === 'accepted') { setDeferredPrompt(null); (window as any).deferredPrompt = null; setShowInstallPanel(false); } } else { alert("Para instalar, toque no menu do seu navegador e selecione 'Adicionar à tela inicial' ou 'Instalar aplicativo'."); } };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    if (!user) {
      try {
        await signInWithGoogle();
      } catch (err) {
        return;
      }
    }
    
    setStep('soft_prompt');
  };

  const handleAllowClick = async () => { if ('Notification' in window) { Notification.requestPermission().catch(console.error); } setStep('ad_1'); };

  const handleDeclineClick = async () => {
    setStep('success');
    try {
      const result = await registerParticipation(email, 'iphone');
      if (result?.limitReached) setDailyLimitReached(true);
      setShowInstallPanel(true);
    } catch (err: any) {
      console.error("Firebase error", err);
      alert(err.message || "Erro ao registrar participação.");
      setStep('idle');
    }
  };

  const handleCloseAd1 = async () => {
    if ('Notification' in window) {
      Notification.requestPermission().catch(console.error);
    }
    setStep('success');
    try {
      const result = await registerParticipation(email, 'iphone');
      if (result?.limitReached) setDailyLimitReached(true);
      setShowInstallPanel(true);
    } catch (err: any) {
      console.error("Firebase error", err);
      alert(err.message || "Erro ao registrar participação.");
      setStep('idle');
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto px-4 relative z-10 w-full">
        <motion.div
          id="hero-form"
          className="scroll-mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-400 text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            Participe gratuitamente
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Concorra a um <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
              iPhone 17 Pro Max
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Cadastre seu e-mail e ative as notificações para participar gratuitamente.
          </p>

          {step === 'success' ? (
            <div className="w-full max-w-md mx-auto">
              <SorteioStatusCard 
                productName="iPhone 17 Pro Max"
                tickets={tickets}
                onAction={handleRegisterAgain}
                accentColor="bg-orange-500"
              />
              {dailyLimitReached && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-orange-500/10 border border-orange-500/20 rounded-2xl"
                >
                  <p className="text-orange-400 font-semibold text-sm">
                    Volte amanhã para pegar mais número da sorte
                  </p>
                </motion.div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative flex items-center bg-[#111] border border-white/10 rounded-2xl p-1.5 focus-within:border-orange-500/50 transition-colors">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail" 
                  className="w-full bg-transparent text-white px-4 py-3 outline-none placeholder:text-white/30"
                  required
                />
                <button 
                  type="submit"
                  className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex-shrink-0 flex items-center gap-2"
                >
                  Quero participar
                </button>
              </div>
              <p className="text-xs text-white/40 mt-4">Participação simples, rápida e sem custos.</p>
            </form>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative max-w-sm mx-auto flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-full px-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-orange-500/30 to-transparent blur-3xl rounded-full"></div>
            <motion.img 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src="/iphone-17-pro-max-apple-256gb-48mp-tela-6-9-super-retina-xdr-laranja-cosmico_1757696972_gg.webp" 
              alt="sorteio de iphone grátis participe agora"
              loading="lazy"
              className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Soft Prompt Modal */}
      <AnimatePresence>
        {step === 'soft_prompt' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111] border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BellRing className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Ative as notificações</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Receba o resultado do sorteio e atualizações importantes em tempo real.
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleAllowClick}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors"
                >
                  Permitir notificações
                </button>
                <button 
                  onClick={handleDeclineClick}
                  className="w-full bg-transparent hover:bg-white/5 text-white/50 font-medium py-3.5 px-6 rounded-xl transition-colors outline-none"
                >
                  Agora não
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install PWA Prompt */}
      <AnimatePresence>
        {step === 'success' && showInstallPanel && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-96 z-50 bg-[#111] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex gap-4 items-start mb-4">
              <div className="w-12 h-12 bg-black rounded-xl border border-white/10 flex items-center justify-center shrink-0">
                 <img src="/icone-app.png" alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-white mb-1">Instale o App</h4>
                <p className="text-sm text-white/60 leading-tight">Pegue mais números da sorte ao longo do dia e aumente suas chances com nosso aplicativo oficial.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowInstallPanel(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-2.5 rounded-xl transition-colors text-sm"
              >
                Agora não
              </button>
              <button 
                onClick={handleInstallClick}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
              >
                Instalar App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ad 1 Placeholder Context */}
      <AnimatePresence>
        {step === 'ad_1' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <div className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
              <div className="p-3 bg-white/5 flex justify-between items-center border-b border-white/5">
                <span className="text-xs text-white/40 uppercase tracking-widest font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                  Anúncio Promocional
                </span>
              </div>
              
              <div className="aspect-video bg-black flex items-center justify-center relative group">
                <VASTAdPlayer />
              </div>
              
              <div className="p-4 bg-[#111] flex justify-between items-center border-t border-white/5">
                <span className="text-sm text-white/40">O sorteio continuará em instantes...</span>
                <button 
                  onClick={handleCloseAd1}
                  className="text-sm font-semibold text-white/90 hover:text-white bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                >
                  Pular Anúncio e Permitir Push
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProductShowcase() {
  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              iPhone 17 Pro Max
            </h2>
            <p className="text-xl md:text-2xl text-white/70 mb-4 font-light leading-snug">
              O smartphone mais avançado da Apple.
            </p>
            <p className="text-white/50 leading-relaxed mb-8">
              Design premium, desempenho extremo e câmera de última geração. Uma verdadeira obra de arte da tecnologia nas suas mãos.
            </p>
            
            <ul className="space-y-4 text-white/80">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-500" />
                Acabamento premium em titânio e vidro.
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-500" />
                Sistema de câmeras profissional atualizado.
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-orange-500" />
                Chip de processamento de última geração.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 relative flex items-center justify-center p-8 pointer-events-none"
          >
             <div className="absolute inset-0 bg-orange-500/20 blur-3xl rounded-full"></div>
             <motion.img 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               src="/iphone-17-pro-max-apple-256gb-48mp-tela-6-9-super-retina-xdr-laranja-cosmico_1757696972_gg.webp" 
               alt="sorteio de iphone grátis participe agora"
               loading="lazy"
               className="relative z-10 w-full max-w-[280px] h-auto object-contain drop-shadow-2xl"
             />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function UrgencySection() {
  const [timeLeft, setTimeLeft] = useState({ days: 2, hours: 14, minutes: 30, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-[#0a0a0a] to-[#111] text-center border-t border-white/5">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Clock className="w-12 h-12 text-orange-500 mx-auto mb-6" />
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Vagas limitadas para participação
        </h2>
        <p className="text-white/50 mb-10 text-lg">
          O sorteio será realizado em breve. Garanta sua participação antes que o tempo acabe.
        </p>

        <div className="flex justify-center gap-4 mb-12">
           <div className="bg-black border border-white/10 rounded-2xl w-20 h-24 flex flex-col items-center justify-center">
             <span className="text-3xl font-bold text-white">{timeLeft.days}</span>
             <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Dias</span>
           </div>
           <div className="text-2xl font-bold text-white/20 mt-6">:</div>
           <div className="bg-black border border-white/10 rounded-2xl w-20 h-24 flex flex-col items-center justify-center">
             <span className="text-3xl font-bold text-white">{timeLeft.hours.toString().padStart(2, '0')}</span>
             <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Horas</span>
           </div>
           <div className="text-2xl font-bold text-white/20 mt-6">:</div>
           <div className="bg-black border border-white/10 rounded-2xl w-20 h-24 flex flex-col items-center justify-center">
             <span className="text-3xl font-bold text-white">{timeLeft.minutes.toString().padStart(2, '0')}</span>
             <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Min</span>
           </div>
           <div className="text-2xl font-bold text-white/20 mt-6">:</div>
           <div className="bg-black border border-white/10 rounded-2xl w-20 h-24 flex flex-col items-center justify-center">
             <span className="text-3xl font-bold text-orange-400">{timeLeft.seconds.toString().padStart(2, '0')}</span>
             <span className="text-xs text-white/40 font-medium uppercase tracking-wider">Seg</span>
           </div>
        </div>

        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 group"
        >
          Participar do sorteio
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}

export function SorteioMousePage() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-500/30 selection:text-blue-200">
      <Helmet>
        <title>Sorteio Mouse Gamer Logitech G403 HERO | CadastreEGanhe</title>
        <meta name="description" content="Participe do sorteio gratuito do Mouse Gamer Logitech G403 HERO com sensor 25K. Oportunidade única para gamers!" />
        <meta name="keywords" content="sorteio mouse gamer, logitech g403 hero, ganhar mouse logitech, sorteio hardware gamer, prêmios gamer" />
        <link rel="canonical" href="https://jogueeganhee.com.br/sorteio-Mouse-Gamer-Logitech-G403-HERO-Sensor-Hero-25K" />
        <meta property="og:title" content="Sorteio Mouse Gamer Logitech G403 HERO | CadastreEGanhe" />
        <meta property="og:description" content="Concorra ao Mouse Gamer Logitech G403 HERO!" />
        <meta property="og:url" content="https://jogueeganhee.com.br/sorteio-Mouse-Gamer-Logitech-G403-HERO-Sensor-Hero-25K" />
        <meta property="og:type" content="product" />
      </Helmet>
      <Navbar />
      <main>
        <HeroMouse />
        <TrustIndicators />
        <WinnerInfoSection />
        <HowItWorks />
        <ProductShowcaseMouse />
        <MercadoLivreAdMouse />
        <UrgencySection />
      </main>
      <Footer />

      {/* Sticky Mobile CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10 z-50 flex justify-center pb-safe"
          >
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full max-w-sm bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-colors"
            >
              Quero participar
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HeroMouse() {
  const { user, registrations, registerParticipation } = useFirebase();
  const reg = registrations.find(r => r.sweepstakesId === 'mouse');
  const tickets = reg?.tickets || 0;
  
  const [dailyLimitReached, setDailyLimitReached] = useState(false);

  const checkDailyLimit = () => {
    if (!reg) return false;
    const now = new Date();
    const lastUpdate = reg.lastDailyUpdate?.toDate ? reg.lastDailyUpdate.toDate() : new Date(reg.lastDailyUpdate);
    const isNewDay = now.toDateString() !== lastUpdate.toDateString();
    return !isNewDay && reg.dailyTickets >= 100;
  };

  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'idle' | 'soft_prompt' | 'ad_1' | 'success'>('idle');
  const [showInstallPanel, setShowInstallPanel] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (tickets > 0 && step === 'idle') {
      setStep('success');
    }
    if (user && user.email && !email) {
      setEmail(user.email);
    }

    if (checkDailyLimit()) {
      setDailyLimitReached(true);
    } else {
      setDailyLimitReached(false);
    }

    const checkPrompt = () => { if ((window as any).deferredPrompt) { setDeferredPrompt((window as any).deferredPrompt); } }; checkPrompt(); window.addEventListener('app-install-ready', checkPrompt); return () => { window.removeEventListener('app-install-ready', checkPrompt); };
  }, [tickets, user]);

  const handleRegisterAgain = () => {
    setEmail(user?.email || '');
    setStep('idle');
  };

  const handleInstallClick = async () => { const promptEvent = deferredPrompt || (window as any).deferredPrompt; if (promptEvent) { promptEvent.prompt(); const { outcome } = await promptEvent.userChoice; if (outcome === 'accepted') { setDeferredPrompt(null); (window as any).deferredPrompt = null; setShowInstallPanel(false); } } else { alert("Para instalar, toque no menu do seu navegador e selecione 'Adicionar à tela inicial' ou 'Instalar aplicativo'."); } };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!user) {
      try {
        await signInWithGoogle();
      } catch (err) {
        return;
      }
    }

    setStep('soft_prompt');
  };

  const handleAllowClick = async () => { if ('Notification' in window) { Notification.requestPermission().catch(console.error); } setStep('ad_1'); };

  const handleDeclineClick = async () => {
    setStep('success');
    try {
      const result = await registerParticipation(email, 'mouse');
      if (result?.limitReached) setDailyLimitReached(true);
      setShowInstallPanel(true);
    } catch (err: any) {
      console.error("Firebase error", err);
      alert(err.message || "Erro ao registrar participação.");
      setStep('idle');
    }
  };

  const handleCloseAd1 = async () => {
    if ('Notification' in window) {
      Notification.requestPermission().catch(console.error);
    }
    setStep('success');
    try {
      const result = await registerParticipation(email, 'mouse');
      if (result?.limitReached) setDailyLimitReached(true);
      setShowInstallPanel(true);
    } catch (err: any) {
      console.error("Firebase error", err);
      alert(err.message || "Erro ao registrar participação.");
      setStep('idle');
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto px-4 relative z-10 w-full">
        <motion.div
          id="hero-form"
          className="scroll-mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
            Participe gratuitamente
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Concorra a um <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
              Mouse Logitech G403
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Cadastre seu e-mail e ative as notificações para participar gratuitamente.
          </p>

          {step === 'success' ? (
            <div className="w-full max-w-md mx-auto">
              <SorteioStatusCard 
                productName="Mouse Logitech G403"
                tickets={tickets}
                onAction={handleRegisterAgain}
                accentColor="bg-blue-500"
              />
              {dailyLimitReached && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl"
                >
                  <p className="text-blue-400 font-semibold text-sm">
                    Volte amanhã para pegar mais número da sorte
                  </p>
                </motion.div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative flex items-center bg-[#111] border border-white/10 rounded-2xl p-1.5 focus-within:border-blue-500/50 transition-colors">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail" 
                  className="w-full bg-transparent text-white px-4 py-3 outline-none placeholder:text-white/30"
                  required
                />
                <button 
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex-shrink-0 flex items-center gap-2"
                >
                  Quero participar
                </button>
              </div>
              <p className="text-xs text-white/40 mt-4">Participação simples, rápida e sem custos.</p>
            </form>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative max-w-sm mx-auto flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-full px-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/30 to-transparent blur-3xl rounded-full"></div>
            <motion.img 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src="/mouse2.png" 
              alt="sorteio de mouse gamer grátis participe agora"
              loading="lazy"
              className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Soft Prompt Modal */}
      <AnimatePresence>
        {step === 'soft_prompt' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111] border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BellRing className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Ative as notificações</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Receba o resultado do sorteio e atualizações importantes em tempo real.
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleAllowClick}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors"
                >
                  Permitir notificações
                </button>
                <button 
                  onClick={handleDeclineClick}
                  className="w-full bg-transparent hover:bg-white/5 text-white/50 font-medium py-3.5 px-6 rounded-xl transition-colors outline-none"
                >
                  Agora não
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install PWA Prompt */}
      <AnimatePresence>
        {step === 'success' && showInstallPanel && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-96 z-50 bg-[#111] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex gap-4 items-start mb-4">
              <div className="w-12 h-12 bg-black rounded-xl border border-white/10 flex items-center justify-center shrink-0">
                 <img src="/icone-app.png" alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-white mb-1">Instale o App</h4>
                <p className="text-sm text-white/60 leading-tight">Pegue mais números da sorte ao longo do dia e aumente suas chances com nosso aplicativo oficial.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowInstallPanel(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-2.5 rounded-xl transition-colors text-sm"
              >
                Agora não
              </button>
              <button 
                onClick={handleInstallClick}
                className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
              >
                Instalar App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ad 1 Placeholder Context */}
      <AnimatePresence>
        {step === 'ad_1' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <div className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
              <div className="p-3 bg-white/5 flex justify-between items-center border-b border-white/5">
                <span className="text-xs text-white/40 uppercase tracking-widest font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>
                  Anúncio Promocional
                </span>
              </div>
              
              <div className="aspect-video bg-black flex items-center justify-center relative group">
                <VASTAdPlayer />
              </div>
              
              <div className="p-4 bg-[#111] flex justify-between items-center border-t border-white/5">
                <span className="text-sm text-white/40">O sorteio continuará em instantes...</span>
                <button 
                  onClick={handleCloseAd1}
                  className="text-sm font-semibold text-white/90 hover:text-white bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/40 px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                >
                  Pular Anúncio e Permitir Push
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProductShowcaseMouse() {
  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Mouse Logitech G403 HERO
            </h2>
            <p className="text-xl md:text-2xl text-white/70 mb-4 font-light leading-snug">
              Desempenho de outro nível.
            </p>
            <p className="text-white/50 leading-relaxed mb-8">
              Um mouse gamer leve, ergonômico e projetado para oferecer a precisão que você exige para jogar em alto nível, equipado com o sensor HERO 25K.
            </p>
            
            <ul className="space-y-4 text-white/80">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                Sensor Hero 25K de última geração.
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                Iluminação RGB LIGHTSYNC programável.
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-500" />
                Peso ajustável com 10g adicionais removíveis.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 relative flex items-center justify-center p-8 pointer-events-none"
          >
             <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
             <motion.img 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               src="/mouse2.png" 
               alt="sorteio de mouse gamer grátis participe agora"
               loading="lazy"
               className="relative z-10 w-full max-w-[280px] h-auto object-contain drop-shadow-2xl"
             />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MercadoLivreAdMouse() {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150"></div>
          
          <div className="w-full md:w-2/5 flex justify-center shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full"></div>
              <img 
                src="/mouse2.png" 
                alt="Mouse Gamer Logitech G403 HERO" 
                className="w-full max-w-[240px] object-contain drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="w-full md:w-3/5 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-bold mb-4 uppercase tracking-wider">
              <span>Mercado Livre</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
              Não quer esperar o sorteio?
            </h3>
            <div className="text-3xl font-bold text-white mb-4">
              R$ 280<span className="text-lg text-white/50 font-normal">,00</span>
            </div>
            <p className="text-white/60 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
              Compre o Mouse Gamer Logitech G403 HERO Sensor Hero 25K agora mesmo com segurança e entrega rápida no Mercado Livre.
            </p>
            <a 
              href="https://www.mercadolivre.com.br/mouse-gamer-logitech-g403-hero-sensor-hero-25k/p/MLB15755061?pdp_filters=item_id:MLB4656666709" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#FEE600] hover:bg-[#F2DB00] text-[#2D3277] font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-xl hover:shadow-[#FEE600]/20"
            >
              Comprar no Mercado Livre
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function MercadoLivreAdIphone() {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-blue-500/5 blur-[100px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150"></div>
          
          <div className="w-full md:w-2/5 flex justify-center shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full"></div>
              <img 
                src="/iphone-17-pro-max-apple-256gb-48mp-tela-6-9-super-retina-xdr-laranja-cosmico_1757696972_gg.webp" 
                alt="iPhone 17 Pro Max" 
                className="w-full max-w-[240px] object-contain drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="w-full md:w-3/5 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-bold mb-4 uppercase tracking-wider">
              <span>Mercado Livre</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
              Não quer esperar o sorteio?
            </h3>
            <div className="text-3xl font-bold text-white mb-4">
              R$ 10.349<span className="text-lg text-white/50 font-normal">,99</span>
            </div>
            <p className="text-white/60 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
              Compre o iPhone 17 Pro Max agora mesmo com segurança e entrega rápida no Mercado Livre.
            </p>
            <a 
              href="https://www.mercadolivre.com.br/iphone-17-pro-max-512gb-laranja-cosmico/p/MLB55308659?pdp_filters=item_id:MLB4661662537" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#FEE600] hover:bg-[#F2DB00] text-[#2D3277] font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-xl hover:shadow-[#FEE600]/20"
            >
              Comprar no Mercado Livre
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SorteioYugiohPage() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-purple-500/30 selection:text-purple-200">
      <Helmet>
        <title>Sorteio Jogo De Cartas Yu-Gi-Oh! Battle of Legends | CadastreEGanhe</title>
        <meta name="description" content="Participe do sorteio gratuito das cartas Yu-Gi-Oh! Battle of Legends Monster Mayhem. Cadastre seu e-mail e ganhe chances reais de ganhar!" />
        <meta name="keywords" content="sorteio Yu-Gi-Oh, cartas grátis, Battle of Legends Monster Mayhem, ganhar cartas yugioh, sorteios online" />
        <link rel="canonical" href="https://jogueeganhee.com.br/Jogo-de-cartas-colecionáveis-Yu-Gi-Oh!-carta-Battle-of-legends-Monster-Mayhem-de-mazos-com-20-cartas" />
        <meta property="og:title" content="Sorteio Yu-Gi-Oh! Battle of Legends | Monster Mayhem" />
        <meta property="og:description" content="Participe do sorteio gratuito e concorra a um deck exclusivo de Yu-Gi-Oh!." />
        <meta property="og:url" content="https://jogueeganhee.com.br/Jogo-de-cartas-colecionáveis-Yu-Gi-Oh!-carta-Battle-of-legends-Monster-Mayhem-de-mazos-com-20-cartas" />
        <meta property="og:type" content="product" />
      </Helmet>
      <Navbar />
      <main>
        <HeroYugioh />
        <TrustIndicators />
        <WinnerInfoSection />
        <HowItWorks />
        <ProductShowcaseYugioh />
        <MercadoLivreAdYugioh />
        <UrgencySection />
      </main>
      <Footer />

      {/* Sticky Mobile CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10 z-50 flex justify-center pb-safe"
          >
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full max-w-sm bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-colors"
            >
              Quero participar
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HeroYugioh() {
  const { user, registrations, registerParticipation } = useFirebase();
  const reg = registrations.find(r => r.sweepstakesId === 'yugioh');
  const tickets = reg?.tickets || 0;
  
  const [dailyLimitReached, setDailyLimitReached] = useState(false);

  const checkDailyLimit = () => {
    if (!reg) return false;
    const now = new Date();
    const lastUpdate = reg.lastDailyUpdate?.toDate ? reg.lastDailyUpdate.toDate() : new Date(reg.lastDailyUpdate);
    const isNewDay = now.toDateString() !== lastUpdate.toDateString();
    return !isNewDay && reg.dailyTickets >= 100;
  };

  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'idle' | 'soft_prompt' | 'ad_1' | 'success'>('idle');
  const [showInstallPanel, setShowInstallPanel] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (tickets > 0 && step === 'idle') {
      setStep('success');
    }
    if (user && user.email && !email) {
      setEmail(user.email);
    }

    if (checkDailyLimit()) {
      setDailyLimitReached(true);
    } else {
      setDailyLimitReached(false);
    }

    const checkPrompt = () => { if ((window as any).deferredPrompt) { setDeferredPrompt((window as any).deferredPrompt); } }; checkPrompt(); window.addEventListener('app-install-ready', checkPrompt); return () => { window.removeEventListener('app-install-ready', checkPrompt); };
  }, [tickets, user]);

  const handleRegisterAgain = () => {
    setEmail(user?.email || '');
    setStep('idle');
  };

  const handleInstallClick = async () => { const promptEvent = deferredPrompt || (window as any).deferredPrompt; if (promptEvent) { promptEvent.prompt(); const { outcome } = await promptEvent.userChoice; if (outcome === 'accepted') { setDeferredPrompt(null); (window as any).deferredPrompt = null; setShowInstallPanel(false); } } else { alert("Para instalar, toque no menu do seu navegador e selecione 'Adicionar à tela inicial' ou 'Instalar aplicativo'."); } };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!user) {
      try {
        await signInWithGoogle();
      } catch (err) {
        return;
      }
    }

    setStep('soft_prompt');
  };

  const handleAllowClick = async () => { if ('Notification' in window) { Notification.requestPermission().catch(console.error); } setStep('ad_1'); };

  const handleDeclineClick = async () => {
    setStep('success');
    try {
      const result = await registerParticipation(email, 'yugioh');
      if (result?.limitReached) setDailyLimitReached(true);
      setShowInstallPanel(true);
    } catch (err: any) {
      console.error("Firebase error", err);
      alert(err.message || "Erro ao registrar participação.");
      setStep('idle');
    }
  };

  const handleCloseAd1 = async () => {
    if ('Notification' in window) {
      Notification.requestPermission().catch(console.error);
    }
    setStep('success');
    try {
      const result = await registerParticipation(email, 'yugioh');
      if (result?.limitReached) setDailyLimitReached(true);
      setShowInstallPanel(true);
    } catch (err: any) {
      console.error("Firebase error", err);
      alert(err.message || "Erro ao registrar participação.");
      setStep('idle');
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto px-4 relative z-10 w-full">
        <motion.div
          id="hero-form"
          className="scroll-mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400 text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            Participe gratuitamente
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Concorra a um <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
              Jogo Yu-Gi-Oh!
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Cadastre seu e-mail e ative as notificações para participar gratuitamente.
          </p>

          {step === 'success' ? (
            <div className="w-full max-w-md mx-auto">
              <SorteioStatusCard 
                productName="Jogo Yu-Gi-Oh!"
                tickets={tickets}
                onAction={handleRegisterAgain}
                accentColor="bg-purple-500"
              />
              {dailyLimitReached && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-2xl"
                >
                  <p className="text-purple-400 font-semibold text-sm">
                    Volte amanhã para pegar mais número da sorte
                  </p>
                </motion.div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative flex items-center bg-[#111] border border-white/10 rounded-2xl p-1.5 focus-within:border-purple-500/50 transition-colors">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail" 
                  className="w-full bg-transparent text-white px-4 py-3 outline-none placeholder:text-white/30"
                  required
                />
                <button 
                  type="submit"
                  className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex-shrink-0 flex items-center gap-2"
                >
                  Quero participar
                </button>
              </div>
              <p className="text-xs text-white/40 mt-4">Participação simples, rápida e sem custos.</p>
            </form>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative max-w-sm mx-auto flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-full px-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/30 to-transparent blur-3xl rounded-full"></div>
            <motion.img 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src="/yugioh-box.png" 
              alt="sorteio de jogo yu-gi-oh grátis"
              loading="lazy"
              className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Soft Prompt Modal */}
      <AnimatePresence>
        {step === 'soft_prompt' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111] border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BellRing className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Ative as notificações</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Receba o resultado do sorteio e atualizações importantes em tempo real.
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleAllowClick}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors"
                >
                  Permitir notificações
                </button>
                <button 
                  onClick={handleDeclineClick}
                  className="w-full bg-transparent hover:bg-white/5 text-white/50 font-medium py-3.5 px-6 rounded-xl transition-colors outline-none"
                >
                  Agora não
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install PWA Prompt */}
      <AnimatePresence>
        {step === 'success' && showInstallPanel && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-96 z-50 bg-[#111] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex gap-4 items-start mb-4">
              <div className="w-12 h-12 bg-black rounded-xl border border-white/10 flex items-center justify-center shrink-0">
                 <img src="/icone-app.png" alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-white mb-1">Instale o App</h4>
                <p className="text-sm text-white/60 leading-tight">Pegue mais números da sorte ao longo do dia e aumente suas chances com nosso aplicativo oficial.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowInstallPanel(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-2.5 rounded-xl transition-colors text-sm"
              >
                Agora não
              </button>
              <button 
                onClick={handleInstallClick}
                className="flex-1 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
              >
                Instalar App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ad 1 Placeholder Context */}
      <AnimatePresence>
        {step === 'ad_1' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <div className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
              <div className="p-3 bg-white/5 flex justify-between items-center border-b border-white/5">
                <span className="text-xs text-white/40 uppercase tracking-widest font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse"></span>
                  Anúncio Promocional
                </span>
              </div>
              
              <div className="aspect-video bg-black flex items-center justify-center relative group">
                <VASTAdPlayer />
              </div>
              
              <div className="p-4 bg-[#111] flex justify-between items-center border-t border-white/5">
                <span className="text-sm text-white/40">O sorteio continuará em instantes...</span>
                <button 
                  onClick={handleCloseAd1}
                  className="text-sm font-semibold text-white/90 hover:text-white bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                >
                  Pular Anúncio e Permitir Push
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProductShowcaseYugioh() {
  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Jogo De Cartas Yu-Gi-Oh! carta Battle of legends Monster
            </h2>
            <p className="text-xl md:text-2xl text-white/70 mb-4 font-light leading-snug">
              Esteja preparado para o novo arco de Batalha das Lendas e conheça a Revolta dos Monstros!
            </p>
            <p className="text-white/50 leading-relaxed mb-4">
              Esta coleção traz surpresas, incluindo 10 artes variantes "chibi" de monstros populares em estampas jogáveis com textos do jogo!
            </p>
            <p className="text-white/50 leading-relaxed mb-8">
              Tenha chances de adquirir Ultra Raras com Emblemas! Cada pacote vem com uma estampa Ultra Rara temática com emblema personalizado. Raras Starlights também estão disponíveis com uma coleção de 177 estampas.
            </p>
            
            <ul className="space-y-4 text-white/80">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-500" />
                4 pacotes de booster com 5 estampas cada e 1 Field Center card.
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-500" />
                Idade: 6+
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-purple-500" />
                Idioma: Inglês (Fabricante: Konami).
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 relative flex items-center justify-center p-8 pointer-events-none"
          >
             <div className="absolute inset-0 bg-purple-500/20 blur-3xl rounded-full"></div>
             <motion.img 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               src="/yugioh-box.png" 
               alt="sorteio de jogo yu-gi-oh grátis"
               loading="lazy"
               className="relative z-10 w-full max-w-[280px] h-auto object-contain drop-shadow-2xl"
             />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MercadoLivreAdYugioh() {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-purple-500/5 blur-[100px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150"></div>
          
          <div className="w-full md:w-2/5 flex justify-center shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full"></div>
              <img 
                src="/yugioh-box.png" 
                alt="Jogo De Cartas Yu-Gi-Oh! carta Battle of legends Monster" 
                className="w-full max-w-[240px] object-contain drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="w-full md:w-3/5 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-bold mb-4 uppercase tracking-wider">
              <span>Mercado Livre</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
              Não quer esperar o sorteio?
            </h3>
            <div className="text-3xl font-bold text-white mb-4">
              R$ 199<span className="text-lg text-white/50 font-normal">,99</span>
            </div>
            <p className="text-white/60 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
              Compre o Jogo De Cartas Yu-Gi-Oh! carta Battle of legends Monster agora mesmo com segurança e entrega rápida no Mercado Livre.
            </p>
            <a 
              href="https://www.mercadolivre.com.br/jogo-de-cartas-colecionaveis-yu-gi-oh-carta-battle-of-legends-monster-mayhem-de-4-mazos-con-20-cartas/p/MLB52018219?pdp_filters=item_id:MLB6721142136" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#FEE600] hover:bg-[#F2DB00] text-[#2D3277] font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-xl hover:shadow-[#FEE600]/20"
            >
              Comprar no Mercado Livre
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SorteioSmartwatchPage() {
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-teal-500/30 selection:text-teal-200">
      <Helmet>
        <title>Sorteio Smartwatch S10 Série 10 | CadastreEGanhe</title>
        <meta name="description" content="Participe do sorteio gratuito do Smartwatch S10 Série 10 Relógio Digital. Oportunidade única!" />
        <meta name="keywords" content="sorteio smartwatch, smartwatch s10, ganhar smartwatch, relógio smartwatch" />
        <link rel="canonical" href="https://jogueeganhee.com.br/sorteio-Smartwatch-S10" />
        <meta property="og:title" content="Sorteio Smartwatch S10 Série 10 | CadastreEGanhe" />
        <meta property="og:description" content="Concorra ao Smartwatch S10 Série 10!" />
        <meta property="og:url" content="https://jogueeganhee.com.br/sorteio-Smartwatch-S10" />
        <meta property="og:type" content="product" />
      </Helmet>
      <Navbar />
      <main>
        <HeroSmartwatch />
        <TrustIndicators />
        <WinnerInfoSection />
        <HowItWorks />
        <ProductShowcaseSmartwatch />
        <MercadoLivreAdSmartwatch />
        <UrgencySection />
      </main>
      <Footer />

      {/* Sticky Mobile CTA */}
      <AnimatePresence>
        {showSticky && (
          <motion.div 
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10 z-50 flex justify-center pb-safe"
          >
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="w-full max-w-sm bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-colors"
            >
              Quero participar
              <ArrowRight className="w-5 h-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function HeroSmartwatch() {
  const { user, registrations, registerParticipation } = useFirebase();
  const reg = registrations.find(r => r.sweepstakesId === 'smartwatch');
  const tickets = reg?.tickets || 0;
  
  const [dailyLimitReached, setDailyLimitReached] = useState(false);

  const checkDailyLimit = () => {
    if (!reg) return false;
    const now = new Date();
    const lastUpdate = reg.lastDailyUpdate?.toDate ? reg.lastDailyUpdate.toDate() : new Date(reg.lastDailyUpdate);
    const isNewDay = now.toDateString() !== lastUpdate.toDateString();
    return !isNewDay && reg.dailyTickets >= 100;
  };

  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'idle' | 'soft_prompt' | 'ad_1' | 'success'>('idle');
  const [showInstallPanel, setShowInstallPanel] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (tickets > 0 && step === 'idle') {
      setStep('success');
    }
    if (user && user.email && !email) {
      setEmail(user.email);
    }

    if (checkDailyLimit()) {
      setDailyLimitReached(true);
    } else {
      setDailyLimitReached(false);
    }

    const checkPrompt = () => { if ((window as any).deferredPrompt) { setDeferredPrompt((window as any).deferredPrompt); } }; checkPrompt(); window.addEventListener('app-install-ready', checkPrompt); return () => { window.removeEventListener('app-install-ready', checkPrompt); };
  }, [tickets, user]);

  const handleRegisterAgain = () => {
    setEmail(user?.email || '');
    setStep('idle');
  };

  const handleInstallClick = async () => { const promptEvent = deferredPrompt || (window as any).deferredPrompt; if (promptEvent) { promptEvent.prompt(); const { outcome } = await promptEvent.userChoice; if (outcome === 'accepted') { setDeferredPrompt(null); (window as any).deferredPrompt = null; setShowInstallPanel(false); } } else { alert("Para instalar, toque no menu do seu navegador e selecione 'Adicionar à tela inicial' ou 'Instalar aplicativo'."); } };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!user) {
      try {
        await signInWithGoogle();
      } catch (err) {
        return;
      }
    }

    setStep('soft_prompt');
  };

  const handleAllowClick = async () => { if ('Notification' in window) { Notification.requestPermission().catch(console.error); } setStep('ad_1'); };

  const handleDeclineClick = async () => {
    setStep('success');
    try {
      const result = await registerParticipation(email, 'smartwatch');
      if (result?.limitReached) setDailyLimitReached(true);
      setShowInstallPanel(true);
    } catch (err: any) {
      console.error("Firebase error", err);
      alert(err.message || "Erro ao registrar participação.");
      setStep('idle');
    }
  };

  const handleCloseAd1 = async () => {
    if ('Notification' in window) {
      Notification.requestPermission().catch(console.error);
    }
    setStep('success');
    try {
      const result = await registerParticipation(email, 'smartwatch');
      if (result?.limitReached) setDailyLimitReached(true);
      setShowInstallPanel(true);
    } catch (err: any) {
      console.error("Firebase error", err);
      alert(err.message || "Erro ao registrar participação.");
      setStep('idle');
    }
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-teal-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto px-4 relative z-10 w-full">
        <motion.div
          id="hero-form"
          className="scroll-mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-teal-400 text-xs font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
            Participe gratuitamente
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Concorra a um <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-teal-600">
              Smartwatch S10
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-xl mx-auto font-light leading-relaxed">
            Cadastre seu e-mail e ative as notificações para participar gratuitamente.
          </p>

          {step === 'success' ? (
            <div className="w-full max-w-md mx-auto">
              <SorteioStatusCard 
                productName="Smartwatch S10"
                tickets={tickets}
                onAction={handleRegisterAgain}
                accentColor="bg-teal-500"
              />
              {dailyLimitReached && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-4 bg-teal-500/10 border border-teal-500/20 rounded-2xl"
                >
                  <p className="text-teal-400 font-semibold text-sm">
                    Volte amanhã para pegar mais número da sorte
                  </p>
                </motion.div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-teal-500 to-teal-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
              <div className="relative flex items-center bg-[#111] border border-white/10 rounded-2xl p-1.5 focus-within:border-teal-500/50 transition-colors">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Seu melhor e-mail" 
                  className="w-full bg-transparent text-white px-4 py-3 outline-none placeholder:text-white/30"
                  required
                />
                <button 
                  type="submit"
                  className="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3 px-6 rounded-xl transition-colors flex-shrink-0 flex items-center gap-2"
                >
                  Quero participar
                </button>
              </div>
              <p className="text-xs text-white/40 mt-4">Participação simples, rápida e sem custos.</p>
            </form>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-20 relative max-w-sm mx-auto flex items-center justify-center pointer-events-none"
        >
          <div className="relative w-full px-8 flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-b from-teal-500/30 to-transparent blur-3xl rounded-full"></div>
            <motion.img 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              src="/smartwatch.png" 
              alt="sorteio de smartwatch s10 grátis participe agora"
              loading="lazy"
              className="relative z-10 w-full h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      {/* Soft Prompt Modal */}
      <AnimatePresence>
        {step === 'soft_prompt' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#111] border border-white/10 p-8 rounded-3xl max-w-sm w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <BellRing className="w-8 h-8 text-teal-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Ative as notificações</h3>
              <p className="text-white/60 mb-8 leading-relaxed">
                Receba o resultado do sorteio e atualizações importantes em tempo real.
              </p>
              
              <div className="flex flex-col gap-3">
                <button 
                  onClick={handleAllowClick}
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors"
                >
                  Permitir notificações
                </button>
                <button 
                  onClick={handleDeclineClick}
                  className="w-full bg-transparent hover:bg-white/5 text-white/50 font-medium py-3.5 px-6 rounded-xl transition-colors outline-none"
                >
                  Agora não
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Install PWA Prompt */}
      <AnimatePresence>
        {step === 'success' && showInstallPanel && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:bottom-8 md:w-96 z-50 bg-[#111] border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex gap-4 items-start mb-4">
              <div className="w-12 h-12 bg-black rounded-xl border border-white/10 flex items-center justify-center shrink-0">
                 <img src="/icone-app.png" alt="Logo" className="w-8 h-8 object-contain" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-white mb-1">Instale o App</h4>
                <p className="text-sm text-white/60 leading-tight">Pegue mais números da sorte ao longo do dia e aumente suas chances com nosso aplicativo oficial.</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => setShowInstallPanel(false)}
                className="flex-1 bg-white/5 hover:bg-white/10 text-white font-medium py-2.5 rounded-xl transition-colors text-sm"
              >
                Agora não
              </button>
              <button 
                onClick={handleInstallClick}
                className="flex-1 bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2.5 rounded-xl transition-colors text-sm"
              >
                Instalar App
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ad 1 Placeholder Context */}
      <AnimatePresence>
        {step === 'ad_1' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <div className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
              <div className="p-3 bg-white/5 flex justify-between items-center border-b border-white/5">
                <span className="text-xs text-white/40 uppercase tracking-widest font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                  Anúncio Promocional
                </span>
              </div>
              
              <div className="aspect-video bg-black flex items-center justify-center relative group">
                <VASTAdPlayer />
              </div>
              
              <div className="p-4 bg-[#111] flex justify-between items-center border-t border-white/5">
                <span className="text-sm text-white/40">O sorteio continuará em instantes...</span>
                <button 
                  onClick={handleCloseAd1}
                  className="text-sm font-semibold text-white/90 hover:text-white bg-teal-500/20 hover:bg-teal-500/30 border border-teal-500/40 px-6 py-2.5 rounded-lg transition-colors flex items-center gap-2"
                >
                  Pular Anúncio e Permitir Push
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProductShowcaseSmartwatch() {
  return (
    <section className="py-24 bg-black overflow-hidden relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 md:order-1"
          >
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Smartwatch S10 Série 10
            </h2>
            <p className="text-xl md:text-2xl text-white/70 mb-4 font-light leading-snug">
              Tecnologia, design e praticidade.
            </p>
            <p className="text-white/50 leading-relaxed mb-8">
              Um smartwatch robusto e elegante. Resistente à água, acompanha duas pulseiras extras e garante o monitoramento perfeito para suas atividades físicas e dia a dia.
            </p>
            
            <ul className="space-y-4 text-white/80">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-500" />
                Compatível com Android e iOS permite integração com seu smartphone.
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-500" />
                Monitoramento completo de saúde, atividades diárias e físicas.
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-500" />
                Duração da bateria: até 2 dias de autonomia.
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-500" />
                Resistência à água IP68 (chuva leve e suor).
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-teal-500" />
                Tecnologia Bluetooth: Atenda chamadas e leia mensagens.
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="order-1 md:order-2 relative flex items-center justify-center p-8 pointer-events-none"
          >
             <div className="absolute inset-0 bg-teal-500/20 blur-3xl rounded-full"></div>
             <motion.img 
               animate={{ y: [0, -15, 0] }}
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
               src="/smartwatch.png" 
               alt="sorteio de smartwatch s10 grátis participe agora"
               loading="lazy"
               className="relative z-10 w-full max-w-[280px] h-auto object-contain drop-shadow-2xl"
             />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MercadoLivreAdSmartwatch() {
  return (
    <section className="py-24 bg-[#050505] relative overflow-hidden">
      <div className="absolute inset-0 bg-teal-500/5 blur-[100px] pointer-events-none"></div>
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="bg-[#111] border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center gap-8 md:gap-12 relative overflow-hidden group">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-[80px] -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-150"></div>
          
          <div className="w-full md:w-2/5 flex justify-center shrink-0">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400/20 blur-2xl rounded-full"></div>
              <img 
                src="/smartwatch.png" 
                alt="Smartwatch S10 Série 10" 
                className="w-full max-w-[240px] object-contain drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="w-full md:w-3/5 text-center md:text-left relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-bold mb-4 uppercase tracking-wider">
              <span>Mercado Livre</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
              Não quer esperar o sorteio?
            </h3>
            <div className="text-3xl font-bold text-white mb-4">
              R$ 99<span className="text-lg text-white/50 font-normal">,83</span>
            </div>
            <p className="text-white/60 mb-8 leading-relaxed max-w-lg mx-auto md:mx-0">
              Compre o Smartwatch S10 Série 10 Relógio Digital agora mesmo com segurança e entrega rápida no Mercado Livre.
            </p>
            <a 
              href="https://www.mercadolivre.com.br/smartwatch-s10-serie-10-relogio-digital-masculino-feminino-resistente-a-agua-caixa-preta-com-2-pulseiras-smartwatch-completo-compativel-android-e-ios-monitor-atividades-3-tech/p/MLB64997788?pdp_filters=item_id:MLB4662171393" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 bg-[#FEE600] hover:bg-[#F2DB00] text-[#2D3277] font-bold py-4 px-8 rounded-xl transition-all hover:scale-105 shadow-xl hover:shadow-[#FEE600]/20"
            >
              Comprar no Mercado Livre
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}