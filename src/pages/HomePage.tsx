import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ShieldCheck, Ticket, Trophy, Smartphone, Gift, ArrowRight, Star } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { SorteioStatusCard } from '../components/SorteioStatusCard';
import { useFirebase } from '../hooks/useFirebase';
import { signInWithGoogle, auth } from '../lib/firebase';
import { Navbar } from '../App';

export function HomePage() {
  const navigate = useNavigate();
  const { user, registrations, loading, campaigns } = useFirebase();
  
  const tickets = registrations.find(r => r.sweepstakesId === 'iphone')?.tickets || 0;
  const ticketsMouse = registrations.find(r => r.sweepstakesId === 'mouse')?.tickets || 0;
  const ticketsYugioh = registrations.find(r => r.sweepstakesId === 'yugioh')?.tickets || 0;
  const ticketsSmartwatch = registrations.find(r => r.sweepstakesId === 'smartwatch')?.tickets || 0;

  const totalTickets = tickets + ticketsMouse + ticketsYugioh + ticketsSmartwatch;

  const progressPercentage = Math.min(100, (tickets * 10) + 5); // 5% base visual, +10% for each ticket

  const scrollToSection = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans selection:bg-white/30">
      <Helmet>
        <title>Sorteios Exclusivos e Prêmios Reais | Jogue e Ganhe</title>
        <meta name="description" content="Participe de campanhas com prêmios incríveis, de forma segura e transparente. Cadastre-se e ganhe recompensas." />
        <meta name="keywords" content="sorteios, ganhar prêmios, prêmios reais, ganhar dinheiro, sorteio de iphone, renda online, grátis" />
        <link rel="canonical" href="https://jogueeganhee.com.br/" />
        <meta property="og:title" content="Sorteios Exclusivos e Prêmios Reais | Jogue e Ganhe" />
        <meta property="og:description" content="Participe de campanhas com prêmios incríveis e ganhe recompensas reais." />
        <meta property="og:url" content="https://jogueeganhee.com.br/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/icone-app.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Sorteios Exclusivos | Jogue e Ganhe" />
        <meta name="twitter:description" content="Participe de campanhas com prêmios incríveis e ganhe recompensas reais." />
        <meta name="twitter:image" content="/icone-app.png" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Jogue e Ganhe",
            "url": "https://jogueeganhee.com.br/",
            "description": "Plataforma premium de sorteios gratuitos e seguros.",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://jogueeganhee.com.br/sorteios/{search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center justify-center text-center px-4">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 bg-gradient-to-br from-white to-white/50 bg-clip-text text-transparent">
            Seu próximo sonho,<br />a um clique de distância.
          </h1>
          <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto font-medium">
            Participe de campanhas exclusivas com segurança, transparência e as melhores chances do mercado.
          </p>
          
          <Link
            to="/sorteio-de-iPhone"
            className="inline-flex items-center gap-2 bg-white text-black text-lg font-semibold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)]"
          >
            Participar Agora
            <ChevronRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </section>

      {/* Sorteios em Destaque */}
      <section id="sorteios" className="py-24 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Sorteios em Destaque</h2>
            <p className="text-white/50">Campanhas ativas prontas para você participar.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card iPhone */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 shadow-2xl"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-500/20 to-black p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                <img src="/iphone-17-pro-max-apple-256gb-48mp-tela-6-9-super-retina-xdr-laranja-cosmico_1757696972_gg.webp" alt="iPhone 17 Pro Max" className="w-56 h-56 object-contain drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-orange-500">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                  </span>
                  Sorteio Ativo
                </div>
                <h3 className="text-2xl font-bold mb-2">iPhone 17 Pro Max</h3>
                <p className="text-white/50 text-sm mb-6">Participe agora de forma totalmente gratuita e concorra ao mais novo lançamento.</p>
                <Link 
                  to="/sorteio-de-iPhone"
                  className="block w-full text-center bg-white/10 hover:bg-white text-white hover:text-black py-3 rounded-xl font-medium transition-colors"
                >
                  Quero Participar
                </Link>
              </div>
            </motion.div>

            {/* NEW: Card iPhone Buy Now (Landing Page Link) */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative bg-[#111] rounded-3xl overflow-hidden border border-orange-500/20 hover:border-orange-500/40 transition-all duration-500 shadow-2xl"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-orange-500/10 to-black p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-500"></div>
                <img src="/iphone-17-pro-max-apple-256gb-48mp-tela-6-9-super-retina-xdr-laranja-cosmico_1757696972_gg.webp" alt="iPhone 17 Pro Max Store" className="w-56 h-56 object-contain drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute top-4 right-4 bg-orange-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-tighter z-20 shadow-lg">
                  Lançamento 2025
                </div>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-orange-500">
                  <Star className="w-3 h-3" />
                  Loja Oficial
                </div>
                <h3 className="text-2xl font-bold mb-2">Comprar iPhone 17</h3>
                <p className="text-white/50 text-sm mb-6">Garanta o seu com entrega prioritária e o melhor preço garantido no Mercado Livre.</p>
                <Link 
                  to="/iphone-17-pro-max"
                  className="block w-full text-center bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-bold transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)]"
                >
                  Ver Detalhes e Comprar
                </Link>
              </div>
            </motion.div>

            {/* Mouse Card */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 shadow-2xl"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-blue-500/20 to-black p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                <img src="/mouse2.png" alt="Mouse Gamer Logitech G403" className="w-48 h-48 object-contain drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-blue-500">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  Sorteio Ativo
                </div>
                <h3 className="text-2xl font-bold mb-2">Mouse Logitech G403</h3>
                <p className="text-white/50 text-sm mb-6">Participe agora e concorra a este incrível mouse gamer com sensor Hero 25K.</p>
                <Link 
                  to="/sorteio-Mouse-Gamer-Logitech-G403-HERO-Sensor-Hero-25K"
                  className="block w-full text-center bg-white/10 hover:bg-white text-white hover:text-black py-3 rounded-xl font-medium transition-colors"
                >
                  Quero Participar
                </Link>
              </div>
            </motion.div>

            {/* Card Yu-Gi-Oh */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 shadow-2xl"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-purple-500/20 to-black p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                <img src="/yugioh-box.png" alt="Jogo Yu-Gi-Oh! Battle of Legends" className="w-52 h-52 object-contain drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-purple-500">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                  </span>
                  Sorteio Ativo
                </div>
                <h3 className="text-2xl font-bold mb-2 uppercase text-sm md:text-xl">Yu-Gi-Oh! Battle of Legends</h3>
                <p className="text-white/50 text-sm mb-6">Participe agora e concorra a este incrível bundle de cartas colecionáveis Monster Mayhem.</p>
                <Link 
                  to="/Jogo-de-cartas-colecionáveis-Yu-Gi-Oh!-carta-Battle-of-legends-Monster-Mayhem-de-mazos-com-20-cartas"
                  className="block w-full text-center bg-white/10 hover:bg-white text-white hover:text-black py-3 rounded-xl font-medium transition-colors"
                >
                  Quero Participar
                </Link>
              </div>
            </motion.div>

            {/* Card Smartwatch */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="group relative bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 shadow-2xl"
            >
              <div className="aspect-[4/3] bg-gradient-to-br from-teal-500/20 to-black p-8 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                <img src="/smartwatch.png" alt="Smartwatch S10 Série 10" className="w-52 h-52 object-contain drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-teal-500">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                  </span>
                  Sorteio Ativo
                </div>
                <h3 className="text-2xl font-bold mb-2 uppercase text-sm md:text-xl">Smartwatch S10 Série 10</h3>
                <p className="text-white/50 text-sm mb-6">Participe agora e concorra a este incrível Smartwatch resistente à água com 2 pulseiras.</p>
                <Link 
                  to="/sorteio-Smartwatch-S10"
                  className="block w-full text-center bg-white/10 hover:bg-white text-white hover:text-black py-3 rounded-xl font-medium transition-colors"
                >
                  Quero Participar
                </Link>
              </div>
            </motion.div>

            {/* Dynamic Campaigns */}
            {campaigns.map((campaign) => (
              <motion.div 
                key={campaign.id}
                whileHover={{ y: -10 }}
                className="group relative bg-[#111] rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 shadow-2xl"
              >
                <div className="aspect-[4/3] bg-gradient-to-br from-white/5 to-black p-8 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500"></div>
                  <img src={campaign.imageUrl} alt={campaign.name} className="w-48 h-48 object-contain drop-shadow-2xl relative z-10 transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 mb-4 text-xs font-semibold uppercase tracking-wider text-white/40">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/20 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-white/40"></span>
                    </span>
                    Novo Sorteio
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{campaign.name}</h3>
                  <p className="text-white/50 text-sm mb-6">Participe agora e aumente suas chances de levar este prêmio incrível para casa.</p>
                  <Link 
                    to={`/sorteios/${campaign.id}`}
                    className="block w-full text-center bg-white/10 hover:bg-white text-white hover:text-black py-3 rounded-xl font-medium transition-colors"
                  >
                    Quero Participar
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Meus Números da Sorte - Dashboard Section */}
      {totalTickets > 0 && (
        <section className="py-20 bg-black relative overflow-hidden border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-500 text-xs font-bold mb-4 uppercase tracking-wider">
                <Gift className="w-3 h-3" />
                <span>Minhas Participações</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4">Seus Números Atuais</h2>
              <p className="text-white/50 max-w-2xl mx-auto">Aumente suas chances participando várias vezes ao dia e acompanhe aqui seu progresso em cada prêmio.</p>
            </motion.div>

            <div className="flex flex-wrap justify-center gap-6">
              {tickets > 0 && (
                <div className="w-full max-w-sm">
                  <SorteioStatusCard 
                    productName="iPhone 17 Pro Max"
                    tickets={tickets}
                    onAction={() => navigate('/sorteio-de-iPhone')}
                    accentColor="bg-orange-500"
                  />
                </div>
              )}
              {ticketsMouse > 0 && (
                <div className="w-full max-w-sm">
                  <SorteioStatusCard 
                    productName="Logitech G403 HERO"
                    tickets={ticketsMouse}
                    onAction={() => navigate('/sorteio-Mouse-Gamer-Logitech-G403-HERO-Sensor-Hero-25K')}
                    accentColor="bg-blue-500"
                  />
                </div>
              )}
              {ticketsYugioh > 0 && (
                <div className="w-full max-w-sm">
                  <SorteioStatusCard 
                    productName="Yu-Gi-Oh! Battle of Legends"
                    tickets={ticketsYugioh}
                    onAction={() => navigate('/Jogo-de-cartas-colecionáveis-Yu-Gi-Oh!-carta-Battle-of-legends-Monster-Mayhem-de-mazos-com-20-cartas')}
                    accentColor="bg-purple-500"
                  />
                </div>
              )}
              {ticketsSmartwatch > 0 && (
                <div className="w-full max-w-sm">
                  <SorteioStatusCard 
                    productName="Smartwatch S10"
                    tickets={ticketsSmartwatch}
                    onAction={() => navigate('/sorteio-Smartwatch-S10')}
                    accentColor="bg-teal-500"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Como Funciona */}
      <section id="como-funciona" className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Simplicidade e Segurança.</h2>
              <p className="text-white/60 text-lg mb-8 leading-relaxed">
                Nossa plataforma foi desenhada para a melhor experiência possível. 
                Sem complicações, sem letras miúdas. Apenas oportunidades reais.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                    <Ticket className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Cadastre-se Rapidamente</h4>
                    <p className="text-white/50 text-sm text-balance">Crie sua conta em segundos e garanta seu lugar em nossos sorteios abertos.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 border border-green-500/20">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Resultado Transparente</h4>
                    <p className="text-white/50 text-sm text-balance">Sorteios auditáveis e baseados em fontes públicas e confiáveis.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 border border-yellow-500/20">
                    <Trophy className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Maior Pontuação Vence</h4>
                    <p className="text-white/50 text-sm text-balance">Ao final do sorteio, quem tiver mais Números da Sorte ganha o prêmio! Acumule o máximo possível diariamente.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-3xl rounded-full"></div>
              <div className="bg-[#111] border border-white/10 rounded-3xl p-8 relative z-10 shadow-2xl backdrop-blur-sm">
                <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-6">
                  <div>
                    <div className="text-sm text-white/50 mb-1">Próximo Sorteio</div>
                    <div className="text-2xl font-bold">iPhone 17 Pro Max</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-green-400 font-medium bg-green-400/10 px-3 py-1 rounded-full">Ativo</div>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-white/40 font-medium">
                    <span>Meus Números da Sorte</span>
                    <span className="text-blue-400 font-bold">{tickets} {tickets === 1 ? 'número' : 'números'}</span>
                  </div>
                </div>
                <Link to="/sorteio-de-iPhone" className="block w-full bg-white text-black text-center font-semibold py-4 rounded-xl hover:bg-white/90 transition-colors">
                  Garantir Participação
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0a0a0a] py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-white/40" />
            <span className="font-semibold tracking-tight text-white/60">Jogue e Ganhe</span>
          </div>
          <div className="text-sm text-white/40">
            © {new Date().getFullYear()} Jogue e Ganhe. Todos os direitos reservados.
          </div>
          <div className="flex gap-4 text-sm text-white/40">
            <a href="#" className="hover:text-white transition-colors">Privacidade</a>
            <a href="#" className="hover:text-white transition-colors">Termos</a>
          </div>
          {/* SEO hidden links */}
          <a href="https://jogueeganhee.com.br/" style={{display: 'none'}}>sorteios online</a>
          <a href="https://jogueeganhee.com.br/sorteios" style={{display: 'none'}}>ganhar prêmios</a>
        </div>
      </footer>
    </div>
  );
}
