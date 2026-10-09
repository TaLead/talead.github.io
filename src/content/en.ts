import type {
  Article,
  FocusIcon,
  MenuColumn,
  MenuFeatured,
  MenuItem,
  Pillar,
  PillarSlug,
  Product,
  Sector,
  SectorSlug,
  ArtName,
} from './types';

const pillars: Record<PillarSlug, Pillar> = {
  'artificial-intelligence': {
    meta: {
      title: 'Artificial Intelligence',
      description:
        'Arabic-first generative AI, AI agents, computer vision and data analytics, deployed in the Kingdom and governed responsibly.',
    },
    hero: {
      label: 'AI',
      title: 'AI that speaks your language and works on your data.',
      primary: 'Talk to an expert',
      secondary: 'Explore the suite',
      art: 'neural',
    },
    tiles: [
      {
        id: 'genai',
        tag: 'Generative AI',
        title: 'Generative AI & Agents',
        text: 'Arabic-first assistants and autonomous agents connected to your documents and systems. They answer with citations, draft and summarize, and complete tasks through your APIs.',
        mockup: {
          title: 'TALEAD Mind',
          subtitle: 'Enterprise assistant',
          chat: {
            user: 'Summarize the new procurement policy and list what changes for our department.',
            agent:
              'There are 4 changes for your department: approval limits, vendor onboarding, contract renewals and monthly reporting. Each point links to the policy section it comes from.',
            sources: ['Procurement Policy v3.pdf', 'Delegation Matrix.xlsx'],
            input: 'Ask anything about your organization…',
          },
        },
      },
      {
        id: 'vision',
        tag: 'Computer Vision',
        title: 'Computer Vision',
        text: 'Turn the cameras you already have into real-time insight: crowd and traffic analytics, safety compliance, asset inspection and smart-city operations.',
        mockup: {
          title: 'TALEAD Vision',
          subtitle: 'Live video analytics',
          tabs: ['Live', 'Alerts', 'Reports'],
          camera: { labels: ['Person 98%', 'Vehicle 95%', 'Helmet ✓'], caption: 'Gate 3 · Camera 12' },
          kpis: [
            { label: 'Cameras online', value: '248', tone: 'blue' },
            { label: 'Safety alerts', value: '3', tone: 'amber' },
            { label: 'Occupancy', value: '71%' },
          ],
        },
      },
      {
        id: 'data',
        tag: 'Data & Analytics',
        title: 'Data & Analytics',
        text: 'Modern data platforms, executive dashboards and predictive models that turn scattered data into decisions leadership can trust.',
        mockup: {
          title: 'Executive Dashboard',
          subtitle: 'Operations overview',
          tabs: ['Overview', 'Forecast', 'Regions'],
          kpis: [
            { label: 'Service requests', value: '12,480' },
            { label: 'Avg. resolution', value: '2.4 days', tone: 'blue' },
            { label: 'Satisfaction', value: '91%', tone: 'green' },
            { label: 'Q4 forecast', value: '+8%', tone: 'sky' },
          ],
          chart: { kind: 'line', label: 'Requests vs. forecast' },
        },
      },
      {
        id: 'governance',
        tag: 'Governance',
        title: 'AI Strategy & Governance',
        text: 'From use-case discovery to responsible-AI frameworks aligned with national AI ethics principles, so you can scale AI with confidence.',
        mockup: {
          title: 'Model Registry',
          subtitle: 'Responsible AI',
          kpis: [
            { label: 'Models in use', value: '14' },
            { label: 'Under review', value: '2', tone: 'amber' },
            { label: 'Policy coverage', value: '100%', tone: 'green' },
          ],
          rows: [
            { title: 'Citizen services assistant', meta: 'LLM · Production', pill: 'Low risk', tone: 'green' },
            { title: 'Document classifier', meta: 'NLP · Production', pill: 'Low risk', tone: 'green' },
            { title: 'Fraud scoring model', meta: 'ML · In review', pill: 'High risk', tone: 'red' },
            { title: 'Demand forecaster', meta: 'ML · Pilot', pill: 'Medium', tone: 'amber' },
          ],
        },
      },
    ],
    capabilities: {
      eyebrow: 'Capabilities',
      titleA: 'Intelligence for',
      titleB: 'every workflow.',
      quote: '“Summarize this contract and flag what needs legal review.”',
      items: [
        { cat: 'Generative AI', text: 'Retrieval-augmented assistants over your enterprise knowledge' },
        { cat: 'Generative AI', text: 'AI agents that act securely through your APIs' },
        { cat: 'Language', text: 'Arabic document intelligence, OCR and summarization' },
        { cat: 'Language', text: 'Speech-to-text and voice assistants for Arabic dialects' },
        { cat: 'Vision', text: 'Video analytics at the edge for safety and operations' },
        { cat: 'Vision', text: 'Automated visual inspection of assets and infrastructure' },
        { cat: 'Data', text: 'Forecasting, anomaly detection and predictive maintenance' },
        { cat: 'Data', text: 'Unified data platforms and executive dashboards' },
        { cat: 'MLOps', text: 'Model deployment, monitoring and lifecycle management' },
        { cat: 'Governance', text: 'AI readiness assessments and responsible-AI frameworks' },
      ],
    },
    proof: {
      eyebrow: 'Our commitment',
      titleA: 'AI that',
      titleB: 'delivers at scale.',
      subtitle: 'What every TALEAD AI engagement is built on.',
      stats: [
        { tag: 'Sovereign', value: 'KSA', label: 'Hosting options that keep your data inside the Kingdom' },
        { tag: 'Language', value: 'AR / EN', label: 'Bilingual by design, Arabic-first by default' },
        { tag: 'Trust', value: 'Cited', label: 'Generated answers linked to sources you can verify' },
        { tag: 'Control', value: 'Human', label: 'People approve every action that matters' },
        { tag: 'Delivery', value: 'Weeks', label: 'From first use case to a working pilot' },
        { tag: 'Scope', value: 'End-to-end', label: 'Strategy, data, models, apps and operations' },
      ],
    },
    comparison: {
      left: {
        title: 'Generic AI Tools',
        items: [
          'Data sent to services outside the Kingdom',
          'Weak understanding of Arabic',
          'Answers you cannot trace or verify',
          'Pilots that never reach production',
          'No link to your systems or workflows',
        ],
      },
      right: {
        title: 'AI',
        items: [
          'Deploy in-Kingdom, on-premises or on sovereign cloud',
          'Arabic-first models and interfaces',
          'Grounded answers with citations',
          'A clear path from pilot to production',
          'Agents connected to your systems through secure APIs',
          'Governance and human oversight built in',
        ],
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'Can your AI solutions run entirely inside Saudi Arabia?',
          a: 'Yes. We design deployments for in-Kingdom cloud regions, sovereign cloud or fully on-premises environments, depending on your data classification and regulatory requirements.',
        },
        {
          q: 'Do your assistants work well in Arabic?',
          a: 'Our solutions are designed Arabic-first: interfaces, prompts, retrieval and evaluation are built and tested on Arabic content, alongside English.',
        },
        {
          q: 'How do you keep generated answers accurate?',
          a: 'We ground responses in your approved sources, show citations with every answer, and set up evaluation and human review so quality is measured, not assumed.',
        },
        {
          q: 'Where should we start with AI?',
          a: 'Most clients start with a short readiness assessment and one or two high-value use cases. We deliver a working pilot, measure its impact, then scale what works.',
        },
        {
          q: 'How do you handle AI governance and ethics?',
          a: 'We help you put policies, risk classification, model documentation and monitoring in place, aligned with national AI ethics principles and your internal controls.',
        },
      ],
    },
    cta: {
      titleA: 'Put AI to work across',
      titleB: 'your entire organization.',
      text: 'Start with one use case, prove the value, and scale with a partner that stays accountable.',
      button: 'Get started',
    },
  },

  cybersecurity: {
    meta: {
      title: 'Cybersecurity',
      description:
        '24/7 managed SOC, penetration testing, GRC and identity security, aligned with NCA ECC, SAMA CSF and PDPL.',
    },
    hero: {
      label: 'CYBER',
      title: 'Security operations that never sleep, built for the Kingdom.',
      primary: 'Talk to an expert',
      secondary: 'Explore the suite',
      art: 'shield',
    },
    tiles: [
      {
        id: 'soc',
        tag: 'Detect & Respond',
        title: 'Managed SOC',
        text: 'A 24/7 security operations center that collects your logs, correlates alerts, hunts for threats and responds, with analysts who know your environment.',
        mockup: {
          title: 'TALEAD Shield',
          subtitle: 'Security operations overview',
          tabs: ['Last 24h', '7 days', '30 days'],
          kpis: [
            { label: 'Events analyzed', value: '1.2M' },
            { label: 'Open incidents', value: '7', tone: 'amber' },
            { label: 'Critical', value: '1', tone: 'red' },
            { label: 'Time to respond', value: '18 min', tone: 'blue' },
          ],
          rows: [
            { title: 'Suspicious sign-in from a new country', meta: 'Identity · 2 min ago', pill: 'Critical', tone: 'red' },
            { title: 'Malware blocked on endpoint', meta: 'EDR · 14 min ago', pill: 'Contained', tone: 'green' },
            { title: 'Unusual data transfer volume', meta: 'Network · 31 min ago', pill: 'Investigating', tone: 'amber' },
          ],
        },
      },
      {
        id: 'offensive',
        tag: 'Offensive',
        title: 'Offensive Security',
        text: 'Penetration testing, red teaming and secure code reviews that show exactly how an attacker could get in, and how to stop them.',
        mockup: {
          title: 'Penetration Test',
          subtitle: 'Customer portal · Web & API',
          kpis: [
            { label: 'Findings', value: '14' },
            { label: 'Critical', value: '2', tone: 'red' },
            { label: 'Retested', value: '9', tone: 'green' },
          ],
          rows: [
            { title: 'Broken access control on orders API', meta: 'OWASP A01', pill: 'Critical', tone: 'red' },
            { title: 'Stored XSS in profile page', meta: 'OWASP A03', pill: 'High', tone: 'amber' },
            { title: 'Verbose error messages', meta: 'OWASP A05', pill: 'Fixed', tone: 'green' },
          ],
        },
      },
      {
        id: 'grc',
        tag: 'Governance',
        title: 'GRC & Compliance',
        text: 'Map your controls to NCA ECC, SAMA CSF and PDPL, track remediation in one place and walk into every audit with evidence ready.',
        mockup: {
          title: 'TALEAD Comply',
          subtitle: 'Compliance posture',
          donut: {
            value: 86,
            label: 'Overall compliance',
            items: [
              { name: 'NCA ECC', value: 88 },
              { name: 'SAMA CSF', value: 81 },
              { name: 'PDPL', value: 92 },
            ],
          },
          rows: [
            { title: 'Quarterly access review', meta: 'Identity & access management', pill: 'Due in 5 days', tone: 'amber' },
            { title: 'Backup restoration test', meta: 'Resilience', pill: 'Complete', tone: 'green' },
          ],
        },
      },
      {
        id: 'identity',
        tag: 'Identity',
        title: 'Identity & Zero Trust',
        text: 'Least-privilege access, multi-factor authentication and privileged access management, so the right people reach the right systems, and nobody else.',
        mockup: {
          title: 'Access Assistant',
          subtitle: 'Identity & Zero Trust',
          chat: {
            user: 'Who has admin access to the finance systems?',
            agent:
              '6 accounts have admin rights. 2 have not signed in for 90 days and 1 has no MFA. I recommend removing the inactive accounts and enforcing MFA.',
            sources: ['Directory', 'PAM vault'],
            input: 'Ask about access across your environment…',
          },
        },
      },
    ],
    capabilities: {
      eyebrow: 'Capabilities',
      titleA: 'Eyes on',
      titleB: 'every threat.',
      quote: '“Show me what is actually exploitable, and what to fix first.”',
      items: [
        { cat: 'Detection', text: '24/7 log monitoring and SIEM correlation' },
        { cat: 'Response', text: 'Incident response with containment playbooks' },
        { cat: 'Threat intel', text: 'Threat hunting focused on regional threat actors' },
        { cat: 'Offensive', text: 'Web, mobile and API penetration testing' },
        { cat: 'Offensive', text: 'Red teaming and social-engineering exercises' },
        { cat: 'GRC', text: 'Gap assessments against NCA ECC and SAMA CSF' },
        { cat: 'Privacy', text: 'PDPL readiness and data-protection programs' },
        { cat: 'Identity', text: 'Privileged access management and MFA rollout' },
        { cat: 'Cloud', text: 'Cloud security posture management' },
        { cat: 'Awareness', text: 'Security awareness training in Arabic and English' },
      ],
    },
    proof: {
      eyebrow: 'Our commitment',
      titleA: 'Security that',
      titleB: 'scales with you.',
      subtitle: 'The commitments behind every TALEAD security service.',
      stats: [
        { tag: 'Monitoring', value: '24/7', label: 'Monitoring and response, every day of the year' },
        { tag: 'Sovereign', value: 'KSA', label: 'Security data handled inside the Kingdom' },
        { tag: 'Compliance', value: 'NCA', label: 'Controls mapped to national requirements from day one' },
        { tag: 'Reporting', value: 'AR / EN', label: 'Executive-ready reporting for every stakeholder' },
        { tag: 'Partner', value: '1', label: 'Accountable partner from assessment to response' },
        { tag: 'Coverage', value: '360°', label: 'Network, endpoint, cloud, identity and applications' },
      ],
    },
    comparison: {
      left: {
        title: 'Point Tools & Offshore Services',
        items: [
          'Alerts without context or action',
          'Logs and findings leave the Kingdom',
          'A separate vendor for every layer',
          'Compliance handled at the last minute',
          'Long reports nobody acts on',
        ],
      },
      right: {
        title: 'CYBER',
        items: [
          'Analysts who know your environment',
          'In-Kingdom data handling by design',
          'One partner across SOC, testing and GRC',
          'Controls mapped to NCA ECC, SAMA CSF and PDPL',
          'Prioritized fixes, not just findings',
          'Bilingual reporting for leaders and engineers',
        ],
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'Do you offer a fully managed 24/7 SOC?',
          a: 'Yes. We monitor, triage and respond around the clock. You can use our SOC fully managed, or as a co-managed extension of your in-house team.',
        },
        {
          q: 'Can you help us comply with NCA ECC and SAMA CSF?',
          a: 'We run gap assessments, build remediation roadmaps, implement controls and prepare the evidence you need for audits against NCA, SAMA and PDPL requirements.',
        },
        {
          q: 'Where is our security data stored?',
          a: 'Our services are designed so logs, findings and reports can stay inside the Kingdom, in line with your data classification and regulatory obligations.',
        },
        {
          q: 'How often should we run penetration tests?',
          a: 'At least once a year and after every major change. Many clients combine scheduled tests with continuous testing of internet-facing assets.',
        },
        {
          q: 'Can we start with a single service?',
          a: 'Absolutely. Many clients start with an assessment or a penetration test, then expand to managed detection and GRC once they see the value.',
        },
      ],
    },
    cta: {
      titleA: 'Protect what matters with',
      titleB: 'a partner that never sleeps.',
      text: 'See every threat, prove every control and keep your data in the Kingdom, with one accountable team.',
      button: 'Get started',
    },
  },

  'information-technology': {
    meta: {
      title: 'Information Technology',
      description:
        'Cloud and infrastructure, digital platforms, systems integration and managed IT services, delivered and operated end to end.',
    },
    hero: {
      label: 'IT',
      title: 'Resilient infrastructure and digital platforms that simply work.',
      primary: 'Talk to an expert',
      secondary: 'Explore the suite',
      art: 'grid',
    },
    tiles: [
      {
        id: 'cloud',
        tag: 'Cloud',
        title: 'Cloud & Infrastructure',
        text: 'Design, migration and operation of sovereign, hybrid and private cloud, data centers and networks, engineered for availability and cost efficiency.',
        mockup: {
          title: 'Infrastructure',
          subtitle: 'Hybrid cloud overview',
          tabs: ['Compute', 'Storage', 'Network'],
          kpis: [
            { label: 'Availability', value: '99.98%', tone: 'green' },
            { label: 'Workloads', value: '312' },
            { label: 'CPU load', value: '54%', tone: 'blue' },
            { label: 'Monthly cost', value: '−12%', tone: 'sky' },
          ],
          chart: { kind: 'bars', label: 'Utilization by cluster' },
        },
      },
      {
        id: 'platforms',
        tag: 'Digital',
        title: 'Digital Platforms',
        text: 'Government e-services, portals and mobile apps, designed Arabic-first, accessible to everyone and built to scale with demand.',
        mockup: {
          title: 'E-Services Portal',
          subtitle: 'Citizen services',
          kpis: [
            { label: 'Requests this month', value: '48,210' },
            { label: 'Completed online', value: '93%', tone: 'green' },
          ],
          rows: [
            { title: 'Issue a permit', meta: 'Average 4 minutes', pill: 'Online', tone: 'green' },
            { title: 'Renew a license', meta: 'Fully digital', pill: 'Online', tone: 'green' },
            { title: 'Track a request', meta: 'Real-time status', pill: 'Online', tone: 'green' },
            { title: 'Book an appointment', meta: 'Arabic & English', pill: 'New', tone: 'blue' },
          ],
        },
      },
      {
        id: 'integration',
        tag: 'Integration',
        title: 'Systems Integration',
        text: 'APIs and integration layers that connect ERP, CRM, legacy cores and national platforms into one seamless flow of data.',
        mockup: {
          title: 'Integration Hub',
          subtitle: 'APIs & data flows',
          kpis: [
            { label: 'API calls today', value: '2.3M' },
            { label: 'Error rate', value: '0.02%', tone: 'green' },
          ],
          flow: { hub: 'TALEAD Connect', nodes: ['ERP', 'CRM', 'HR', 'Data', 'Gov APIs', 'Mobile'] },
        },
      },
      {
        id: 'managed',
        tag: 'Operations',
        title: 'Managed IT Services',
        text: 'Service desk, monitoring and lifecycle management under clear service levels, so your teams can focus on the mission.',
        mockup: {
          title: 'Service Desk',
          subtitle: 'Managed IT services',
          tabs: ['Open', 'SLA', 'Assets'],
          kpis: [
            { label: 'Open tickets', value: '42' },
            { label: 'Within SLA', value: '98%', tone: 'green' },
            { label: 'First response', value: '9 min', tone: 'blue' },
          ],
          rows: [
            { title: 'VPN access for new employee', meta: 'Access · P3', pill: 'In progress', tone: 'blue' },
            { title: 'Email delivery delay', meta: 'Service · P2', pill: 'Assigned', tone: 'amber' },
            { title: 'Printer offline, floor 4', meta: 'Hardware · P4', pill: 'Resolved', tone: 'green' },
          ],
        },
      },
    ],
    capabilities: {
      eyebrow: 'Capabilities',
      titleA: 'Technology that',
      titleB: 'keeps you running.',
      quote: '“Move our core services to the cloud without any downtime.”',
      items: [
        { cat: 'Cloud', text: 'Cloud strategy, landing zones and migration' },
        { cat: 'Cloud', text: 'Sovereign and hybrid cloud operations' },
        { cat: 'Infrastructure', text: 'Data center design, build and modernization' },
        { cat: 'Network', text: 'Enterprise networks, SD-WAN and secure connectivity' },
        { cat: 'Digital', text: 'Web portals and government e-services' },
        { cat: 'Digital', text: 'Native and cross-platform mobile apps' },
        { cat: 'Integration', text: 'API management and enterprise integration' },
        { cat: 'Integration', text: 'ERP and CRM implementation and integration' },
        { cat: 'Operations', text: '24/7 monitoring and service desk' },
        { cat: 'Operations', text: 'IT asset and lifecycle management' },
      ],
    },
    proof: {
      eyebrow: 'Our commitment',
      titleA: 'IT that',
      titleB: 'never stands still.',
      subtitle: 'What every TALEAD technology engagement is built on.',
      stats: [
        { tag: 'Availability', value: '24/7', label: 'Monitoring and support for critical services' },
        { tag: 'Sovereign', value: 'KSA', label: 'In-Kingdom hosting and data residency options' },
        { tag: 'Design', value: 'AR / EN', label: 'Bilingual, accessible digital experiences' },
        { tag: 'Delivery', value: 'Agile', label: 'Iterative delivery with visible progress every sprint' },
        { tag: 'Operations', value: 'SLA', label: 'Clear service levels you can hold us to' },
        { tag: 'Scope', value: 'End-to-end', label: 'From design and build to run and optimize' },
      ],
    },
    comparison: {
      left: {
        title: 'Fragmented IT',
        items: [
          'Systems that do not talk to each other',
          'Multiple vendors and unclear ownership',
          'Manual processes and paper workflows',
          'Unplanned downtime and slow recovery',
          'Costs that grow without visibility',
        ],
      },
      right: {
        title: 'IT',
        items: [
          'Integrated platforms with one source of truth',
          'One accountable partner across build and run',
          'Automated, digital-first services',
          'Resilient architecture with tested recovery',
          'Transparent costs and continuous optimization',
          'Security built into every layer',
        ],
      },
    },
    faq: {
      title: 'Frequently Asked Questions',
      items: [
        {
          q: 'Can you migrate our systems without disrupting services?',
          a: 'Yes. We plan migrations in phases, with rehearsals, rollback plans and cut-over windows agreed with your teams, so critical services keep running.',
        },
        {
          q: 'Do you work with on-premises, cloud or both?',
          a: 'Both. We design and operate on-premises, private, public and sovereign cloud environments, and the hybrid models that connect them.',
        },
        {
          q: 'Can you build and run our digital services end to end?',
          a: 'We handle discovery, UX design, development, testing, launch and ongoing operation, including accessibility and Arabic-first design.',
        },
        {
          q: 'Can you integrate with national platforms and our ERP?',
          a: 'We build secure integration layers and APIs that connect your systems with each other and with the platforms you rely on.',
        },
        {
          q: 'What does a managed services engagement include?',
          a: 'Typically service desk, monitoring, patching, backup, asset management and regular reporting, all under agreed service levels.',
        },
      ],
    },
    cta: {
      titleA: 'Build a foundation',
      titleB: 'ready for what comes next.',
      text: 'Modernize, integrate and operate your technology with a partner that is accountable end to end.',
      button: 'Get started',
    },
  },
};

const sectors: Record<SectorSlug, Sector> = {
  government: {
    meta: {
      title: 'Government',
      description:
        'Sovereign, secure and intelligent digital services for ministries, authorities and public entities across Saudi Arabia.',
    },
    hero: {
      eyebrow: 'Government',
      title: 'Trusted Technology for Government.\nBuilt for Sovereignty.',
      text: 'From strategy to scale, TALEAD helps ministries, authorities and public entities deliver secure, intelligent digital services. Sovereign by design, compliant from day one, and built around the citizen.',
      art: 'government',
    },
    challenges: {
      eyebrow: 'Public sector transformation',
      title: 'Navigating Complexity in a\nNew Era of Digital Government',
      text: 'Public entities face growing expectations from citizens and leadership alike, while their systems grow more complex and the threats against them more sophisticated.',
      cards: [
        {
          title: 'Fragmented Systems and Data',
          text: 'Services built over years on disconnected platforms make it hard to share data, measure performance and deliver one seamless citizen experience.',
        },
        {
          title: 'A Rising Cyber Threat Landscape',
          text: 'Government entities are prime targets. Meeting national cybersecurity controls while keeping services available demands round-the-clock vigilance.',
        },
        {
          title: 'Pressure to Innovate Responsibly',
          text: 'Leaders are asked to adopt AI quickly, while protecting privacy, ensuring transparency and keeping sensitive data inside the Kingdom.',
        },
      ],
    },
    solutions: {
      eyebrow: 'Built for sovereignty. Designed for trust.',
      title: 'Solutions that Secure,\nServe and Scale',
      cards: [
        {
          title: 'Build Your Digital Government on Sovereign Foundations',
          text: 'Sovereign and hybrid cloud, secure networks and a 24/7 security operations center, deployed in-Kingdom and aligned with national requirements.',
          art: 'datacenter',
        },
        {
          title: 'Serve Citizens with Intelligent Services',
          text: 'Arabic-first AI assistants, digital e-services and analytics that make every interaction faster and every decision better informed.',
          art: 'city',
        },
      ],
    },
    impact: {
      eyebrow: 'Intelligence for national impact',
      title: 'From Insight to Impact:\nEnabling the Next Era of Governance.',
      text: 'TALEAD partners with public entities to turn national priorities into working services. Rooted in Saudi expertise and driven by Vision 2030, we combine technology, AI and security to turn strategy into measurable outcomes.',
      art: 'control',
      chips: [],
    },
    cta: {
      title: 'Let’s Build Tomorrow’s\nGovernment, Today.',
      text: 'Together, we can shape services that are transparent, efficient and deeply human. TALEAD stands ready to help your entity lead with confidence.',
      button: 'Connect Now',
    },
  },
  'private-sector': {
    meta: {
      title: 'Private Sector',
      description:
        'Cloud, integration, cybersecurity and AI solutions that help Saudi enterprises modernize, protect and grow.',
    },
    hero: {
      eyebrow: 'Private sector',
      title: 'Enterprise Technology that\nMoves Business Forward.',
      text: 'TALEAD helps enterprises modernize their core, protect what they build and put AI to work, with one partner accountable for results.',
      art: 'enterprise',
    },
    challenges: {
      eyebrow: 'Enterprise transformation',
      title: 'Growing Fast in a\nWorld That Moves Faster',
      text: 'Markets shift overnight, customers expect digital-first experiences, and every new system widens the attack surface.',
      cards: [
        {
          title: 'Legacy Systems Slowing Growth',
          text: 'Aging platforms and manual processes make every change slow and costly, holding back new products and better customer experiences.',
        },
        {
          title: 'An Expanding Attack Surface',
          text: 'Cloud, remote work and connected devices create new entry points for attackers, while regulators expect stronger controls.',
        },
        {
          title: 'AI Ambition Without a Clear Path',
          text: 'Leaders see the potential of AI, but struggle to move from experiments to solutions that deliver measurable returns.',
        },
      ],
    },
    solutions: {
      eyebrow: 'Built for growth. Designed for trust.',
      title: 'Solutions that Modernize,\nProtect and Grow',
      cards: [
        {
          title: 'Modernize Your Core with Cloud and Integration',
          text: 'Move to resilient cloud infrastructure, connect your ERP, CRM and legacy systems, and automate the workflows that slow you down.',
          art: 'network',
        },
        {
          title: 'Turn Data and AI into Competitive Advantage',
          text: 'From predictive analytics to generative AI assistants, we build solutions that cut costs, delight customers and open new revenue.',
          art: 'waves',
        },
      ],
    },
    impact: {
      eyebrow: 'Industries we serve',
      title: 'Built for the Industries\nShaping the Kingdom’s Economy.',
      text: 'We work with organizations across banking and fintech, energy and utilities, healthcare, retail, real estate, telecom, logistics and education, adapting every solution to the regulations and realities of each industry.',
      art: 'mosaic',
      chips: [
        'Banking & Fintech',
        'Energy & Utilities',
        'Healthcare',
        'Retail & E-commerce',
        'Real Estate',
        'Telecom',
        'Logistics',
        'Education',
      ],
    },
    cta: {
      title: 'Let’s Build What’s Next\nfor Your Business.',
      text: 'Whether you are modernizing, securing or scaling, TALEAD is ready to help you move faster, with confidence.',
      button: 'Connect Now',
    },
  },
};

const articles: Article[] = [
  {
    slug: 'leading-the-next-chapter',
    tag: 'Blog',
    readTime: 3,
    title: 'Leading the Next Chapter',
    excerpt: 'Why we built TALEAD: one Saudi partner for technology, AI and cybersecurity.',
    art: 'glassT',
    topic: 'BLOG',
    body: [
      'Every organization in the Kingdom is being asked to do more: deliver digital services faster, put artificial intelligence to work, and stay secure against threats that grow more sophisticated every month. Too often, that means juggling a long list of vendors, each responsible for one piece of the puzzle and nobody responsible for the whole.',
      'TALEAD was founded to change that. We bring information technology, artificial intelligence and cybersecurity together under one roof, so the people who design your platforms also understand how to secure them, and the people who secure them understand the data that makes AI useful.',
      '## Rooted in legacy, built to lead',
      'Our name comes from the Arabic word talead (تليد): a legacy that endures. We build on that spirit with modern engineering, combining a deep understanding of the local landscape with world-class practices.',
      'This is only the beginning. We will keep sharing what we learn along the way, from practical guides on compliance to perspectives on where AI is heading. Welcome to TALEAD.',
    ],
  },
  {
    slug: 'sovereign-ai',
    tag: 'Insight',
    readTime: 4,
    title: 'Sovereign AI: Why Where Your Models Run Matters',
    excerpt: 'Data residency, control and trust are becoming the foundations of every serious AI program.',
    art: 'neural',
    topic: 'AI',
    body: [
      'Generative AI has moved from experiment to boardroom priority in record time. But as organizations connect AI to sensitive documents, citizen records and financial data, one question matters more than any benchmark: where does the data go, and who controls the model?',
      '## Three questions to ask before you deploy',
      'First, where will prompts, documents and outputs be processed and stored? Second, can you audit what the model saw and why it answered the way it did? Third, can you switch models or providers without rebuilding everything?',
      'Sovereign AI answers these questions by design: models deployed in-Kingdom or on-premises, retrieval over your own approved sources, full logging, and an architecture that keeps you in control of your data and your choices.',
      'Sovereignty does not mean compromise. With the right architecture, organizations can use leading models while keeping sensitive workloads inside their own boundaries, and building Arabic-first experiences their users actually trust.',
    ],
  },
  {
    slug: 'nca-ecc-practical-path',
    tag: 'Guide',
    readTime: 5,
    title: 'A Practical Path to NCA ECC Compliance',
    excerpt: 'How to turn the Essential Cybersecurity Controls into a roadmap your teams can actually deliver.',
    art: 'shield',
    topic: 'CYBER',
    body: [
      'The Essential Cybersecurity Controls (ECC) published by the National Cybersecurity Authority set the baseline for cybersecurity across government entities and critical national infrastructure. For many teams, the challenge is not understanding the controls, but turning them into a plan that fits real budgets and timelines.',
      '## Start with an honest baseline',
      'A structured gap assessment shows where you stand control by control, with evidence. It turns a long list of requirements into a short list of priorities.',
      '## Prioritize by risk, not by checklist order',
      'Some gaps expose you far more than others. Identity, privileged access, logging and backups usually deliver the biggest risk reduction for the effort.',
      '## Make evidence a by-product of operations',
      'When monitoring, access reviews and change management run continuously, audit evidence stops being a last-minute scramble. That is where a managed SOC and a single GRC workspace pay off.',
    ],
  },
  {
    slug: 'zero-trust-government',
    tag: 'Insight',
    readTime: 4,
    title: 'Zero Trust for Government Entities: Where to Start',
    excerpt: 'Never trust, always verify: a pragmatic first step for public-sector networks.',
    art: 'circuit',
    topic: 'ZERO TRUST',
    body: [
      'Zero Trust is often presented as a product. In reality, it is a set of principles: verify every user and device explicitly, grant the least privilege needed, and assume that a breach is always possible.',
      '## Begin with identity',
      'Most attacks start with stolen or misused credentials. Strong multi-factor authentication, clean directories and tight control of privileged accounts deliver the fastest gains.',
      '## Segment what matters most',
      'Not every system needs the same protection. Identify the services and data that are most critical, and put them behind additional verification and monitoring.',
      'Zero Trust is a journey, not a switch. Entities that start small, measure progress and build on early wins move faster, and more safely, than those waiting for a perfect plan.',
    ],
  },
  {
    slug: 'genai-pilot-to-production',
    tag: 'Insight',
    readTime: 4,
    title: 'From Pilot to Production: Scaling Generative AI in the Enterprise',
    excerpt: 'Most AI pilots stall. Here is what the ones that scale do differently.',
    art: 'waves',
    topic: 'GEN AI',
    body: [
      'Building a generative AI demo takes days. Taking it to production, with real users, real data and real accountability, takes discipline. The difference is rarely the model; it is everything around it.',
      '## Pick use cases with a clear owner',
      'Successful programs start where there is a measurable pain point and a business owner who wants it solved, not where the technology looks most impressive.',
      '## Ground, evaluate, monitor',
      'Answers must be grounded in approved sources, evaluated against real questions and monitored after launch. Quality has to be measured continuously, not assumed.',
      '## Design for people',
      'The best AI products keep people in control: they show their sources, ask for approval before acting and make it easy to give feedback. Trust is what turns a pilot into a habit.',
    ],
  },
  {
    slug: 'arabic-first-digital-services',
    tag: 'Blog',
    readTime: 3,
    title: 'Designing Arabic-First Digital Services',
    excerpt: 'Great Arabic experiences are designed from the start, not translated at the end.',
    art: 'grid',
    topic: 'DIGITAL',
    body: [
      'Many digital services are designed in English and translated into Arabic at the end. Users notice: layouts that break in right-to-left, awkward wording and forms that reject Arabic names.',
      '## Right-to-left is a design decision',
      'Arabic-first design means layouts, icons, navigation and data visualizations that feel natural in right-to-left from the first sketch, with English as an equal second language.',
      '## Content is part of the product',
      'Clear, plain Arabic reduces calls, errors and abandoned requests. Writing and testing content with real users is as important as writing code.',
      'When digital services feel native, adoption follows. That is how e-services become the preferred channel, not just the available one.',
    ],
  },
];

const products: Product[] = [
  {
    name: 'TALEAD Shield',
    tag: 'Cybersecurity',
    text: 'The managed detection and response platform behind our 24/7 security operations center.',
    art: 'shield',
    href: '/solutions/cybersecurity#soc',
  },
  {
    name: 'TALEAD Comply',
    tag: 'Cybersecurity',
    text: 'A governance, risk and compliance workspace for NCA ECC, SAMA CSF and PDPL.',
    art: 'mosaic',
    href: '/solutions/cybersecurity#grc',
  },
  {
    name: 'TALEAD Mind',
    tag: 'Artificial Intelligence',
    text: 'An Arabic-first platform for enterprise assistants and AI agents.',
    art: 'neural',
    href: '/solutions/artificial-intelligence#genai',
  },
  {
    name: 'TALEAD Vision',
    tag: 'Artificial Intelligence',
    text: 'Video analytics that turn existing cameras into real-time insight.',
    art: 'city',
    href: '/solutions/artificial-intelligence#vision',
  },
  {
    name: 'TALEAD Insight',
    tag: 'Data',
    text: 'Executive dashboards and predictive analytics on one data platform.',
    art: 'waves',
    href: '/solutions/artificial-intelligence#data',
  },
  {
    name: 'TALEAD Connect',
    tag: 'Information Technology',
    text: 'An integration and API layer that links your systems with each other and with national platforms.',
    art: 'network',
    href: '/solutions/information-technology#integration',
  },
];

const solutionsMenu: { featured: MenuFeatured; columns: MenuColumn[] } = {
  featured: { eyebrow: 'Portfolio overview', title: 'One Partner.\nEvery Layer.', href: '/solutions' },
  columns: [
    {
      title: 'Artificial Intelligence',
      href: '/solutions/artificial-intelligence',
      items: [
        { title: 'Generative AI & Agents', desc: 'Arabic-first assistants that take action', href: '/solutions/artificial-intelligence#genai' },
        { title: 'Computer Vision', desc: 'Turn cameras into real-time insight', href: '/solutions/artificial-intelligence#vision' },
        { title: 'Data & Analytics', desc: 'From scattered data to clear decisions', href: '/solutions/artificial-intelligence#data' },
        { title: 'AI Strategy & Governance', desc: 'Responsible AI, from roadmap to scale', href: '/solutions/artificial-intelligence#governance' },
      ],
    },
    {
      title: 'Cybersecurity',
      href: '/solutions/cybersecurity',
      items: [
        { title: 'Managed SOC', desc: '24/7 detection and response', href: '/solutions/cybersecurity#soc' },
        { title: 'Offensive Security', desc: 'Find the gaps before attackers do', href: '/solutions/cybersecurity#offensive' },
        { title: 'GRC & Compliance', desc: 'NCA, SAMA and PDPL readiness', href: '/solutions/cybersecurity#grc' },
        { title: 'Identity & Zero Trust', desc: 'The right access for the right people', href: '/solutions/cybersecurity#identity' },
      ],
    },
    {
      title: 'Information Technology',
      href: '/solutions/information-technology',
      items: [
        { title: 'Cloud & Infrastructure', desc: 'Sovereign, hybrid and resilient', href: '/solutions/information-technology#cloud' },
        { title: 'Digital Platforms', desc: 'E-services, portals and mobile apps', href: '/solutions/information-technology#platforms' },
        { title: 'Systems Integration', desc: 'Connect every system you run', href: '/solutions/information-technology#integration' },
        { title: 'Managed IT Services', desc: 'Operate, monitor and optimize', href: '/solutions/information-technology#managed' },
      ],
    },
  ],
};

const sectorsMenu: { featured: MenuFeatured; items: MenuItem[] } = {
  featured: { eyebrow: 'Sectors', title: 'TALEAD,\nby Sector', href: '/sectors/government' },
  items: [
    { title: 'Government', desc: 'Sovereign, secure technology for ministries and agencies.', href: '/sectors/government' },
    { title: 'Private Sector', desc: 'AI, security and IT that help enterprises grow with confidence.', href: '/sectors/private-sector' },
  ],
};

const companyMenu: { featured: MenuFeatured; items: MenuItem[] } = {
  featured: { eyebrow: 'Company', title: 'Rooted in Legacy.\nBuilt to Lead.', href: '/about' },
  items: [
    { title: 'About', desc: 'Who we are and what we believe.', href: '/about' },
    { title: 'Careers', desc: 'Build the Kingdom’s digital future with us.', href: '/careers' },
    { title: 'Contact', desc: 'Get in touch.', href: '/contact' },
  ],
};

const focusItems: { eyebrow: string; title: string; text: string; icon: FocusIcon; href: string }[] = [
  {
    eyebrow: 'Intelligence with purpose',
    title: 'Artificial Intelligence',
    text: '**We build AI that works in Arabic, on your data and within your rules.** From generative AI assistants and autonomous agents to computer vision and predictive analytics, we take AI from promising pilot to measurable production: governed, explainable and secure.',
    icon: 'ai',
    href: '/solutions/artificial-intelligence',
  },
  {
    eyebrow: 'Defense that never sleeps',
    title: 'Cybersecurity',
    text: 'Security is not a product you buy once; it is a discipline you practice every day. **Our security operations team monitors, hunts and responds around the clock,** while our offensive and GRC specialists find the gaps and close them, **aligned with NCA, SAMA and PDPL requirements.**',
    icon: 'shield',
    href: '/solutions/cybersecurity',
  },
  {
    eyebrow: 'The foundation of everything',
    title: 'Cloud & Infrastructure',
    text: 'We design, migrate and operate the infrastructure your services run on. **From sovereign and hybrid cloud to data centers, networks and end-user computing,** every environment is engineered for high availability, performance and the lowest total cost of ownership.',
    icon: 'cloud',
    href: '/solutions/information-technology#cloud',
  },
  {
    eyebrow: 'Experiences people trust',
    title: 'Digital Platforms',
    text: '**Government e-services, enterprise portals and mobile apps, designed Arabic-first and built for scale.** We integrate the systems you already run, from ERP to legacy cores and national platforms, so every service feels like one.',
    icon: 'layers',
    href: '/solutions/information-technology#platforms',
  },
];

const pillarCards: { slug: PillarSlug; tag: string; title: string; text: string; art: ArtName }[] = [
  {
    slug: 'artificial-intelligence',
    tag: 'Intelligence',
    title: 'Artificial Intelligence',
    text: 'Generative AI, agents, computer vision and analytics, built Arabic-first and deployed where your data lives.',
    art: 'neural',
  },
  {
    slug: 'cybersecurity',
    tag: 'Protection',
    title: 'Cybersecurity',
    text: 'A 24/7 SOC, offensive security, GRC and identity, aligned with NCA, SAMA and PDPL.',
    art: 'shield',
  },
  {
    slug: 'information-technology',
    tag: 'Foundation',
    title: 'Information Technology',
    text: 'Cloud, infrastructure, digital platforms, integration and managed services that keep you running.',
    art: 'grid',
  },
];

export const en = {
  locale: 'en',
  meta: {
    siteName: 'TALEAD',
    title: 'TALEAD | Trusted Technology for a Nation that Leads',
    description:
      'TALEAD is a Saudi technology company delivering artificial intelligence, cybersecurity and information technology solutions and products for government entities and the private sector.',
  },
  nav: {
    skip: 'Jump to content',
    home: 'TALEAD home',
    main: 'Main navigation',
    solutions: 'Solutions',
    sectors: 'Sectors',
    products: 'Products',
    company: 'Company',
    media: 'Media',
    cta: 'Connect Now',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    language: 'Language',
    solutionsMenu,
    sectorsMenu,
    companyMenu,
  },
  footer: {
    tagline: 'A Saudi Technology Company',
    links: [
      { label: 'Press enquiries', href: '/contact' },
      { label: 'Privacy Notice', href: '/privacy' },
      { label: 'Terms of use', href: '/terms' },
    ],
    social: 'TALEAD on',
    rights: 'TALEAD. All rights reserved.',
  },
  common: {
    readMore: 'Read More',
    learnMore: 'Learn More',
    explore: 'Explore',
    requestDemo: 'Request a demo',
    watchNow: 'Watch now',
    close: 'Close',
    previous: 'Previous',
    next: 'Next',
    slide: 'Slide',
    minRead: 'min read',
    backToMedia: 'All news',
    related: 'More insights',
    contactCta: 'Connect Now',
    getStarted: 'Get started',
  },
  film: {
    label: 'TALEAD brand film',
    words: ['Technology.', 'Artificial Intelligence.', 'Lead.'],
    final: 'Trusted technology for a nation that leads.',
    replay: 'Replay',
  },
  home: {
    meta: {
      title: 'TALEAD | Trusted Technology for a Nation that Leads',
      description:
        'TALEAD designs, builds and runs AI, cybersecurity and IT solutions for government entities and enterprises across Saudi Arabia.',
    },
    hero: {
      brandWord: 'TECH',
      title: 'Trusted technology\nfor a nation that leads',
      text: 'From AI that understands Arabic to security operations that never sleep, TALEAD designs, builds and runs the technology that government entities and enterprises across Saudi Arabia depend on.',
    },
    carouselLabel: 'Latest insights',
    statement: {
      eyebrow: 'Built for what’s next',
      title: 'Three Disciplines.\nOne Trusted Partner.',
      text: 'We bring information technology, artificial intelligence and cybersecurity together under one roof, so you never have to stitch vendors together. Designed, delivered and supported end to end by a Saudi team. Our belief is simple: **technology should be intelligent by design and secure by default.**',
      alliesTitle: 'Standards & frameworks we work with',
      allies: ['Vision 2030', 'NCA ECC', 'SAMA CSF', 'PDPL', 'DGA', 'ISO 27001', 'NIST CSF'],
    },
    focus: {
      eyebrow: 'Areas of focus — what we deliver',
      title: 'One Vision.\nEvery Layer Secured.',
      text: 'Digital transformation moves fast, and threats move faster. TALEAD delivers **integrated solutions across four core layers: Artificial Intelligence, Cybersecurity, Cloud & Infrastructure, and Digital Platforms.** No patchwork, no finger-pointing between vendors. **Every layer designed to perform. Every system built to be trusted.**',
      items: focusItems,
    },
    closing: {
      eyebrow: 'This is only the beginning',
      title: 'Built for Today.\nReady for Tomorrow.',
      text: 'As the Kingdom accelerates toward Vision 2030, **we are building fast,** and our partners are part of every step. From smart government services to AI-powered enterprises and national-grade security, **our ambition grows with every project we deliver.** The future is being built here, and it is being built with **TALEAD.**',
    },
  },
  solutions: {
    meta: {
      title: 'Solutions',
      description: 'Artificial intelligence, cybersecurity and information technology solutions from one accountable Saudi partner.',
    },
    hero: {
      eyebrow: 'Portfolio overview',
      title: 'One Partner.\nEvery Layer.',
      text: 'Artificial intelligence, cybersecurity and information technology, designed to work together and delivered by one accountable team.',
    },
    pillarCards,
    includes: 'What’s included',
    cta: {
      titleA: 'Not sure where to start?',
      titleB: 'Let’s map it together.',
      text: 'Tell us about your goals and we will recommend the right mix of solutions for your organization.',
      button: 'Connect Now',
    },
  },
  pillars,
  sectors,
  products: {
    meta: {
      title: 'Products',
      description: 'TALEAD products for security operations, compliance, enterprise AI, video analytics, data and integration.',
    },
    hero: {
      eyebrow: 'Products',
      title: 'Built in the Kingdom.\nReady from Day One.',
      text: 'Purpose-built platforms that put AI, data and security to work across your organization, backed by the TALEAD team that runs them with you.',
    },
    allTitle: 'All Products',
    items: products,
    cta: {
      titleA: 'See our products',
      titleB: 'in action.',
      text: 'Book a live demo with our team and explore how TALEAD products fit your environment.',
      button: 'Request a demo',
    },
  },
  about: {
    meta: {
      title: 'About',
      description:
        'TALEAD is a Saudi technology company working at the intersection of information technology, artificial intelligence and cybersecurity.',
    },
    hero: {
      tagline: 'Technology · Artificial Intelligence · Lead',
      text: 'TALEAD is a Saudi technology company working at the intersection of information technology, artificial intelligence and cybersecurity. We partner with government entities and enterprises to build what comes next, securely.',
    },
    mission: {
      eyebrow: 'TALEAD mission',
      title: 'Leading with Trusted Technology',
      paragraphs: [
        'Our vision is to be the Kingdom’s most trusted partner for intelligent and secure technology, helping government entities and enterprises turn ambition into impact.',
        'Our name comes from the Arabic word talead (تليد): a legacy that endures. We build on that legacy with modern engineering, combining a deep understanding of the local landscape with world-class practices to deliver technology that lasts.',
      ],
    },
    values: {
      eyebrow: 'Our values',
      title: 'What We Stand For',
      items: [
        { title: 'Trust', text: 'We protect our clients’ data, systems and reputation as if they were our own.' },
        { title: 'Excellence', text: 'We hold ourselves to world-class engineering standards in everything we deliver.' },
        { title: 'Innovation', text: 'We bring practical innovation that solves real problems, not technology for its own sake.' },
        { title: 'Partnership', text: 'We stay accountable from the first workshop to long after go-live.' },
      ],
    },
    people: {
      title: 'Our People',
      text: 'Our team brings together engineers, security specialists, data scientists and designers who share one commitment: delivering technology the Kingdom can rely on. We grow Saudi talent, learn relentlessly and take ownership of every outcome.',
      button: 'Join our team',
    },
  },
  careers: {
    meta: {
      title: 'Careers',
      description: 'Join TALEAD and help build the Kingdom’s digital future in AI, cybersecurity and information technology.',
    },
    hero: {
      eyebrow: 'Careers',
      title: 'Build the Kingdom’s\nDigital Future with Us.',
      text: 'We are always looking for curious engineers, security specialists, data scientists, designers and consultants who want their work to matter.',
    },
    why: {
      eyebrow: 'Life at TALEAD',
      title: 'Why Join TALEAD',
      cards: [
        { title: 'Work that matters', text: 'Build services and systems used by government entities and enterprises across the Kingdom.' },
        { title: 'Grow with every project', text: 'Certifications, mentorship and real ownership from day one.' },
        { title: 'One team, three disciplines', text: 'Work alongside AI, cybersecurity and IT experts, and learn from all three.' },
      ],
    },
    teams: {
      eyebrow: 'Our teams',
      items: [
        'Software Engineering',
        'Cybersecurity Operations',
        'Offensive Security',
        'Data & AI',
        'Cloud & Infrastructure',
        'Product & Design',
        'Consulting & Delivery',
      ],
    },
    cta: {
      title: 'Ready to Lead with Us?',
      text: 'Send us your CV and tell us where you can make the biggest difference.',
      button: 'Send your CV',
      subject: 'Career application',
    },
  },
  contact: {
    meta: {
      title: 'Contact',
      description: 'Talk to TALEAD about AI, cybersecurity and IT solutions for your organization.',
    },
    eyebrow: 'TALEAD',
    title: 'Contact us',
    subtitle: 'Ready to Build Your Organization’s Digital Future?',
    fields: {
      firstName: { label: 'First Name', placeholder: 'Enter your first name' },
      lastName: { label: 'Last Name', placeholder: 'Enter your last name' },
      phone: { label: 'Contact Number', placeholder: 'Enter phone number' },
      email: { label: 'Company Email', placeholder: 'Enter your company email' },
      company: { label: 'Company Name', placeholder: 'Enter your company name' },
      sector: {
        label: 'Sector',
        placeholder: 'Select your sector',
        options: ['Government', 'Semi-government', 'Private sector', 'Non-profit', 'Other'],
      },
      interest: {
        label: 'Area of Interest',
        placeholder: 'Select an area of interest',
        options: ['Artificial Intelligence', 'Cybersecurity', 'Information Technology', 'Products', 'Other'],
      },
      country: {
        label: 'Country',
        placeholder: 'Select your country',
        options: ['Saudi Arabia', 'United Arab Emirates', 'Kuwait', 'Qatar', 'Bahrain', 'Oman', 'Other'],
      },
      message: { label: 'Message', placeholder: 'Type your message here' },
    },
    dialCode: 'Country code',
    consent: 'I agree to the use and processing of my personal information by TALEAD for the purpose of fulfilling this request, in accordance with TALEAD’s Privacy Notice.',
    submit: 'Submit here',
    sending: 'Sending…',
    errors: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      phone: 'Please enter a valid phone number',
      consent: 'Please accept to continue',
      failed: 'Something went wrong. Please try again or email us directly.',
    },
    success: {
      title: 'Thank you!',
      sent: 'Your message has been sent. Our team will get back to you shortly.',
      mail: 'Your email app should open with your message ready to send. If it does not, write to us at',
      again: 'Send another message',
    },
    mailSubject: 'Website enquiry',
    details: { location: 'Riyadh, Saudi Arabia', emailLabel: 'Email', locationLabel: 'Location', phoneLabel: 'Phone' },
  },
  media: {
    meta: {
      title: 'Media',
      description: 'Insights, guides and updates from TALEAD on technology, AI and cybersecurity in Saudi Arabia.',
    },
    title: 'Latest Updates\nfrom TALEAD',
    text: 'Explore TALEAD insights, guides and company updates on technology, artificial intelligence and cybersecurity in the Kingdom.',
    allNews: 'All News',
    articles,
  },
  legal: {
    privacy: {
      meta: { title: 'Privacy Notice', description: 'How TALEAD collects, uses and protects personal data.' },
      title: 'Privacy Notice',
      updated: 'Template text: replace with your legally reviewed notice before launch.',
      sections: [
        {
          heading: 'Who we are',
          text: 'TALEAD is a technology company based in Riyadh, Saudi Arabia. This notice explains how we handle personal data collected through this website.',
        },
        {
          heading: 'What we collect',
          text: 'When you contact us, we collect the details you choose to share, such as your name, company, email address, phone number and message.',
        },
        {
          heading: 'How we use it',
          text: 'We use this information only to respond to your enquiry and to manage our relationship with you. We do not sell personal data.',
        },
        {
          heading: 'How we protect it',
          text: 'We apply appropriate technical and organizational measures to protect personal data, in line with the Personal Data Protection Law (PDPL) of the Kingdom of Saudi Arabia.',
        },
        {
          heading: 'Your rights',
          text: 'You may request access to, correction of or deletion of your personal data by contacting us at info@taleadtech.com.',
        },
      ],
    },
    terms: {
      meta: { title: 'Terms of Use', description: 'Terms that apply to the use of the TALEAD website.' },
      title: 'Terms of Use',
      updated: 'Template text: replace with your legally reviewed terms before launch.',
      sections: [
        {
          heading: 'Use of this website',
          text: 'This website is provided for general information about TALEAD and its services. By using it, you agree to these terms.',
        },
        {
          heading: 'Intellectual property',
          text: 'The TALEAD name, logo and website content are owned by TALEAD and may not be used without prior written permission.',
        },
        {
          heading: 'No warranty',
          text: 'Content on this website is provided as is and may change without notice. It does not constitute professional advice.',
        },
        {
          heading: 'Governing law',
          text: 'These terms are governed by the laws of the Kingdom of Saudi Arabia.',
        },
      ],
    },
  },
  notFound: {
    title: 'Page not found',
    text: 'Sorry, we could not find the page you are looking for.',
    button: 'Back to home',
  },
};

export type Dictionary = typeof en;
