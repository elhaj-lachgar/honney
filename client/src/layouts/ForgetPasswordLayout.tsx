import StepPasswordForget from "../components/StepPasswordForget";

function ForgetPasswordLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col bg-gray-100 h-screen justify-center items-center gap-y-">
      <StepPasswordForget />
      {children}
    </main>
  );
}

export default ForgetPasswordLayout;
