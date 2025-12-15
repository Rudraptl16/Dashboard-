'use strict';

/**
 * Header and menus
 */
const header = document.querySelector('[data-header]');
const navToggleBtn = document.querySelector('[data-menu-toggle-btn]');

if (navToggleBtn && header) {
  navToggleBtn.addEventListener('click', () => header.classList.toggle('active'));
}

const menuBtn = document.querySelectorAll('[data-menu-btn]');
menuBtn.forEach(btn => {
  btn.addEventListener('click', function () {
    const menu = this.nextElementSibling;
    if (menu) menu.classList.toggle('active');
  });
});

const loadMoreBtn = document.querySelector('[data-load-more]');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', function () {
    this.classList.toggle('active');
  });
}

/**
 * Live data + dashboard pulse
 */

const statNodes = {
  completion: document.querySelector('[data-stat="completion"]'),
  rating: document.querySelector('[data-stat="rating"]'),
  tasksDone: document.querySelector('[data-stat="tasks-done"]'),
  tasksProgress: document.querySelector('[data-stat="tasks-progress"]'),
  revenue: document.querySelector('[data-stat="revenue"]'),
  revenueWeek: document.querySelector('[data-stat="revenue-week"]'),
  revenueMonth: document.querySelector('[data-stat="revenue-month"]'),
};

const progressBars = {
  completion: document.querySelector('[data-progress="completion"]'),
  rating: document.querySelector('[data-progress="rating"]'),
};

const pulseCards = Array.from(document.querySelectorAll('[data-pulse-card]'));
const projectCards = Array.from(document.querySelectorAll('[data-project-card]'));
const teamList = document.querySelector('[data-team-list]');
const teamRefresh = document.querySelector('[data-team-refresh]');
const teamHeaderTemplate = teamList?.querySelector('.team-row.header')?.outerHTML || '';

const liveProjectsList = document.querySelector('[data-live-projects]');
const tasksList = document.querySelector('[data-tasks-list]');
const teamCardsContainer = document.querySelector('[data-team-cards]');
const analystList = document.querySelector('[data-analyst-list]');
const teamToggle = document.querySelector('[data-team-toggle]');
const taskTotal = document.querySelector('[data-task-total]');
const taskWorking = document.querySelector('[data-task-working]');
const taskComplete = document.querySelector('[data-task-complete]');
const taskFilterBtns = document.querySelectorAll('[data-task-filter]');
const taskBoardLists = document.querySelectorAll('[data-task-board]');

const velocityBars = document.querySelector('[data-velocity-bars]');
const velocityMeta = document.querySelector('[data-velocity-meta]');
const burndownMeta = document.querySelector('[data-burndown-meta]');
const burndownNote = document.querySelector('[data-burndown-note]');
const burndownLine = document.querySelector('[data-burndown-line]');
const capacityMeta = document.querySelector('[data-capacity-meta]');
const capacityValue = document.querySelector('[data-capacity-value]');
const capacityNote = document.querySelector('[data-capacity-note]');
const donutFill = document.querySelector('[data-donut-fill]');
const reportMeta = document.querySelector('[data-report-meta]');
const reportNote = document.querySelector('[data-report-note]');
const qualityMeta = document.querySelector('[data-quality-meta]');
const qualityNote = document.querySelector('[data-quality-note]');
const slaMeta = document.querySelector('[data-sla-meta]');
const slaNote = document.querySelector('[data-sla-note]');
const slaFill = document.querySelector('[data-sla-fill]');
const sparkline = document.querySelector('[data-sparkline]');
const qualityBars = document.querySelector('[data-quality-bars]');
const analystBars = document.querySelector('[data-analyst-bars]');
const analystSpark = document.querySelector('[data-analyst-spark]');
const analystTotal = document.querySelector('[data-analyst-total]');
const analystActive = document.querySelector('[data-analyst-active]');
const analystWorkloadMeta = document.querySelector('[data-analyst-workload-meta]');
const analystVelocityMeta = document.querySelector('[data-analyst-velocity-meta]');
const projectModal = document.querySelector('[data-project-modal]');
const projectModalTitle = document.querySelector('[data-modal-title]');
const projectModalStatus = document.querySelector('[data-modal-status]');
const projectModalOwner = document.querySelector('[data-modal-owner]');
const projectModalEta = document.querySelector('[data-modal-eta]');
const projectModalProgress = document.querySelector('[data-modal-progress]');
const projectModalClose = document.querySelectorAll('[data-modal-close]');

const snapshots = [
  {
    updatedAt: 'just now',
    stats: { completion: 88, rating: 8.4, tasksDone: 32, tasksProgress: 15 },
    revenue: { value: 3200, week: 18, month: -4 },
    charts: {
      velocity: [72, 64, 88, 52, 76, 91],
      burndown: 62,
      capacity: 78,
    },
    reports: {
      performance: [62, 68, 71, 66, 75, 82, 77],
      quality: [72, 84, 69],
      sla: 82,
    },
    analystStats: {
      total: 6,
      active: 6,
      workload: [18, 14, 16, 12, 10, 9],
      velocity: [62, 64, 66, 68, 70, 72, 74],
    },
    projectsLive: [
      { name: 'Atlas Mobile', status: 'In Progress', badge: 'cyan', progress: 64, owner: 'Ava', eta: '3d' },
      { name: 'Nova Design Kit', status: 'Design', badge: 'blue', progress: 48, owner: 'Liam', eta: '5d' },
      { name: 'Prompt v2.0', status: 'Planning', badge: 'orange', progress: 58, owner: 'Noah', eta: '1w' },
      { name: 'Hyper React v4.0', status: 'Development', badge: 'cyan', progress: 67, owner: 'Mila', eta: '4d' },
      { name: 'Rudra - Design Updates', status: 'QA', badge: 'blue', progress: 82, owner: 'Ava', eta: '2d' },
      { name: 'Pulse AI', status: 'Research', badge: 'orange', progress: 35, owner: 'Ivy', eta: '2w' },
      { name: 'Data Lake', status: 'In Progress', badge: 'cyan', progress: 73, owner: 'Ethan', eta: '6d' },
      { name: 'Reporting Hub', status: 'QA', badge: 'green', progress: 86, owner: 'Sophia', eta: '1d' },
      { name: 'Billing Edge', status: 'Review', badge: 'orange', progress: 59, owner: 'Luca', eta: '5d' },
      { name: 'Notification Core', status: 'In Progress', badge: 'cyan', progress: 61, owner: 'Mia', eta: '4d' },
      { name: 'Search Revamp', status: 'Design', badge: 'blue', progress: 42, owner: 'Zane', eta: '1w' },
      { name: 'Security Hardening', status: 'Planning', badge: 'red', progress: 28, owner: 'Omar', eta: '3w' },
    ],
    tasksLive: [
      { title: 'Draft new SOW', state: 'Pending', due: 'Today 10pm', comments: 21, progress: '3/7', priority: 'High' },
      { title: 'iOS home redesign', state: 'Working', due: 'Today 5pm', comments: 5, progress: '10/11', priority: 'Medium' },
      { title: 'Enable analytics tracking', state: 'Pending', due: 'Tomorrow 5pm', comments: 7, progress: '5/11', priority: 'Medium' },
      { title: 'Kanban board design', state: 'Pending', due: 'Sep 11, 3pm', comments: 3, progress: '0/5', priority: 'Low' },
      { title: 'API error budget', state: 'Working', due: 'Today 6pm', comments: 12, progress: '6/9', priority: 'High' },
      { title: 'Security headers audit', state: 'Pending', due: 'Thu 11am', comments: 4, progress: '2/8', priority: 'Medium' },
      { title: 'Landing hero animation', state: 'Working', due: 'Fri 4pm', comments: 9, progress: '5/9', priority: 'Medium' },
      { title: 'Ops runbook refresh', state: 'Complete', due: 'Done', comments: 2, progress: '9/9', priority: 'Low' },
      { title: 'Error page UX', state: 'Working', due: 'Sat 2pm', comments: 6, progress: '4/8', priority: 'High' },
      { title: 'Payments QA', state: 'Pending', due: 'Mon', comments: 8, progress: '1/6', priority: 'Medium' },
      { title: 'Data sync retry', state: 'Working', due: 'Today', comments: 11, progress: '7/10', priority: 'High' },
      { title: 'SEO checklist', state: 'Complete', due: 'Done', comments: 1, progress: '8/8', priority: 'Low' },
      { title: 'Dashboard copy polish', state: 'Pending', due: 'Tomorrow', comments: 3, progress: '2/5', priority: 'Low' },
      { title: 'Notifications rules', state: 'Working', due: 'Sun', comments: 4, progress: '5/7', priority: 'Medium' },
    ],
    teamCards: [
      { name: 'Ava Watson', role: 'Lead Analyst', projects: 4 },
      { name: 'Noah Singh', role: 'Product Lead', projects: 3 },
      { name: 'Mila Carter', role: 'Eng Manager', projects: 5 },
      { name: 'Priya Rao', role: 'UX Lead', projects: 2 },
      { name: 'Leo Martin', role: 'Data Engineer', projects: 3 },
      { name: 'Alex Green', role: 'QA Specialist', projects: 4 },
      { name: 'Maya Flores', role: 'Frontend', projects: 3 },
      { name: 'Omar Khalid', role: 'Security', projects: 2 },
    ],
    analysts: [
      { name: 'Ava Watson', project: 'Shreyu - Design Updates', focus: 'UX QA' },
      { name: 'Noah Singh', project: 'Prompt v2.0', focus: 'Roadmap' },
      { name: 'Mila Carter', project: 'Hyper React v4.0', focus: 'Delivery' },
      { name: 'Ivy Chen', project: 'Pulse AI', focus: 'Research' },
      { name: 'Ethan Shaw', project: 'Data Lake', focus: 'Scaling' },
      { name: 'Sophia Lee', project: 'Reporting Hub', focus: 'Analytics' },
    ],
    pulses: {
      dashboard: { value: '12 KPIs live', note: 'All systems stable' },
      projects: { value: '6 active', note: '3 shipping this week' },
      tasks: { value: '47 open', note: '0 blockers' },
      reports: { value: 'Accuracy 98%', note: 'Auto refreshed' },
      settings: { value: '5 feature flags', note: '99.9% uptime' },
      team: { value: '18 members', note: 'New on-call shift' },
    },
    projects: [
      { name: 'Shreyu - Design Updates', badge: 'blue', status: 'Designing', analyst: 'Ava Watson', progress: 78, progressColor: 'var(--emerald)', team: 'Elizabeth, John, Alex' },
      { name: 'Prompt v2.0', badge: 'orange', status: 'Planning', analyst: 'Noah Singh', progress: 54, progressColor: 'var(--imperial-red)', team: 'Elizabeth, John, Priya' },
      { name: 'Hyper React v4.0', badge: 'cyan', status: 'Development', analyst: 'Mila Carter', progress: 63, progressColor: 'var(--sunglow)', team: 'Elizabeth, John, Leo' },
    ],
    teams: [
      { project: 'Shreyu - Design Updates', analyst: 'Ava Watson', members: 'Elizabeth, John, Alex' },
      { project: 'Prompt v2.0', analyst: 'Noah Singh', members: 'Elizabeth, John, Priya' },
      { project: 'Hyper React v4.0', analyst: 'Mila Carter', members: 'Elizabeth, John, Leo' },
    ],
  },
  {
    updatedAt: '2 mins ago',
    stats: { completion: 91, rating: 8.7, tasksDone: 35, tasksProgress: 14 },
    revenue: { value: 3450, week: 22, month: 3 },
    charts: {
      velocity: [75, 70, 90, 55, 81, 95],
      burndown: 58,
      capacity: 82,
    },
    reports: {
      performance: [65, 70, 74, 70, 79, 86, 82],
      quality: [76, 86, 72],
      sla: 88,
    },
    analystStats: {
      total: 6,
      active: 6,
      workload: [20, 16, 15, 13, 11, 10],
      velocity: [64, 66, 70, 72, 74, 76, 78],
    },
    projectsLive: [
      { name: 'Atlas Mobile', status: 'In Progress', badge: 'cyan', progress: 68, owner: 'Ava', eta: '2d' },
      { name: 'Nova Design Kit', status: 'Design', badge: 'blue', progress: 56, owner: 'Liam', eta: '4d' },
      { name: 'Prompt v2.0', status: 'Planning', badge: 'orange', progress: 60, owner: 'Noah', eta: '6d' },
      { name: 'Hyper React v4.0', status: 'Development', badge: 'cyan', progress: 70, owner: 'Mila', eta: '3d' },
      { name: 'Shreyu Updates', status: 'QA', badge: 'blue', progress: 86, owner: 'Ava', eta: '1d' },
      { name: 'Pulse AI', status: 'Research', badge: 'orange', progress: 38, owner: 'Ivy', eta: '2w' },
      { name: 'Data Lake', status: 'In Progress', badge: 'cyan', progress: 76, owner: 'Ethan', eta: '5d' },
      { name: 'Reporting Hub', status: 'QA', badge: 'green', progress: 89, owner: 'Sophia', eta: '1d' },
      { name: 'Billing Edge', status: 'Review', badge: 'orange', progress: 63, owner: 'Luca', eta: '4d' },
      { name: 'Notification Core', status: 'In Progress', badge: 'cyan', progress: 65, owner: 'Mia', eta: '3d' },
      { name: 'Search Revamp', status: 'Design', badge: 'blue', progress: 49, owner: 'Zane', eta: '5d' },
      { name: 'Security Hardening', status: 'Planning', badge: 'red', progress: 32, owner: 'Omar', eta: '3w' },
    ],
    tasksLive: [
      { title: 'Draft new SOW', state: 'Working', due: 'Today 10pm', comments: 22, progress: '4/7', priority: 'High' },
      { title: 'iOS home redesign', state: 'Working', due: 'Today 5pm', comments: 6, progress: '10/11', priority: 'Medium' },
      { title: 'Enable analytics tracking', state: 'Pending', due: 'Tomorrow 5pm', comments: 7, progress: '5/11', priority: 'Medium' },
      { title: 'Kanban board design', state: 'Pending', due: 'Sep 11, 3pm', comments: 3, progress: '0/5', priority: 'Low' },
      { title: 'API error budget', state: 'Working', due: 'Today 6pm', comments: 13, progress: '7/9', priority: 'High' },
      { title: 'Security headers audit', state: 'Pending', due: 'Thu 11am', comments: 4, progress: '2/8', priority: 'Medium' },
      { title: 'Landing hero animation', state: 'Working', due: 'Fri 4pm', comments: 10, progress: '6/9', priority: 'Medium' },
      { title: 'Ops runbook refresh', state: 'Complete', due: 'Done', comments: 2, progress: '9/9', priority: 'Low' },
      { title: 'Error page UX', state: 'Working', due: 'Sat 2pm', comments: 7, progress: '5/8', priority: 'High' },
      { title: 'Payments QA', state: 'Pending', due: 'Mon', comments: 9, progress: '2/6', priority: 'Medium' },
      { title: 'Data sync retry', state: 'Working', due: 'Today', comments: 12, progress: '8/10', priority: 'High' },
      { title: 'SEO checklist', state: 'Complete', due: 'Done', comments: 1, progress: '8/8', priority: 'Low' },
      { title: 'Dashboard copy polish', state: 'Working', due: 'Tomorrow', comments: 3, progress: '3/5', priority: 'Low' },
      { title: 'Notifications rules', state: 'Working', due: 'Sun', comments: 5, progress: '6/7', priority: 'Medium' },
    ],
    teamCards: [
      { name: 'Ava Watson', role: 'Lead Analyst', projects: 5 },
      { name: 'Noah Singh', role: 'Product Lead', projects: 3 },
      { name: 'Mila Carter', role: 'Eng Manager', projects: 5 },
      { name: 'Priya Rao', role: 'UX Lead', projects: 3 },
      { name: 'Leo Martin', role: 'Data Engineer', projects: 4 },
      { name: 'Alex Green', role: 'QA Specialist', projects: 5 },
      { name: 'Maya Flores', role: 'Frontend', projects: 4 },
      { name: 'Omar Khalid', role: 'Security', projects: 2 },
    ],
    analysts: [
      { name: 'Ava Watson', project: 'Shreyu - Design Updates', focus: 'QA / UX' },
      { name: 'Noah Singh', project: 'Prompt v2.0', focus: 'Prioritization' },
      { name: 'Mila Carter', project: 'Hyper React v4.0', focus: 'Release' },
      { name: 'Ivy Chen', project: 'Pulse AI', focus: 'Research' },
      { name: 'Ethan Shaw', project: 'Data Lake', focus: 'Throughput' },
      { name: 'Sophia Lee', project: 'Reporting Hub', focus: 'Accuracy' },
    ],
    pulses: {
      dashboard: { value: '14 KPIs live', note: 'Latency under 110ms' },
      projects: { value: '7 active', note: '2 in QA' },
      tasks: { value: '52 open', note: '1 needs review' },
      reports: { value: 'Accuracy 99%', note: '4 reports regenerated' },
      settings: { value: '6 feature flags', note: 'Config synced' },
      team: { value: '19 members', note: 'Ops team on-call' },
    },
    projects: [
      { name: 'Shreyu - Design Updates', badge: 'blue', status: 'QA', analyst: 'Ava Watson', progress: 82, progressColor: 'var(--emerald)', team: 'Elizabeth, John, Alex, Maya' },
      { name: 'Prompt v2.0', badge: 'orange', status: 'Planning', analyst: 'Noah Singh', progress: 58, progressColor: 'var(--imperial-red)', team: 'Elizabeth, John, Priya' },
      { name: 'Hyper React v4.0', badge: 'cyan', status: 'Development', analyst: 'Mila Carter', progress: 67, progressColor: 'var(--sunglow)', team: 'Elizabeth, John, Leo' },
    ],
    teams: [
      { project: 'Shreyu - Design Updates', analyst: 'Ava Watson', members: 'Elizabeth, John, Alex, Maya' },
      { project: 'Prompt v2.0', analyst: 'Noah Singh', members: 'Elizabeth, John, Priya' },
      { project: 'Hyper React v4.0', analyst: 'Mila Carter', members: 'Elizabeth, John, Leo' },
    ],
  },
  {
    updatedAt: '5 mins ago',
    stats: { completion: 86, rating: 8.2, tasksDone: 31, tasksProgress: 17 },
    revenue: { value: 2980, week: 15, month: -6 },
    charts: {
      velocity: [68, 60, 81, 49, 70, 85],
      burndown: 66,
      capacity: 74,
    },
    reports: {
      performance: [58, 64, 69, 63, 70, 76, 72],
      quality: [70, 80, 64],
      sla: 80,
    },
    analystStats: {
      total: 6,
      active: 5,
      workload: [16, 13, 14, 10, 9, 8],
      velocity: [60, 62, 64, 63, 65, 67, 66],
    },
    projectsLive: [
      { name: 'Atlas Mobile', status: 'In Progress', badge: 'cyan', progress: 60, owner: 'Ava', eta: '4d' },
      { name: 'Nova Design Kit', status: 'Design', badge: 'blue', progress: 44, owner: 'Liam', eta: '6d' },
      { name: 'Prompt v2.0', status: 'Planning', badge: 'orange', progress: 52, owner: 'Noah', eta: '1w' },
      { name: 'Hyper React v4.0', status: 'Development', badge: 'cyan', progress: 60, owner: 'Mila', eta: '6d' },
      { name: 'Shreyu Updates', status: 'Design', badge: 'blue', progress: 75, owner: 'Ava', eta: '3d' },
      { name: 'Pulse AI', status: 'Research', badge: 'orange', progress: 33, owner: 'Ivy', eta: '2w' },
      { name: 'Data Lake', status: 'In Progress', badge: 'cyan', progress: 68, owner: 'Ethan', eta: '1w' },
      { name: 'Reporting Hub', status: 'QA', badge: 'green', progress: 84, owner: 'Sophia', eta: '3d' },
      { name: 'Billing Edge', status: 'Review', badge: 'orange', progress: 56, owner: 'Luca', eta: '1w' },
      { name: 'Notification Core', status: 'In Progress', badge: 'cyan', progress: 58, owner: 'Mia', eta: '6d' },
      { name: 'Search Revamp', status: 'Design', badge: 'blue', progress: 38, owner: 'Zane', eta: '8d' },
      { name: 'Security Hardening', status: 'Planning', badge: 'red', progress: 24, owner: 'Omar', eta: '4w' },
    ],
    tasksLive: [
      { title: 'Draft new SOW', state: 'Pending', due: 'Today 10pm', comments: 18, progress: '2/7', priority: 'High' },
      { title: 'iOS home redesign', state: 'Working', due: 'Today 5pm', comments: 5, progress: '9/11', priority: 'Medium' },
      { title: 'Enable analytics tracking', state: 'Pending', due: 'Tomorrow 5pm', comments: 6, progress: '4/11', priority: 'Medium' },
      { title: 'Kanban board design', state: 'Pending', due: 'Sep 11, 3pm', comments: 2, progress: '0/5', priority: 'Low' },
      { title: 'API error budget', state: 'Working', due: 'Today 6pm', comments: 10, progress: '5/9', priority: 'High' },
      { title: 'Security headers audit', state: 'Pending', due: 'Thu 11am', comments: 3, progress: '2/8', priority: 'Medium' },
      { title: 'Landing hero animation', state: 'Working', due: 'Fri 4pm', comments: 8, progress: '4/9', priority: 'Medium' },
      { title: 'Ops runbook refresh', state: 'Complete', due: 'Done', comments: 2, progress: '9/9', priority: 'Low' },
      { title: 'Error page UX', state: 'Working', due: 'Sat 2pm', comments: 5, progress: '3/8', priority: 'High' },
      { title: 'Payments QA', state: 'Pending', due: 'Mon', comments: 7, progress: '1/6', priority: 'Medium' },
      { title: 'Data sync retry', state: 'Working', due: 'Today', comments: 9, progress: '6/10', priority: 'High' },
      { title: 'SEO checklist', state: 'Complete', due: 'Done', comments: 1, progress: '8/8', priority: 'Low' },
      { title: 'Dashboard copy polish', state: 'Pending', due: 'Tomorrow', comments: 3, progress: '2/5', priority: 'Low' },
      { title: 'Notifications rules', state: 'Working', due: 'Sun', comments: 4, progress: '4/7', priority: 'Medium' },
    ],
    teamCards: [
      { name: 'Ava Watson', role: 'Lead Analyst', projects: 4 },
      { name: 'Noah Singh', role: 'Product Lead', projects: 3 },
      { name: 'Mila Carter', role: 'Eng Manager', projects: 4 },
      { name: 'Priya Rao', role: 'UX Lead', projects: 2 },
      { name: 'Leo Martin', role: 'Data Engineer', projects: 3 },
      { name: 'Alex Green', role: 'QA Specialist', projects: 4 },
      { name: 'Maya Flores', role: 'Frontend', projects: 3 },
      { name: 'Omar Khalid', role: 'Security', projects: 2 },
    ],
    analysts: [
      { name: 'Ava Watson', project: 'Shreyu - Design Updates', focus: 'UX' },
      { name: 'Noah Singh', project: 'Prompt v2.0', focus: 'Discovery' },
      { name: 'Mila Carter', project: 'Hyper React v4.0', focus: 'Delivery' },
      { name: 'Ivy Chen', project: 'Pulse AI', focus: 'Research' },
      { name: 'Ethan Shaw', project: 'Data Lake', focus: 'Pipelines' },
      { name: 'Sophia Lee', project: 'Reporting Hub', focus: 'Analytics' },
    ],
    pulses: {
      dashboard: { value: '10 KPIs live', note: '2 checks queued' },
      projects: { value: '5 active', note: '1 launch ready' },
      tasks: { value: '49 open', note: 'Monitoring SLA' },
      reports: { value: 'Accuracy 97%', note: '1 report pending' },
      settings: { value: '5 feature flags', note: 'Change window' },
      team: { value: '18 members', note: 'Pairing in progress' },
    },
    projects: [
      { name: 'Rudra - Design Updates', badge: 'blue', status: 'Designing', analyst: 'Ava Watson', progress: 75, progressColor: 'var(--emerald)', team: 'Elizabeth, John, Alex' },
      { name: 'Prompt v2.0', badge: 'orange', status: 'Planning', analyst: 'Noah Singh', progress: 52, progressColor: 'var(--imperial-red)', team: 'Elizabeth, John, Priya' },
      { name: 'Hyper React v4.0', badge: 'cyan', status: 'Development', analyst: 'Mila Carter', progress: 60, progressColor: 'var(--sunglow)', team: 'Elizabeth, John, Leo' },
    ],
    teams: [
      { project: 'Rudra - Design Updates', analyst: 'Ava Watson', members: 'Elizabeth, John, Alex' },
      { project: 'Prompt v2.0', analyst: 'Noah Singh', members: 'Elizabeth, John, Priya' },
      { project: 'Hyper React v4.0', analyst: 'Mila Carter', members: 'Elizabeth, John, Leo' },
    ],
  },
];

let currentTaskFilter = 'All';
let latestTasks = [];
let latestProjectsLive = [];

const formatCurrency = value => `$${value.toLocaleString()}`;
const setProgress = (el, value, color) => {
  if (!el) return;
  el.style.setProperty('--width', `${value}%`);
  if (color) el.style.setProperty('--bg', color);
};

const stateColor = state => {
  if (state === 'Working') return 'cyan';
  if (state === 'Pending') return 'orange';
  if (state === 'Complete') return 'green';
  return 'blue';
};

function renderVelocity(values) {
  if (!velocityBars) return;
  velocityBars.innerHTML = '';
  values.forEach((v, idx) => {
    const bar = document.createElement('span');
    bar.style.setProperty('--value', `${v}%`);
    bar.style.setProperty('--delay', `${idx * 0.05}s`);
    velocityBars.appendChild(bar);
  });
}

function renderBurndown(value, note) {
  if (burndownLine) {
    burndownLine.style.clipPath = `polygon(0 ${value}%, 25% ${value - 12}%, 50% ${value - 6}%, 75% ${value - 16}%, 100% ${value - 8}%, 100% 100%, 0 100%)`;
  }
  if (burndownNote) burndownNote.textContent = note || 'Week-over-week';
}

function renderCapacity(value, note) {
  if (donutFill) donutFill.style.background = `conic-gradient(var(--blue-ryb) 0deg, var(--blue-ryb) ${value * 3.6}deg, rgba(255,255,255,0.06) ${value * 3.6}deg)`;
  if (capacityValue) capacityValue.textContent = `${value}%`;
  if (capacityNote) capacityNote.textContent = note || 'Auto balanced';
}

function renderProjectsLive(list) {
  if (!liveProjectsList) return;
  latestProjectsLive = list;
  liveProjectsList.innerHTML = '';
  list.forEach(project => {
    const li = document.createElement('li');
    li.className = 'project-item';
    li.innerHTML = `
      <div class="card project-card mini" data-context="${project.name}">
        <div class="project-top">
          <div class="card-badge ${project.badge}">${project.status}</div>
          <span class="card-badge radius-pill">${project.eta}</span>
        </div>
        <h3 class="card-title">${project.name}</h3>
        <p class="project-analyst">Owner: ${project.owner}</p>
        <div class="progress-bar">
          <div class="progress" style="--width:${project.progress}%;"></div>
        </div>
      </div>`;
    li.addEventListener('click', () => openProjectModal(project));
    li.addEventListener('contextmenu', e => {
      e.preventDefault();
      openProjectModal(project);
    });
    liveProjectsList.appendChild(li);
  });
}

function updateTaskStats(list) {
  if (!taskTotal || !taskWorking || !taskComplete) return;
  const total = list.length;
  const working = list.filter(t => t.state === 'Working').length;
  const complete = list.filter(t => t.state === 'Complete').length;
  taskTotal.textContent = total;
  taskWorking.textContent = working;
  taskComplete.textContent = complete;
}

function renderTaskBoard(list) {
  if (!taskBoardLists?.length) return;
  const grouped = { Pending: [], Working: [], Complete: [] };
  list.forEach(task => {
    if (grouped[task.state]) grouped[task.state].push(task);
  });
  taskBoardLists.forEach(col => {
    const state = col.dataset.taskBoard;
    col.innerHTML = '';
    grouped[state]?.forEach(task => {
      const li = document.createElement('li');
      li.className = 'task-pill';
      li.innerHTML = `
        <div>${task.title}</div>
        <div class="meta">
          <span class="material-symbols-rounded icon" style="font-size:14px;">schedule</span>
          <span>${task.due}</span>
          <span>•</span>
          <span>${task.progress}</span>
        </div>
      `;
      col.appendChild(li);
    });
  });
}

function renderTasks(list, filterState = currentTaskFilter) {
  if (!tasksList) return;
  latestTasks = list;
  const filtered = filterState === 'All' ? list : list.filter(task => task.state === filterState);
  tasksList.innerHTML = '';
  filtered.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'tasks-item';
    li.innerHTML = `
      <div class="card task-card">
        <div class="card-input">
          <input type="checkbox" id="task-${idx}" ${task.state === 'Complete' ? 'checked' : ''}>
          <label for="task-${idx}" class="task-label">${task.title}</label>
        </div>
        <div class="card-badge radius-pill">${task.due}</div>
        <ul class="card-meta-list">
          <li><div class="meta-box icon-box"><span class="material-symbols-rounded  icon">list</span><span>${task.progress}</span></div></li>
          <li><div class="meta-box icon-box"><span class="material-symbols-rounded  icon">comment</span><data value="${task.comments}">${task.comments}</data></div></li>
          <li><div class="card-badge ${stateColor(task.state)}">${task.priority}</div></li>
        </ul>
      </div>`;
    tasksList.appendChild(li);
  });
  updateTaskStats(list);
  renderTaskBoard(list);
}

function renderTeamCards(list) {
  if (!teamCardsContainer) return;
  teamCardsContainer.innerHTML = '';
  list.forEach((member, idx) => {
    const card = document.createElement('div');
    card.className = 'team-card';
    card.dataset.extra = idx >= 6 ? 'true' : 'false';
    if (idx >= 6) card.classList.add('hidden');
    card.innerHTML = `
      <h3>${member.name}</h3>
      <p>${member.role}</p>
      <span class="badge">${member.projects} projects</span>
    `;
    teamCardsContainer.appendChild(card);
  });
}

function renderAnalysts(list) {
  if (!analystList) return;
  analystList.innerHTML = '';
  list.forEach(item => {
    const card = document.createElement('div');
    card.className = 'analyst-card';
    card.innerHTML = `
      <h3>${item.name}</h3>
      <p>${item.project}</p>
      <p>${item.focus}</p>
    `;
    analystList.appendChild(card);
  });
}

function renderSparkline(values) {
  if (!sparkline) return;
  sparkline.innerHTML = '';
  values.forEach(v => {
    const bar = document.createElement('span');
    bar.style.setProperty('--h', `${v}%`);
    sparkline.appendChild(bar);
  });
}

function renderQuality(values) {
  if (!qualityBars) return;
  qualityBars.innerHTML = '';
  values.forEach(v => {
    const bar = document.createElement('span');
    bar.style.setProperty('--w', `${v}%`);
    qualityBars.appendChild(bar);
  });
}

function renderAnalystWorkload(values) {
  if (!analystBars) return;
  analystBars.innerHTML = '';
  values.forEach((v, idx) => {
    const bar = document.createElement('span');
    bar.style.setProperty('--value', `${v}%`);
    bar.style.setProperty('--delay', `${idx * 0.05}s`);
    analystBars.appendChild(bar);
  });
}

function renderAnalystVelocity(values) {
  if (!analystSpark) return;
  analystSpark.innerHTML = '';
  values.forEach(v => {
    const bar = document.createElement('span');
    bar.style.setProperty('--h', `${v}%`);
    analystSpark.appendChild(bar);
  });
}

function openProjectModal(project) {
  if (!projectModal) return;
  projectModalTitle.textContent = project.name;
  projectModalStatus.textContent = `Status: ${project.status}`;
  projectModalOwner.textContent = `Owner: ${project.owner}`;
  projectModalEta.textContent = `ETA: ${project.eta}`;
  if (projectModalProgress) {
    projectModalProgress.style.setProperty('--width', `${project.progress}%`);
    projectModalProgress.style.setProperty('--bg', 'var(--blue-ryb)');
  }
  projectModal.classList.add('active');
}

function closeProjectModal() {
  if (projectModal) projectModal.classList.remove('active');
}

function updateStats(stats) {
  if (!stats) return;
  if (statNodes.completion) statNodes.completion.textContent = `${stats.completion}%`;
  if (statNodes.rating) statNodes.rating.textContent = stats.rating.toFixed(1);
  if (statNodes.tasksDone) statNodes.tasksDone.textContent = stats.tasksDone;
  if (statNodes.tasksProgress) statNodes.tasksProgress.textContent = stats.tasksProgress;
  setProgress(progressBars.completion, stats.completion, 'var(--blue-ryb)');
  setProgress(progressBars.rating, Math.min(100, stats.rating * 10), 'var(--coral)');
}

function updateRevenue(revenue) {
  if (!revenue) return;
  if (statNodes.revenue) statNodes.revenue.textContent = formatCurrency(revenue.value);
  if (statNodes.revenueWeek) statNodes.revenueWeek.textContent = `${revenue.week > 0 ? '+' : ''}${revenue.week}%`;
  if (statNodes.revenueMonth) statNodes.revenueMonth.textContent = `${revenue.month > 0 ? '+' : ''}${revenue.month}%`;
}

function updatePulses(pulses, updatedAt) {
  pulseCards.forEach(card => {
    const key = card.dataset.pulseCard;
    const valueNode = card.querySelector('[data-pulse-value]');
    const noteNode = card.querySelector('[data-pulse-note]');
    const timeNode = card.querySelector('[data-pulse-time]');
    const data = pulses?.[key];
    if (!data) return;
    if (valueNode) valueNode.textContent = data.value;
    if (noteNode) noteNode.textContent = data.note;
    if (timeNode) timeNode.textContent = `Updated ${updatedAt}`;
  });
}

function updateProjects(projects) {
  projects?.forEach((project, index) => {
    const card = projectCards[index];
    if (!card) return;
    const title = card.querySelector('[data-project-name]');
    const badge = card.querySelector('[data-project-status]');
    const analyst = card.querySelector('[data-project-analyst]');
    const progressValue = card.querySelector('[data-project-progress]');
    const progressBar = card.querySelector('[data-project-progress-bar]');
    const teamLine = card.querySelector('[data-project-team]');

    if (title) title.textContent = project.name;
    if (badge) {
      badge.textContent = project.status;
      badge.className = `card-badge ${project.badge}`;
    }
    if (analyst) analyst.textContent = `Analyst: ${project.analyst}`;
    if (progressValue) progressValue.textContent = `${project.progress}%`;
    if (progressBar) setProgress(progressBar, project.progress, project.progressColor);
    if (teamLine) teamLine.textContent = project.team;
  });
}

function renderTeams(teams, updatedAt) {
  if (!teamList || !teams) return;
  teamList.innerHTML = teamHeaderTemplate;
  teams.forEach(team => {
    const row = document.createElement('div');
    row.className = 'team-row';
    row.innerHTML = `<span>${team.project}</span><span>${team.analyst}</span><span>${team.members}</span>`;
    teamList.appendChild(row);
  });
  if (teamRefresh) teamRefresh.textContent = `Updated ${updatedAt}`;
}

function applySnapshot(snapshot) {
  if (!snapshot) return;
  updateStats(snapshot.stats);
  updateRevenue(snapshot.revenue);
  updatePulses(snapshot.pulses, snapshot.updatedAt);
  updateProjects(snapshot.projects);
  renderTeams(snapshot.teams, snapshot.updatedAt);
  renderVelocity(snapshot.charts?.velocity || []);
  renderBurndown(snapshot.charts?.burndown || 60, 'Week-over-week');
  renderCapacity(snapshot.charts?.capacity || 70, 'Auto balanced');
  renderProjectsLive(snapshot.projectsLive);
  renderTasks(snapshot.tasksLive);
  renderTeamCards(snapshot.teamCards);
  renderAnalysts(snapshot.analysts);
  renderSparkline(snapshot.reports?.performance || []);
  renderQuality(snapshot.reports?.quality || []);
  renderAnalystWorkload(snapshot.analystStats?.workload || []);
  renderAnalystVelocity(snapshot.analystStats?.velocity || []);
  if (analystTotal) analystTotal.textContent = snapshot.analystStats?.total ?? 0;
  if (analystActive) analystActive.textContent = snapshot.analystStats?.active ?? 0;
  if (velocityMeta) velocityMeta.textContent = `Updated ${snapshot.updatedAt}`;
  if (burndownMeta) burndownMeta.textContent = `Updated ${snapshot.updatedAt}`;
  if (capacityMeta) capacityMeta.textContent = `Updated ${snapshot.updatedAt}`;
  if (reportMeta) reportMeta.textContent = `Updated ${snapshot.updatedAt}`;
  if (reportNote) reportNote.textContent = 'Realtime throughput';
  if (qualityMeta) qualityMeta.textContent = `Updated ${snapshot.updatedAt}`;
  if (qualityNote) qualityNote.textContent = 'Defect trend';
  if (slaMeta) slaMeta.textContent = `Updated ${snapshot.updatedAt}`;
  if (slaNote) slaNote.textContent = 'Latency & uptime';
  if (slaFill) slaFill.style.width = `${snapshot.reports?.sla || 75}%`;
  if (analystWorkloadMeta) analystWorkloadMeta.textContent = `Updated ${snapshot.updatedAt}`;
  if (analystVelocityMeta) analystVelocityMeta.textContent = `Updated ${snapshot.updatedAt}`;
}

let snapshotIndex = 0;
applySnapshot(snapshots[snapshotIndex]);
setInterval(() => {
  snapshotIndex = (snapshotIndex + 1) % snapshots.length;
  applySnapshot(snapshots[snapshotIndex]);
}, 5000);

if (teamToggle && teamCardsContainer) {
  teamToggle.addEventListener('click', () => {
    teamCardsContainer.classList.toggle('expanded');
    const extras = teamCardsContainer.querySelectorAll('[data-extra="true"]');
    extras.forEach(card => card.classList.toggle('hidden'));
    teamToggle.querySelector('span').textContent = teamCardsContainer.classList.contains('expanded') ? 'View Less' : 'View More';
  });
}

if (taskFilterBtns?.length) {
  taskFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      currentTaskFilter = btn.dataset.taskFilter || 'All';
      taskFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTasks(latestTasks, currentTaskFilter);
    });
  });
}

if (projectModalClose?.length) {
  projectModalClose.forEach(btn => btn.addEventListener('click', closeProjectModal));
}
if (projectModal) {
  projectModal.addEventListener('click', e => {
    if (e.target.dataset.modalClose !== undefined || e.target === projectModal.querySelector('.modal-backdrop')) {
      closeProjectModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeProjectModal();
  });
}