/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { GraduationCap, ExternalLink, Presentation as PresentationIcon, Calculator } from 'lucide-react';
import { AnimatePresence } from 'motion/react';
import { ViewMode } from './types';
import Simulator from './components/Simulator';
import Presentation from './components/Presentation';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('simulator');

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Header */}
      <header className="bg-blue-600 text-white shadow-lg py-4 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GraduationCap className="w-8 h-8" />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight">資格取得シミュレーター</h1>
          </div>
          <div className="flex bg-blue-700/50 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode('simulator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'simulator' ? 'bg-white text-blue-600 shadow-sm' : 'text-white hover:bg-white/10'}`}
            >
              <Calculator className="w-4 h-4" />
              <span className="hidden sm:inline">シミュレーター</span>
            </button>
            {/* プレゼン資料ボタンを非表示化
            <button 
              onClick={() => setViewMode('presentation')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-bold transition-all ${viewMode === 'presentation' ? 'bg-white text-blue-600 shadow-sm' : 'text-white hover:bg-white/10'}`}
            >
              <PresentationIcon className="w-4 h-4" />
              <span className="hidden sm:inline">プレゼン資料</span>
            </button>
            */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-4xl mx-auto px-4 py-8 w-full">
        <AnimatePresence mode="wait">
          {viewMode === 'simulator' ? (
            <Simulator key="simulator" />
          ) : (
            <Presentation key="presentation" />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-10 mt-auto">
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid gap-6 text-xs leading-relaxed">
            <div className="space-y-2">
              <p className="text-slate-200 font-bold text-sm mb-3">【データ出典・注記】</p>
              <div className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <p>学習時間の目安：<a href="https://www.tac-school.co.jp/" target="_blank" rel="noreferrer" className="text-blue-400 hover:underline inline-flex items-center gap-1">資格の学校TAC<ExternalLink className="w-3 h-3" /></a> 等の情報を参考に、初学者が合格を目指すための「標準的な目安（平均的な目標時間）」を当ツール独自の計算値として設定しています。</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <p>受験日や休止期間の情報：各資格の主催者公式サイト（IPA、きんざい、JDLA、オデッセイコミュニケーションズ等）の情報を参照しています。</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <p>G検定は随時CBTではなく、年6回定められた日程で実施されるオンライン試験です。当ツールでは学習完了日以降の直近の試験日を自動表示します。</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="shrink-0">•</span>
                <p>本シミュレーターの結果はあくまで目安です。年末年始のテストセンター休業や、実際の試験予約状況により変動する場合があります。実際の受験手配は必ず各公式サイトで行ってください。</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-slate-800 text-center">
            <p className="text-[10px] uppercase tracking-widest opacity-50">© 2026 Qualification Simulator for Students</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
