import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useFirebase } from '../hooks/useFirebase';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Share2, BellRing, ChevronRight, CheckCircle2, ShieldCheck, Zap, Lock, Info, Trophy, Target, ArrowRight } from 'lucide-react';
import { SorteioStatusCard } from '../components/SorteioStatusCard';
import { TrustIndicators, HowItWorks, Navbar } from '../components/NavigationLayout';
import { WinnerInfoSection } from '../components/WinnerInfoSection';
import { signInWithGoogle } from '../lib/firebase';

export function DynamicCampaignPage() {
  const { id } = useParams<{ id: string }>();
  const { user, registrations, registerParticipation, campaigns } = useFirebase();
  
  const campaign = campaigns.find(c => c.id === id);
  const reg = registrations.find(r => r.sweepstakesId === id);
  const tickets = reg?.tickets || 0;

  const [dailyLimitReached, setDailyLimitReached] = useState(false);

  const checkDailyLimit = () => {
    if (!reg) return false;
    const now = new Date();
    const lastUpdate = reg.lastDailyUpdate?.toDate ? reg.lastDailyUpdate.toDate() : new Date(reg.lastDailyUpdate);
    const isNewDay = now.toDateString() !== lastUpdate.toDateString();
    return !isNewDay && (reg.dailyTickets || 0) >= 100;
  };

  const [email, setEmail] = useState('');
  const [step, setStep] = useState<'idle' | 'soft_prompt' | 'ad_1' | 'success'>('idle');
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowSticky(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (user && user.email && !email) {
      setEmail(user.email);
    }

    if (checkDailyLimit()) {
      setDailyLimitReached(true);
      setStep('success');
    } else {
      setDailyLimitReached(false);
      // Somente auto-ajusta para 'success' se o usuário já tem tickets e não está tentando participar de novo (idle)
      // Mas permitimos que ele volte para 'idle' via handleRegisterAgain
    }
  }, [tickets, user, reg]);

  // Novo useEffect para o estado inicial
  useEffect(() => {
    if (tickets > 0 && step === 'idle' && !dailyLimitReached) {
      setStep('success');
    }
  }, []); // Só executa na montagem inicial

  const handleRegisterAgain = () => {
    setEmail(user?.email || '');
    setStep('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    if (!user) {
      alert("Por favor, faça login clicando no botão 'Entrar' no topo da página para começar.");
      return;
    }

    setStep('soft_prompt');
  };

  const handleAllowClick = async () => {
    setStep('ad_1');
  };

  const handleDeclineClick = async () => {
    setStep('success');
    if (id) {
      try {
        const result = await registerParticipation(email, id);
        if (result?.limitReached) setDailyLimitReached(true);
      } catch (err: any) {
        console.error("Firebase error", err);
        alert(err.message || "Erro ao registrar participação.");
        setStep('idle');
      }
    }
  };

  const handleCloseAd1 = async () => {
    if ('Notification' in window) {
      Notification.requestPermission().catch(console.error);
    }
    setStep('success');
    if (id) {
      try {
        const result = await registerParticipation(email, id);
        if (result?.limitReached) setDailyLimitReached(true);
      } catch (err: any) {
        console.error("Firebase error", err);
        alert(err.message || "Erro ao registrar participação.");
        setStep('idle');
      }
    }
  };

  if (!campaign) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sorteio não encontrado</h1>
          <Link to="/" className="text-white/50 hover:text-white underline">Voltar para Início</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-white/30">
      <Helmet>
        <title>Concorra ao {campaign.name} | CadastreEGanhe</title>
        <meta name="description" content={`Participe do sorteio grátis do ${campaign.name}. Quanto mais pontos você acumular, maiores as chances de levar o prêmio!`} />
      </Helmet>

      <Navbar />

      <main>
        <section className="relative pt-40 pb-20 px-4 overflow-hidden min-h-[90vh] flex flex-col justify-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/5 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-64 h-64 md:w-96 md:h-96 mx-auto mb-12 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-white/10 blur-[100px] rounded-full opacity-50"></div>
              <img 
                src={campaign.imageUrl}
                alt={campaign.name}
                className="w-full h-full object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-transform duration-700 hover:scale-105"
              />
            </motion.div>

            <motion.div
              id="hero-form"
              className="scroll-mt-32"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white/60">Sorteio Verificado e Ativo</span>
              </div>
              
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter mb-8 text-balance">
                Seu novo <br className="hidden md:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40">
                  {campaign.name}
                </span>
              </h1>
              
              <p className="text-lg md:text-2xl text-white/50 mb-12 max-w-2xl mx-auto font-light leading-relaxed text-balance">
                Uma oportunidade premium para você. Participe agora sem custos e acumule números da sorte.
              </p>

              {step === 'success' ? (
                <div className="w-full max-w-md mx-auto">
                  <SorteioStatusCard 
                    productName={campaign.name}
                    tickets={tickets}
                    onAction={handleRegisterAgain}
                    accentColor="bg-white/10 text-white"
                  />
                  {dailyLimitReached && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 p-6 bg-white/5 border border-white/10 rounded-[32px] backdrop-blur-xl"
                    >
                      <p className="text-white/60 font-medium text-sm leading-relaxed">
                        Limite diário atingido. Volte em <span className="text-white">24 horas</span> para cadastrar mais números da sorte!
                      </p>
                    </motion.div>
                  )}
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="max-w-md mx-auto relative group">
                  <div className="absolute -inset-1 bg-white/10 rounded-[32px] blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
                  <div className="relative flex flex-col sm:flex-row gap-4 bg-black p-3 rounded-[32px] border border-white/10 backdrop-blur-3xl shadow-2xl">
                    <input 
                      type="email" 
                      placeholder="seu@email.com" 
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="flex-1 bg-transparent px-6 py-4 text-white placeholder-white/20 focus:outline-none text-lg"
                      required
                    />
                    <button 
                      type="submit"
                      className="bg-white text-black px-10 py-4 rounded-2xl font-bold hover:bg-white/90 transition-all active:scale-95 whitespace-nowrap shadow-xl shadow-white/10"
                    >
                      Participar
                    </button>
                  </div>
                </form>
              )}
            </motion.div>
          </div>
        </section>

        <TrustIndicators />
        <WinnerInfoSection />
        <HowItWorks />

        {/* Global Product Showcase */}
        <section className="py-32 bg-black border-y border-white/5 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-20 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8">
                  Design & Praticidade<br/> 
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/30 text-3xl md:text-5xl">{campaign.name}</span>
                </h2>
                <p className="text-white/40 text-lg md:text-xl mb-12 leading-relaxed font-light">
                  Sorteamos apenas produtos originais e selecionados. O {campaign.name} representa o topo da categoria em tecnologia e acabamento. Não perca a chance de ter um desses sem pagar nada.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                   <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-white tracking-tight">100% Original</h4>
                      <p className="text-white/40 text-sm font-light">Produto lacrado e com nota fiscal no nome do ganhador.</p>
                   </div>
                   <div className="space-y-3">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white border border-white/10">
                        <Zap className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-white tracking-tight">Envio Flash</h4>
                      <p className="text-white/40 text-sm font-light">Receba em casa via transportadora premium em poucos dias.</p>
                   </div>
                </div>
              </motion.div>
              <div className="relative">
                <div className="absolute inset-0 bg-white/5 blur-[120px] rounded-full"></div>
                <motion.img 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  src={campaign.imageUrl} 
                  alt={campaign.name} 
                  className="w-full max-w-md mx-auto object-contain drop-shadow-[0_30px_60px_rgba(255,255,255,0.05)] relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mercado Livre Global Redirect */}
        <section className="py-20 bg-[#050505]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="bg-[#111] border border-[#FEE600]/10 rounded-[40px] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden group shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-[#FEE600]/0 to-[#FEE600]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              <div className="w-full md:w-1/2 flex justify-center shrink-0">
                <div className="relative">
                  <div className="absolute inset-0 bg-[#FEE600]/10 blur-3xl rounded-full"></div>
                  <img 
                    src={campaign.imageUrl} 
                    alt={campaign.name} 
                    className="w-full max-w-[240px] object-contain drop-shadow-2xl relative z-10 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-3"
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 text-center md:text-left relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-yellow-500/20 bg-yellow-500/10 text-yellow-500 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                  Opção para Compra
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tighter leading-tight">
                  Prefere comprar <br/>agora?
                </h3>
                <p className="text-white/40 mb-10 leading-relaxed font-light text-base">
                  Se você não quer depender da sorte, pode adquirir o {campaign.name} com seguranca e entrega garantida no Mercado Livre.
                </p>
                <a 
                  href={`https://lista.mercadolivre.com.br/${campaign.name.replace(/\s+/g, '-')}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full md:w-auto inline-flex items-center justify-center gap-4 bg-[#FEE600] hover:bg-white text-[#2D3277] font-black py-4 px-10 rounded-2xl transition-all hover:shadow-[0_0_40px_rgba(254,230,0,0.3)] group/btn"
                >
                  Pesquisar no ML
                  <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </section>
        
        {/* Step Modals */}
        <AnimatePresence>
          {step === 'soft_prompt' && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
              <motion.div 
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#0A0A0A] max-w-sm w-full rounded-[48px] p-10 border border-white/10 text-center relative shadow-2xl"
              >
                <div className="w-20 h-20 bg-white/5 rounded-3xl mx-auto mb-8 flex items-center justify-center border border-white/5">
                  <BellRing className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Resultado Direto</h3>
                <p className="text-white/40 text-sm mb-10 leading-relaxed font-light">
                  Ative as notificações para ser o primeiro a saber quem acumulou mais pontos e levou o prêmio.
                </p>
                <div className="space-y-4">
                  <button 
                    onClick={handleAllowClick}
                    className="w-full py-4 bg-white text-black font-bold rounded-2xl transition-all hover:bg-white/90 active:scale-[0.98]"
                  >
                    Ativar Agora
                  </button>
                  <button 
                    onClick={handleDeclineClick}
                    className="w-full py-4 bg-transparent text-white/40 font-semibold rounded-2xl hover:text-white transition-colors"
                  >
                    Agora não
                  </button>
                </div>
              </motion.div>
            </div>
          )}

          {step === 'ad_1' && (
            <div className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-6">
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white max-w-sm w-full rounded-[40px] overflow-hidden text-center shadow-2xl relative p-1"
              >
                 <div className="bg-gray-50 rounded-[39px] p-10 border border-gray-100">
                  <div className="w-20 h-20 bg-blue-500 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <ShieldCheck className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-black font-bold text-2xl mb-2 tracking-tight">Configuração de Alerta</h3>
                  <p className="text-black/40 text-sm mb-10 font-medium">
                    A plataforma deseja enviar alertas de resultados e segurança para seu dispositivo.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <button 
                      onClick={handleCloseAd1}
                      className="py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
                    >
                      Permitir
                    </button>
                    <button 
                      onClick={handleCloseAd1}
                      className="py-4 bg-gray-200 text-gray-500 font-bold rounded-2xl hover:bg-gray-300 transition-colors"
                    >
                      Bloquear
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

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
              className="w-full max-w-sm bg-white hover:bg-white/90 text-black font-semibold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-xl transition-colors"
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
