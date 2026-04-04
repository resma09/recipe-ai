interface GlowButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
}

export default function GlowButton({ children, variant = 'primary', ...props }: GlowButtonProps) {
    const base = "px-6 py-3 rounded-full font-semibold transition-all duration-300 disabled:opacity-50";
    const variants = {
        primary: "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40",
        secondary: "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white",
    };
    return <button className={`${base} ${variants[variant]}`} {...props}>{children}</button>;
}