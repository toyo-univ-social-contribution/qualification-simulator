import { useState } from 'react';
import { SquarePen, Flag, Laptop, Award, Play, AlertTriangle, ExternalLink, CheckCircle2, Download } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EXAMS_DATA, G_DATES } from '../constants';
import { SimulationResult } from '../types';

export default function Simulator() {
  const [selectedExamKey, setSelectedExamKey] = useState('fp3');
  const [studyHoursPerDay, setStudyHoursPerDay] = useState(2.0);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const formatDate = (date: Date) => {
    return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getDate()).padStart(2, '0')}`;
  };

  const calculateDates = () => {
    const exam = EXAMS_DATA[selectedExamKey];
    const requiredDays = Math.ceil(exam.hours / studyHoursPerDay);
    
    const today = new Date();
    let examDate = new Date(today);
    examDate.setDate(examDate.getDate() + requiredDays);
    
    let alertMsg = "";

    if (exam.type === "fixed") {
      const nextDate = G_DATES.find(d => d >= examDate);
      if (nextDate) {
        examDate = new Date(nextDate);
        alertMsg = "※G検定は年6回の特定日開催のため、学習完了予定日以降の最も近い試験日を設定しました。";
      } else {
        alertMsg = "※直近のG検定試験日データが見つかりませんでした。公式サイトをご確認ください。";
      }
    }

    if (exam.isIpa) {
      const ipaPauseStart = new Date('2026-04-27');
      const ipaPauseEnd = new Date('2026-05-31');
      if (examDate >= ipaPauseStart && examDate <= ipaPauseEnd) {
        alertMsg = "⚠️ IPA試験（ITパスポート等）は、システム更改のため2026年4月27日〜5月頃まで一時休止予定です。前後の日程での受験をご検討ください。";
      }
    }

    if (selectedExamKey === 'fp3' || selectedExamKey === 'fp2') {
      const fpPauses = [
        { start: new Date('2026-05-24T00:00:00'), end: new Date('2026-05-31T23:59:59') },
        { start: new Date('2026-12-28T00:00:00'), end: new Date('2027-01-05T23:59:59') },
        { start: new Date('2027-03-25T00:00:00'), end: new Date('2027-03-31T23:59:59') }
      ];

      for (const pause of fpPauses) {
        if (examDate >= pause.start && examDate <= pause.end) {
          examDate = new Date(pause.end);
          examDate.setDate(examDate.getDate() + 1);
          examDate.setHours(0, 0, 0, 0);
          alertMsg += (alertMsg ? "\n" : "") + `※算出された受験日がきんざいCBT試験の休止期間（${pause.start.getFullYear()}年${pause.start.getMonth()+1}月${pause.start.getDate()}日〜${pause.end.getFullYear()}年${pause.end.getMonth()+1}月${pause.end.getDate()}日）と重なるため、休止期間明けの直近日を目標受験日として設定しました。`;
          break;
        }
      }
    }

    const m = examDate.getMonth() + 1;
    const d = examDate.getDate();
    if ((m === 12 && d >= 28) || (m === 1 && d <= 4)) {
      alertMsg += (alertMsg ? "\n" : "") + "※年末年始はCBTテストセンターが休業する場合があります。";
    }

    let resultDate = new Date(examDate);
    if (exam.resultType === 'next_mid') {
      resultDate.setMonth(resultDate.getMonth() + 1);
      resultDate.setDate(15);
      alertMsg += (alertMsg ? "\n" : "") + "※合格発表日は「受験月の翌月中旬」として算出しています。正確な日程は主催者サイトをご確認ください。";
    } else {
      resultDate.setDate(resultDate.getDate() + exam.resultDays);
    }

    const certDate = new Date(examDate);
    certDate.setDate(certDate.getDate() + exam.certDays);

    setResult({
      examDate,
      resultDate,
      certDate,
      totalHours: exam.hours,
      note: exam.note,
      alertMsg
    });
  };

  const handleDownload = () => {
    window.print();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
    >
      <p className="mb-8 text-slate-600 text-lg leading-relaxed">
        通年実施されているCBT方式の資格試験を中心に、1日の学習時間から「受験日」と「合格証書が届く日」の目安を算出します。
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Form */}
        <section className="glass-card p-8 flex flex-col gap-6">
          <div className="flex items-center gap-2 text-blue-700 border-b border-blue-100 pb-3">
            <SquarePen className="w-5 h-5" />
            <h2 className="text-xl font-bold">学習計画を入力</h2>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-bold text-slate-700">1. 資格試験を選ぶ</label>
            <select 
              value={selectedExamKey}
              onChange={(e) => setSelectedExamKey(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 outline-none transition-all cursor-pointer hover:bg-white"
            >
              {Object.entries(EXAMS_DATA).map(([key, exam]) => (
                <option key={key} value={key}>{exam.name}</option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-end">
              <label className="block text-sm font-bold text-slate-700">2. 1日の学習時間</label>
              <div className="text-2xl font-bold text-blue-600">{studyHoursPerDay.toFixed(1)}<span className="text-sm ml-1">h</span></div>
            </div>
            <input 
              type="range" 
              min="0.5" 
              max="8" 
              step="0.5" 
              value={studyHoursPerDay}
              onChange={(e) => setStudyHoursPerDay(parseFloat(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
          </div>

          <button 
            onClick={calculateDates}
            className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-bold rounded-xl text-lg px-5 py-4 transition-all shadow-md active:scale-[0.98] mt-2"
          >
            シミュレーション開始！
          </button>
        </section>

        {/* Results Display */}
        <div className="relative min-h-[400px]">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.section 
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="glass-card p-8 h-full"
              >
                <div className="flex items-center justify-between border-b border-emerald-100 pb-3 mb-6">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <Flag className="w-5 h-5" />
                    <h2 className="text-xl font-bold">あなたの目標スケジュール</h2>
                  </div>
                  {/* PDF保存ボタンを非表示化
                  <button 
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-all no-print"
                  >
                    <Download className="w-3.5 h-3.5" />
                    PDF保存
                  </button>
                  */}
                </div>

                <div className="bg-blue-50/50 rounded-2xl p-5 mb-8 border border-blue-100">
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-1">必要な総学習時間（目安）</p>
                  <p className="text-3xl font-bold text-blue-900">{result.totalHours} <span className="text-lg">時間</span></p>
                  <p className="text-xs text-slate-500 mt-2 font-medium">{result.note}</p>
                </div>

                {/* Timeline */}
                <div className="relative mb-10 mt-6 px-1">
                  <div className="absolute left-0 top-6 w-full h-1 bg-slate-100 -z-10 rounded-full"></div>
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="absolute left-0 top-6 h-1 bg-emerald-400 -z-10 rounded-full"
                  ></motion.div>
                  
                  <div className="flex justify-between relative">
                    <div className="flex flex-col items-center gap-2 z-10">
                      <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg">
                        <Play className="w-5 h-5 fill-current" />
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">学習開始</div>
                        <div className="text-xs font-bold text-slate-600">{formatDate(new Date())}</div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center gap-2 z-10">
                      <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center shadow-lg">
                        <Laptop className="w-5 h-5" />
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">目標受験日</div>
                        <div className="text-sm font-bold text-orange-600">{formatDate(result.examDate)}</div>
                      </div>
                    </div>
                    {EXAMS_DATA[selectedExamKey].resultDays > 0 || EXAMS_DATA[selectedExamKey].resultType === 'next_mid' ? (
                      <div className="flex flex-col items-center gap-2 z-10">
                        <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center shadow-lg">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                        <div className="text-center">
                          <div className="text-[10px] font-bold text-slate-400 uppercase">合格発表</div>
                          <div className="text-xs font-bold text-slate-600">{formatDate(result.resultDate)}</div>
                          <a 
                            href={EXAMS_DATA[selectedExamKey].officialUrl} 
                            target="_blank" 
                            rel="noreferrer" 
                            className="text-[9px] text-blue-500 hover:underline flex items-center justify-center gap-0.5 mt-0.5"
                          >
                            公式サイト <ExternalLink className="w-2 h-2" />
                          </a>
                        </div>
                      </div>
                    ) : null}
                    <div className="flex flex-col items-center gap-2 z-10">
                      <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg">
                        <Award className="w-5 h-5" />
                      </div>
                      <div className="text-center">
                        <div className="text-[10px] font-bold text-slate-400 uppercase">証書到着</div>
                        <div className="text-xs font-bold text-slate-600">
                          {EXAMS_DATA[selectedExamKey].certDays === 0 ? '当日（デジタル）' : formatDate(result.certDate)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Alert */}
                {result.alertMsg && (
                  <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg"
                  >
                    <div className="flex gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                      <p className="text-sm text-amber-800 font-medium whitespace-pre-line leading-relaxed">
                        {result.alertMsg}
                      </p>
                    </div>
                  </motion.div>
                )}
              </motion.section>
            ) : (
              <div className="glass-card p-8 h-full flex flex-col items-center justify-center text-slate-400 border-dashed border-2 border-slate-200 bg-transparent">
                <div className="bg-slate-100 p-4 rounded-full mb-4">
                  <Flag className="w-8 h-8" />
                </div>
                <p className="font-medium">条件を入力してシミュレーションを開始してください</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
