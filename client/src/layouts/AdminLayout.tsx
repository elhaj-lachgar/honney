
import AdminSideBar from "../components/admin/AdminSideBar";
function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main dir="ltr" className="relative lg:p-5 p-3">
      <AdminSideBar />
      <div className="w-full relative">{children}</div>
    </main>
  );
}

export default AdminLayout;
