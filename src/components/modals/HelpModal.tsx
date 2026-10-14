import React from 'react';
import { X, HelpCircle, MousePointer, Image, Download, Shield } from 'lucide-react';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      q: 'Bagaimana cara mengganti gambar layar perangkat?',
      a: 'Buka Studio, klik tab "Screen" di sidebar kanan, lalu drag & drop screenshot Anda atau klik untuk memilih file dari komputer. Anda juga bisa memilih mode Cover atau Fit.',
      icon: Image,
    },
    {
      q: 'Bagaimana kontrol interaksi kamera 3D?',
      a: 'Gunakan Klik Kiri + Geser mouse untuk memutar sudut pandang (Orbit), Klik Kanan + Geser untuk menggeser posisi (Pan), dan Scroll Wheel untuk Zoom In/Out.',
      icon: MousePointer,
    },
    {
      q: 'Apakah gambar saya diunggah ke server?',
      a: 'Tidak sama sekali. MockDrop berjalan 100% Client-Side. Seluruh proses pembuatan tekstur dan rendering WebGL Three.js diproses langsung di memori browser Anda demi menjaga kerahasiaan desain.',
      icon: Shield,
    },
    {
      q: 'Bagaimana cara ekspor gambar transparan?',
      a: 'Buka tab "Scene", pilih background "Transparent (Figma/Canva)", lalu tekan tombol "Export Showcase" di header dan pilih format PNG.',
      icon: Download,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-[#121212] border border-[#262626] rounded-2xl overflow-hidden p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#171717] border border-[#262626] flex items-center justify-center text-white">
              <HelpCircle className="w-4 h-4" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white tracking-tight">Help & Documentation</h2>
              <p className="text-xs text-[#A3A3A3]">Panduan cepat penggunaan MockDrop 3D Studio</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#A3A3A3] hover:text-white hover:bg-[#262626] transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
          {faqs.map((faq, idx) => {
            const Icon = faq.icon;
            return (
              <div key={idx} className="p-4 rounded-xl border border-[#262626] bg-[#171717]">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[#262626] text-white shrink-0 mt-0.5">
                    <Icon className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1.5">{faq.q}</h3>
                    <p className="text-xs text-[#A3A3A3] leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
