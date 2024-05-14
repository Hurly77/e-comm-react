/* eslint-disable no-console */

import React, { Component, ErrorInfo } from 'react';

export const ErrorBoundaryContext = React.createContext(
  {} as ErrorBoundaryContextType,
);

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError(_Error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  reset() {
    console.log('reset');
    this.setState({ hasError: false });
  }

  render() {
    const value: ErrorBoundaryContextType = { resetBoundary: this.reset };

    return (
      <ErrorBoundaryContext.Provider value={value}>
        {this.state.hasError ? this.props.fallback : this.props.children}
      </ErrorBoundaryContext.Provider>
    );
  }
}

export default ErrorBoundary;
