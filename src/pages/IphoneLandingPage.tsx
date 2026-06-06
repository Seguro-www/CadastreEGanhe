import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Helmet } from 'react-helmet-async';
import { Navbar, Footer, TrustIndicators } from '../App';
import { 
  ChevronRight, 
  ShieldCheck, 
  Zap, 
  Smartphone, 
  Camera, 
  Cpu, 
  Battery, 
  Star,
  ArrowRight,
  TrendingUp,
  Award
} from 'lucide-react';

export function IphoneLandingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mercadoLivreLink = "https://www.mercadolivre.com.br/iphone-17-pro-max-512gb-laranja-cosmico/p/MLB55308659?pdp_filters=item_id:MLB4661662537";

  return (
    <div className="min-h-screen bg-[#000000] text-[#f5f5f7] font-sans selection:bg-orange-500/30 overflow-x-hidden">
      <Helmet>
        <title>iPhone 17 Pro Max | O Futuro em suas Mãos | Jogue e Ganhe</title>
        <meta name="description" content="Descubra o novo iPhone 17 Pro Max. Performance inigualável, câmera revolucionária e design ultra-premium. Compre agora no Mercado Livre com o melhor preço." />
        <meta name="keywords" content="iphone 17 pro max, comprar iphone 17, iphone 17 apple, melhor preço iphone, smartphone premium 2025" />
        <link rel="canonical" href="https://jogueeganhee.com.br/iphone-17-pro-max" />
        <meta property="og:title" content="iPhone 17 Pro Max | O Futuro é Agora" />
        <meta property="og:description" content="A experiência definitiva em um smartphone. Design em titânio aeroespacial e o chip A19 Pro." />
        <meta property="og:image" content="/iphone-17-pro-max-apple-256gb-48mp-tela-6-9-super-retina-xdr-laranja-cosmico_1757696972_gg.webp" />
        <meta property="og:type" content="product" />
        <meta name="twitter:card" content="summary_large_image" />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org/",
            "@type": "Product",
            "name": "iPhone 17 Pro Max",
            "image": [
              "https://jogueeganhee.com.br/iphone-17-pro-max-apple-256gb-48mp-tela-6-9-super-retina-xdr-laranja-cosmico_1757696972_gg.webp"
            ],
            "description": "O smartphone mais avançado da Apple, com chip A19 Pro e sistema de câmera quádrupla.",
            "brand": {
              "@type": "Brand",
              "name": "Apple"
            },
            "offers": {
              "@type": "Offer",
              "url": mercadoLivreLink,
              "priceCurrency": "BRL",
              "price": "10349.99",
              "availability": "https://schema.org/InStock"
            }
          })}
        </script>
      </Helmet>

      <Navbar />

      <main>
        {/* Apple-style Hero Section */}
        <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-full bg-gradient-to-b from-orange-500/10 via-transparent to-transparent blur-[120px] pointer-events-none"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-center z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-yellow-400 text-[#2D3277] text-xs font-bold uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(254,230,0,0.3)]">
              <ShieldCheck className="w-4 h-4" />
              Compra 100% Segura via Mercado Livre
            </div>
            <h2 className="text-orange-500 font-semibold tracking-widest uppercase text-sm mb-4">Lançamento Exclusivo</h2>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 bg-gradient-to-b from-white to-[#888] bg-clip-text text-transparent">
              iPhone 17 Pro Max
            </h1>
            <p className="text-xl md:text-2xl text-white/60 mb-10 font-light max-w-2xl mx-auto tracking-tight">
              A revolução que você esperava. Titânio aeroespacial. Câmera de 100MP. O Chip A19 Pro.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-8">
              <div className="text-center">
                <span className="text-white/40 text-sm font-medium tracking-widest uppercase mb-2 block">Preço de Lançamento</span>
                <div className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-2">
                  R$ 10.349<span className="text-2xl md:text-3xl text-white/50">,99</span>
                </div>
                <div className="text-white/60 text-lg font-light tracking-tight">
                  ou em <span className="text-white font-bold">10x sem juros</span> no cartão
                </div>
              </div>

              <a 
                href={mercadoLivreLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-black px-12 py-6 rounded-full text-xl font-black hover:scale-105 transition-all duration-500 flex items-center gap-4 shadow-[0_0_50px_rgba(255,255,255,0.3)]"
              >
                COMPRAR NO MERCADO LIVRE
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 relative w-full max-w-4xl px-4 flex justify-center"
          >
            <div className="absolute inset-0 bg-orange-500/20 blur-[150px] pointer-events-none"></div>
            <img 
              src="/iphone-17-pro-max-apple-256gb-48mp-tela-6-9-super-retina-xdr-laranja-cosmico_1757696972_gg.webp" 
              alt="iPhone 17 Pro Max Laranja Cósmico" 
              className="w-full max-w-lg h-auto object-contain drop-shadow-[0_0_80px_rgba(249,115,22,0.3)] relative z-10"
            />
          </motion.div>
        </section>

        {/* Feature Grid - Persuasion with Scarcity/Pain */}
        <section className="py-32 bg-[#050505]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Box 1: Performance */}
              <div className="bg-[#111] p-10 rounded-[40px] border border-white/5 hover:border-white/10 transition-colors group">
                <Cpu className="w-12 h-12 text-orange-500 mb-8" />
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-white/90">Chip A19 Pro</h3>
                <p className="text-white/50 font-light leading-relaxed">
                  Não é apenas rápido. É o fim do lag. Jogue qualquer coisa, processe 8K em tempo real. Se você não tem o A19, você está parado no tempo.
                </p>
              </div>

              {/* Box 2: Camera */}
              <div className="bg-[#111] p-10 rounded-[40px] border border-white/5 hover:border-white/10 transition-colors">
                <Camera className="w-12 h-12 text-blue-500 mb-8" />
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-white/90">Sistema Quad-Camera</h3>
                <p className="text-white/50 font-light leading-relaxed">
                  Fotos que parecem cinema. O sensor de 100MP captura detalhes que seus olhos não veem. Cada momento perdido é uma memória sem brilho.
                </p>
              </div>

              {/* Box 3: Durability */}
              <div className="bg-[#111] p-10 rounded-[40px] border border-white/5 hover:border-white/10 transition-colors">
                <ShieldCheck className="w-12 h-12 text-teal-500 mb-8" />
                <h3 className="text-2xl font-bold mb-4 tracking-tight text-white/90">Titânio Grau 5</h3>
                <p className="text-white/50 font-light leading-relaxed">
                  Leveza absurda. Resistência total. O iPhone que sobrevive ao seu estilo de vida implacável.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Big Product Visual & Persuasion */}
        <section className="py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#000]"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-20">
              <motion.div 
                whileInView={{ opacity: [0, 1], x: [-50, 0] }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-500 text-xs font-bold uppercase tracking-wider mb-8">
                  <TrendingUp className="w-4 h-4" />
                  <span>Em alta demanda</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tighter mb-8">
                  Por que você ainda está esperando?
                </h2>
                <p className="text-xl text-white/60 mb-10 font-light leading-relaxed">
                  O estoque global está diminuindo a cada minuto. Ter um iPhone 17 Pro Max não é sobre status, é sobre estar no controle da tecnologia mais poderosa do planeta. 
                </p>
                
                <ul className="space-y-6 mb-12">
                  <li className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Star className="w-4 h-4 text-orange-500" />
                    </div>
                    <span className="text-white/80 font-medium">Melhor tela já feita: 6.9" 144Hz ProMotion</span>
                  </li>
                  <li className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Battery className="w-4 h-4 text-green-500" />
                    </div>
                    <span className="text-white/80 font-medium">Bateria para 36 horas de uso intenso</span>
                  </li>
                  <li className="flex items-center gap-4 group">
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <Award className="w-4 h-4 text-purple-500" />
                    </div>
                    <span className="text-white/80 font-medium">Garantia estendida no Mercado Livre</span>
                  </li>
                </ul>

                <a 
                  href={mercadoLivreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-white text-black py-4 px-10 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl hover:shadow-orange-500/20"
                >
                  Garantir o meu agora
                  <ArrowRight className="w-6 h-6" />
                </a>
              </motion.div>

              <motion.div 
                whileInView={{ opacity: [0, 1], scale: [0.9, 1] }}
                viewport={{ once: true }}
                className="flex-1 relative"
              >
                <div className="absolute inset-0 bg-blue-500/20 blur-[120px]"></div>
                <img 
                  src="/iphone-17-pro-max-apple-256gb-48mp-tela-6-9-super-retina-xdr-laranja-cosmico_1757696972_gg.webp" 
                  alt="iPhone 17 Pro Max Side View" 
                  className="relative z-10 w-full h-auto drop-shadow-2xl"
                />
              </motion.div>
            </div>
          </div>
        </section>

        <TrustIndicators />

        {/* Final CTA Section */}
        <section className="py-32 bg-black flex justify-center px-4">
          <div className="max-w-4xl w-full bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/5 p-12 md:p-20 rounded-[60px] text-center relative overflow-hidden">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange-500/20 rounded-full blur-[100px] pointer-events-none"></div>
            
            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
              O estoque está voando. <br className="hidden md:block"/> Não perca essa chance.
            </h2>
            <p className="text-lg text-white/50 mb-12 max-w-xl mx-auto">
              Milhares de pessoas já garantiram o seu. Junte-se a quem não aceita nada menos que a perfeição.
            </p>
            
            <a 
              href={mercadoLivreLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#FEE600] text-[#2D3277] py-6 px-16 rounded-full font-black text-xl hover:scale-105 transition-all shadow-[0_0_60px_rgba(254,230,0,0.2)]"
            >
              COMPRAR NO MERCADO LIVRE
            </a>
            
            <div className="mt-12 flex items-center justify-center gap-8 text-white/30">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Compra Segura</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                <span className="text-xs font-bold uppercase tracking-widest">Entrega Rápida</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
