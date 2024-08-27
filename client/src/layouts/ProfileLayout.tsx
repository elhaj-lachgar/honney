import ProfileSideBar from "../components/profile/ProfileSideBar";

function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative  ">
      
        <ProfileSideBar />
      
      <div className="flex items-center justify-center">
        {children}
      </div>
    </main>
  );
}

export default ProfileLayout;
