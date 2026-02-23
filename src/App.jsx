import React, { useState, useEffect } from 'react';

const CHALLENGES = [
  { id: 1, text: "Ask a stranger for the time", level: "Seed", xp: 10 },
  { id: 2, text: "Give a random person a genuine compliment", level: "Seed", xp: 15 },
  { id: 3, text: "Hold eye contact with someone until they look away", level: "Sprout", xp: 30 },
  { id: 4, text: "Ask a barista for a drink recommendation", level: "Seed", xp: 10 },
  { id: 5, text: "Hum your favorite song out loud while walking", level: "Sprout", xp: 40 },
  { id: 6, text: "Strike up a 2-minute conversation with a cashier", level: "Oak", xp: 60 },
  { id: 7, text: "Call a local store and ask when they close", level: "Seed", xp: 10 },
  { id: 8, text: "Intentionally drop a pen and wait for someone to notice", level: "Sprout", xp: 35 },
];

export default function App() {
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('social-app-stats');
    return saved ? JSON.parse(saved) : { streak: 0, xp: 0, completedToday: false };
  });

  useEffect(() => {
    localStorage.setItem('social-app-stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    const random = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
    setCurrentChallenge(random);
  }, []);

  const completeChallenge = () => {
    if (!stats.completedToday) {
      setStats(prev => ({
        ...prev,
        streak: prev.streak + 1,
        xp: prev.xp + (currentChallenge?.xp || 0),
        completedToday: true
      }));
      alert("Mission Accomplished! High five! 👋");
    }
  };

  const getNewChallenge = () => {
    const random = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
    setCurrentChallenge(random);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
        
        {/* Header/Stats */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Streak</p>
            <p className="text-2xl font-black text-indigo-600">{stats.streak} Days</p>
          </div>
          <div className="text-center">
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Total XP</p>
            <p className="text-2xl font-black text-emerald-500">{stats.xp}</p>
          </div>
        </div>

        {/* Challenge Card */}
        <div className="bg-indigo-50 rounded-2xl p-6 mb-8 text-center border-2 border-indigo-100">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-tighter ${
            currentChallenge?.level === 'Seed' ? 'bg-green-100 text-green-700' : 
            currentChallenge?.level === 'Sprout' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'
          }`}>
            {currentChallenge?.level} Difficulty
          </span>
          <h2 className="text-xl font-semibold text-slate-800 mt-4 leading-tight">
            "{currentChallenge?.text}"
          </h2>
        </div>

        {/* Buttons */}
        <div className="space-y-3">
          <button 
            onClick={completeChallenge}
            disabled={stats.completedToday}
            className={`w-full py-4 rounded-xl font-bold text-lg transition-all transform active:scale-95 ${
              stats.completedToday 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 hover:bg-indigo-700'
            }`}
          >
            {stats.completedToday ? "Done for Today!" : "Challenge Complete"}
          </button>
          
          <button 
            onClick={getNewChallenge}
            className="w-full py-3 text-slate-500 font-medium hover:text-indigo-600 transition-colors"
          >
            Give me a different one
          </button>
        </div>

        <p className="text-center text-xs text-slate-400 mt-8 italic">
          Progress is progress, no matter how small.
        </p>
      </div>
    </div>
  );
}