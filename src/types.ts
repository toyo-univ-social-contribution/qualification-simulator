export type ViewMode = 'simulator' | 'presentation';

export interface Exam {
  name: string;
  hours: number;
  type: 'anytime' | 'fixed';
  resultDays: number;
  resultType: 'days' | 'next_mid';
  certDays: number;
  isIpa: boolean;
  officialUrl: string;
  note: string;
}

export interface SimulationResult {
  examDate: Date;
  resultDate: Date;
  certDate: Date;
  totalHours: number;
  note: string;
  alertMsg: string;
}
