import { CONTACT, FIRST_NAVBAR } from "../constant";

const Footer = () => {
  return (
    <footer className="flex flex-col">
      <div className="flex flex-col md:flex-row justify-between  py-4 gap-y-4 px-3 md:p-5 bg-black text-white">
        <div className="flex flex-col gap-y-2 md:flex-1  ">
          <h1 className="text-2xl"> ساجا، متجركم المفضل !</h1>
          <p className="text-sm italic w-[300px]"> </p>
          <div className="flex flex-col gap-y-2">
            {CONTACT.map((contact) => (
              <a
                target="_blank"
                href={contact.href}
                key={contact.name}
                className="flex items-center gap-x-3"
              >
                <contact.icon className="size-8 p-1 rounded-md bg-green-950 " />
                {contact.value}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-2 md:flex-1 ">
          <h1 className="text-2xl">تصنفات</h1>
          <div className="flex flex-col gap-y-2">
            {FIRST_NAVBAR.map((item, i) => (
              <a
                className="hover:underline hover:text-yellow-500"
                key={i}
                href={item.link}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-2 md:flex-1 ">
          <h1 className="text-2xl">مهمتنا</h1>
          <p className="w-[300px]">
            نحن تعاونية فلاحية متخصصة في إنتاج مواد التجميل ومواد التغذية
            الطبيعية، نقدم لكم منتجات عالية الجودة مستخلصة من أفضل الموارد
            الطبيعية لتحقيق أقصى فائدة لصحتكم وجمالكم.
          </p>
        </div>
      </div>
      <hr />
      <div className="bg-black flex justify-center py-2 text-white">
        Copyright ©2024 All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
