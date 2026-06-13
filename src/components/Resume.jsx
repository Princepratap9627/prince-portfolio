import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, FileText, GraduationCap, Code, Shield } from 'lucide-react';
import GlassCard from './GlassCard';

const Resume = () => {
  const resumeDetails = {
    name: 'PRINCE PRATAP SINGH',
    title: 'Computer Science Undergraduate | Data Science & ML Enthusiast',
    email: 'princepratap9627@gmail.com',
    location: 'India',
    education: {
      degree: 'B.Tech in Computer Science Engineering (Data Science)',
      institution: 'GLA University, Mathura',
      duration: '2024 - 2028',
      status: 'Ongoing (CGPA: 6.4)',
    },
    skills: [
      { category: 'AI & ML', items: 'Python, Pandas, NumPy, Scikit-learn, Matplotlib, Seaborn' },
      { category: 'Web & DB Tools', items: 'HTML, CSS, React.js, Node.js, Express.js, Flask, Tailwind CSS, SQL, MongoDB, SQLite, Streamlit' },
      { category: 'Cyber & Networks', items: 'Network Monitoring, Intrusion Detection Concepts, Packet Analysis, RBAC' }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="resume"
      className="py-20 px-6 md:px-12 w-full max-w-5xl mx-auto"
    >
      {/* Section Header */}
      <div className="flex items-center space-x-4 mb-14">
        <h2 className="font-display font-bold text-2xl sm:text-3xl tracking-tight text-zinc-900 dark:text-white">
          Resume
        </h2>
        <div className="h-[1px] flex-grow bg-gradient-to-r from-zinc-200 to-transparent dark:from-zinc-800" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-50px' }}
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch"
      >
        {/* Left Side: Buttons & Action Summary */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-6 text-left">
          <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20 w-fit">
            <FileText className="text-primary" size={24} />
          </div>
          <div>
            <h3 className="font-display font-bold text-xl text-zinc-900 dark:text-white">
              Academic Profile & Resume
            </h3>
            <p className="text-sm font-light text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
              Explore my background in Data Science, Machine Learning, and web engineering. Download the complete resume PDF for recruiter matching.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4">
            {/* View Resume (opens in a new tab, pointing to public/resume.pdf) */}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-900 dark:hover:bg-zinc-100 font-semibold text-sm tracking-wide shadow-md transition-all cursor-pointer"
            >
              <Eye size={15} />
              <span>View Resume PDF</span>
            </a>

            {/* Download Resume (triggers download, pointing to public/resume.pdf) */}
            <a
              href="/resume.pdf"
              download="Prince_Pratap_Singh_Resume.pdf"
              className="flex items-center justify-center space-x-2 px-5 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-white bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900/50 font-semibold text-sm tracking-wide transition-all cursor-pointer"
            >
              <Download size={15} />
              <span>Download Resume</span>
            </a>
          </div>
        </div>

        {/* Right Side: High-fidelity PDF Preview Card */}
        <div className="lg:col-span-8">
          <GlassCard className="p-1 md:p-1 border border-zinc-200/10 dark:border-zinc-800/40 relative shadow-2xl overflow-hidden rounded-2xl">
            {/* Decorative Top Bar to resemble a real application reader window */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-100/50 dark:bg-zinc-900/50 border-b border-zinc-200/10 text-xs font-mono text-zinc-400">
              <div className="flex space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/40" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/40" />
              </div>
              <span className="truncate max-w-[200px] md:max-w-none">Prince_Pratap_Singh_Resume.pdf (Preview)</span>
              <span className="text-[10px] bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded">PDF</span>
            </div>

            {/* Paper Document Content Area */}
            <div className="bg-white dark:bg-[#0B0B0C] p-6 md:p-8 text-left space-y-6 text-xs md:text-sm leading-relaxed overflow-x-auto no-scrollbar font-sans text-zinc-800 dark:text-zinc-300">
              
              {/* Document Header */}
              <div className="text-center pb-6 border-b border-zinc-200 dark:border-zinc-800">
                <h1 className="font-display font-bold text-lg md:text-xl text-zinc-950 dark:text-white tracking-widest uppercase">
                  {resumeDetails.name}
                </h1>
                <p className="text-[10px] text-zinc-400 uppercase tracking-widest mt-1">
                  {resumeDetails.title}
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-[10px] text-zinc-500 dark:text-zinc-400 mt-2 font-mono">
                  <span>{resumeDetails.email}</span>
                  <span>&bull;</span>
                  <span>github.com/Princepratap9627</span>
                  <span>&bull;</span>
                  <span>{resumeDetails.location}</span>
                </div>
              </div>

              {/* Education section */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-bold text-primary dark:text-secondary uppercase tracking-widest flex items-center gap-2">
                  <GraduationCap size={14} />
                  <span>Education</span>
                </h3>
                <div className="pl-4 border-l-2 border-zinc-200 dark:border-zinc-800">
                  <div className="flex justify-between items-start font-medium text-zinc-950 dark:text-white">
                    <span>{resumeDetails.education.degree}</span>
                    <span className="text-[10px] text-zinc-400 font-normal">{resumeDetails.education.duration}</span>
                  </div>
                  <div className="text-zinc-500 dark:text-zinc-400 text-[11px] mt-0.5">
                    {resumeDetails.education.institution} &bull; <span className="text-secondary">{resumeDetails.education.status}</span>
                  </div>
                </div>
              </div>

              {/* Core Skillset section */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-bold text-primary dark:text-secondary uppercase tracking-widest flex items-center gap-2">
                  <Code size={14} />
                  <span>Technical Skills</span>
                </h3>
                <div className="pl-4 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-2.5">
                  {resumeDetails.skills.map((skill, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-1">
                      <span className="font-semibold text-zinc-950 dark:text-white text-[11px] uppercase tracking-wider">{skill.category}</span>
                      <span className="sm:col-span-2 text-zinc-500 dark:text-zinc-400 font-light text-[11px]">{skill.items}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Security & System Highlights */}
              <div className="space-y-3">
                <h3 className="text-[11px] font-bold text-primary dark:text-secondary uppercase tracking-widest flex items-center gap-2">
                  <Shield size={14} />
                  <span>Selected Projects Summary</span>
                </h3>
                <div className="pl-4 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-3">
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-white text-[11px]">Employee Attrition Prediction System</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
                      Developed predictive Random Forest model using Scikit-learn on the IBM HR Analytics dataset. Built an interactive Streamlit dashboard for risk analytics.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-white text-[11px]">RAKSHAK (Cybersecurity EDR)</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
                      Designed a cybersecurity SOC dashboard for threat logging, intrusion detection, Scapy packet analysis, and real-time host telemetry auditing.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-zinc-900 dark:text-white text-[11px]">PrepWise AI (Interview Coach)</h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
                      Building an AI-powered mock technical interview platform. Integrated Gemini APIs for dynamic question generation and resume skill extraction.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </GlassCard>
        </div>
      </motion.div>
    </section>
  );
};

export default Resume;
