function ProfileBanner({ avatar }: { avatar?: string }) {
  return (
    <div className="w-full  relative bg-yellow-500 h-[300px]">
      <label
        htmlFor="drop"
        className="bg-gray-200   absolute right-5  bottom-[-72px] md:bottom-[-104px] rounded-full w-36 h-36 md:w-52 md:h-52"
      >
        <img src={avatar || "/user/avatar.png"} alt="avatar" className="rounded-full w-36 h-36 md:w-52 md:h-52" />
      </label>
    </div>
  );
}

export default ProfileBanner;
