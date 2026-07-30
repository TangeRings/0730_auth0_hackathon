export type UserRole = 'organization_admin' | 'instructor' | 'mentor' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: 'free' | 'cohort_pro';
  activeSeats: number;
  maxSeats: number;
}

export interface OrganizationMembership {
  id: string;
  organizationId: string;
  userId: string;
  role: UserRole;
  joinedAt: string;
}

export interface LearningModuleItem {
  id: string;
  title: string;
  type: 'video' | 'reading' | 'quiz';
  duration: string;
  completed?: boolean;
}

export interface LearningModule {
  id: string;
  number: number;
  title: string;
  description: string;
  items: LearningModuleItem[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  modules: LearningModule[];
}

export interface Cohort {
  id: string;
  courseId: string;
  name: string;
  season: string;
  totalStudents: number;
  avgCompletionRate: number;
  studentsNeedingAttention: number;
}

export interface Milestone {
  id: string;
  weekNumber: number;
  title: string;
  tasks: string[];
  deliverables: string[];
}

export interface ProjectTrack {
  id: string;
  courseId: string;
  title: string;
  goal: string;
  level: string;
  industry: string;
  format: 'Individual' | 'Team';
  durationWeeks: number;
  weeklyEffortHours: string;
  objective: string;
  milestones: Milestone[];
  requiredEvidence: string[];
  finalDeliverable: string;
  rubric: {
    criteria: string;
    description: string;
  }[];
  published: boolean;
}

export interface Evidence {
  id: string;
  studentProjectId: string;
  milestoneId: string;
  title: string;
  type: 'file' | 'link' | 'text' | 'image';
  content: string;
  submittedAt: string;
  fileName?: string;
}

export interface InstructorReview {
  id: string;
  studentProjectId: string;
  milestoneId: string;
  instructorId: string;
  status: 'approved' | 'revision_requested' | 'pending';
  feedback: string;
  reviewedAt: string;
}

export interface StudentProject {
  id: string;
  studentId: string;
  studentName: string;
  studentEmail: string;
  studentAvatar: string;
  projectTrackId: string;
  currentWeek: number;
  overallProgress: number;
  nextDeadline: string;
  instructorName: string;
  riskStatus: 'On track' | 'Missing evidence' | 'Waiting review' | 'Scope alert';
  reviewStatus: 'Approved' | 'Needs Review' | 'Revision Requested' | 'Pending Submission';
  completedTaskIds: string[];
  reflectionText: string;
  evidence: Evidence[];
  reviews: InstructorReview[];
  agentGuidanceLogs: {
    sender: 'agent' | 'student';
    text: string;
    timestamp: string;
  }[];
}

export interface Portfolio {
  id: string;
  studentProjectId: string;
  studentName: string;
  studentAvatar: string;
  projectTitle: string;
  verified: boolean;
  verifiedBy: string;
  verifiedAt: string;
  projectChallenge: string;
  userResearch: {
    summary: string;
    keyQuotes: string[];
    interviewCount: number;
  };
  keyInsights: string[];
  prototype: {
    description: string;
    url: string;
    imageUrl?: string;
  };
  testingAndIteration: string;
  finalOutcome: string;
  reflection: string;
  publishedUrl: string;
}

export interface Subscription {
  planId: 'free' | 'cohort_pro';
  name: string;
  priceMonthly: number;
  seatsIncluded: number;
  features: string[];
}
