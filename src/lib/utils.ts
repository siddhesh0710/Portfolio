import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export const portfolioData = {
  name: 'Siddhesh Tawde',
  title: 'Cloud Support Engineer',
  email: 'siddheshtawde01@gmail.com',
  phone: '8104787846',
  location: 'Mumbai, India',
  github: 'https://github.com/siddhesh0710',
  linkedin: 'https://www.linkedin.com/in/siddhesh-tawde10/',

  stats: [
    { label: 'Years Experience', value: 1, suffix: '+' },
    { label: 'Projects Built', value: 6, suffix: '+' },
    { label: 'AWS Services Used', value: 10, suffix: '+' },
    { label: 'Certificates', value: 3, suffix: '' },
  ],

  typingSequence: [
    'Cloud Support Engineer',
    2000,
    'AWS Specialist',
    2000,
    'Linux Administrator',
    2000,
    'DevOps Enthusiast',
    2000,
    'Infrastructure Automation',
    2000,
    'Terraform Engineer',
    2000,
  ],

  about: `I'm a dedicated Cloud Support Engineer with hands-on experience building and maintaining secure, scalable infrastructure across AWS, Docker, and Linux environments. I thrive at the intersection of cloud, automation, and DevOps — turning complex infrastructure challenges into elegant, automated solutions. Currently at Facts Online Pvt Ltd, I manage hybrid cloud environments, CI/CD pipelines, and everything in between.`,

  experience: [
    {
      id: 'exp-1',
      company: 'Facts Online Pvt Ltd',
      role: 'Cloud Support Engineer',
      period: '05/2025 – Present',
      location: 'Mumbai, India',
      type: 'Full-time',
      description: 'Supporting hybrid cloud and on-premises infrastructure environments with a focus on AWS, Linux, and DevOps automation.',
      highlights: [
        'Troubleshot AWS EC2 SSH/RDP connectivity issues by analyzing Security Groups, NACLs, routing tables, Internet Gateway configurations, and system logs',
        'Configured and maintained SSL/TLS certificates (Let\'s Encrypt/Certbot, CWP, cPanel, IIS) including renewals and HTTPS enforcement',
        'Managed hosting environments via CWP/cPanel migrations, deploying client websites and resolving DNS & infrastructure issues',
        'Implemented Docker-based environments using Docker Compose and Docker networking for scalable deployments',
        'Managed hybrid cloud infrastructure ensuring availability, security compliance, and performance optimization',
        'Performed Linux administration: SSH config, disk partitioning, swap management, firewall admin, and shell scripting',
      ],
      technologies: ['AWS EC2', 'Docker', 'Linux', 'SSL/TLS', 'cPanel', 'CWP', 'Nginx', 'Shell Scripting'],
      color: '#38BDF8',
    },
  ],

  projects: [
    {
      id: 'proj-1',
      title: 'AWS Infrastructure Provisioning & Automation',
      subtitle: 'Terraform IaC Pipeline',
      description: 'Provisioned and managed AWS infrastructure using Terraform, automating deployment of EC2 instances, VPCs, subnets, security groups, and IAM resources with full Infrastructure as Code practices.',
      longDescription: 'A comprehensive Infrastructure as Code project that automates the entire AWS infrastructure lifecycle. Features modular Terraform configurations, remote state management, and secure networking patterns.',
      image: '/projects/terraform.png',
      technologies: ['Terraform', 'AWS EC2', 'VPC', 'IAM', 'S3', 'Security Groups', 'Route Tables'],
      github: 'https://github.com/siddhesh0710',
      live: null,
      highlights: [
        'Automated EC2, VPC, subnet, and IAM resource provisioning',
        'Implemented IaC for scalable, repeatable cloud deployments',
        'Configured secure networking and access control policies',
        'Remote state management with S3 backend and DynamoDB locking',
      ],
      color: '#38BDF8',
      icon: '🏗️',
      category: 'Infrastructure',
    },
    {
      id: 'proj-2',
      title: 'Dockerized Application Deployment & CI/CD',
      subtitle: 'Automated Build Pipeline',
      description: 'Developed and deployed a Dockerized web application on AWS EC2 with Nginx reverse proxy, GitHub webhooks + Jenkins automation reducing deployment time by 40%, with full SSL, logging, and monitoring.',
      longDescription: 'End-to-end CI/CD automation for containerized applications. Features automated build triggers via GitHub webhooks, Jenkins pipeline orchestration, and comprehensive observability.',
      image: '/projects/docker-cicd.png',
      technologies: ['Docker', 'Jenkins', 'GitHub', 'Nginx', 'AWS EC2', 'Prometheus', 'Grafana', 'SSL/TLS'],
      github: 'https://github.com/siddhesh0710',
      live: null,
      highlights: [
        'Reduced deployment time by 40% via automation',
        'GitHub webhook + Jenkins CI/CD integration',
        'Docker Compose with Nginx reverse proxy',
        'Prometheus + Grafana monitoring stack',
      ],
      color: '#06B6D4',
      icon: '🐳',
      category: 'DevOps',
    },
    {
      id: 'proj-3',
      title: 'Hybrid Cloud Infrastructure Management',
      subtitle: 'Enterprise-grade Monitoring',
      description: 'Managed hybrid cloud and on-premises infrastructure with Proxmox VE, ensuring system availability, security compliance, and operational reliability across Linux-based environments.',
      longDescription: 'Comprehensive hybrid infrastructure management combining on-premises Proxmox virtualization with AWS cloud resources, with centralized monitoring and automated alerting.',
      image: '/projects/monitoring.png',
      technologies: ['Proxmox VE', 'Linux', 'AWS', 'Uptime Kuma', 'Grafana', 'RAID', 'VPN'],
      github: 'https://github.com/siddhesh0710',
      live: null,
      highlights: [
        'Managed Proxmox VE virtualization cluster',
        'RAID configuration and storage replication',
        'VPN tunnels for hybrid connectivity',
        'Uptime Kuma for real-time monitoring',
      ],
      color: '#22C55E',
      icon: '☁️',
      category: 'Infrastructure',
    },
    {
      id: 'proj-4',
      title: 'Linux Server Automation Suite',
      subtitle: 'Shell Scripting & Cron Jobs',
      description: 'Automated routine Linux administration tasks including disk management, user provisioning, firewall rules, log rotation, and system health checks using shell scripting and cron scheduling.',
      longDescription: 'A comprehensive automation suite for Linux server administration, reducing manual intervention and improving operational efficiency through intelligent scripting.',
      image: '/projects/linux.png',
      technologies: ['Bash', 'Linux', 'Cron', 'AWK', 'SED', 'Firewalld', 'Logrotate', 'Ansible'],
      github: 'https://github.com/siddhesh0710',
      live: null,
      highlights: [
        'Automated disk partitioning and swap management',
        'User/group lifecycle management scripts',
        'Firewall rule automation with logging',
        'Scheduled maintenance via cron jobs',
      ],
      color: '#F59E0B',
      icon: '🐧',
      category: 'Automation',
    },
  ],

  skills: {
    Cloud: ['AWS EC2', 'S3', 'IAM', 'VPC', 'ELB', 'Auto Scaling', 'CloudWatch', 'AWS CLI'],
    DevOps: ['Docker', 'Jenkins', 'GitHub', 'Ansible', 'Terraform', 'YAML', 'Dockerfile', 'CI/CD'],
    Linux: ['Ubuntu', 'CentOS', 'Shell Scripting', 'SSH', 'Cron', 'Systemd', 'Log Analysis', 'Firewalld'],
    Networking: ['DNS', 'VPN', 'Nginx', 'SSL/TLS', 'Reverse Proxy', 'NACLs', 'Security Groups'],
    Monitoring: ['Prometheus', 'Grafana', 'Uptime Kuma', 'CloudWatch', 'ELK Stack'],
    Virtualization: ['Proxmox VE', 'Docker', 'RAID Manager', 'Storage Replication', 'VM Management'],
  },

  certificates: [
    {
      id: 'cert-1',
      title: 'Linux Essentials',
      issuer: 'Linux Professional Institute',
      description: 'Linux administration, user management, permissions, shell scripting, process control, and troubleshooting.',
      icon: '🐧',
      color: '#F59E0B',
      skills: ['Linux Admin', 'Shell Scripting', 'User Management', 'Permissions'],
      year: '2024',
    },
    {
      id: 'cert-2',
      title: 'Cloud Computing',
      issuer: 'Cloud Institute',
      description: 'Cloud architecture, IaaS/PaaS/SaaS models, virtualization, storage, and networking fundamentals.',
      icon: '☁️',
      color: '#38BDF8',
      skills: ['Cloud Architecture', 'IaaS/PaaS/SaaS', 'Virtualization', 'Networking'],
      year: '2024',
    },
    {
      id: 'cert-3',
      title: 'DevOps with AWS',
      issuer: 'AWS Training',
      description: 'CI/CD pipelines, AWS services (EC2, S3, IAM), Infrastructure as Code (IaC), and version control systems.',
      icon: '🚀',
      color: '#22C55E',
      skills: ['CI/CD', 'AWS Services', 'IaC', 'Version Control'],
      year: '2024',
    },
  ],

  education: [
    {
      degree: 'Masters in Information Technology',
      institution: 'Pillai College',
      period: '2023 – 2025',
      grade: '8.30 CGPA',
      location: 'Mumbai',
    },
    {
      degree: 'Bachelor in Information Technology',
      institution: 'Pillai College',
      period: '2020 – 2023',
      grade: '7.47 CGPA',
      location: 'Mumbai',
    },
  ],

  terminalCommands: {
    whoami: `Siddhesh Tawde\nCloud Support Engineer\nAWS • Linux • Docker • Terraform`,
    help: `Available commands:\n  whoami    - About me\n  skills    - Technical skills\n  projects  - My projects\n  contact   - Get in touch\n  resume    - Download resume\n  clear     - Clear terminal\n  about     - More about me`,
    skills: `Cloud: AWS (EC2, S3, IAM, VPC, ELB, CloudWatch)\nDevOps: Docker, Jenkins, Terraform, Ansible, GitHub\nLinux: Ubuntu, CentOS, Shell Scripting, Cron, SSH\nMonitoring: Prometheus, Grafana, Uptime Kuma\nNetworking: DNS, VPN, Nginx, SSL/TLS`,
    projects: `1. AWS Infrastructure with Terraform\n2. Dockerized CI/CD Pipeline\n3. Hybrid Cloud Management\n4. Linux Automation Suite`,
    contact: `Email: siddheshtawde01@gmail.com\nPhone: +91 8104787846\nLocation: Mumbai, India\nGitHub: github.com/siddhesh0710`,
    about: `1 year of hands-on cloud experience\nSpecializing in AWS, Linux, Docker & Terraform\nPassionate about DevOps and automation\nCurrently @ Facts Online Pvt Ltd`,
    resume: `Initiating download...\n[████████████████████] 100%\nResume downloaded successfully!`,
  },
};
