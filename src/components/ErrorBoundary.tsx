import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background p-4 text-foreground">
          <div className="max-w-md space-y-4 rounded-lg border bg-card p-6 shadow-lg">
            <h1 className="text-2xl font-bold text-destructive">
              Something went wrong
            </h1>
            <p className="text-muted-foreground">
              We're sorry, but an error occurred while rendering this page.
            </p>
            <div className="mt-4 rounded bg-muted p-4 font-mono text-xs text-muted-foreground overflow-auto max-h-48">
              {this.state.error?.toString()}
            </div>
            <button
              className="mt-4 rounded bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
