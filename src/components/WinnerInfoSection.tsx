import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Info, Target } from 'lucide-react';

export function WinnerInfoSection() {
  return (
    <section id="winner-info" className="py-24 bg-black border-y border-white/5 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>
      
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="bg-[#0A0A0A]/80 backdrop-blur-2xl border border-white/10 rounded-[40px] p-8 md:p-16 text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-white/10 group-hover:bg-white/10 transition-colors">
            <Trophy className="w-10 h-10 text-white" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 tracking-tight">
            Transparência e Mérito:<br className="hidden md:block" />
            <span className="text-white/40">Como você ganha o prêmio</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 text-left">
            <div className="bg-white/[0.02] p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-5 text-white">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-lg tracking-tight">Acúmulo de Pontos</h4>
              </div>
              <p className="text-white/50 leading-relaxed text-base font-light">
                Cada ação conta. Seus <span className="text-white font-normal">Números da Sorte</span> são registros da sua participação. Quanto mais você participa, mais o seu nome sobe no ranking de chances.
              </p>
            </div>
            
            <div className="bg-white/[0.02] p-8 rounded-[32px] border border-white/5 hover:border-white/10 transition-all duration-300">
              <div className="flex items-center gap-4 mb-5 text-white">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                  <Info className="w-5 h-5" />
                </div>
                <h4 className="font-semibold text-lg tracking-tight">Resultado Direto</h4>
              </div>
              <p className="text-white/50 leading-relaxed text-base font-light">
                Esqueça sorteios aleatórios impossíveis. No final do período, <span className="text-white font-normal">quem tiver acumulado o maior número de pontos</span> leva o prêmio. Reconhecemos sua fidelidade.
              </p>
            </div>
          </div>

          <div className="mt-12 p-6 bg-white/5 border border-white/10 rounded-2xl inline-flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
            <p className="text-white/70 text-sm font-medium tracking-tight">
              Dica Pro: Volte a cada 24 horas para garantir seus 100 pontos garantidos do dia!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
