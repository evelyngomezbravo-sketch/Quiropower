import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { chatWithAitana } from '../services/geminiService';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AitanaChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: '¡Hola! Qué alegría saludarte. Soy Aitana. ¿Con quién tengo el gusto de hablar? Cuéntame, ¿en qué podemos ayudarte hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenChat = () => setIsOpen(true);
    window.addEventListener('openAitanaChat', handleOpenChat);
    return () => window.removeEventListener('openAitanaChat', handleOpenChat);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      const response = await chatWithAitana(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', text: response }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: 'Hubo un error al conectar. Por favor intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="bg-white rounded-2xl shadow-2xl w-80 sm:w-96 h-[500px] flex flex-col overflow-hidden border border-stone-200"
          >
            {/* Header */}
            <div className="bg-brand-green p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-brand-green font-bold border border-brand-green/30">
                  A
                </div>
                <div>
                  <h3 className="font-semibold leading-none">Aitana</h3>
                  <span className="text-xs opacity-80 italic">Asistente QuiroPower</span>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-stone-50">
              {messages.map((msg, i) => {
                const appointmentMatch = msg.text.match(/\[CONFIRM_APPOINTMENT: ({.*?})\]/);
                const cleanText = msg.text.replace(/\[CONFIRM_APPOINTMENT: {.*?}\]/, '').trim();
                let appointmentData = null;
                
                if (appointmentMatch) {
                  try {
                    appointmentData = JSON.parse(appointmentMatch[1]);
                  } catch (e) {
                    console.error("Error parsing appointment data", e);
                  }
                }

                return (
                  <div key={i} className={cn("flex flex-col", msg.role === 'user' ? "items-end" : "items-start")}>
                    <div className={cn(
                      "max-w-[85%] p-3 rounded-2xl text-sm",
                      msg.role === 'user' 
                        ? "bg-brand-green text-white rounded-tr-none" 
                        : "bg-white text-stone-800 shadow-sm border border-stone-100 rounded-tl-none"
                    )}>
                      <div className="markdown-body">
                        <Markdown remarkPlugins={[remarkGfm]}>{cleanText}</Markdown>
                      </div>
                    </div>
                    
                    {appointmentData && (
                      <motion.a
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        href={`https://wa.me/573135400492?text=${encodeURIComponent(
                          `Hola Aitana, deseo confirmar mi cita.\n📍 Sede: ${appointmentData.sede}\n🗓️ Fecha: ${appointmentData.fecha}\n⏰ Hora: ${appointmentData.hora}\n🦴 Motivo de consulta: ${appointmentData.motivo}`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 bg-[#25D366] text-white px-4 py-3 rounded-xl flex items-center gap-2 font-bold shadow-lg hover:bg-[#128C7E] transition-all text-sm"
                      >
                        <MessageCircle size={18} />
                        CONFIRMAR POR WHATSAPP
                      </motion.a>
                    )}
                  </div>
                );
              })}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-stone-100 rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-bounce" />
                      <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1.5 h-1.5 bg-brand-green rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-stone-100">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 bg-stone-100 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-brand-green outline-none"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading}
                  className="bg-brand-green text-white p-2 rounded-full hover:bg-brand-green-dark transition-colors disabled:opacity-50"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isOpen && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="bg-brand-green text-white p-4 rounded-full shadow-xl flex items-center gap-2 hover:bg-brand-green-dark transition-all"
        >
          <MessageCircle size={24} />
          <span className="font-sans font-medium">Habla con Aitana</span>
        </motion.button>
      )}
    </div>
  );
};
