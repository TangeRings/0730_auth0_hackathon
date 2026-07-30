import React, { useState } from 'react';
import { Header } from './components/Header';
import { DemoWalkthroughBar } from './components/DemoWalkthroughBar';
import { LandingPage } from './components/LandingPage';
import { InstructorDashboard } from './components/InstructorDashboard';
import { CourseView } from './components/CourseView';
import { ProjectBuilderModal } from './components/ProjectBuilderModal';
import { StudentWorkspace } from './components/StudentWorkspace';
import { InstructorReviewDashboard } from './components/InstructorReviewDashboard';
import { PortfolioGenerator } from './components/PortfolioGenerator';
import { PricingPage, UpgradeModal } from './components/PricingModalAndPage';

import { 
  mockCourse, 
  mockCohort, 
  mockProjectTrack, 
  initialStudentProjects, 
  mockMayaPortfolio, 
  mockOrganization 
} from './mockData';
import { UserRole, ProjectTrack, StudentProject, Portfolio } from './types';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('instructor');
  const [activeTab, setActiveTab] = useState<string>('landing');
  const [demoStep, setDemoStep] = useState<number>(1);

  // App States
  const [organization, setOrganization] = useState(mockOrganization);
  const [projectTrack, setProjectTrack] = useState<ProjectTrack>(mockProjectTrack);
  const [studentProjects, setStudentProjects] = useState<StudentProject[]>(initialStudentProjects);
  const [portfolio, setPortfolio] = useState<Portfolio>(mockMayaPortfolio);

  // Modals
  const [isProjectBuilderOpen, setIsProjectBuilderOpen] = useState(false);
  const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);

  // Maya's specific student project
  const mayaProject = studentProjects.find(p => p.id === 'sp-maya') || studentProjects[0];

  const handleRoleChange = (role: UserRole) => {
    setCurrentRole(role);
  };

  const handleNavigateStep = (stepNumber: number) => {
    setDemoStep(stepNumber);
    switch (stepNumber) {
      case 1:
        setActiveTab('landing');
        setCurrentRole('instructor');
        break;
      case 2:
        setActiveTab('instructor-dashboard');
        setCurrentRole('instructor');
        break;
      case 3:
        setActiveTab('course-view');
        setCurrentRole('instructor');
        break;
      case 4:
        setActiveTab('course-view');
        setCurrentRole('instructor');
        setIsProjectBuilderOpen(true);
        break;
      case 5:
        setActiveTab('student-workspace');
        setCurrentRole('student');
        break;
      case 6:
        setActiveTab('reviews');
        setCurrentRole('instructor');
        break;
      case 7:
        setActiveTab('portfolio');
        setCurrentRole('instructor');
        break;
      case 8:
        setActiveTab('pricing');
        setCurrentRole('instructor');
        setIsUpgradeModalOpen(true);
        break;
      default:
        setActiveTab('landing');
    }
  };

  const handleApproveAndPublishTrack = (updatedTrack: ProjectTrack) => {
    setProjectTrack(updatedTrack);
    setIsProjectBuilderOpen(false);
    // Redirect to Student Workspace to view the newly published track from student lens
    setCurrentRole('student');
    setActiveTab('student-workspace');
    setDemoStep(5);
  };

  const handleUpdateStudentProject = (updated: StudentProject) => {
    setStudentProjects(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleRequestReview = () => {
    const updatedMaya: StudentProject = {
      ...mayaProject,
      riskStatus: 'Waiting review',
      reviewStatus: 'Needs Review',
    };
    handleUpdateStudentProject(updatedMaya);

    // Switch to Instructor Review Dashboard
    setCurrentRole('instructor');
    setActiveTab('reviews');
    setDemoStep(6);
  };

  const handleConfirmUpgrade = () => {
    setOrganization(prev => ({
      ...prev,
      plan: 'cohort_pro',
      maxSeats: 30,
    }));
    setIsUpgradeModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col selection:bg-blue-200 selection:text-blue-900">
      
      {/* Header */}
      <Header
        currentRole={currentRole}
        onRoleChange={handleRoleChange}
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          if (tab === 'student-workspace') setCurrentRole('student');
          if (tab === 'instructor-dashboard' || tab === 'reviews') setCurrentRole('instructor');
        }}
        onOpenProjectBuilder={() => setIsProjectBuilderOpen(true)}
        onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
        planSeatsUsed={organization.activeSeats}
        maxSeats={organization.maxSeats}
      />

      {/* Guided Tour Sequence Toolbar */}
      <DemoWalkthroughBar
        currentStep={demoStep}
        onNavigateStep={handleNavigateStep}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeTab === 'landing' && (
          <LandingPage
            onCreateTrack={() => setIsProjectBuilderOpen(true)}
            onViewStudentDemo={() => {
              setCurrentRole('student');
              setActiveTab('student-workspace');
              setDemoStep(5);
            }}
            onGoToCourse={() => {
              setActiveTab('course-view');
              setDemoStep(3);
            }}
          />
        )}

        {activeTab === 'instructor-dashboard' && (
          <InstructorDashboard
            course={mockCourse}
            cohort={mockCohort}
            projectTrack={projectTrack}
            studentProjects={studentProjects}
            portfolio={portfolio}
            onOpenProjectBuilder={() => setIsProjectBuilderOpen(true)}
            onSelectStudent={(id) => {
              setActiveTab('reviews');
              setDemoStep(6);
            }}
            onOpenReviews={() => {
              setActiveTab('reviews');
              setDemoStep(6);
            }}
            onOpenPortfolio={() => {
              setActiveTab('portfolio');
              setDemoStep(7);
            }}
            onOpenUpgradeModal={() => setIsUpgradeModalOpen(true)}
            onGoToCourse={() => setActiveTab('course-view')}
          />
        )}

        {activeTab === 'course-view' && (
          <CourseView
            course={mockCourse}
            onOpenProjectBuilder={() => setIsProjectBuilderOpen(true)}
          />
        )}

        {activeTab === 'student-workspace' && (
          <StudentWorkspace
            studentProject={mayaProject}
            projectTrack={projectTrack}
            onUpdateProject={handleUpdateStudentProject}
            onRequestReview={handleRequestReview}
            onNavigateToPortfolio={() => {
              setActiveTab('portfolio');
              setDemoStep(7);
            }}
          />
        )}

        {activeTab === 'reviews' && (
          <InstructorReviewDashboard
            studentProjects={studentProjects}
            onUpdateProject={handleUpdateStudentProject}
            onNavigateToPortfolio={() => {
              setActiveTab('portfolio');
              setDemoStep(7);
            }}
          />
        )}

        {activeTab === 'portfolio' && (
          <PortfolioGenerator
            portfolio={portfolio}
            studentProject={mayaProject}
            onUpdatePortfolio={setPortfolio}
          />
        )}

        {activeTab === 'pricing' && (
          <PricingPage
            onUpgradeStripe={() => setIsUpgradeModalOpen(true)}
          />
        )}
      </main>

      {/* AI Project Builder Modal */}
      <ProjectBuilderModal
        isOpen={isProjectBuilderOpen}
        onClose={() => setIsProjectBuilderOpen(false)}
        onApproveAndPublish={handleApproveAndPublishTrack}
        initialTrack={projectTrack}
      />

      {/* Upgrade Seat / Stripe Modal */}
      <UpgradeModal
        isOpen={isUpgradeModalOpen}
        onClose={() => setIsUpgradeModalOpen(false)}
        onConfirmUpgrade={handleConfirmUpgrade}
      />

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-6 px-4 border-t border-slate-800 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 BlueQ Project Layer Inc. All rights reserved.</p>
          <p className="text-slate-500 font-mono">Designed for Higher Ed, Bootcamps & Professional Learning</p>
        </div>
      </footer>
    </div>
  );
}
