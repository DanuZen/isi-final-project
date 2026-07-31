export interface ProgramStudi {
  id: string;
  nama: string;
  jenjang: "D3" | "S1" | "S2" | "S3";
  kodeGelar: string;
}

export interface Fakultas {
  id: string;
  nama: string;
  singkatan: string;
  deskripsi?: string;
  prodiList: ProgramStudi[];
}

export const UPI_YPTK_FAKULTAS: Fakultas[] = [
  {
    id: "FILKOM",
    nama: "Fakultas Ilmu Komputer",
    singkatan: "FILKOM",
    deskripsi: "Fakultas terbesar dan paling favorit di UPI YPTK Padang.",
    prodiList: [
      { id: "S1-IF", nama: "Teknik Informatika", jenjang: "S1", kodeGelar: "S.Kom." },
      { id: "S1-SI", nama: "Sistem Informasi", jenjang: "S1", kodeGelar: "S.Kom." },
      { id: "S1-SK", nama: "Sistem Komputer", jenjang: "S1", kodeGelar: "S.Kom." },
      { id: "S1-RPL", nama: "Rekayasa Perangkat Lunak (RPL)", jenjang: "S1", kodeGelar: "S.Kom." },
      { id: "D3-MI", nama: "Manajemen Informatika", jenjang: "D3", kodeGelar: "A.Md.Kom." },
    ],
  },
  {
    id: "FEB",
    nama: "Fakultas Ekonomi dan Bisnis",
    singkatan: "FEB",
    prodiList: [
      { id: "S1-MNJ", nama: "Manajemen", jenjang: "S1", kodeGelar: "S.E." },
      { id: "S1-AKT", nama: "Akuntansi", jenjang: "S1", kodeGelar: "S.E." },
    ],
  },
  {
    id: "FT",
    nama: "Fakultas Teknik",
    singkatan: "FT",
    prodiList: [
      { id: "S1-TSP", nama: "Teknik Sipil", jenjang: "S1", kodeGelar: "S.T." },
      { id: "S1-TIND", nama: "Teknik Industri", jenjang: "S1", kodeGelar: "S.T." },
      { id: "S1-TEL", nama: "Teknik Elektro", jenjang: "S1", kodeGelar: "S.T." },
    ],
  },
  {
    id: "FPSI",
    nama: "Fakultas Psikologi",
    singkatan: "FPsi",
    prodiList: [
      { id: "S1-PSI", nama: "Psikologi", jenjang: "S1", kodeGelar: "S.Psi." },
    ],
  },
  {
    id: "FDKV",
    nama: "Fakultas Desain Komunikasi Visual",
    singkatan: "FDKV",
    prodiList: [
      { id: "S1-DKV", nama: "Desain Komunikasi Visual (DKV)", jenjang: "S1", kodeGelar: "S.Ds." },
    ],
  },
  {
    id: "FKIP",
    nama: "Fakultas Keguruan dan Ilmu Pendidikan",
    singkatan: "FKIP",
    prodiList: [
      { id: "S1-PTI", nama: "Pendidikan Teknik Informatika (PTI)", jenjang: "S1", kodeGelar: "S.Pd." },
      { id: "S1-BK", nama: "Bimbingan dan Konseling (BK)", jenjang: "S1", kodeGelar: "S.Pd." },
    ],
  },
];

export const PROGRAM_PASCASARJANA = {
  nama: "Program Pascasarjana",
  magister: [
    { id: "S2-MKom", nama: "S2 Magister Komputer", kodeGelar: "M.Kom." },
    { id: "S2-MM", nama: "S2 Magister Manajemen", kodeGelar: "M.M." },
  ],
  doktor: [
    { id: "S3-DIM", nama: "S3 Ilmu Manajemen", kodeGelar: "Dr." },
    { id: "S3-DTP", nama: "S3 Teknologi Informasi / Teknologi Pendidikan", kodeGelar: "Dr." },
  ],
};

export const BIDANG_KAJIAN_PER_PRODI: Record<string, { id: string; label: string; badge: string }[]> = {
  "Teknik Informatika": [
    { id: "RPL", label: "Software Engineering & Web Architecture (RPL)", badge: "RPL" },
    { id: "AI", label: "Artificial Intelligence & Machine Learning (AI)", badge: "AI" },
    { id: "JARINGAN", label: "Computer Network & Cybersecurity (Jaringan)", badge: "JARINGAN" },
    { id: "DATA", label: "Data Science & Big Analytics", badge: "DATA" },
  ],
  "Sistem Informasi": [
    { id: "ENTERPRISE", label: "Enterprise Resource Planning & IS Architecture", badge: "ERP" },
    { id: "BI", label: "Business Intelligence & Data Analytics", badge: "BI" },
    { id: "ECOM", label: "E-Commerce & Digital Business System", badge: "DIGITAL" },
    { id: "ITGOV", label: "IT Governance & Auditing", badge: "AUDIT" },
  ],
  "Sistem Komputer": [
    { id: "SK-EMBEDDED", label: "Embedded Systems & Hardware Interfacing", badge: "HARDWARE" },
    { id: "SK-IOT", label: "Internet of Things (IoT) & Smart Sensors", badge: "IOT" },
    { id: "SK-ROBOTIK", label: "Robotics & Automation Control", badge: "ROBOTIK" },
  ],
  "Rekayasa Perangkat Lunak (RPL)": [
    { id: "RPL-DEV", label: "Software Architecture & Microservices", badge: "ARCHITECTURE" },
    { id: "RPL-MOBILE", label: "Mobile App Development & Cross-Platform", badge: "MOBILE" },
    { id: "RPL-QA", label: "Software Quality Assurance & Automated Testing", badge: "SQA" },
  ],
  "Manajemen Informatika": [
    { id: "MI-WEB", label: "Pemrograman Web & Sistem Database Terdistribusi", badge: "WEB" },
    { id: "MI-ADM", label: "Administrasi Database & Jaringan Komputer", badge: "ADMIN" },
  ],
  "Manajemen": [
    { id: "MNJ-MKT", label: "Manajemen Pemasaran (Marketing)", badge: "MARKETING" },
    { id: "MNJ-KEU", label: "Manajemen Keuangan (Finance)", badge: "FINANCE" },
    { id: "MNJ-SDM", label: "Manajemen Sumber Daya Manusia (HRM)", badge: "SDM/HR" },
    { id: "MNJ-OPS", label: "Manajemen Operasional & Rantai Pasok", badge: "OPERASIONAL" },
  ],
  "Akuntansi": [
    { id: "AKT-KEU", label: "Akuntansi Keuangan & Pelaporan", badge: "KEUANGAN" },
    { id: "AKT-AUDIT", label: "Auditing & Pemeriksaan Akuntan", badge: "AUDITING" },
    { id: "AKT-PAJAK", label: "Perpajakan & Manajemen Pajak", badge: "PERPAJAKAN" },
    { id: "AKT-SIA", label: "Sistem Informasi Akuntansi (SIA)", badge: "SIA" },
  ],
  "Teknik Sipil": [
    { id: "TSP-STRUKTUR", label: "Teknik Struktur & Rekayasa Beton", badge: "STRUKTUR" },
    { id: "TSP-GEO", label: "Geoteknik & Rekayasa Tanah", badge: "GEOTEKNIK" },
    { id: "TSP-AIR", label: "Teknik Keairan & Transportasi", badge: "KEAIRAN" },
    { id: "TSP-KONSTRUKSI", label: "Manajemen Konstruksi & Proyek", badge: "KONSTRUKSI" },
  ],
  "Teknik Industri": [
    { id: "TIND-ERGONOMI", label: "Ergonomi & Perancangan Sistem Kerja", badge: "ERGONOMI" },
    { id: "TIND-MUTU", label: "Pengendalian Mutu & Sistem Produksi", badge: "MUTU" },
  ],
  "Teknik Elektro": [
    { id: "TEL-ROBOTIK", label: "Sistem Kendali, IoT & Robotika", badge: "IOT/ROBOTIK" },
    { id: "TEL-TENAGA", label: "Teknik Tenaga Listrik & Energi Terbarukan", badge: "POWER" },
  ],
  "Psikologi": [
    { id: "PSI-KLINIS", label: "Psikologi Klinis & Kesehatan Mental", badge: "KLINIS" },
    { id: "PSI-PIO", label: "Psikologi Industri & Organisasi (PIO)", badge: "PIO" },
    { id: "PSI-PENDIDIKAN", label: "Psikologi Pendidikan & Perkembangan", badge: "PENDIDIKAN" },
  ],
  "Desain Komunikasi Visual (DKV)": [
    { id: "DKV-DESAIN", label: "Desain Grafis, Branding & Identitas Visual", badge: "BRANDING" },
    { id: "DKV-ANIMASI", label: "Animasi, Modelling 3D & VFX", badge: "ANIMASI" },
    { id: "DKV-INTERAKTIF", label: "Media Interaktif, UI/UX & Game Design", badge: "INTERAKTIF" },
  ],
  "Pendidikan Teknik Informatika (PTI)": [
    { id: "PTI-MEDIA", label: "Media Pembelajaran Digital & Blended Learning", badge: "MEDIA" },
    { id: "PTI-EVALUASI", label: "Pengembangan Kurikulum & Evaluasi Pendidikan TI", badge: "KURIKULUM" },
  ],
  "Bimbingan dan Konseling (BK)": [
    { id: "BK-KONSELING", label: "Bimbingan & Konseling Sekolah", badge: "KONSELING" },
    { id: "BK-KARIR", label: "Pengembangan Karir & Konseling Keluarga", badge: "KARIR" },
  ],
};

