import AuthFormWrapper from "../components/AuthFormWrapper";
import CreateAccountForm from "../components/CreateAccountForm";

export default function CreateAccount({ isAdmin }: { isAdmin: boolean }) {
  return (
    <AuthFormWrapper title={`Create ${isAdmin ? "Admin" : ""} Account`}>
      <CreateAccountForm isAdmin={isAdmin} />
    </AuthFormWrapper>
  );
}
