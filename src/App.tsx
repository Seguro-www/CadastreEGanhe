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

function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [method, setMethod] = useState<'login' | 'register' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (method === 'login') await loginWithEmail(email, password);
      else if (method === 'register') await registerWithEmail(email, password);
      else if (method === 'reset') await resetPassword(email);
      if (method !== 'reset') onClose();
    } catch (err) {}
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100] flex items-center justify-center p-6">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-[#0A0A0A] max-w-sm w-full rounded-[40px] p-10 border border-white/10 shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-white/20 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight text-center">
          {method === 'login' ? 'Bem-vindo de volta' : method === 'register' ? 'Criar sua conta' : 'Recuperar senha'}
        </h3>
        <p className="text-white/40 text-sm mb-8 text-center font-light">
          Acesse para acumular seus pontos diários.
        </p>

        <div className="space-y-4">
          <button 
            type="button"
            onClick={() => { signInWithGoogle(); onClose(); }}
            className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-white/90 transition-all active:scale-95"
          >
            <Smartphone className="w-5 h-5" />
            Entrar com Google
          </button>

          <button 
            type="button"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              try {
                await signInWithAnonymous();
                onClose();
              } catch (err) {}
              setLoading(false);
            }}
            className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95"
          >
            <User className="w-5 h-5 text-white/60" />
            {loading ? 'Processando...' : 'Entrar Anonimamente'}
          </button>

          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
            <div className="relative flex justify-center text-xs uppercase tracking-widest"><span className="bg-[#0A0A0A] px-2 text-white/20">ou e-mail</span></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input 
              type="email" 
              placeholder="E-mail" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-black border border-white/10 rounded-2xl px-5 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
              required
            />
            {method !== 'reset' && (
              <input 
                type="password" 
                placeholder="Senha" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-black border border-white/10 rounded-2xl px-5 py-3 text-white placeholder-white/20 focus:outline-none focus:border-white/40 transition-colors"
                required
              />
            )}
            
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
            >
              {loading ? 'Processando...' : method === 'login' ? 'Entrar' : method === 'register' ? 'Criar Conta' : 'Enviar Link'}
            </button>
          </form>

          <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-white/30 px-2">
            {method === 'login' ? (
              <>
                <button onClick={() => setMethod('register')} className="hover:text-white transition-colors">Criar Conta</button>
                <button onClick={() => setMethod('reset')} className="hover:text-white transition-colors">Esqueci a senha</button>
              </>
            ) : (
              <button onClick={() => setMethod('login')} className="w-full text-center hover:text-white transition-colors">Voltar para Login</button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

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

export function Navbar() {
  const { user, loading, isAdmin } = useFirebase();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full bg-[#0a0a0a]/80 backdrop-blur-md z-50 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-2 group hover:opacity-80 transition-opacity">
              <Gift className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
              <span className="font-semibold tracking-tight text-white/90">Jogue e Ganhe</span>
            </Link>
            <div className="flex items-center gap-4 sm:gap-6">
              {!loading && user ? (
                <div className="flex items-center gap-4">
                  <div className="hidden sm:flex items-center gap-6 mr-4 border-r border-white/5 pr-6">
                    {isAdmin && (
                      <Link to="/adm" className="text-xs font-semibold text-white/40 hover:text-white transition-colors uppercase tracking-widest">Adm</Link>
                    )}
                    <Link to="/dashboard" className="text-xs font-semibold text-white/40 hover:text-white transition-colors uppercase tracking-widest">Meus Pontos</Link>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Link to="/dashboard">
                      <img src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.email || 'Anônimo')}&background=random`} alt={user.displayName || ''} className="w-8 h-8 rounded-full border border-white/10 hover:border-white/30 transition-colors" />
                    </Link>
                    <div className="hidden sm:block text-left">
                      <div className="text-[10px] text-white/30 leading-none mb-0.5">Participante</div>
                      <Link to="/dashboard" className="text-xs font-medium text-white/60 hover:text-white transition-colors block leading-none">{user.displayName ? user.displayName.split(' ')[0] : (user.email ? user.email.split('@')[0] : 'Anônimo')}</Link>
                    </div>
                    <button onClick={() => auth.signOut()} className="p-2 text-white/40 hover:text-red-400 transition-colors ml-1">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : !loading && (
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="text-xs font-bold text-white bg-white/5 hover:bg-white border border-white/10 hover:text-black px-5 py-2.5 rounded-full transition-all"
                >
                  Entrar
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
      <LoginModal isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </>
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

export function TrustIndicators() {
  return (
    <section className="py-12 border-y border-white/5 bg-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 divide-y md:divide-y-0 md:divide-x divide-white/5">
          <div className="flex flex-col items-center text-center pt-8 md:pt-0">
            <Lock className="w-8 h-8 text-orange-400 mb-4 stroke-[1.5]" />
            <h4 className="font-medium text-white mb-1">Participação Gratuita</h4>
            <p className="text-sm text-white/50">Sem custos ocultos ou surpresas.</p>
          </div>
          <div className="flex flex-col items-center text-center pt-8 md:pt-0">
            <ShieldCheck className="w-8 h-8 text-orange-400 mb-4 stroke-[1.5]" />
            <h4 className="font-medium text-white mb-1">Resultado Transparente</h4>
            <p className="text-sm text-white/50">Auditável e seguro do início ao fim.</p>
          </div>
          <div className="flex flex-col items-center text-center pt-8 md:pt-0">
            <Zap className="w-8 h-8 text-orange-400 mb-4 stroke-[1.5]" />
            <h4 className="font-medium text-white mb-1">Notificação em Tempo Real</h4>
            <p className="text-sm text-white/50">Você fica sabendo na hora por push.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function HowItWorks() {
  return (
    <section className="py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-12">Simples de participar</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 hover:bg-[#151515] transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-xl font-bold text-orange-500 mb-6 mx-auto">1</div>
            <h3 className="text-lg font-medium text-white mb-2">Cadastre seu e-mail</h3>
            <p className="text-white/50 text-sm">Insira seu melhor e-mail no formulário do topo da página.</p>
          </div>
          
          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 hover:bg-[#151515] transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-xl font-bold text-orange-500 mb-6 mx-auto">2</div>
            <h3 className="text-lg font-medium text-white mb-2">Ative as Notificações</h3>
            <p className="text-white/50 text-sm">Aceite as notificações do navegador para confirmar sua inscrição.</p>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 hover:bg-[#151515] transition-colors">
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-xl font-bold text-orange-500 mb-6 mx-auto">3</div>
            <h3 className="text-lg font-medium text-white mb-2">Acumule mais Pontos</h3>
            <p className="text-white/50 text-sm">O participante que tiver o maior número de pontos ao final do prazo vence o prêmio!</p>
          </div>
        </div>
      </div>
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

export function Footer() {
  const [activeModal, setActiveModal] = useState<'termos' | 'privacidade' | 'contato' | null>(null);

  return (
    <>
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2">
              <Gift className="w-5 h-5 text-white/40" />
              <span className="font-semibold tracking-tight text-white/60">CadastreEGanhe</span>
            </div>
          </div>
          
          <p className="text-center text-white/30 text-xs max-w-2xl mx-auto leading-relaxed mb-8">
            Esta é uma campanha promocional independente e não possui vínculo direto com as marcas dos produtos sorteados. O sorteio é realizado de forma transparente com resultados acessíveis publicamente.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <button onClick={() => setActiveModal('termos')} className="hover:text-white transition-colors cursor-pointer">Termos de uso</button>
            <button onClick={() => setActiveModal('privacidade')} className="hover:text-white transition-colors cursor-pointer">Política de privacidade</button>
            <button onClick={() => setActiveModal('contato')} className="hover:text-white transition-colors cursor-pointer">Contato</button>
          </div>
          
          <div className="text-center mt-12 text-xs text-white/20">
            © {new Date().getFullYear()} CadastreEGanhe. Todos os direitos reservados.
            <a href="https://jogueeganhee.com.br/" style={{display: 'none'}}>sorteios online</a>
            <a href="https://jogueeganhee.com.br/sorteios" style={{display: 'none'}}>ganhar prêmios</a>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setActiveModal(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col overflow-hidden shadow-2xl"
            >
              <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
                <h3 className="text-lg font-semibold text-white">
                  {activeModal === 'termos' && 'Termos de Uso'}
                  {activeModal === 'privacidade' && 'Política de Privacidade'}
                  {activeModal === 'contato' && 'Contato'}
                </h3>
                <button onClick={() => setActiveModal(null)} className="text-white/40 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto text-sm text-white/70 leading-relaxed space-y-4">
                {activeModal === 'termos' && (
                  <>
                    <p>Ao participar desta plataforma, você concorda com nossos termos e condições operacionais.</p>
                    <p>1. <strong>Elegibilidade:</strong> O sorteio é válido apenas para as condições informadas, mediante disponibilidade.</p>
                    <p>2. <strong>Gratuidade:</strong> A participação pode exigir cadastro, mas não embutirá tarifas ou cobranças ocultas para os participantes da modalidade gratuita.</p>
                    <p>3. <strong>Sorteio:</strong> Reservamo-nos o direito de alterar prazos, garantindo transparência no processo final de seleção do vencedor através de critérios justos (como a Loteria Federal, conforme aplicável).</p>
                    <p>Estes termos podem ser atualizados periodicamente.</p>
                  </>
                )}
                {activeModal === 'privacidade' && (
                  <>
                    <p>Nossa plataforma valoriza sua privacidade e protege seus dados em conformidade com as legislações vigentes (LGPD).</p>
                    <p>1. <strong>Coleta de Dados:</strong> Coletamos apenas informações necessárias, como e-mail, para viabilizar sua participação no sorteio e enviar novidades (através de Push Notifications).</p>
                    <p>2. <strong>Uso de Dados:</strong> Seus dados não serão comercializados com terceiros e serão mantidos em servidores seguros.</p>
                    <p>3. <strong>Direito do Usuário:</strong> Você pode solicitar a remoção dos seus dados e cancelar a assinatura de nossas notificações a qualquer momento nas configurações do seu navegador.</p>
                  </>
                )}
                {activeModal === 'contato' && (
                  <>
                    <p>Tem dúvidas, sugestões ou precisa de ajuda para solicitar seu prêmio?</p>
                    <div className="bg-black border border-white/10 p-4 rounded-xl mt-4">
                      <p className="mb-2"><strong>Email de suporte:</strong><br/><a href="mailto:contato@sorteioverify.exemplo.com" className="text-orange-400 hover:text-orange-300">contato@sorteioverify.exemplo.com</a></p>
                      <p><strong>Atendimento:</strong><br/>Segunda a Sexta, das 09h às 18h (BRT)</p>
                    </div>
                  </>
                )}
              </div>
              <div className="p-4 border-t border-white/10 flex justify-end bg-black">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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