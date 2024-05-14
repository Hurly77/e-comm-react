// Do not add any imports or exports here. This file is declarative only.
// types exported from this file are available globally.

declare type UseStateProps<T> = [T, React.Dispatch<React.SetStateAction<T>>];
declare type ContainerT<T> = React.DetailedHTMLProps<React.HTMLAttributes<T>, T>;
declare type JSXElement = JSX.IntrinsicElements;
type ErrorBoundaryContextType = {
  resetBoundary: () => void;
};

declare type SessionContextProviderT = {
  children?: React.ReactNode;
};

declare type ErrorBoundaryProps = {
  fallback?: ReactNode;
  children?: ReactNode;
};

declare type ErrorBoundaryState = {
  hasError: boolean;
};
