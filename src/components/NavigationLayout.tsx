import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { useFirebase } from '../hooks/useFirebase';
import { 
  loginWithEmail, 
  registerWithEmail, 
  resetPassword, 
  signInWithGoogle, 
  signInWithAnonymous, 
  auth 
} from '../lib/firebase';
import { 
  Gift, 
  X, 
  User, 
  Smartphone, 
  Lock, 
  ShieldCheck, 
  Zap, 
  ChevronRight,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

export function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
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
            onClick={() => { signInWithGoogle().then(() => onClose()).catch(() => {}); }}
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
                    <p>3. <strong>Sorteio:</strong> Reservamo-nos o direito de alterar prazos, garantiendo transparência no processo final de seleção do vencedor através de critérios justos (como a Loteria Federal, conforme aplicável).</p>
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
