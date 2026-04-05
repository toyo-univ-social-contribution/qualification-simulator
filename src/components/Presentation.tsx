import { Users, Monitor, BookOpen, Zap, CheckCircle2, AlertTriangle, ExternalLink, Download } from 'lucide-react';
import { motion } from 'motion/react';

export default function Presentation() {
  const handleDownload = () => {
    window.print();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">新入生向け資格取得ガイダンス</h2>
          <p className="text-slate-500">〜 目標設定が合格への最短ルート 〜</p>
        </div>
        {/* 資料ダウンロードボタンを非表示化
        <button 
          onClick={handleDownload}
          className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all shadow-md no-print"
        >
          <Download className="w-5 h-5" />
          資料をダウンロード (PDF)
        </button>
        */}
      </div>

      <div className="grid gap-6">
        {/* Topic 1 */}
        <section className="glass-card p-8 border-l-4 border-blue-500">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-blue-600" />
            <h3 className="text-xl font-bold text-slate-800">1. 社会貢献センターの役割</h3>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>生涯学習部門の公開講座の一環として、大学の知見や学習機会を社会一般に提供することを目的としています。</p>
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="font-bold text-blue-800 flex items-center gap-2">
                <Zap className="w-4 h-4" /> 学生・卒業生特典
              </p>
              <p className="text-sm mt-1">受講料は社会人一般価格より<span className="text-lg font-bold text-orange-600">2割引き</span>で設定。皆さんの学びを全力で応援します。</p>
            </div>
          </div>
        </section>

        {/* Topic 2 */}
        <section className="glass-card p-8 border-l-4 border-emerald-500">
          <div className="flex items-center gap-3 mb-4">
            <Monitor className="w-6 h-6 text-emerald-600" />
            <h3 className="text-xl font-bold text-slate-800">2. 近年の資格試験トレンド（CBT方式）</h3>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>従来の「年数回の紙試験」から、テストセンターでパソコンを使って受験する<span className="font-bold text-slate-900">CBT方式</span>へ移行が進んでいます。</p>
            <ul className="grid sm:grid-cols-2 gap-3">
              <li className="flex items-center gap-2 bg-emerald-50 p-3 rounded-lg text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 好きな日程・会場で受験可能
              </li>
              <li className="flex items-center gap-2 bg-emerald-50 p-3 rounded-lg text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 合否がその場でわかる（一部）
              </li>
            </ul>
            <p className="text-sm bg-amber-50 p-3 rounded-lg border border-amber-100 text-amber-800">
              <AlertTriangle className="w-4 h-4 inline mr-1" /> 自由度が高い反面、<span className="font-bold">「いつか受ける」では学習が間延びします。</span>最初に目標日を決めることが重要です。
            </p>
          </div>
        </section>

        {/* Topic 3 */}
        <section className="glass-card p-8 border-l-4 border-indigo-500">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-6 h-6 text-indigo-600" />
            <h3 className="text-xl font-bold text-slate-800">3. 国家試験の種類と種別</h3>
          </div>
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>国が法律に基づいて実施する試験です。就職活動やキャリア形成において、客観的な能力証明として非常に強力です。</p>
            <a 
              href="https://www.mext.go.jp/b_menu/shingi/chousa/shougai/014/shiryo/07012608/003.htm" 
              target="_blank" 
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline bg-blue-50 px-4 py-2 rounded-lg"
            >
              文部科学省：国家試験の種類一覧 <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Topic 4 */}
        <section className="glass-card p-8 border-l-4 border-orange-500">
          <div className="flex items-center gap-3 mb-4">
            <Zap className="w-6 h-6 text-orange-600" />
            <h3 className="text-xl font-bold text-slate-800">4. 資格同士の「つながり」とステップアップ</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div> ITパスポートの先へ
              </h4>
              <p className="text-sm">ITパスポートの知識は、難関資格である<span className="font-bold text-blue-700">「中小企業診断士」</span>の経営情報システム科目と密接に関連しています。</p>
            </div>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div> FPから宅建士へ
              </h4>
              <p className="text-sm">FPの「不動産」「相続」分野は、<span className="font-bold text-emerald-700">「宅地建物取引士」</span>の民法や宅建業法と重なる部分が多く、効率的に学習できます。</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-500 italic">※過去問を比較すると、同じ用語や概念が頻出していることがわかります。</p>
        </section>
      </div>
    </motion.div>
  );
}
