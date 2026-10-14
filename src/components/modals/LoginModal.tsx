import React, { useState } from 'react';
import { X, ArrowRight, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useStudioStore } from '../../store/useStudioStore';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const { login } = useStudioStore();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setTimeout(() => {
      login(email.trim());
      setLoading(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-sm bg-[#121212] border border-[#262626] rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1A1A1A] border border-[#2A2A2A] text-[10px] font-mono text-[#A3A3A3] mb-2">
              <ShieldCheck className="w-3 h-3 text-[#10B981]" />
              <span>Studio Access Required</span>
            </div>
            <h2 className="text-xl font-bold text-white tracking-tight">Sign In to MockDrop</h2>
            <p className="text-xs text-[#A3A3A3]">Enter your email to unlock 3D Studio & Export</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#A3A3A3] hover:text-white hover:bg-[#262626] transition-colors"
          >
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Feature Unlocked Preview */}
        <div className="p-3 bg-[#171717] border border-[#262626] rounded-xl space-y-2 text-xs text-[#A3A3A3]">
          <div className="flex items-center gap-2 text-white font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Full 3D Stage & Hardware Matrix</span>
          </div>
          <div className="flex items-center gap-2 text-white font-medium">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
            <span>Ultra HD 4K Rasterizer with Zero Watermark</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-[11px] font-mono uppercase tracking-wider text-[#A3A3A3] mb-1.5 block">
              Work or Personal Email
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-[#A3A3A3] absolute left-3.5 top-3" strokeWidth={1.5} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="developer@company.com"
                className="w-full bg-[#171717] border border-[#262626] rounded-full pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-[#666] focus:outline-none focus:border-white transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-white text-black font-semibold text-xs hover:bg-[#E5E5E5] transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            <span>{loading ? 'Authenticating...' : 'Enter Studio'}</span>
            <ArrowRight className="w-4 h-4" strokeWidth={2} />
          </button>
        </form>

        <div className="pt-2 border-t border-[#262626] text-center">
          <p className="text-[11px] text-[#A3A3A3] leading-relaxed">
            Instant session. No password needed. Your 3D models and textures remain 100% private locally.
          </p>
        </div>
      </div>
    </div>
  );
};
