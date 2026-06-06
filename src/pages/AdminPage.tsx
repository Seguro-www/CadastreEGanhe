import React, { useState } from 'react';
import { useFirebase } from '../hooks/useFirebase';
import { motion } from 'motion/react';
import { Package, Plus, LogOut, ArrowRight } from 'lucide-react';
import { signInWithGoogle, loginWithEmail, auth } from '../lib/firebase';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export function AdminPage() {
  const { user, loading, isAdmin, campaigns, allRegistrations, createCampaign } = useFirebase();
  const [activeTab, setActiveTab] = useState<'campaigns' | 'registrations'>('campaigns');
  const [loginMethod, setLoginMethod] = useState<'google' | 'email'>('google');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [name, setName] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setIsLoggingIn(true);
    try {
      await loginWithEmail(email, password);
    } catch (err) {
      // Error handled in firebase.ts
    } finally {
      setIsLoggingIn(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black flex items-center justify-center">Carregando...</div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <div className="bg-white/5 border border-white/10 p-8 rounded-[40px] max-w-sm w-full text-center">
          <Package className="w-12 h-12 text-white/20 mx-auto mb-4" />
          <h1 className="text-xl font-bold text-white mb-2 tracking-tight">Acesso Restrito</h1>
          <p className="text-white/50 mb-6 text-sm font-light">Área exclusiva para administradores.</p>
          
          {!user ? (
            <div className="space-y-4">
              <div className="flex bg-white/5 p-1 rounded-2xl mb-4 border border-white/5">
                <button 
                  onClick={() => setLoginMethod('google')}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${loginMethod === 'google' ? 'bg-white text-black' : 'text-white/40'}`}
                >
                  Google
                </button>
                <button 
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all ${loginMethod === 'email' ? 'bg-white text-black' : 'text-white/40'}`}
                >
                  E-mail
                </button>
              </div>

              {loginMethod === 'google' ? (
                <button
                  onClick={() => signInWithGoogle()}
                  className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/90 transition-all"
                >
                  Entrar com Google
                </button>
              ) : (
                <form onSubmit={handleEmailLogin} className="space-y-3">
                  <input 
                    type="email" 
                    placeholder="E-mail" 
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-2xl px-5 py-3 text-white placeholder-white/20 text-sm focus:border-white/40 focus:outline-none"
                    required
                  />
                  <input 
                    type="password" 
                    placeholder="Senha" 
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-2xl px-5 py-3 text-white placeholder-white/20 text-sm focus:border-white/40 focus:outline-none"
                    required
                  />
                  <button 
                    type="submit"
                    disabled={isLoggingIn}
                    className="w-full py-3 bg-white text-black font-bold rounded-2xl text-sm disabled:opacity-50 transition-all"
                  >
                    {isLoggingIn ? 'Entrando...' : 'Entrar'}
                  </button>
                </form>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-red-500 font-medium">Você está logado, mas não tem permissões de administrador.</p>
              <button
                onClick={() => auth.signOut()}
                className="w-full py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/20 transition-all"
              >
                Sair da Conta
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !imageUrl) return;
    
    setIsSubmitting(true);
    try {
      await createCampaign(name, imageUrl);
      setName('');
      setImageUrl('');
      alert("Sorteio criado com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao criar sorteio.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <Helmet>
        <title>Painel Admin | CadastreEGanhe</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <header className="px-6 py-4 border-b border-white/5 flex items-center justify-between sticky top-0 bg-black/50 backdrop-blur-md z-50">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">Adm</h1>
          </Link>
          
          <div className="flex bg-white/5 rounded-full p-1 border border-white/5">
            <button 
              onClick={() => setActiveTab('campaigns')}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'campaigns' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
            >
              Sorteios
            </button>
            <button 
              onClick={() => setActiveTab('registrations')}
              className={`px-6 py-1.5 rounded-full text-xs font-bold transition-all ${activeTab === 'registrations' ? 'bg-white text-black' : 'text-white/40 hover:text-white'}`}
            >
              Participantes
            </button>
          </div>
        </div>

        <button 
          onClick={() => auth.signOut()}
          className="text-white/50 hover:text-white transition-colors"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      <main className="max-w-6xl mx-auto p-6 mt-12">
        {activeTab === 'campaigns' ? (
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-3xl font-bold mb-8 tracking-tighter">Criar Novo Sorteio</h2>
              
              <form onSubmit={handleSubmit} className="bg-[#111] border border-white/5 p-8 rounded-[40px] shadow-2xl">
                <div className="space-y-6 mb-8">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">Nome do Produto</label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Ex: PlayStation 5 Pro"
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-white/30 mb-2">URL da Imagem</label>
                    <input
                      type="url"
                      value={imageUrl}
                      onChange={e => setImageUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full bg-black border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:border-white/40 focus:outline-none transition-colors"
                      required
                    />
                  </div>
                  
                  {imageUrl && (
                    <div className="mt-6 border border-white/5 rounded-3xl overflow-hidden bg-black flex justify-center p-8 relative group">
                       <div className="absolute inset-0 bg-white/5 blur-2xl opacity-50"></div>
                       <img src={imageUrl} alt="Preview" className="max-h-64 object-contain drop-shadow-2xl relative z-10 transition-transform group-hover:scale-105" />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/90 disabled:opacity-50 transition-all active:scale-[0.98]"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Plus className="w-5 h-5" />
                      Publicar Sorteio
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold tracking-tighter">Sorteios Ativos</h2>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40">
                  {campaigns.length + 4} Ativos
                </span>
              </div>
              
              <div className="space-y-4">
                {/* Static Campaigns */}
                {[
                  { id: 'iphone', name: 'iPhone 17 Pro Max', imageUrl: '/iphone-17-pro-max-apple-256gb-48mp-tela-6-9-super-retina-xdr-laranja-cosmico_1757696972_gg.webp', link: '/sorteio-de-iPhone' },
                  { id: 'mouse', name: 'Mouse Gamer Logitech G403 HERO', imageUrl: '/mouse2.png', link: '/sorteio-Mouse-Gamer-Logitech-G403-HERO-Sensor-Hero-25K' },
                  { id: 'yugioh', name: 'Yu-Gi-Oh! Battle of legends', imageUrl: '/yugioh-box.png', link: '/Jogo-de-cartas-colecionáveis-Yu-Gi-Oh!-carta-Battle-of-legends-Monster-Mayhem-de-mazos-com-20-cartas' },
                  { id: 'smartwatch', name: 'Smartwatch S10 Série 10', imageUrl: '/smartwatch.png', link: '/sorteio-Smartwatch-S10' }
                ].map(campaign => (
                  <div key={campaign.id} className="bg-[#111] border border-white/5 p-5 rounded-[32px] flex items-center gap-5 group hover:bg-[#151515] transition-all">
                    <div className="w-20 h-20 bg-black rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0 p-3 border border-white/5 relative">
                      <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                      <img src={campaign.imageUrl} alt={campaign.name} className="max-w-full max-h-full object-contain drop-shadow-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white truncate">{campaign.name}</h3>
                      <p className="text-xs text-white/30 truncate">{campaign.link}</p>
                    </div>
                    <Link 
                      to={campaign.link}
                      className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white text-black transition-all group-hover:scale-105"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                ))}
                
                {/* Dynamic Campaigns */}
                {campaigns.map(campaign => (
                  <div key={campaign.id} className="bg-[#111] border border-white/5 p-5 rounded-[32px] flex items-center gap-5 group hover:bg-[#151515] transition-all">
                    <div className="w-20 h-20 bg-black rounded-2xl overflow-hidden flex items-center justify-center flex-shrink-0 p-3 border border-white/5 relative">
                      <div className="absolute top-1 left-1 w-2 h-2 rounded-full bg-teal-500 animate-pulse"></div>
                      <img src={campaign.imageUrl} alt={campaign.name} className="max-w-full max-h-full object-contain drop-shadow-lg" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white truncate">{campaign.name}</h3>
                      <p className="text-xs text-white/30 truncate">/sorteios/{campaign.id}</p>
                    </div>
                    <Link 
                      to={`/sorteios/${campaign.id}`}
                      className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center hover:bg-white text-black transition-all group-hover:scale-105"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold tracking-tighter mb-2">Dados do Cadastro</h2>
                <p className="text-white/40 font-light">Lista completa de participantes e seus pontos acumulados.</p>
              </div>
              <div className="text-right">
                <div className="text-xs font-bold uppercase tracking-widest text-white/20 mb-1">Total Geral</div>
                <div className="text-3xl font-bold tabular-nums">{allRegistrations.length}</div>
              </div>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-[40px] overflow-hidden shadow-2xl overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/5">
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-white/30">Data</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-white/30">Participante</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-white/30">Campanha</th>
                    <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-white/30 text-right">Pontos</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05]">
                  {allRegistrations.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-8 py-20 text-center text-white/20 font-light italic">
                        Nenhum cadastro encontrado até o momento.
                      </td>
                    </tr>
                  ) : (
                    [...allRegistrations].sort((a, b) => b.tickets - a.tickets).map((reg) => (
                      <tr key={reg.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-5 text-sm text-white/40 font-mono">
                          {new Date(reg.createdAt?.toDate ? reg.createdAt.toDate() : reg.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-5">
                          <div className="font-bold text-white mb-0.5 group-hover:text-white transition-colors">{reg.email}</div>
                          <div className="text-[10px] text-white/20 font-mono">{reg.userId}</div>
                        </td>
                        <td className="px-8 py-5">
                          <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold text-white/50 uppercase tracking-wider">
                            {reg.sweepstakesId}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <span className="text-xl font-bold tracking-tighter text-white">{reg.tickets}</span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}
