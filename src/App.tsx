/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
  X
} from 'lucide-react';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/sorteio-de-iPhone" replace />} />
        <Route path="/sorteio-de-iPhone" element={<SorteioIphonePage />} />
      </Routes>
    </BrowserRouter>
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
      <Navbar />
      <main>
        <Hero />
        <TrustIndicators />
        <HowItWorks />
        <ProductShowcase />
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
            className="fixed bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-xl border-t border-white/10 z-50 md:hidden"
          >
            <button 
              onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full bg-orange-500 text-white font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2"
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

function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-[#0a0a0a]/80 backdrop-blur-md z-50 border-b border-white/5">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Gift className="w-5 h-5 text-orange-500" />
            <span className="font-semibold tracking-tight text-white/90">CadastreEGanhe</span>
          </div>
          <div className="text-sm font-medium text-white/60">
            Sorteio Oficial
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'idle' | 'soft_prompt' | 'ad_1' | 'success'>('idle');
  const [showAd2, setShowAd2] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStep('soft_prompt');
  };

  const handleAllowClick = () => {
    setStep('ad_1');
  };

  const handleDeclineClick = () => {
    setStep('success');
    setShowAd2(true);
  };

  const handleCloseAd1 = () => {
    if ('Notification' in window) {
      Notification.requestPermission().catch(console.error);
    }
    setStep('success');
    setShowAd2(true);
  };

  return (
    <section className="relative pt-32 pb-20 overflow-hidden flex flex-col items-center text-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-3xl mx-auto px-4 relative z-10 w-full">
        <motion.div
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
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="max-w-md mx-auto bg-green-500/10 border border-green-500/20 p-8 rounded-3xl text-center shadow-lg"
            >
              <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Tudo certo!</h3>
              <p className="text-white/80 font-medium mb-2">
                Você já está participando.
              </p>
              <p className="text-white/50 text-sm">
                Fique atento às notificações para saber o resultado.
              </p>
            </motion.div>
          ) : (
            <form id="hero-form" onSubmit={handleSubmit} className="max-w-md mx-auto relative group">
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
                {/* Fake exoclick video ad UI */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/20 z-10 transition-opacity group-hover:opacity-100">
                   <div 
                     onClick={() => window.open('https://example.com', '_blank')}
                     className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center mb-4 transition-transform hover:scale-105 cursor-pointer hover:border-white/40 hover:text-white/40"
                   >
                     <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-current border-b-8 border-b-transparent ml-1"></div>
                   </div>
                   <span className="text-sm font-medium">Exibindo vídeo: Anunciante Verificado</span>
                </div>
                {/* Visualizer effect */}
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-400 via-transparent to-transparent flex items-center justify-center">
                   <div className="w-full h-full flex items-center justify-center gap-1 opacity-20">
                     {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-16 bg-white rounded-full animate-bounce" style={{animationDelay: `${i * 0.1}s`}}></div>)}
                   </div>
                </div>
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

      {/* Ad 2 Placeholder Context */}
      <AnimatePresence>
        {showAd2 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
          >
            <div className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-2xl mt-12">
              <div className="p-3 bg-white/5 flex justify-between items-center border-b border-white/5">
                <span className="text-xs text-white/40 uppercase tracking-widest font-semibold flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
                  Conteúdo Patrocinado
                </span>
                <button onClick={() => setShowAd2(false)} className="text-white/40 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="aspect-video bg-black flex items-center justify-center relative">
                <div 
                  onClick={() => window.open('https://example.com', '_blank')}
                  className="w-16 h-16 rounded-full border-2 border-white/20 flex items-center justify-center mb-4 text-white/20 hover:border-white/40 hover:text-white/40 cursor-pointer hover:scale-105 transition-all"
                >
                   <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-current border-b-8 border-b-transparent ml-1"></div>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-xs text-white/40">
                  <span>Anunciante 2 - Oferta Especial</span>
                  <span>Vídeo 00:30</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function TrustIndicators() {
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

function HowItWorks() {
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
            <h3 className="text-lg font-medium text-white mb-2">Aguarde o sorteio</h3>
            <p className="text-white/50 text-sm">Fique atento! Avisaremos o ganhador diretamente no dispositivo.</p>
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
          onClick={() => document.getElementById('hero-form')?.scrollIntoView({ behavior: 'smooth' })}
          className="inline-flex items-center justify-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 group"
        >
          Participar do sorteio
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}

function Footer() {
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


