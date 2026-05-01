import React from 'react';
import { Link } from 'react-router-dom';

const ResearchPage = () => {
  return (
    <div className="min-h-screen bg-background pt-32 pb-24 px-6 relative overflow-hidden flex items-center justify-center">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/[0.05] rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-3xl mx-auto text-center relative z-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium tracking-wide uppercase bg-accent/10 text-accent border border-accent/20 rounded-full mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
          Innovation Lab
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-text-primary leading-[1.1] mb-8">
          Market <span className="text-accent">Research</span>
          <br />is coming soon.
        </h1>
        
        <p className="text-xl text-text-secondary leading-relaxed max-w-xl mx-auto mb-12">
          We are launching the research tab where you will get quick and real-time updates and knowledge about the market. Stay ahead with institutional-grade insights.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 bg-surface-card border border-border rounded-2xl">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">Real-time</h3>
            <p className="text-xs text-text-muted italic">Instant market updates</p>
          </div>
          <div className="p-6 bg-surface-card border border-border rounded-2xl">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">Analysis</h3>
            <p className="text-xs text-text-muted italic">Deep technical insights</p>
          </div>
          <div className="p-6 bg-surface-card border border-border rounded-2xl">
            <div className="w-10 h-10 bg-accent/10 rounded-xl flex items-center justify-center text-accent mx-auto mb-4">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.746 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-text-primary mb-2">Knowledge</h3>
            <p className="text-xs text-text-muted italic">Advanced trading logic</p>
          </div>
        </div>

        <Link
          to="/courses"
          className="inline-flex items-center gap-2 px-8 py-3 bg-accent text-surface font-semibold rounded-full hover:bg-accent-hover transition-all hover:scale-105"
        >
          Explore Courses While You Wait
        </Link>
      </div>
    </div>
  );
};

export default ResearchPage;
