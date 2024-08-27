import { Helmet } from "react-helmet";

function About() {
  return (
    <>
      <Helmet>
        <title>{"ساجا"}</title>
        <meta name="description" content=" page of contact saja"/>
      </Helmet>
      <main className="flex flex-col gap-y-4   bg-gray-50">
        <div className="h-[175px]  relative md:h-[300px]  w-full flex items-center justify-center">
          <img
            src="/log/logo_2.png"
            className="w-36 absolute bottom-[-30px]"
            alt="logo"
          />
        </div>
        <div
          dir="ltr"
          className="flex flex-col lg:flex-row gap-y-3 relative p-4  justify-center "
        >
          <div className="flex-1 p-5 text-yellow-500 gap-y-4 flex z-30 flex-col justify-center items-center ">
            <h1 className="text-4xl font-bold text-center ">
              ساجا، متجركم المفضل !
            </h1>
            <p className="w-11/12 text-lg md:w-[400px] text-center mx-auto text-gray-600">
              نحن تعاونية فلاحية متخصصة في إنتاج مواد التجميل ومواد التغذية
              الطبيعية، نقدم لكم منتجات عالية الجودة مستخلصة من أفضل الموارد
              الطبيعية لتحقيق أقصى فائدة لصحتكم وجمالكم.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}

export default About;
