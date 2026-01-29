'use client'

import { useState, useEffect } from 'react'
import { MessageCircle, ArrowDown, Instagram, Facebook, Linkedin, ArrowRight } from 'lucide-react'
import Header from './components/Header'

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
  const [cursorHovering, setCursorHovering] = useState(false)
  const [currentSection, setCurrentSection] = useState('home')

  // Cursor personalizado
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'A' || target.tagName === 'BUTTON' || target.closest('a') || target.closest('button')) {
        setCursorHovering(true)
      } else {
        setCursorHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Detectar sección actual
      const sections = ['home', 'como-funciona', 'concepto', 'planes', 'preguntas']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setCurrentSection(section)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const faqs = [
    {
      question: '¿Esto es terapia?',
      subtitle: 'No. Es acompañamiento reflexivo.',
      answer: 'No se realizan diagnósticos ni tratamientos clínicos. El espacio está orientado a comprender lo que atraviesas y darle sentido, no a patologizarlo.'
    },
    {
      question: '¿Cómo empiezo?',
      subtitle: 'Con una orientación breve.',
      answer: 'Inicias con una orientación inicial. Si lo deseas, puedes completar un test que ayuda a identificar los temas centrales desde donde comenzar.'
    },
    {
      question: '¿Qué recibo al iniciar?',
      subtitle: 'Una lectura clara de tu punto de partida.',
      answer: 'Recibes una lectura interpretativa que ordena lo que estás viviendo y propone una primera ruta de trabajo.'
    },
    {
      question: '¿Cómo funcionan los agentes de IA?',
      subtitle: 'Como apoyo, no como decisión.',
      answer: 'Se configura un agente de IA para acompañar tu proceso. Ayuda a ordenar ideas y reconocer patrones, sin decidir por ti ni sustituir el acompañamiento humano.'
    },
    {
      question: '¿Por qué no es un chat genérico?',
      subtitle: 'Porque no improvisa.',
      answer: 'Opera con reglas, límites y una estructura diseñada desde tu punto de partida, no con respuestas automáticas ni consejos universales.'
    },
    {
      question: '¿Quiénes acompañan el proceso?',
      subtitle: 'Personas, no sistemas.',
      answer: 'El acompañamiento lo realizan analistas con formación filosófica y experiencia en escucha y diálogo reflexivo.'
    }
  ]

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  // Logo (Isotipo negro)
  const logoSrc = "/logo-completo.png"

  return (
    <>
      {/* Cursor Personalizado */}
      <div
        className={`fixed pointer-events-none z-[9999] mix-blend-difference transition-transform duration-300 ease-out ${cursorHovering ? 'scale-150' : 'scale-100'}`}
        style={{
          left: cursorPosition.x - 10,
          top: cursorPosition.y - 10,
          width: 20,
          height: 20,
        }}
      >
        <div className="w-full h-full bg-[#2DAAE1] rounded-full opacity-80"></div>
      </div>

      {/* Sidebar Izquierda - Social - Adjusted z-index and opacity */}
      <div className="fixed left-6 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-8 opacity-80 hover:opacity-100 transition-opacity">
        <div className="flex flex-col gap-6 text-[#2C2C2C]">
          <a href="https://facebook.com" target="_blank" rel="noopener" className="hover:text-[#8A7767] transition-colors duration-300">
            <Facebook size={18} strokeWidth={1.5} />
          </a>
          <a href="https://instagram.com/el_escuchante_" target="_blank" rel="noopener" className="hover:text-[#8A7767] transition-colors duration-300">
            <Instagram size={18} strokeWidth={1.5} />
          </a>
          <a href="https://www.linkedin.com/company/el-escuchante/about/?viewAsMember=true" target="_blank" rel="noopener" className="hover:text-[#8A7767] transition-colors duration-300">
            <Linkedin size={18} strokeWidth={1.5} />
          </a>
        </div>
        <div className="w-px h-20 bg-[#2C2C2C]/20"></div>
        <span className="text-xs uppercase tracking-[0.3em] text-[#2C2C2C]/60 rotate-180" style={{ writingMode: 'vertical-rl' }}>
          Acompañamiento reflexivo
        </span>
      </div>

      <Header
        scrollToSection={scrollToSection}
        currentSection={currentSection}
        setMobileMenuOpen={setMobileMenuOpen}
        mobileMenuOpen={mobileMenuOpen}
        isScrolled={isScrolled}
      />

      {/* Full Screen Menu Overlay */}
      <div className={`fixed inset-0 bg-[#8A7767] z-40 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="h-full flex flex-col justify-center px-8 lg:px-20">
          <nav className="space-y-4">
            {[
              { id: 'home', label: 'Inicio' },
              { id: 'como-funciona', label: 'Cómo funciona' },
              { id: 'concepto', label: 'El concepto' },
              { id: 'planes', label: 'Planes' },
              { id: 'preguntas', label: 'Preguntas' }
            ].map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-4xl lg:text-6xl font-[family-name:var(--font-cormorant)] text-white hover:text-[#2C2C2C] transition-colors duration-300 border-b border-white/20 pb-4"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <span className="flex items-center justify-between">
                  {item.label}
                  <ArrowRight className="opacity-0 hover:opacity-100 transition-opacity" />
                </span>
              </button>
            ))}
          </nav>

          <div className="mt-16 flex gap-8 text-white/80 text-sm uppercase tracking-widest">
            <span>ES</span>
            <span className="text-white">/</span>
            <span>EN</span>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 lg:px-12 pt-20 relative overflow-hidden">
        {/* Background Element - z-0 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-5 pointer-events-none z-0">
          <div className="w-full h-full border border-[#8A7767] rounded-full animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute inset-10 border border-[#8A7767] rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
          <div className="absolute inset-20 border border-[#8A7767] rounded-full animate-[spin_10s_linear_infinite]"></div>
        </div>

        {/* Content - z-10 */}
        <div className="max-w-5xl mx-auto text-center relative z-10 mt-[3vh] md:mt-[6vh]">
          {/* Logo Grande Animado */}
          <div className="mb-8 relative inline-block group cursor-pointer">
            <div className="w-48 h-48 md:w-64 md:h-64 relative">
              <img
                src={logoSrc}
                alt="El Escuchante"
                className="w-full h-full object-contain transition-all duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-[#2DAAE1]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>
          </div>

          <h1 className="font-[family-name:var(--font-cormorant)] text-6xl md:text-8xl lg:text-9xl leading-[0.9] tracking-tight mb-6">
            Escuchar lo<br />
            <span className="text-[#8A7767] italic">que sientes</span>
          </h1>

          <p className="font-[family-name:var(--font-montserrat)] text-lg md:text-xl text-[#2C2C2C]/70 max-w-2xl mx-auto mb-12 leading-relaxed">
            Una lectura filosófica que convierte tu experiencia en una ruta clara de trabajo
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://wa.me/573138185479?text=Hola%2C%20quiero%20agendar%20un%20encuentro%20gratuito"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-medium bg-[#2C2C2C] text-[#F5EFE8] uppercase tracking-[0.15em] hover:bg-[#2DAAE1] transition-all duration-300 flex items-center gap-2 group hover-lift"
            >
              Agendar encuentro
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <button
              onClick={() => scrollToSection('como-funciona')}
              className="px-6 py-3 md:px-8 md:py-4 rounded-full text-sm md:text-base font-medium border border-[#2C2C2C] uppercase tracking-[0.15em] hover:bg-[#2C2C2C] hover:text-[#F5EFE8] transition-all duration-300 hover-lift"
            >
              Cómo funciona
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce z-10">
          <span className="text-xs uppercase tracking-[0.3em] text-[#8A7767]">Descubrir</span>
          <ArrowDown size={20} className="text-[#8A7767]" />
        </div>
      </section>

      {/* How It Works Section */}
      <section id="como-funciona" className="py-32 px-6 lg:px-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-xs uppercase tracking-[0.3em] text-[#2DAAE1] mb-4 block">Proceso</span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl lg:text-7xl mb-6">
              Cómo <span className="italic text-[#8A7767]">funciona</span>
            </h2>
            <p className="font-[family-name:var(--font-montserrat)] text-lg text-[#2C2C2C]/70 max-w-2xl mx-auto">
              Un algoritmo de escucha: lectura de sentido y ruta clara de trabajo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {[
              {
                num: '01',
                title: 'Orientación breve',
                time: '8–10 min',
                desc: 'Empezamos escuchando tu situación tal como está hoy. Un breve instrumento de reflexión opcional identifica qué te pesa y dónde empezar.',
                result: 'Un punto de partida claro y un primer paso definido.'
              },
              {
                num: '02',
                title: 'Lectura interpretativa',
                time: 'Ruta inicial',
                desc: 'Construimos una lectura que organiza tu experiencia desde preguntas filosóficas, no desde teorías cerradas.',
                result: 'Síntesis clara con foco y ruta inicial de trabajo.'
              },
              {
                num: '03',
                title: 'Continuidad acompañada',
                time: 'Encuentro humano',
                desc: 'Encuentros con acompañantes filosóficos formados en análisis reflexivo y diálogo.',
                result: 'Proceso acompañado con criterio y claridad interior.'
              }
            ].map((step, idx) => (
              <div key={idx} className="group relative">
                <div className="flex items-start justify-between mb-6">
                  <span className="font-[family-name:var(--font-cormorant)] text-5xl text-[#8A7767]/30 group-hover:text-[#2DAAE1] transition-colors duration-500">{step.num}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#8A7767] border border-[#8A7767]/30 px-3 py-1 rounded-full">{step.time}</span>
                </div>
                <h3 className="font-[family-name:var(--font-cormorant)] text-3xl mb-4 group-hover:translate-x-2 transition-transform duration-300">{step.title}</h3>
                <p className="font-[family-name:var(--font-montserrat)] text-[#2C2C2C]/70 leading-relaxed mb-6">
                  {step.desc}
                </p>
                <div className="border-t border-[#8A7767]/20 pt-4">
                  <span className="text-xs uppercase tracking-[0.2em] text-[#2DAAE1] block mb-2">Resultado</span>
                  <p className="text-sm text-[#2C2C2C]/80">{step.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Concept Section */}
      <section id="concepto" className="py-32 px-6 lg:px-12 bg-[#2C2C2C] text-[#F5EFE8] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_#2DAAE1_0%,_transparent_70%)]"></div>
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-20 items-center">
            <div className="text-center lg:text-right">
              <h3 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl leading-tight">
                No es terapia,<br />
                <span className="text-[#8A7767] italic">ni coaching.</span>
              </h3>
            </div>

            <div className="flex justify-center">
              <div className="w-64 h-64 border border-[#8A7767] rounded-full flex items-center justify-center relative animate-[spin_30s_linear_infinite]">
                <div className="absolute inset-4 border border-[#8A7767]/50 rounded-full animate-[spin_20s_linear_infinite_reverse]"></div>
                <span className="font-[family-name:var(--font-cormorant)] text-8xl opacity-20">¿</span>
              </div>
            </div>

            <div className="text-center lg:text-left">
              <h3 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl leading-tight">
                Es un espacio<br />
                <span className="text-[#8A7767] italic">alternativo.</span>
              </h3>
            </div>
          </div>

          <div className="mt-24 text-center max-w-3xl mx-auto">
            <p className="font-[family-name:var(--font-montserrat)] text-xl text-[#F5EFE8]/80 leading-relaxed mb-12">
              La filosofía no es solo teoría. Es una herramienta viva para desentrañar lo que nos pesa. Exploramos tus inquietudes desde una perspectiva existencial.
            </p>
            <button
              onClick={() => scrollToSection('planes')}
              className="px-10 py-4 border border-[#8A7767] text-[#8A7767] text-sm uppercase tracking-[0.15em] hover:bg-[#8A7767] hover:text-[#2C2C2C] transition-all duration-300 rounded-full"
            >
              Ver planes
            </button>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planes" className="py-32 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-xs uppercase tracking-[0.3em] text-[#2DAAE1] mb-4 block">Servicios</span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl lg:text-7xl mb-6">
              Nuestra <span className="italic text-[#8A7767]">oferta</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'ESENCIAL',
                price: '$30.000',
                period: 'COP / mes',
                desc: 'Orden para sostener tu proceso. Usas instrumentos de IA como apoyo.',
                features: [
                  'Ruta semanal clara, sin improvisación',
                  'Registro guiado de lo que aparece',
                  'Identificación de patrones relevantes',
                  'Límites definidos para continuar'
                ],
                cta: 'Activar Esencial',
                popular: false
              },
              {
                name: 'INTERPRETATIVO',
                price: '$50.000',
                period: 'COP / mes',
                desc: 'Comprender lo que te pasa para avanzar con sentido. Lectura de tu proceso.',
                features: [
                  'Lectura interpretativa de tu proceso',
                  'Síntesis clara de avances y cuidados',
                  'Ajustes de ruta cuando se estanca',
                  'Ejercicios reflexivos adaptados'
                ],
                cta: 'Activar Interpretativo',
                popular: true
              },
              {
                name: 'PRESENCIA',
                price: '$75.000',
                period: 'COP / sesión',
                desc: 'Un espacio humano para profundizar. Conversas con acompañantes filosóficos.',
                features: [
                  'Sesión de encuadre y comprensión',
                  'Sesión de trabajo centrada en ti',
                  'Delimitación del problema',
                  'Cupos limitados'
                ],
                cta: 'Solicitar cupo',
                popular: false
              }
            ].map((plan, idx) => (
              <div key={idx} className={`relative rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 ${plan.popular ? 'bg-[#2C2C2C] text-[#F5EFE8] border-2 border-[#2C2C2C]' : 'border border-[#8A7767]/20 hover:border-[#8A7767]'}`}>
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#2DAAE1] text-white px-4 py-1 rounded-full text-xs uppercase tracking-[0.15em] font-semibold">
                    Recomendado
                  </div>
                )}

                <h3 className="font-[family-name:var(--font-cormorant)] text-2xl mb-2">{plan.name}</h3>
                <p className="text-xs uppercase tracking-[0.15em] text-[#8A7767] mb-6">{plan.desc}</p>

                <div className="mb-6">
                  <span className="font-[family-name:var(--font-cormorant)] text-5xl">{plan.price}</span>
                  <span className="text-sm opacity-60 ml-2">{plan.period}</span>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-start gap-3 text-sm">
                      <div className="w-1.5 h-1.5 bg-[#8A7767] rounded-full mt-2 flex-shrink-0"></div>
                      <span className="opacity-80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href={`https://wa.me/573138185479?text=Hola%2C%20quiero%20${plan.popular ? 'activar' : 'info%20sobre'}%20el%20Plan%20${plan.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full px-6 py-4 text-center text-sm uppercase tracking-[0.15em] rounded-full transition-all duration-300 ${plan.popular ? 'bg-[#2DAAE1] text-white hover:bg-[#F5EFE8] hover:text-[#2C2C2C]' : 'border-2 border-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#F5EFE8]'}`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs uppercase tracking-[0.15em] text-[#2C2C2C]/70 mt-12">
            Incluye configuración inicial. Cancela cuando quieras.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 lg:px-12 bg-[#8A7767]">
        <div className="max-w-3xl mx-auto text-center text-[#F5EFE8]">
          <h3 className="font-[family-name:var(--font-cormorant)] text-4xl md:text-5xl lg:text-6xl mb-6">
            Agenda un encuentro gratuito
          </h3>
          <p className="font-[family-name:var(--font-montserrat)] text-lg text-[#F5EFE8]/80 mb-10 leading-relaxed">
            Un primer espacio para escuchar, ubicar tu situación y decidir con calma cómo continuar.
          </p>
          <a
            href="https://wa.me/573138185479?text=Hola%2C%20quiero%20agendar%20un%20encuentro%20gratuito"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-10 py-4 bg-[#2C2C2C] text-[#F5EFE8] text-sm uppercase tracking-[0.15em] hover:bg-[#F5EFE8] hover:text-[#2C2C2C] transition-all duration-300 rounded-full"
          >
            Comenzar ahora
          </a>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="preguntas" className="py-32 px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-xs uppercase tracking-[0.3em] text-[#2DAAE1] mb-4 block">Claridad</span>
            <h2 className="font-[family-name:var(--font-cormorant)] text-5xl md:text-6xl lg:text-7xl mb-6">
              Preguntas <span className="italic text-[#8A7767]">frecuentes</span>
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`border transition-all duration-500 ${activeFaq === index ? 'border-[#8A7767] bg-[#8A7767]/5' : 'border-[#8A7767]/20 hover:border-[#8A7767]/50'}`}
              >
                <button
                  className="w-full text-left p-6 md:p-8 flex items-start justify-between gap-4"
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                >
                  <div className="flex-1">
                    <h4 className="font-[family-name:var(--font-cormorant)] text-2xl mb-2">{faq.question}</h4>
                    <p className="font-[family-name:var(--font-montserrat)] text-xs uppercase tracking-[0.15em] text-[#8A7767]">
                      {faq.subtitle}
                    </p>
                  </div>
                  <div className={`w-8 h-8 border border-[#8A7767] rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${activeFaq === index ? 'rotate-45 bg-[#8A7767] text-white' : ''}`}>
                    <span className="text-xl leading-none">+</span>
                  </div>
                </button>

                <div className={`overflow-hidden transition-all duration-500 ${activeFaq === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6 md:px-8 md:pb-8">
                    <p className="font-[family-name:var(--font-montserrat)] text-[#2C2C2C]/80 leading-relaxed">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#2C2C2C] text-[#F5EFE8] py-20 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <img src={logoSrc} alt="El Escuchante" className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h2 className="font-[family-name:var(--font-cormorant)] text-3xl md:text-4xl mb-6">¿Tienes dudas?</h2>
            <a
              href="mailto:espacioelescuchante@gmail.com"
              className="inline-block px-8 py-3 border border-[#F5EFE8]/40 text-[#F5EFE8] text-sm uppercase tracking-[0.15em] hover:bg-[#F5EFE8] hover:text-[#2C2C2C] transition-all duration-300 rounded-full"
            >
              espacioelescuchante@gmail.com
            </a>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-12 border-t border-[#F5EFE8]/10">
            <span className="text-xs uppercase tracking-[0.15em] text-[#F5EFE8]/70">
              © 2024 El Escuchante
            </span>

            <div className="flex items-center gap-8">
              <a href="https://instagram.com/el_escuchante_" target="_blank" rel="noopener" className="text-xs uppercase tracking-[0.15em] text-[#F5EFE8]/70 hover:text-[#F5EFE8] transition-colors">
                Instagram
              </a>
              <a href="https://wa.me/573138185479" target="_blank" rel="noopener" className="text-xs uppercase tracking-[0.15em] text-[#F5EFE8]/70 hover:text-[#F5EFE8] transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp */}
      <a
        href="https://wa.me/573138185479"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-[#2DAAE1] text-white rounded-full flex items-center justify-center hover:bg-[#2C2C2C] transition-all duration-300 shadow-lg hover:scale-110"
      >
        <MessageCircle size={24} />
      </a>
    </>
  )
}
