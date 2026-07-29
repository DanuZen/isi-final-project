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
