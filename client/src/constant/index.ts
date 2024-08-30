import {
  Camera,
  ChevronsRightLeft,
  ClapperboardIcon,
  Home,
  Mail,
  MapPin,
  Package,
  PackageCheckIcon,
  PackageOpenIcon,
  Phone,
  User,
  UserCog2Icon,
  Users,
} from "lucide-react";

export const FIRST_NAVBAR = [
  {
    name: "العسل ومشتقاته",
    link: "/search/honney",
    categorys: ["668826f564509924a3e46560"],
  },
  {
    name: "وصفات",
    link: "/search/desc",
    categorys: ["668826f564509924a3e46561"],
  },
  {
    name: "تداوي وتجميل",
    link: "/search/beaty",
    categorys: ["668826f564509924a3e46562"],
  },
];

export const SECOND_NAVBAR = [
  {
    link: "/about",
    name: "ساجا",
  },
  {
    link: "/contact-us",
    name: "تواصل معنا",
  },
];


export const CATEGORY = [
  {
    name: "العسل ومشتقاته",
    img: "/products/1.jpg",
  },
  {
    name: "وصفات",
    img: "/products/2.jpg",
  },
  {
    name: "تداوي وتجميل",
    img: "/products/3.jpg",
  },
];

export const SIDE_BAR_ADMIN = [
  {
    name: "Create Product",
    link: "/admin/create-product",
    icon: Package,
  },
  {
    name: "Users",
    link: "/admin/users",
    icon: Users,
  },
  {
    name: "Update Products",
    link: "/admin/update-product",
    icon: PackageCheckIcon,
  },
  {
    name: "Orders",
    link: "/admin/orders",
    icon: PackageOpenIcon,
  },
  {
    name: "Create Category",
    link: "/admin/create-category",
    icon: ClapperboardIcon,
  },
  {
    name: "Update Category",
    link: "/admin/update-category",
    icon: ChevronsRightLeft,
  },
  {
    name: "Banner",
    link: "/admin/banner",
    icon: Camera,
  },
];

export const BASE_URL = "/api/v1";

export const PROFILE_SIDE_BAR = [
  {
    name: "الملف",
    link: "/profile/me",
    icon: User,
  },
  {
    name: "تغير الملف",
    link: "/profile/update-profile",
    icon: UserCog2Icon,
  },
  {
    name: "الطلبيات",
    link: "/profile/orders",
    icon: Package,
  },
  {
    name: "رجوع إلى المتجر",
    link: "/",
    icon: Home,
  },
];

export const DEFAULT_HEADER = {
  "Content-Type": "application/json",
};

export const CONTACT = [
  {
    name: "address",
    icon: MapPin,
    value: "قلعة مكونة",
    href: "https://www.google.com/maps/place/31%C2%B015'36.2%22N+6%C2%B004'14.8%22W/@31.259552,-6.072453,19z/data=!4m4!3m3!8m2!3d31.2600556!4d-6.0707778?hl=en&entry=ttu&g_ep=EgoyMDI0MDgyNy4wIKXMDSoASAFQAw%3D%3D",
  },
  {
    name: "email",
    icon: Mail,
    value: "contact.sajacoop.com",
    href: "mailto:contact.sajacoop.com@gmail.com",
  },
  {
    name: "phone",
    icon: Phone,
    value: "+212 672-739084",
    href: "tel:+212672739084",
  },
];

export const QUESTIONS = [
  {
    name: "ما هو موقع ساجا؟",
    value: [
      "موقع ساجا هو منصة إلكترونية لبيع منتجات متجر ساجا للعسل والمنتجات الطبيعية في المغرب. الموقع يساعدك على اكتشاف منتجاتنا وشرائها بسهولة عبر الإنترنت، ويتميز بموثوقيته وأسعاره التنافسية.",
    ],
    id: "1",
  },
  {
    name: "لماذا يجب علي التسجيل؟",
    value: [
      "لا تحتاج للتسجيل للشراء من موقع ساجا، ولكن التسجيل يقدم لك العديد من الفوائد:",
      "1. يسهل علينا التواصل معك عند الحاجة.",
      "2. يبقيك على اطلاع بأحدث المنتجات والعروض.",
      "3. يبقيك على اطلاع بأحدث المنتجات والعروض.",
      "4. يمكنك من تقديم آرائك واقتراحاتك حول المنتجات.",
    ],
    id: "2",
  },
  {
    name: "كيف يمكنني الطلب من متجر ساجا؟",
    value: [
      "لطلب منتج من متجر ساجا، اتبع الخطوات التالية:",
      '1. اختر المنتج واضغط على "إضافة إلى السلة".',
      "2. سيتم إضافة المنتج إلى عربة التسوق الخاصة بك.",
      '3. اضغط على رابط "عربة التسوق" في أعلى الصفحة لمشاهدة محتوياتها.',
      "4. أكمل عملية الشراء بتأكيد الطلبية.",
    ],
    id: "3",
  },
  {
    name: "ما هي طرق الدفع المتاحة؟",
    value: [
      "حاليًا، يمكنك الدفع نقدًا عند استلام الطلب، وهذه الخدمة متاحة فقط داخل المغرب.",
    ],
    id: "4",
  },
  {
    name: "متى سأستلم طلبي من موقع ساجا؟",
    value: [
      "سيتصل بك فريق التوصيل قبل توصيل الطلب. يتم تسليم الطلبات عادةً في غضون 24 إلى 48 ساعة. يمكنك متابعة طلبك عبر الهاتف أو الواتساب.",
    ],
    id: "5",
  },
  {
    name: "ما هي المناطق التي تشملها خدمة التوصيل؟",
    value: [
      "نقوم بالتوصيل لجميع مدن المغرب باستخدام خدمات التوصيل الوطنية. تختلف تكاليف التوصيل بناءً على قيمة الطلب والمسافة، وتتراوح بين 30 و 60 درهمًا. يمكنك أيضًا الاستفادة من التوصيل المجاني أو استلام طلبك من المتجر مباشرة.",
    ],
    id: "6",
  },
];
