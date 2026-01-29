'use client'

import { useState, useEffect } from 'react'

export default function Header({
    scrollToSection,
    currentSection,
    setMobileMenuOpen,
    mobileMenuOpen,
    isScrolled
}: {
    scrollToSection: (id: string) => void,
    currentSection: string,
    setMobileMenuOpen: (open: boolean) => void,
    mobileMenuOpen: boolean,
    isScrolled: boolean
}) {
    const logoSrc = "/logo-completo-sepia.png"

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${isScrolled ? 'bg-[#F5EFE8]/95 backdrop-blur-md py-4' : 'bg-transparent py-4 md:py-6'}`}>
            <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
                {/* Logo */}
                <button onClick={() => scrollToSection('home')} className="flex items-center gap-3 group">
                    <img
                        src={logoSrc}
                        alt="El Escuchante"
                        className="w-10 h-10 object-contain transition-transform duration-500 group-hover:rotate-12"
                    />
                    <span className="font-[family-name:var(--font-cormorant)] text-[22px] md:text-2xl tracking-wide">
                        <span className="text-[#8A7767]">el</span> escuchante
                    </span>
                </button>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex items-center gap-8 xl:gap-10">
                    {['home', 'como-funciona', 'planes', 'preguntas'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item)}
                            className="relative text-base md:text-[16px] lg:text-[18px] font-medium hover:text-[#8A7767] transition-colors group uppercase tracking-[0.15em]"
                        >
                            {item === 'home' ? 'Inicio' : item === 'como-funciona' ? 'Cómo funciona' : item === 'planes' ? 'Planes' : 'FAQ'}
                            <span className={`absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#2DAAE1] rounded-full transition-all duration-300 ${currentSection === item ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}></span>
                        </button>
                    ))}
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4 md:gap-6">
                    <a
                        href="https://wa.me/573144459170"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hidden md:block px-6 py-2.5 bg-[#2DAAE1] text-white text-xs uppercase tracking-[0.15em] hover:bg-[#2C2C2C] transition-all duration-300 rounded-full hover-lift"
                    >
                        Contactar
                    </a>

                    {/* Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center relative z-20"
                        aria-label="Menu"
                    >
                        <div className="relative w-6 h-5">
                            <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-2 rotate-45' : 'top-0'}`}></span>
                            <span className={`absolute left-0 top-2 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                            <span className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${mobileMenuOpen ? 'top-2 -rotate-45' : 'top-4'}`}></span>
                        </div>
                    </button>
                </div>
            </nav>
        </header>
    )
}
