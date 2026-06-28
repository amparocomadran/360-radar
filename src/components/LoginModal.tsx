import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, X, Mail, Lock, Sparkles, KeyRound, AlertCircle } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string, businessName: string) => void;
  lang?: 'es' | 'en';
}

export default function LoginModal({ isOpen, onClose, onLoginSuccess, lang = 'es' }: LoginModalProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fillDemoCredentials = () => {
    setEmail('otravueltamza@gmail.com');
    setPassword('otravuelta123');
    setError('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      if (email.toLowerCase() === 'otravueltamza@gmail.com' && password === 'otravuelta123') {
        setLoading(false);
        onLoginSuccess('otravueltamza@gmail.com', 'Otra Vuelta Mza');
        onClose();
      } else {
        setLoading(false);
        setError(
          lang === 'en'
            ? 'Incorrect demo credentials. Please use the test credentials provided below.'
            : 'Credenciales de demostración incorrectas. Por favor, usa las credenciales de prueba indicadas abajo.'
        );
      }
    }, 1200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 font-sans">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-md overflow-hidden relative z-10 shadow-2xl text-left"
          >
            {/* Top Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-950 p-1.5 rounded-full border border-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 rounded-2xl bg-[#facc15]/10 border border-[#facc15]/20 flex items-center justify-center mx-auto text-[#facc15]">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-white tracking-tight">
                  {lang === 'en' ? 'Customer Portal' : 'Acceso de Clientes'}
                </h3>
                <p className="text-xs text-slate-400">
                  {lang === 'en'
                    ? 'Log in with your credentials to manage QR codes and monitor feedback.'
                    : 'Ingresa tus credenciales para gestionar tus códigos QR y monitorear opiniones.'}
                </p>
              </div>

              {/* Demo Fast Access Button */}
              <button
                type="button"
                onClick={() => {
                  onLoginSuccess('otravueltamza@gmail.com', 'Otra Vuelta Mza');
                  onClose();
                }}
                className="w-full bg-yellow-500/10 hover:bg-yellow-500/15 border-2 border-[#facc15]/30 p-3 rounded-2xl text-left transition-all relative overflow-hidden group cursor-pointer"
              >
                <div className="flex items-start gap-2.5">
                  <span className="text-lg shrink-0">💡</span>
                  <div className="space-y-0.5">
                    <p className="text-xs font-extrabold text-[#facc15] flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> {lang === 'en' ? 'INSTANT DEMO SIGN-IN' : 'INGRESAR A LA DEMO AL INSTANTE'}
                    </p>
                    <p className="text-[10.5px] text-slate-300 leading-normal">
                      {lang === 'en'
                        ? <>Click here to enter the control panel of <span className="underline font-semibold">Otra Vuelta Mza</span> directly without typing a password.</>
                        : <>Haz clic aquí para entrar directamente al panel de control de <span className="underline font-semibold">Otra Vuelta Mza</span> sin escribir contraseñas.</>}
                    </p>
                  </div>
                </div>
              </button>

              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 p-3 rounded-xl text-xs flex items-start gap-2 leading-relaxed">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Email Input */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450">
                    {lang === 'en' ? 'Email Address' : 'Correo Electrónico'}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={lang === 'en' ? 'example@restaurant.com' : 'ejemplo@restaurante.com'}
                      className="w-full bg-slate-950 border border-slate-800 focus:border-yellow-500/50 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-450">
                    {lang === 'en' ? 'Password' : 'Contraseña'}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-slate-950 border border-slate-800 focus:border-yellow-500/50 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-slate-600 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#facc15] hover:bg-yellow-455 text-[#0f172a] font-black tracking-wider text-xs py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 uppercase"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                      {lang === 'en' ? 'Accessing Dashboard...' : 'Accediendo al Panel...'}
                    </span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      {lang === 'en' ? 'Log in to RADAR 360' : 'Ingresar a RADAR 360'}
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
