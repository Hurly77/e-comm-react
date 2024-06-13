import AuthFormWrapper from "../components/AuthFormWrapper";
import CreateAccountForm from "../components/CreateAccountForm";

export default function CreateAccount({ isAdmin }: { isAdmin: boolean }) {
  return (
    <AuthFormWrapper title={`${isAdmin ? "Admin Sign Up" : "Sign Up"}`}>
      <CreateAccountForm isAdmin={isAdmin} />
    </AuthFormWrapper>
  );
}
