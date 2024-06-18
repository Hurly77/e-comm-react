export interface StripeElementProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel?: () => void;
  setToDefault?: (boolean: boolean) => void;
  btnText?: string;
  isLoading?: boolean;
  children?: React.ReactNode;
}
