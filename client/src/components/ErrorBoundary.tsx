import { Component, type ReactNode, type ErrorInfo } from "react";

type Props = { children: ReactNode };
type State = { hasError: boolean; error: Error | null };

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-[#111210] p-4">
          <div className="bg-[#181917] border border-white/[0.07] rounded-2xl p-10 max-w-sm w-full text-center flex flex-col items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-xl">
              ⚠️
            </div>
            <h1 className="font-['Instrument_Serif'] text-[22px] text-[#f0efe8]">
              Something went wrong
            </h1>
            <p className="text-[13px] text-[#555] leading-relaxed">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#8aab5c] text-[#111210] text-[13px] font-medium px-6 py-2.5 rounded-[10px] hover:bg-[#9dbe6e] transition-colors"
            >
              Reload page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}