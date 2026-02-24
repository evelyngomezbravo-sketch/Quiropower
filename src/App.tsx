import React from 'react';
import { motion } from 'motion/react';
import { 
  Activity, 
  MapPin, 
  Phone, 
  Clock, 
  CheckCircle2, 
  ChevronRight,
  User,
  Heart,
  ShieldCheck
} from 'lucide-react';
import { GloriaChat } from './components/GloriaChat';

const openChat = () => {
  window.dispatchEvent(new CustomEvent('openGloriaChat'));
};

const Navbar = () => (
  <nav className="flex justify-between items-center py-6 px-8 max-w-7xl mx-auto">
    <div className="flex items-center gap-3">
      <div className="w-14 h-14 bg-brand-black rounded-full flex items-center justify-center overflow-hidden border-2 border-brand-green shadow-lg">
        <img 
          src="https://lh3.googleusercontent.com/d/1GjCH8Wg1qUkFGFuO7iQSJ3oueUuV1ghq" 
          className="w-full h-full object-cover"
          alt="QuiroPower Logo"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="flex flex-col">
        <span className="text-2xl font-bold tracking-tight text-brand-black uppercase leading-none">QuiroPower</span>
        <span className="text-[10px] font-sans font-bold text-brand-green-dark tracking-[0.2em] uppercase">Centro Quiropráctico</span>
      </div>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-sans font-semibold text-stone-600">
      <a href="#inicio" className="hover:text-brand-gold transition-colors">Inicio</a>
      <a href="#servicios" className="hover:text-brand-gold transition-colors">Tratamos</a>
      <a href="#consultorio" className="hover:text-brand-gold transition-colors">Consultorio</a>
      <a href="#contacto" className="hover:text-brand-gold transition-colors">Sedes</a>
    </div>
    <button 
      onClick={openChat}
      className="bg-brand-green text-white px-6 py-2 rounded-full text-sm font-sans font-bold hover:bg-brand-green-dark transition-all shadow-md"
    >
      AGENDAR CITA
    </button>
  </nav>
);

const Hero = () => (
  <section id="inicio" className="relative min-h-[80vh] flex items-center overflow-hidden">
    <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="z-10"
      >
        <h1 className="text-7xl md:text-8xl font-light leading-tight mb-6">
          Tu columna, <br />
          <span className="italic text-brand-gold">tu energía.</span>
        </h1>
        <p className="text-xl text-stone-600 mb-8 max-w-md font-sans leading-relaxed">
          En QuiroPower, ayudamos a restaurar el equilibrio natural de tu cuerpo bajo la guía experta del Dr. Luis Quintero.
        </p>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={openChat}
            className="bg-brand-green text-white px-8 py-4 rounded-full text-lg font-sans font-bold hover:bg-brand-green-dark transition-all shadow-lg flex items-center gap-2"
          >
            Empezar ahora <ChevronRight size={20} />
          </button>
          <div className="flex items-center gap-3 px-4 py-2 bg-white/50 backdrop-blur rounded-full border border-white/20">
            <div className="flex -space-x-2">
              {[1, 2, 3].map(i => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/user${i}/100/100`} 
                  className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  alt="Paciente"
                  referrerPolicy="no-referrer"
                />
              ))}
            </div>
            <span className="text-xs font-sans font-semibold text-stone-500 uppercase tracking-tighter">
              +500 Pacientes Felices
            </span>
          </div>
        </div>
      </motion.div>
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        <div className="aspect-[3/4] rounded-[100px] overflow-hidden shadow-2xl relative z-10 border-4 border-brand-green/20">
          <img 
            src="https://lh3.googleusercontent.com/d/1nbWC5aCkqve3G3g5HFTIUPNpxlIz0it3" 
            className="w-full h-full object-cover"
            alt="Quiropráctica"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-brand-gold rounded-full -z-0 opacity-20 blur-3xl"></div>
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-green rounded-full -z-0 opacity-10 blur-3xl"></div>
      </motion.div>
    </div>
  </section>
);

const Services = () => {
  const conditions = [
    "Escoliosis", "Espolón calcáneo", "Displacía de cadera", "Ciática", 
    "Esguinces y desgarros", "Manguito rotador", "Dolor de rodilla", 
    "Hormigueo en extremidades", "Migraña", "Artrosis", "Ronquidos", 
    "Dolor de coxis", "Matriz y vejiga caída", "Niños descuajados", 
    "Fibromialgia", "Parálisis facial", "Túnel carpiano", "Vértigo", 
    "Hernias discales", "Mala postura"
  ];

  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light mb-4">Lo que <span className="italic">Tratamos</span></h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mb-6"></div>
          <p className="text-stone-600 font-sans max-w-2xl mx-auto">
            Terapias de descontracturación y ajustes quiroprácticos que corrigen desviaciones y desajustes en articulaciones, huesos y tendones.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {conditions.map((condition, i) => (
            <div key={i} className="flex items-center gap-2 p-4 bg-brand-cream rounded-xl border border-stone-100">
              <CheckCircle2 className="text-brand-green shrink-0" size={16} />
              <span className="text-sm font-sans font-medium text-stone-700">{condition}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DoctorSection = () => (
  <section id="doctor" className="py-24 bg-brand-cream">
    <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-16 items-center">
      <div className="order-2 md:order-1">
        <h2 className="text-5xl font-light mb-6">Dr. Luis <span className="italic">Quintero</span></h2>
        <p className="text-xl text-brand-green-dark font-medium mb-6 italic">Especialista en Quiropráctica y Salud Espinal</p>
        <div className="space-y-4 mb-8">
          <p className="text-stone-600 font-sans leading-relaxed">
            Con más de 15 años de experiencia, el Dr. Luis Quintero ha dedicado su carrera a ayudar a sus pacientes a recuperar su movilidad y calidad de vida.
          </p>
          <p className="text-stone-600 font-sans leading-relaxed">
            Su enfoque combina técnicas quiroprácticas tradicionales con los últimos avances en neurociencia espinal, asegurando un tratamiento seguro y efectivo para cada paciente.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-brand-gold" size={20} />
            <span className="text-sm font-sans font-semibold text-stone-700">Atención Personalizada</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-brand-gold" size={20} />
            <span className="text-sm font-sans font-semibold text-stone-700">Equipos de Vanguardia</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="text-brand-gold" size={20} />
            <span className="text-sm font-sans font-semibold text-stone-700">Resultados Comprobados</span>
          </div>
        </div>
      </div>
      <div className="order-1 md:order-2">
        <div className="relative">
          <div className="aspect-square rounded-full overflow-hidden border-8 border-white shadow-2xl">
            <img 
              src="https://lh3.googleusercontent.com/d/1jBL0Mnz0xFsYrss0C7E8iOXmTlatR7cX" 
              className="w-full h-full object-cover"
              alt="Dr. Luis Quintero"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white p-6 rounded-2xl shadow-xl border-b-4 border-brand-green">
            <p className="text-3xl font-bold text-brand-green-dark">15+</p>
            <p className="text-xs font-sans font-bold text-stone-500 uppercase tracking-widest">Años de Exp.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const ClinicGallery = () => {
  const images = [
    { src: "https://lh3.googleusercontent.com/d/1VrHuafTpjReTZ8MYuPNJkvKm3u1xW-HJ", alt: "Consultorio 1" },
    { src: "https://lh3.googleusercontent.com/d/12zjSUCjcwwPArFNBTTEfAD0sPPzsIeRm", alt: "Consultorio 2" },
    { src: "https://lh3.googleusercontent.com/d/1rRnyHVBrFRjLdgtef-TkFFD8TGsPvlJf", alt: "Consultorio 3" },
    { src: "https://lh3.googleusercontent.com/d/1pmCWnc2ASqssfcs6bxw7WQHjVKNg3Svu", alt: "Consultorio 4" },
  ];

  return (
    <section id="consultorio" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-light mb-4">Nuestro <span className="italic">Consultorio</span></h2>
          <div className="w-24 h-1 bg-brand-green mx-auto"></div>
          <p className="mt-6 text-stone-600 font-sans max-w-2xl mx-auto">
            Un espacio diseñado para tu tranquilidad y bienestar, equipado con la mejor tecnología para tu cuidado.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((img, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="aspect-[4/3] rounded-3xl overflow-hidden shadow-lg border border-stone-100"
            >
              <img 
                src={img.src} 
                alt={img.alt} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => (
  <section id="contacto" className="py-24 bg-brand-black text-white">
    <div className="max-w-7xl mx-auto px-8">
      <div className="grid md:grid-cols-3 gap-12">
        <div>
          <h2 className="text-4xl font-light mb-8">Nuestras <br /><span className="italic text-brand-gold">Sedes</span></h2>
          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <MapPin className="text-brand-green mt-1" size={24} />
              <div>
                <p className="font-sans font-bold text-lg">Sede Tocancipá</p>
                <p className="text-white/70 font-sans text-sm">
                  Calle 7 #7-05 segundo piso<br />
                  Diagonal al Banco BBVA<br />
                  <b>Lun, Mar, Mié, Vie:</b> 9am - 5pm<br />
                  <b>Sáb:</b> 9am - 12pm (Cita previa)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="text-brand-green mt-1" size={24} />
              <div>
                <p className="font-sans font-bold text-lg">Sede Ubaté</p>
                <p className="text-white/70 font-sans text-sm">
                  Calle 10 # 9-75 barrio Simón Bolívar<br />
                  Cerca del club de tejo de Anpiss<br />
                  <b>Jueves:</b> 9am - 4pm (Cita previa)
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="text-brand-green mt-1" size={24} />
              <div>
                <p className="font-sans font-bold text-lg">Atención Telefónica</p>
                <p className="text-white/70 font-sans text-sm">
                  <b>313 540 0492</b>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <form className="bg-white/5 backdrop-blur p-10 rounded-3xl border border-white/10 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-sans font-bold uppercase tracking-widest opacity-60">Nombre Completo</label>
                <input type="text" className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-brand-green transition-colors font-sans" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-sans font-bold uppercase tracking-widest opacity-60">Número de Celular</label>
                <input type="tel" className="w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-brand-green transition-colors font-sans" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-sans font-bold uppercase tracking-widest opacity-60">¿A qué sede desea asistir?</label>
              <select className="w-full bg-brand-black border border-white/20 rounded-xl px-4 py-3 outline-none focus:border-brand-green transition-colors font-sans">
                <option>Tocancipá</option>
                <option>Ubaté</option>
              </select>
            </div>
            <button 
              type="button"
              onClick={openChat}
              className="w-full bg-brand-green text-white py-4 rounded-xl font-sans font-bold text-lg hover:bg-brand-green-dark transition-all shadow-lg"
            >
              AGENDAR CITA PREVIA
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 bg-stone-900 text-white/40 text-center font-sans text-xs uppercase tracking-[0.2em]">
    <div className="max-w-7xl mx-auto px-8">
      <p>&copy; {new Date().getFullYear()} QuiroPower Cundinamarca. Todos los derechos reservados.</p>
      <p className="mt-2">Dr. Luis Quintero - Registro Médico Profesional</p>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-brand-olive">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <DoctorSection />
        <ClinicGallery />
        <Contact />
      </main>
      <Footer />
      <GloriaChat />
    </div>
  );
}
