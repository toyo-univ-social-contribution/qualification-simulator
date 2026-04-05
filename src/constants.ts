import { Exam } from './types';

export const EXAMS_DATA: Record<string, Exam> = {
  fp3: { name: "FP3級", hours: 50, type: "anytime", resultDays: 30, resultType: 'next_mid', certDays: 0, isIpa: false, officialUrl: "https://www.kinzai.or.jp/fp/nittei-fp/48581.html", note: "学習目安: 約40〜50時間（合格証明書PDFは即時発行）" },
  fp2: { name: "FP2級（FP3級取得後）", hours: 100, type: "anytime", resultDays: 30, resultType: 'next_mid', certDays: 0, isIpa: false, officialUrl: "https://www.kinzai.or.jp/fp/nittei-fp/48581.html", note: "学習目安: 約80〜100時間（合格証明書PDFは即時発行）" },
  itpass: { name: "ITパスポート", hours: 150, type: "anytime", resultDays: 30, resultType: 'next_mid', certDays: 60, isIpa: true, officialUrl: "https://www.itpas.ipa.go.jp/", note: "学習目安: 約100〜180時間" },
  sg: { name: "情報セキュリティマネジメント", hours: 150, type: "anytime", resultDays: 30, resultType: 'next_mid', certDays: 60, isIpa: true, officialUrl: "https://www.ipa.go.jp/shiken/index.html", note: "学習目安: 約100〜200時間" },
  fe: { name: "基本情報技術者試験", hours: 200, type: "anytime", resultDays: 30, resultType: 'next_mid', certDays: 60, isIpa: true, officialUrl: "https://www.ipa.go.jp/shiken/index.html", note: "学習目安: 約200時間（初学者目安）" },
  gken: { name: "G検定", hours: 40, type: "fixed", resultDays: 14, resultType: 'days', certDays: 21, isIpa: false, officialUrl: "https://www.jdla.org/certificate/general/", note: "学習目安: 約30〜50時間" },
  mos_excel: { name: "MOS Excel 365（一般）", hours: 60, type: "anytime", resultDays: 0, resultType: 'days', certDays: 0, isIpa: false, officialUrl: "https://mos.odyssey-com.co.jp/", note: "学習目安: 約40〜80時間（デジタル証書は当日取得可）" }
};

export const G_DATES = [
  new Date('2026-05-09'),
  new Date('2026-07-04'),
  new Date('2026-09-05'),
  new Date('2026-11-07'),
  new Date('2027-01-16'),
  new Date('2027-03-06')
];
