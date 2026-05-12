import { createContext, useContext, useState } from 'react'

const LangContext = createContext()

export const translations = {
  ID: {
    nav: { home: 'Beranda', work: 'Portofolio', pricing: 'Harga', contact: 'Kontak', quote: 'Minta Penawaran →' },
    hero: {
      badge: '🇮🇩 Studio Web Premium Indonesia',
      title1: 'Kami membangun website',
      title2: 'yang menghasilkan.',
      sub: 'Website yang memukau, interaktif, dan super cepat — membuat brand Anda tak terlupakan. Dari konsep hingga live dalam hitungan hari.',
      cta1: 'Lihat Portofolio ↓', cta2: '💬 WhatsApp Kami',
      stats: [['1100+','Website Terkirim'],['98%','Kepuasan Klien'],['4×','Peningkatan Konversi'],['5★','Rating Rata-rata']],
    },
    about: {
      label: 'Tentang Kami', scroll: 'Scroll',
      title1: 'Kami tidak hanya membangun website.', title2: 'Kami membangun mesin pertumbuhan.',
      p1: 'websitestudio.id adalah studio desain web boutique berbasis di Indonesia, menciptakan pengalaman digital berkinerja tinggi untuk brand yang ingin tampil beda. Setiap piksel disengaja. Setiap interaksi dirancang untuk konversi.',
      p2: 'Dari profil korporat yang elegan hingga platform e-commerce yang kompleks — kami menangani segalanya mulai dari strategi dan desain hingga pengembangan dan peluncuran. Cepat. Harga wajar. Hasil luar biasa.',
      pills: ['Desain Kustom','Mobile First','Siap SEO','Waktu Muat Cepat','Integrasi CMS','Animasi Scroll','Setup Analytics','Widget WhatsApp'],
      why: [
        { icon:'⚡', title:'Dijamin Cepat', desc:'Landing page dalam 1–2 hari. Website lengkap dalam 3–7 hari. Kami bergerak cepat tanpa mengorbankan kualitas.' },
        { icon:'🎨', title:'100% Kustom', desc:'Nol template. Setiap situs dirancang dari kanvas kosong, dibangun khusus untuk brand Anda.' },
        { icon:'📈', title:'Dibangun untuk Konversi', desc:'Rapih saja tidak cukup. Kami mengoptimalkan setiap layout, CTA, dan alur untuk hasil bisnis nyata.' },
        { icon:'🛠', title:'Tim Full-Stack', desc:'Desain, frontend, backend, SEO — semua dalam satu tim. Satu kontak, end-to-end.' },
        { icon:'💬', title:'Selalu Bisa Dihubungi', desc:'Chat langsung via WhatsApp. Tidak perlu menunggu berjam-jam untuk balasan.' },
        { icon:'🔒', title:'Dukungan 30 Hari', desc:'Setiap proyek mencakup dukungan pasca-peluncuran. Kami ada untuk Anda bahkan setelah situs live.' },
      ],
    },
    testi: { label: 'Testimoni', title: 'Dari klien kami' },
    marqueeItems: ['Landing Page','Toko E-commerce','Profil Perusahaan','Platform SaaS','Sistem Booking','Website Restoran','Portal Properti','Website Portofolio','Halaman Event','Digital Marketing'],
    cta: { label: 'Siap?', title1: 'Ayo buat', title2: 'website impianmu.', sub: 'Kirim pesan dan kami akan langsung jadwalkan sesi konsultasi gratis dan penawaran — dalam kurang dari satu jam.', btn1: 'Mulai Proyek →', btn2: 'Lihat Harga' },
    work: {
      label: 'Portofolio', title1: 'Site yang sudah', title2: 'kami bangun & luncurkan',
      sub: 'Setiap proyek dirancang dari awal — tidak ada template, tidak ada jalan pintas. Klik kartu untuk melihat demo.',
      filters: [['all','Semua'],['ecommerce','E-commerce'],['corporate','Korporat'],['fnb','F&B'],['tech','Tech / SaaS'],['creative','Kreatif'],['events','Event'],['realestate','Properti']],
      cta: 'Punya proyek? Ayo ngobrol.', btn1: 'Mulai Proyek →', btn2: '💬 Chat di WhatsApp',
      modalBtn: 'Mulai Proyek Serupa →', upload: 'Upload screen recording di sini',
    },
    pricing: {
      label: 'Harga', title: 'Harga yang simpel dan jujur.',
      sub: 'Semua paket termasuk optimasi mobile, setup hosting cepat, dan dukungan 30 hari pasca-peluncuran. Tidak ada biaya tersembunyi.',
      toggle1: 'Retainer Bulanan', toggle2: 'Tahunan', save: 'Hemat 20%',
      plans: [
        { tier:'Pemula', name:'Landing Page', period:'pembayaran sekali · selesai 3–5 hari', btn:'Mulai Sekarang',
          features:['1 halaman responsif penuh','Hingga 6 seksi kustom','Formulir kontak + tombol WhatsApp','Animasi scroll & efek hover','Setup metadata SEO','Integrasi Google Analytics','1 putaran revisi','Dukungan 14 hari pasca-peluncuran'] },
        { tier:'Profesional', name:'Website Perusahaan', period:'pembayaran sekali · selesai 7–10 hari', btn:'Mulai Sekarang',
          features:['Hingga 8 halaman kustom penuh','CMS / panel admin untuk edit mudah','Animasi scroll lanjutan','Bagian blog atau berita','Widget chat WhatsApp','Google Analytics + Search Console','3 putaran revisi','Dukungan 30 hari pasca-peluncuran','Konsultasi domain + hosting'] },
        { tier:'Premium', name:'Platform Lengkap', period:'berdasarkan cakupan proyek', btn:'Hubungi Kami',
          features:['E-commerce / sistem pemesanan','Payment gateway (Midtrans, Xendit)','Backend & database kustom','Dashboard pengguna / portal member','Animasi 3D / WebGL lanjutan','Integrasi API','Revisi tak terbatas','Dukungan dedikasi 3 bulan','Pengiriman prioritas'] },
      ],
      guarantee: { title:'Garansi Kepuasan 100%', desc:'Jika Anda tidak puas dengan mockup pertama, kami akan merevisinya sepenuhnya — gratis. Kami tidak meminta pembayaran penuh sampai Anda menyetujui desain.' },
      addonsTitle: 'Add-on Opsional',
      addons: [
        { icon:'🌐', name:'Domain + Hosting', price:'Rp 500rb / thn', desc:'Kami setup dan kelola domain serta hosting Anda selama setahun.' },
        { icon:'🔍', name:'Paket SEO', price:'Rp 1,5jt / bln', desc:'Optimasi kata kunci bulanan, konten, dan strategi backlink.' },
        { icon:'📸', name:'Pembuatan Konten', price:'Rp 800rb / set', desc:'Panduan copywriting profesional dan fotografi produk.' },
        { icon:'🔧', name:'Maintenance Bulanan', price:'Rp 500rb / bln', desc:'Update, patch keamanan, backup, dan edit konten kecil.' },
        { icon:'🈵', name:'Bilingual (EN + ID)', price:'Rp 1jt flat', desc:'Situs lengkap dalam Bahasa Indonesia dan Inggris dengan pemilih bahasa.' },
        { icon:'🚀', name:'Optimasi Kecepatan', price:'Rp 750rb flat', desc:'Audit Core Web Vitals, kompresi gambar, dan setup lazy loading.' },
        { icon:'📱', name:'PWA / Seperti App', price:'Rp 1,2jt flat', desc:'Ubah situs Anda menjadi progressive web app yang bisa diinstall.' },
        { icon:'📧', name:'Setup Email Marketing', price:'Rp 900rb flat', desc:'Integrasi Mailchimp / Brevo dengan template email kustom.' },
      ],
      faqTitle: 'Pertanyaan yang Sering Diajukan',
      faqs: [
        { q:'Bagaimana cara memulai?', a:'Cukup kirim pesan ke WhatsApp kami atau isi formulir kontak. Kami akan jadwalkan panggilan discovery 30 menit gratis untuk memahami proyek Anda.' },
        { q:'Bagaimana cara pembayaran?', a:'Kami menerima transfer bank (BCA, Mandiri, BRI), GoPay, OVO, dan QRIS. DP 50% di awal, sisa 50% setelah persetujuan desain final.' },
        { q:'Bisakah saya lihat mockup sebelum bayar?', a:'Ya! Kami menyediakan konsep desain / mockup setelah DP 50%. Jika tidak puas dengan konsep awal, kami akan merevisinya tanpa biaya tambahan.' },
        { q:'Bagaimana jika saya sudah punya domain dan hosting?', a:'Tidak masalah. Kami bisa deploy ke domain dan hosting Anda yang sudah ada.' },
        { q:'Bisakah saya update website sendiri setelah launch?', a:'Untuk paket Profesional dan Premium, ya — kami menyertakan CMS yang memungkinkan Anda memperbarui konten tanpa menyentuh kode.' },
        { q:'Apakah Anda melayani klien di luar Jakarta?', a:'Tentu. Kami melayani klien di seluruh Indonesia dan mancanegara. Semua komunikasi via WhatsApp, Zoom, atau email.' },
        { q:'Bagaimana jika butuh perubahan setelah situs live?', a:'Setiap paket mencakup dukungan 14–30 hari pasca-peluncuran. Setelahnya bisa berlangganan add-on Maintenance Bulanan.' },
      ],
      ctaSub1:'Masih bingung paket mana yang tepat?', ctaSub2:'Kami siap memberikan rekomendasi personal — gratis, tanpa kewajiban.', ctaBtn:'Tanya di WhatsApp',
    },
    contact: {
      label:'Kontak', title1:'Mari bangun sesuatu yang', title2:'hebat bersama.',
      meta:[
        { icon:'💬', label:'WhatsApp', value:'+62 812-3456-7890 · Chat kapan saja' },
        { icon:'📧', label:'Email', value:'hello@websitestudio.id' },
        { icon:'⏱️', label:'Waktu Respons', value:'Biasanya di bawah 60 menit (Sen–Sab)' },
        { icon:'🌏', label:'Lokasi', value:'Jakarta, Indonesia · Melayani klien di seluruh dunia' },
        { icon:'📅', label:'Konsultasi Gratis', value:'Konsultasi 30 menit — tanpa kewajiban' },
      ],
      testiTitle:'Kata klien kami',
      cardTitle:'Mulai percakapan',
      cardSub:'Cara tercepat menghubungi kami adalah WhatsApp. Atau isi formulir di bawah dan kami akan membalas via WhatsApp atau email.',
      waBtn:'Chat di WhatsApp — kami balas cepat!',
      orDivider:'atau kirim brief singkat',
      fields:{ name:'Nama Anda *', namePh:'Budi Santoso', email:'Email', emailPh:'hello@perusahaan.com', service:'Apa yang Anda butuhkan?', servicePh:'Pilih layanan…', budget:'Kisaran Anggaran', budgetPh:'Pilih kisaran…', message:'Ceritakan proyek Anda', messagePh:'Deskripsikan bisnis Anda, kebutuhan, inspirasi, timeline…' },
      services:['Landing Page','Website Perusahaan (multi halaman)','Toko E-commerce','Sistem Booking / Reservasi','Website Portofolio','SaaS / App Landing Page','Redesign Website','Lainnya / Belum yakin'],
      budgets:['Di bawah Rp 3jt','Rp 3jt – 8jt','Rp 8jt – 20jt','Di atas Rp 20jt','Belum yakin'],
      submitBtn:'Kirim via WhatsApp →',
      successTitle:'Pesan terkirim ke WhatsApp!', successSub:'Kami akan menghubungi Anda dalam 60 menit. Cek WhatsApp Anda sekarang.',
      locationLabel:'Jakarta, Indonesia · Sen–Sab 09.00–21.00 WIB',
      intro:'Baik punya brief yang jelas atau hanya ide kasar — kami ingin mendengarnya. Kebanyakan pertanyaan mendapat balasan dalam 60 menit saat jam kerja.',
    },
    footer: { copy:'© 2025 websitestudio.id · Hak cipta dilindungi · Jakarta, Indonesia' },
  },
  EN: {
    nav: { home: 'Home', work: 'Work', pricing: 'Pricing', contact: 'Contact', quote: 'Get a Quote →' },
    hero: {
      badge: '🇮🇩 Indonesia\'s Premium Web Studio',
      title1: 'We build websites', title2: 'that convert.',
      sub: 'Stunning, interactive, blazing-fast websites that make your brand impossible to ignore. From concept to live — in days, not months.',
      cta1: 'See Our Work ↓', cta2: '💬 WhatsApp Us',
      stats: [['1100+','Websites Delivered'],['98%','Client Satisfaction'],['4×','Conversion Lift'],['5★','Average Rating']],
    },
    about: {
      label: 'About Us', scroll: 'Scroll',
      title1: 'We don\'t just build websites.', title2: 'We build growth engines.',
      p1: 'websitestudio.id is a boutique web design studio based in Indonesia, crafting high-performance digital experiences for brands that want to stand out. Every pixel is intentional. Every interaction is designed to convert.',
      p2: 'From sleek corporate profiles to complex e-commerce platforms — we handle everything from strategy and design to development and launch. Fast turnaround. Fair pricing. Exceptional results.',
      pills: ['Custom Design','Mobile First','SEO Ready','Fast Load Times','CMS Integration','Scroll Animations','Analytics Setup','WhatsApp Widget'],
      why: [
        { icon:'⚡', title:'Delivered Fast', desc:'Landing pages in 1–2 days. Full sites in 3–7 days. We move quickly without cutting corners.' },
        { icon:'🎨', title:'Truly Custom', desc:'Zero templates. Every site is designed from a blank canvas, built specifically for your brand.' },
        { icon:'📈', title:'Built to Convert', desc:'Beautiful isn\'t enough. We optimize every layout, CTA, and flow for real business results.' },
        { icon:'🛠', title:'Full-Stack Team', desc:'Design, frontend, backend, SEO — all under one roof. One point of contact, end-to-end.' },
        { icon:'💬', title:'Always Reachable', desc:'Chat with us directly on WhatsApp. No ticket queues, no waiting days for a reply.' },
        { icon:'🔒', title:'30-Day Support', desc:'Every project includes post-launch support. We\'re with you even after the site goes live.' },
      ],
    },
    testi: { label: 'Testimonials', title: 'What clients say' },
    marqueeItems: ['Landing Pages','E-commerce Stores','Company Profiles','SaaS Platforms','Booking Systems','Restaurant Sites','Real Estate Portals','Portfolio Sites','Event Pages','Digital Marketing'],
    
    cta: { label: 'Ready?', title1: 'Let\'s build something', title2: 'extraordinary.', sub: 'Drop us a message and we\'ll come back with a free strategy session and quote — usually within the hour.', btn1: 'Start a Project →', btn2: 'View Pricing' },
    work: {
      label: 'Portfolio', title1: 'Sites we\'ve', title2: 'built & launched',
      sub: 'Every project is designed from scratch — no templates, no shortcuts. Click any card to see the full demo.',
      filters: [['all','All'],['ecommerce','E-commerce'],['corporate','Corporate'],['fnb','F&B'],['tech','Tech / SaaS'],['creative','Creative'],['events','Events'],['realestate','Real Estate']],
      cta: 'Have a project in mind? Let\'s talk.', btn1: 'Start a Project →', btn2: '💬 Chat on WhatsApp',
      modalBtn: 'Start a Similar Project →', upload: 'Upload your screen recording here',
    },
    pricing: {
      label: 'Pricing', title: 'Simple, honest pricing.',
      sub: 'All packages include mobile optimization, fast hosting setup, and 30-day post-launch support. No hidden fees. No surprises.',
      toggle1: 'Monthly Retainer', toggle2: 'Annual', save: 'Save 20%',
      plans: [
        { tier:'Starter', name:'Landing Page', period:'one-time payment · delivered in 3–5 days', btn:'Get Started',
          features:['1-page fully responsive design','Up to 6 custom sections','Contact form + WhatsApp button','Scroll animations & hover effects','SEO metadata setup','Google Analytics integration','1 round of revisions','14-day post-launch support'] },
        { tier:'Professional', name:'Company Website', period:'one-time payment · delivered in 7–10 days', btn:'Get Started',
          features:['Up to 8 fully custom pages','CMS / admin panel for easy edits','Advanced scroll animations','Blog or news section','WhatsApp chat widget','Google Analytics + Search Console','3 rounds of revisions','30-day post-launch support','Domain + hosting consultation'] },
        { tier:'Premium', name:'Full Platform', period:'based on project scope', btn:'Talk to Us',
          features:['E-commerce / booking system','Payment gateway (Midtrans, Xendit)','Custom backend & database','User dashboard / member portal','Advanced 3D / WebGL animations','API integrations','Unlimited revisions','3-month dedicated support','Priority delivery'] },
      ],
      guarantee: { title:'100% Satisfaction Guarantee', desc:'If you\'re not happy with the first mockup, we\'ll revise it completely — free of charge. We don\'t ask for full payment until you approve the design.' },
      addonsTitle: 'Optional Add-ons',
      addons: [
        { icon:'🌐', name:'Domain + Hosting', price:'Rp 500rb / yr', desc:'We set up and manage your domain and hosting for a year.' },
        { icon:'🔍', name:'SEO Package', price:'Rp 1,5jt / mo', desc:'Monthly keyword optimization, content, and backlink strategy.' },
        { icon:'📸', name:'Content Creation', price:'Rp 800rb / set', desc:'Professional copywriting and product photography guidance.' },
        { icon:'🔧', name:'Monthly Maintenance', price:'Rp 500rb / mo', desc:'Updates, security patches, backups, and minor content edits.' },
        { icon:'🈵', name:'Bilingual (EN + ID)', price:'Rp 1jt flat', desc:'Full site in Bahasa Indonesia and English with language switcher.' },
        { icon:'🚀', name:'Speed Optimization', price:'Rp 750rb flat', desc:'Core Web Vitals audit, image compression, and lazy loading setup.' },
        { icon:'📱', name:'PWA / App-like', price:'Rp 1,2jt flat', desc:'Turn your site into an installable progressive web app.' },
        { icon:'📧', name:'Email Marketing Setup', price:'Rp 900rb flat', desc:'Mailchimp / Brevo integration with a custom email template.' },
      ],
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        { q:'How do I get started?', a:'Just drop us a message on WhatsApp or fill in the contact form. We\'ll schedule a free 30-minute discovery call to understand your project.' },
        { q:'How do I pay? What payment methods are accepted?', a:'We accept bank transfer (BCA, Mandiri, BRI), GoPay, OVO, and QRIS. 50% deposit upfront, 50% on final approval.' },
        { q:'Can I see a mockup before paying?', a:'Yes! We provide a design concept after the 50% deposit. If not satisfied, we\'ll revise it at no extra cost.' },
        { q:'What if I already have a domain and hosting?', a:'No problem. We can deploy to your existing domain and hosting.' },
        { q:'Will I be able to update the website myself after launch?', a:'For Professional and Premium packages, yes — we include a CMS to update content without touching code.' },
        { q:'Do you work with clients outside Jakarta?', a:'Absolutely. We work with clients across Indonesia and internationally via WhatsApp, Zoom, or email.' },
        { q:'What if I need changes after the site is live?', a:'Every package includes 14–30 days of post-launch support. After that, subscribe to our Monthly Maintenance add-on.' },
      ],
      ctaSub1:'Still unsure which package is right for you?', ctaSub2:'We\'re happy to give you a personalised recommendation — for free, with no obligation.', ctaBtn:'Ask Us on WhatsApp',
    },
    contact: {
      label:'Contact', title1:'Let\'s build something', title2:'great together.',
      meta:[
        { icon:'💬', label:'WhatsApp', value:'+62 812-3456-7890 · Chat anytime' },
        { icon:'📧', label:'Email', value:'hello@websitestudio.id' },
        { icon:'⏱️', label:'Response Time', value:'Typically under 60 minutes (Mon–Sat)' },
        { icon:'🌏', label:'Location', value:'Jakarta, Indonesia · Serving clients worldwide' },
        { icon:'📅', label:'Free Strategy Call', value:'30-minute consultation — no strings attached' },
      ],
      testiTitle:'What our clients say',
      cardTitle:'Start a conversation',
      cardSub:'The fastest way to reach us is WhatsApp. Or fill in the form below and we\'ll reply via WhatsApp or email.',
      waBtn:'Chat on WhatsApp — we reply fast!',
      orDivider:'or send us a quick brief',
      fields:{ name:'Your Name *', namePh:'Budi Santoso', email:'Email', emailPh:'hello@yourcompany.com', service:'What do you need?', servicePh:'Select a service…', budget:'Budget Range', budgetPh:'Select a range…', message:'Tell us about your project', messagePh:'Describe your business, what you need, any inspiration sites, timeline…' },
      services:['Landing Page','Company Website (multi-page)','E-commerce Store','Booking / Reservation System','Portfolio Site','SaaS / App Landing Page','Website Redesign','Other / Not sure yet'],
      budgets:['Under Rp 3jt','Rp 3jt – 8jt','Rp 8jt – 20jt','Above Rp 20jt','Not sure'],
      submitBtn:'Send via WhatsApp →',
      successTitle:'Message sent to WhatsApp!', successSub:'We\'ll get back to you within 60 minutes. Check your WhatsApp now.',
      locationLabel:'Jakarta, Indonesia · Mon–Sat 09.00–21.00 WIB',
      intro:'Whether you have a clear brief or just a rough idea — we\'d love to hear from you. Most enquiries get a reply within 60 minutes during business hours.',
    },
    footer: { copy:'© 2025 websitestudio.id · All rights reserved · Jakarta, Indonesia' },
  },
}

export function LangProvider({ children }) {
  const [lang, setLang] = useState('ID')
  const t = translations[lang]
  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}
