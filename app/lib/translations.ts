/**
 * Translation System - English & Arabic (Qatar)
 */

export type Language = 'en' | 'ar';

export interface Translations {
  // Header & Navigation
  services: string;
  founders: string;
  team: string;
  press: string;
  about: string;
  bookService: string;
  exploreServices: string;
  
  // Hero Section
  trustedByCustomers: string;
  professionalHomeCleaning: string;
  yourTrustedPartner: string;
  verifiedProfessionals: string;
  sameDayService: string;
  transparentPricing: string;
  happyCustomers: string;
  avgRating: string;
  professionals: string;
  verifiedPartners: string;
  sameDayServiceAppointments: string;
  backgroundCheckedIdentity: string;
  bookServiceGetServedToday: string;
  
  // Services Section
  topRatedServices: string;
  professionalServices: string;
  homeCleaning: string;
  sameCleanerSameDay: string;
  cleaners: string;
  partners: string;
  laundry: string;
  freePickupDelivery: string;
  facilities: string;
  carWash: string;
  anytimeAnywhere: string;
  detailers: string;
  
  // Trust Section
  screenedAndTrusted: string;
  thoroughlyVet: string;
  customerSatisfaction: string;
  qualityGuarantee: string;
  satisfactionGuaranteed: string;
  support247: string;
  roundTheClock: string;
  insuredServices: string;
  fullInsuranceCoverage: string;
  
  // Partnership Section
  growYourBusiness: string;
  join1500Partners: string;
  increaseSales: string;
  reachThousands: string;
  organizeBookings: string;
  manageSchedule: string;
  trackPerformance: string;
  monitorMetrics: string;
  becomePartner: string;
  
  // Support Page
  support: string;
  contactUs: string;
  companyDetails: string;
  workingDetails: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  open24Hours: string;
  sendMessage: string;
  yourName: string;
  yourEmail: string;
  subject: string;
  message: string;
  send: string;
  getInTouch: string;
  needHelp: string;
  sendUsMessage: string;
  
  // Areas Page
  serviceAreas: string;
  areasInQatar: string;
  serve8Governorates: string;
  selectYourArea: string;
  areas: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Header & Navigation
    services: 'Services',
    founders: 'Founders',
    team: 'Team',
    press: 'Press',
    about: 'About',
    bookService: 'Book a Service',
    exploreServices: 'Explore Services',
    
    // Hero Section
    trustedByCustomers: 'Trusted by 10,000+ customers',
    professionalHomeCleaning: 'Professional Home Cleaning Service',
    yourTrustedPartner: 'Your trusted partner for premium home cleaning across Qatar. Same-day service with thoroughly screened professionals.',
    verifiedProfessionals: '100% verified professionals',
    sameDayService: 'Same-day service appointments',
    transparentPricing: 'Transparent pricing, no surprises',
    happyCustomers: 'Happy Customers',
    avgRating: 'Avg Rating',
    professionals: 'Professionals',
    verifiedPartners: 'Verified Partners',
    sameDayServiceAppointments: 'Same-day service appointments',
    backgroundCheckedIdentity: 'Background checked & identity verified',
    bookServiceGetServedToday: 'Book a Service & get served today',
    
    // Services Section
    topRatedServices: 'Top Rated On-Demand Services Near You',
    professionalServices: 'Professional home cleaning, laundry pickup and delivery, and mobile car wash services. Same day service available with free pickup and delivery. Trusted by thousands across Kuwait, Bahrain, UAE, Qatar, Oman, Saudi Arabia & Egypt.',
    homeCleaning: 'Home Cleaning',
    sameCleanerSameDay: 'Same Cleaner, Same Day, Same Time',
    cleaners: 'cleaners',
    partners: 'Partners',
    laundry: 'Laundry',
    freePickupDelivery: 'Free Pick up & Delivery',
    facilities: 'Facilities',
    carWash: 'Car Wash',
    anytimeAnywhere: 'Anytime Anywhere',
    detailers: 'detailers',
    
    // Trust Section
    screenedAndTrusted: 'Screened and Trusted Partners',
    thoroughlyVet: 'We thoroughly vet all professionals to ensure you get the highest quality service with complete peace of mind.',
    customerSatisfaction: 'Customer Satisfaction',
    qualityGuarantee: 'Quality Guarantee',
    satisfactionGuaranteed: 'Satisfaction guaranteed or your money back',
    support247: '24/7 Support',
    roundTheClock: 'Round-the-clock customer support available',
    insuredServices: 'Insured Services',
    fullInsuranceCoverage: 'Full insurance coverage for all services',
    
    // Partnership Section
    growYourBusiness: 'Grow Your Business With Us',
    join1500Partners: 'Join 1500+ professional partners and expand your reach across the Middle East',
    increaseSales: 'Increase Sales',
    reachThousands: 'Reach thousands of potential customers',
    organizeBookings: 'Organize Bookings',
    manageSchedule: 'Manage your schedule efficiently',
    trackPerformance: 'Track Performance',
    monitorMetrics: 'Monitor your business metrics',
    becomePartner: 'Become a Partner With Us',
    
    // Support Page
    support: 'Support',
    contactUs: 'Contact Us',
    companyDetails: 'Company Details',
    workingDetails: 'Working Details',
    address: 'Address: Golden Tower Building, 2 Office No.702, Al Khalidiya Street, 7TH Floor, Doha, Doha',
    phone: 'Phone: 3087 8775',
    email: 'Email',
    hours: 'Hours',
    open24Hours: 'Open 24 hours',
    sendMessage: 'Send a Message',
    yourName: 'Your Name',
    yourEmail: 'Your Email',
    subject: 'Subject',
    message: 'Message',
    send: 'Send',
    getInTouch: 'Get in Touch',
    needHelp: 'Need help? Send us a message and we\'ll respond as soon as possible.',
    sendUsMessage: 'Send us a message',
    
    // Areas Page
    serviceAreas: 'Service Areas',
    areasInQatar: 'Service Areas in Qatar',
    serve8Governorates: 'We serve 8 governorates and 100+ neighborhoods. Select your area to browse available services.',
    selectYourArea: 'Select your area to browse available services',
    areas: 'Areas',
  },
  
  ar: {
    // Header & Navigation
    services: 'الخدمات',
    founders: 'المؤسسون',
    team: 'الفريق',
    press: 'الصحافة',
    about: 'حول',
    bookService: 'احجز خدمة',
    exploreServices: 'استكشف الخدمات',
    
    // Hero Section
    trustedByCustomers: 'موثوق به من قبل أكثر من 10,000 عميل',
    professionalHomeCleaning: 'خدمة التنظيف المنزلي الاحترافي',
    yourTrustedPartner: 'شريكك الموثوق به لخدمات التنظيف المنزلي المتميزة في قطر. خدمة في نفس اليوم مع متخصصين تم فحصهم بعناية.',
    verifiedProfessionals: '100% متخصصون معتمدون',
    sameDayService: 'مواعيد خدمة في نفس اليوم',
    transparentPricing: 'أسعار شفافة بدون مفاجآت',
    happyCustomers: 'عملاء سعداء',
    avgRating: 'متوسط التقييم',
    professionals: 'متخصصون',
    verifiedPartners: 'شركاء معتمدون',
    sameDayServiceAppointments: 'مواعيد الخدمة في نفس اليوم',
    backgroundCheckedIdentity: 'تم فحص الخلفية والتحقق من الهوية',
    bookServiceGetServedToday: 'احجز خدمة واحصل على الخدمة اليوم',
    
    // Services Section
    topRatedServices: 'أفضل الخدمات المطلوبة بالقرب منك',
    professionalServices: 'خدمات التنظيف المنزلي الاحترافي، واستلام الغسيل والتوصيل، وخدمات غسيل السيارات المتنقلة. خدمة في نفس اليوم متاحة مع استلام وتوصيل مجاني. موثوق به من قبل آلاف الأشخاص في الكويت والبحرين والإمارات وقطر وعمان والمملكة العربية السعودية ومصر.',
    homeCleaning: 'تنظيف المنزل',
    sameCleanerSameDay: 'نفس العامل، نفس اليوم، نفس الوقت',
    cleaners: 'عمال تنظيف',
    partners: 'شركاء',
    laundry: 'الغسيل',
    freePickupDelivery: 'استلام وتوصيل مجاني',
    facilities: 'منشآت',
    carWash: 'غسيل السيارات',
    anytimeAnywhere: 'أي وقت وأي مكان',
    detailers: 'متخصصو تفاصيل',
    
    // Trust Section
    screenedAndTrusted: 'شركاء معتمدون وموثوقون',
    thoroughlyVet: 'نقوم بفحص جميع المتخصصين بعناية لضمان حصولك على أفضل خدمة برأس مال كامل.',
    customerSatisfaction: 'رضا العملاء',
    qualityGuarantee: 'ضمان الجودة',
    satisfactionGuaranteed: 'الرضا مضمون أو استرجاع أموالك',
    support247: 'دعم 24/7',
    roundTheClock: 'دعم العملاء على مدار الساعة',
    insuredServices: 'خدمات مؤمن عليها',
    fullInsuranceCoverage: 'تغطية تأمين كاملة لجميع الخدمات',
    
    // Partnership Section
    growYourBusiness: 'نمي أعمالك معنا',
    join1500Partners: 'انضم إلى أكثر من 1500 شريك احترافي وقسم وصولك في جميع أنحاء الشرق الأوسط',
    increaseSales: 'زيادة المبيعات',
    reachThousands: 'اصل إلى آلاف العملاء المحتملين',
    organizeBookings: 'تنظيم الحجوزات',
    manageSchedule: 'إدارة الجدول الزمني بكفاءة',
    trackPerformance: 'تتبع الأداء',
    monitorMetrics: 'مراقبة مقاييس عملك',
    becomePartner: 'كن شريكا معنا',
    
    // Support Page
    support: 'الدعم',
    contactUs: 'اتصل بنا',
    companyDetails: 'تفاصيل الشركة',
    workingDetails: 'تفاصيل العمل',
    address: 'العنوان: مبنى Golden Tower، المكتب رقم 702، شارع الخليدية، الطابق السابع، الدوحة',
    phone: 'الهاتف: 3087 8775',
    email: 'البريد الإلكتروني',
    hours: 'الساعات',
    open24Hours: 'مفتوح 24 ساعة',
    sendMessage: 'أرسل رسالة',
    yourName: 'اسمك',
    yourEmail: 'بريدك الإلكتروني',
    subject: 'الموضوع',
    message: 'الرسالة',
    send: 'إرسال',
    getInTouch: 'تواصل معنا',
    needHelp: 'هل تحتاج إلى مساعدة؟ أرسل لنا رسالة وسنرد عليك في أقرب وقت ممكن.',
    sendUsMessage: 'أرسل لنا رسالة',
    
    // Areas Page
    serviceAreas: 'مناطق الخدمة',
    areasInQatar: 'مناطق الخدمة في قطر',
    serve8Governorates: 'نخدم 8 محافظات و100+ حي. اختر منطقتك لتصفح الخدمات المتاحة.',
    selectYourArea: 'اختر منطقتك لتصفح الخدمات المتاحة',
    areas: 'المناطق',
  },
};

export function getTranslation(key: keyof Translations, language: Language): string {
  return translations[language][key];
}
