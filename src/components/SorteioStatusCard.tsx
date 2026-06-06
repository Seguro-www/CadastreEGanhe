import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface SorteioStatusCardProps {
  productName: string;
  tickets: number;
  maxTickets?: number;
  onAction: () => void;
  accentColor?: string;
}

export function SorteioStatusCard({ 
  productName, 
  tickets, 
  maxTickets = 50, 
  onAction,
  accentColor = "bg-blue-500"
}: SorteioStatusCardProps) {
  const progress = Math.min((tickets / maxTickets) * 100, 100);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-[#0d0d0d] border border-white/5 rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="text-left">
          <p className="text-white/40 text-xs font-medium uppercase tracking-wider mb-1">Próximo Sorteio</p>
          <h3 className="text-white text-2xl font-bold tracking-tight">{productName}</h3>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full">
          <span className="text-green-500 text-[10px] font-bold uppercase tracking-widest">Ativo</span>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: "easeOut" }}
            className={`h-full ${accentColor}`}
          />
        </div>
        <div className="flex justify-between items-center px-1">
          <span className="text-white/40 text-xs font-medium uppercase">Meus Números da Sorte</span>
          <span className={`font-bold text-sm ${accentColor.replace('bg-', 'text-')}`}>
            {tickets} número{tickets !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <button 
        onClick={onAction}
        className="w-full bg-white hover:bg-white/90 text-black font-bold py-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group shadow-xl"
      >
        {tickets > 0 ? 'Aumentar Chances (+1 Ponto)' : 'Garantir Participação'}
        <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
      </button>
    </motion.div>
  );
}
