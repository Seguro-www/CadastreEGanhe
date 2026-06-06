import React from 'react';
import { useFirebase } from '../hooks/useFirebase';
import { motion } from 'motion/react';
import { 
  Trophy, 
  User, 
  ArrowRight, 
  Gift, 
  LayoutDashboard,
  Calendar,
  Ticket
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../components/NavigationLayout';

export function DashboardPage() {
  const { user, registrations, loading, campaigns } = useFirebase();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#111] border border-white/10 p-8 rounded-[40px] max-w-sm w-full text-center"
        >
          <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <User className="w-8 h-8 text-white/20" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4 tracking-tight">Faça seu Login</h1>
          <p className="text-white/50 mb-8 text-sm leading-relaxed">
            Você precisa estar logado para acessar seu painel de pontos e participações.
          </p>
          <Link 
            to="/"
            className="block w-full py-4 bg-white text-black font-semibold rounded-2xl hover:bg-white/90 transition-all"
          >
            Voltar para Início
          </Link>
        </motion.div>
      </div>
    );
  }

  // Calculate total tickets across all participations
  const totalTickets = registrations.reduce((acc, reg) => acc + reg.tickets, 0);

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Helmet>
        <title>Meu Painel | CadastreEGanhe</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Reusing common Navbar component */}
      <Navbar />

      <main className="max-w-5xl mx-auto px-6 pt-32 pb-24">
        {/* Header Section */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-2">
              Olá, <span className="text-white/40">{user.displayName ? user.displayName.split(' ')[0] : (user.email ? user.email.split('@')[0] : 'Participante')}</span>
            </h1>
            <p className="text-white/40 font-light">Acompanhe seus números da sorte e participações.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/5 border border-white/10 p-6 px-10 rounded-[32px] text-center"
          >
            <div className="text-xs font-semibold uppercase tracking-widest text-white/30 mb-1">Total de Pontos</div>
            <div className="text-5xl font-bold tracking-tighter text-white">{totalTickets}</div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main List */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-3">
              <Ticket className="w-5 h-5 text-white/40" />
              Suas Participações
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {registrations.length === 0 ? (
                <div className="bg-[#111] border border-white/5 p-12 rounded-[40px] text-center">
                  <p className="text-white/30 mb-6">Você ainda não participa de nenhum sorteio.</p>
                  <Link 
                    to="/" 
                    className="inline-flex items-center gap-2 text-white hover:gap-3 transition-all font-medium"
                  >
                    Ver sorteios ativos <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                registrations.map(reg => {
                  // Find associated campaign for extra details if it exist
                  const campaign = campaigns.find(c => c.id === reg.sweepstakesId);
                  
                  // Helper for legacy sweepstake names
                  const getProductName = () => {
                    if (campaign) return campaign.name;
                    if (reg.sweepstakesId === 'iphone') return 'iPhone 17 Pro Max';
                    if (reg.sweepstakesId === 'mouse') return 'Mouse Logitech G403';
                    if (reg.sweepstakesId === 'yugioh') return 'Jogo Yu-Gi-Oh!';
                    if (reg.sweepstakesId === 'smartwatch') return 'Smartwatch S10';
                    return reg.sweepstakesId;
                  };

                  const getImageUrl = () => {
                    if (campaign) return campaign.imageUrl;
                    if (reg.sweepstakesId === 'iphone') return '/iphone-17-pro-max-apple-256gb-48mp-tela-6-9-super-retina-xdr-laranja-cosmico_1757696972_gg.webp';
                    if (reg.sweepstakesId === 'mouse') return '/mouse2.png';
                    if (reg.sweepstakesId === 'yugioh') return '/yugioh-box.png';
                    if (reg.sweepstakesId === 'smartwatch') return '/smartwatch.png';
                    return null;
                  };

                  const imageUrl = getImageUrl();

                  return (
                    <motion.div 
                      key={reg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="group bg-[#111] hover:bg-[#151515] border border-white/5 p-6 rounded-[32px] flex items-center justify-between transition-all"
                    >
                      <div className="flex items-center gap-5">
                        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-colors overflow-hidden p-2 relative">
                          {imageUrl ? (
                            <>
                              <div className="absolute top-1 left-1 w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></div>
                              <img src={imageUrl} alt={getProductName()} className="w-full h-full object-contain" />
                            </>
                          ) : (
                            <Gift className="w-8 h-8 text-white/10 group-hover:text-white/30 transition-colors" />
                          )}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-white mb-1">{getProductName()}</h3>
                          <div className="flex items-center gap-4 text-xs text-white/40">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              Cadastrado em {new Date(reg.createdAt?.toDate ? reg.createdAt.toDate() : reg.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium text-white/30 mb-0.5">Pontos</div>
                        <div className="text-3xl font-bold tracking-tighter text-white">{reg.tickets}</div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="space-y-8">
             <div className="bg-[#111] border border-white/10 p-8 rounded-[40px]">
                <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
                  <LayoutDashboard className="w-6 h-6 text-white/40" />
                </div>
                <h3 className="text-xl font-bold mb-4">Dicas Premium</h3>
                <p className="text-white/40 text-sm leading-relaxed mb-6 font-light">
                  Lembre-se que você pode ganhar até <span className="text-white">100 números da sorte todos os dias</span> em cada sorteio que participa.
                </p>
                <div className="p-4 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-4 text-sm">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shrink-0"></div>
                   <p className="text-white/60">Sua conta está verificada e ativa.</p>
                </div>
             </div>

             <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/20 p-8 rounded-[40px] relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-colors"></div>
                <Trophy className="w-8 h-8 text-orange-500 mb-6" />
                <h3 className="text-xl font-bold text-white mb-2">Quer ganhar mais?</h3>
                <p className="text-white/60 text-sm mb-6 leading-relaxed">
                  Acesse agora os sorteios ativos e confirme sua participação diária.
                </p>
                <Link 
                  to="/"
                  className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-2xl font-bold hover:bg-white/90 transition-all text-sm"
                >
                  Ver Sorteios
                  <ArrowRight className="w-4 h-4" />
                </Link>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
