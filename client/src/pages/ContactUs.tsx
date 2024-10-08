import { useEffect, useRef } from "react";
import { CONTACT, QUESTIONS } from "../constant";
import { Helmet } from "react-helmet";
function ContactUs() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (ref) {
      ref.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <>
      <Helmet>
        <title>{"تواصل معنا"}</title>
        <meta name="description" content=" page of contact saja" />
      </Helmet>
      <main ref={ref} className="flex flex-col gap-y-5  w-full pb-5">
        <div className="h-[175px]  relative  bg-gray-50 md:h-[300px]  w-full flex items-center justify-center">
          <h1 className="font-bold text-2xl ">تواصل معنا</h1>
          <img
            src="/log/logo_2.png"
            className="w-36 absolute bottom-[-30px]"
            alt="logo"
          />
        </div>
        <div className="flex flex-col  gap-y-8 items-center mt-10">
          <h1 className="font-bold text-2xl">عناوين التواصل</h1>
          <div className="flex flex-wrap justify-center gap-5 w-11/12 md:w-9/12 lg:w-[700px] mx-auto">
            {CONTACT.map((contact) => (
              <a
                href={contact.href}
                target="_blank"
                dir="ltr"
                className="p-4 w-[200px] shadow-md flex border items-center rounded-md flex-col gap-y-2 justify-center"
                key={contact.name}
              >
                <contact.icon className="text-yellow-500" />
                <h1>{contact.value}</h1>
              </a>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-y-8 mt-8">
          <h1 className="font-bold text-2xl text-center">موقعنا على الخريطة</h1>
          <div className="p-5 border rounded-md w-11/12 md:w-9/12   mx-auto h-[300px] md:h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3410.579537501085!2d-6.0707749999999985!3d31.260060999999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDE1JzM2LjIiTiA2wrAwNCcxNC44Ilc!5e0!3m2!1sen!2sma!4v1721574609735!5m2!1sen!2sma"
              className=" rounded-md w-full h-full"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="google map"
            ></iframe>
          </div>
        </div>
        <div className="flex flex-col gap-y-8 mt-8 p-5  w-11/12 md:w-9/12   mx-auto h-[300px] md:h-[400px]">
          <h1 className="font-bold text-2xl text-center">
            الأسئلة المتداولة !
          </h1>
          <div className="flex-col flex gap-y-5 ">
            {QUESTIONS.map((question) => (
              <details key={question.id}>
                <summary> {question.name}</summary>
                {question.value.map((vl, index) => (
                  <p key={question.id.concat(index.toString())}>{vl}</p>
                ))}
              </details>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default ContactUs;
