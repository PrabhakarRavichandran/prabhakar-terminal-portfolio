/**
 * content.js — All portfolio data and virtual filesystem content.
 * Edit this file to update personal information, projects, skills, etc.
 * No UI logic lives here.
 */

// ─── Virtual Filesystem Structure ────────────────────────────────────────────
export const FS = {
  root: {
    type: 'dir',
    children: {
      'about.txt':          { type: 'file' },
      'skills.txt':         { type: 'file' },
      'education.txt':      { type: 'file' },
      'experience.txt':     { type: 'file' },
      'certifications.txt': { type: 'file' },
      'contact.txt':        { type: 'file' },
      'resume.txt':         { type: 'file' },
      'projects': {
        type: 'dir',
        children: {
          'SRS4DEV.md':          { type: 'file' },
          'ddos-detection.md':   { type: 'file' },
          'bookloop.md':         { type: 'file' },
          'morning-star.md':     { type: 'file' },
          'other-projects.md':   { type: 'file' },
        },
      },
    },
  },
};

// ─── File Contents ────────────────────────────────────────────────────────────

export const FILES = {

  'about.txt': `
<p><span class="green bold">Prabhakar R</span></p>
<p><span class="muted">B.E. Computer Science &amp; Engineering</span></p>
<p><span class="muted">Chennai, Tamil Nadu, India</span></p>
<br>
<p>I'm a Computer Science and Engineering student at J.N.N. Institute of
Engineering with a strong interest in software engineering, full-stack
web development, AI/ML applications, cloud technologies, and computer
networking.</p>
<br>
<p>I enjoy building practical software that solves real problems — from
AI-powered web applications to networking security research. I'm
actively working on projects that bridge machine learning with
real-world software systems.</p>
<br>
<p>Currently exploring opportunities in software engineering, web
development, and AI/ML-focused roles.</p>
`.trim(),

  'skills.txt': `
<p class="section-header">Languages</p>
<ul>
  <li><span class="cyan">Python</span>        <span class="muted">— primary language for AI/ML, scripting, backend</span></li>
  <li><span class="cyan">Java</span>          <span class="muted">— object-oriented programming, data structures</span></li>
  <li><span class="cyan">JavaScript</span>    <span class="muted">— frontend &amp; Node.js, ES modules</span></li>
  <li><span class="cyan">HTML5 / CSS3</span>  <span class="muted">— semantic markup, responsive layouts</span></li>
  <li><span class="cyan">SQL</span>           <span class="muted">— relational databases, queries, schema design</span></li>
</ul>

<p class="section-header">Frameworks &amp; Libraries</p>
<ul>
  <li><span class="purple">Flask</span>       <span class="muted">— Python web framework, REST APIs</span></li>
  <li><span class="purple">Ollama</span>      <span class="muted">— local language model integration</span></li>
</ul>

<p class="section-header">Databases</p>
<ul>
  <li><span class="yellow">SQLite</span>      <span class="muted">— embedded relational storage</span></li>
  <li><span class="yellow">MySQL</span>       <span class="muted">— relational database management</span></li>
  <li><span class="yellow">MongoDB</span>     <span class="muted">— NoSQL document storage</span></li>
</ul>

<p class="section-header">Networking &amp; Systems</p>
<ul>
  <li><span class="orange">SDN / Mininet</span>    <span class="muted">— software-defined networking, topology emulation</span></li>
  <li><span class="orange">Ryu Controller</span>   <span class="muted">— SDN controller framework</span></li>
  <li><span class="orange">Computer Networks</span> <span class="muted">— TCP/IP, routing, network security</span></li>
</ul>

<p class="section-header">AI / ML</p>
<ul>
  <li><span class="pink">Machine Learning</span>   <span class="muted">— classification, decision trees, SVM, KNN, Naive Bayes</span></li>
  <li><span class="pink">scikit-learn</span>       <span class="muted">— model training and evaluation</span></li>
  <li><span class="pink">Local LLMs</span>         <span class="muted">— Ollama-based model integration</span></li>
</ul>

<p class="section-header">Tools &amp; Platforms</p>
<ul>
  <li><span class="green">Git &amp; GitHub</span>  <span class="muted">— version control, collaboration</span></li>
  <li><span class="green">VS Code</span>           <span class="muted">— primary development environment</span></li>
  <li><span class="green">Linux / CLI</span>       <span class="muted">— shell scripting, command-line tools</span></li>
</ul>
`.trim(),

  'education.txt': `
<p class="section-header">Degree</p>
<ul>
  <li><span class="cyan bold">Bachelor of Engineering (B.E.)</span></li>
  <li><span class="muted">Computer Science &amp; Engineering</span></li>
  <li><span class="muted">J.N.N. Institute of Engineering</span></li>
  <li><span class="muted">Tamil Nadu, India</span></li>
</ul>
<br>
<p class="dim">Relevant coursework: Data Structures, Algorithms, Operating Systems, Computer Networks,
Database Management Systems, Machine Learning, Software Engineering.</p>
`.trim(),

  'experience.txt': `
<p class="section-header">Industrial Training</p>
<ul>
  <li><span class="cyan bold">Intel Unnati Industrial Training 2025</span></li>
  <li><span class="muted">Partner Institution: J.N.N. Institute of Engineering</span></li>
  <li><span class="muted">Technology Partner: EdGate Technologies</span></li>
  <li><span class="muted">Year: 2025</span></li>
</ul>
<br>
<p>Participated in a structured industrial training program under Intel's Unnati initiative.
The training culminated in a project on DDoS attack detection and mitigation in
Software-Defined Networks using machine learning — involving network traffic analysis,
SDN controller integration with Mininet, and evaluation of multiple ML classifiers
(Decision Tree, KNN, Logistic Regression, Naive Bayes, SVM, Random Forest).</p>
<br>
<p class="dim">See: <span class="cyan">cat projects/ddos-detection.md</span> for the full project description.</p>
`.trim(),

  'certifications.txt': `
<p class="section-header">Certifications &amp; Training</p>
<ul>
  <li><span class="cyan bold">Intel Unnati Industrial Training Certificate</span></li>
  <li><span class="muted">  DDoS Attack Detection &amp; Mitigation in SDN Using ML — 2025</span></li>
  <li><span class="muted">  Issued by Intel Unnati / EdGate Technologies</span></li>
</ul>
<br>
<p class="dim">Additional certifications will be listed here as they are verified and completed.</p>
<p class="dim">Type <span class="cyan">contact</span> to ask about specific credentials.</p>
`.trim(),

  'contact.txt': `
<p class="section-header">Contact &amp; Profiles</p>
<ul>
  <li><span class="muted">Email    </span> <a href="mailto:raviprabahar2006@gmail.com" target="_blank" rel="noopener">raviprabahar2006@gmail.com</a></li>
  <li><span class="muted">GitHub   </span> <a href="https://github.com/PrabhakarRavichandran" target="_blank" rel="noopener noreferrer">github.com/PrabhakarRavichandran</a></li>
  <li><span class="muted">LinkedIn </span> <a href="https://www.linkedin.com/in/prabhakar-ravichandran" target="_blank" rel="noopener noreferrer">linkedin.com/in/prabhakar-ravichandran</a></li>
  <li><span class="muted">Location </span> Chennai, Tamil Nadu, India</li>
</ul>
<br>
<p class="dim">Quicklinks: <span class="cyan">github</span> &middot; <span class="cyan">linkedin</span></p>
`.trim(),

  'resume.txt': `
<p>Resume configuration:</p>
<br>
<p><span class="yellow">⚠ Resume PDF not yet configured.</span></p>
<p class="muted">To add your resume:</p>
<ul>
  <li>Place <span class="cyan">prabhakar-r-resume.pdf</span> in the <span class="cyan">data/</span> directory.</li>
  <li>The <span class="cyan">resume</span> command will then open it automatically.</li>
</ul>
<br>
<p class="dim">Once configured, the command will display:</p>
<p class="dim">  Opening resume.pdf in a new tab...</p>
`.trim(),

  // ─── Project files ─────────────────────────────────────────────────────────

  'projects/SRS4DEV.md': `
<p><span class="cyan bold">SRS4DEV — AI-Powered SRS Generator</span></p>
<p class="muted">─────────────────────────────────────────</p>
<br>
<p><span class="section-header">Overview</span></p>
<p>An AI-powered web application designed to assist in software requirements
elicitation and the generation of structured Software Requirements
Specification (SRS) documents. It uses locally-hosted language models via
Ollama, which means document generation happens on-device without sending
project data to external servers.</p>
<br>
<p><span class="section-header">Problem addressed</span></p>
<p>Writing comprehensive SRS documents is time-consuming and requires
careful structuring. SRS4DEV provides an adaptive, conversational
workflow that guides users through requirements elicitation step by step
and assembles the collected information into a structured specification.</p>
<br>
<p><span class="section-header">Key features</span></p>
<ul>
  <li>Adaptive requirements-elicitation workflow</li>
  <li>Local language model integration via Ollama (no external API required)</li>
  <li>Structured SRS document generation</li>
  <li>Flask backend with SQLite for session persistence</li>
  <li>HTML/CSS/JavaScript frontend</li>
</ul>
<br>
<p><span class="section-header">Technologies</span></p>
<p class="muted">Python &middot; Flask &middot; JavaScript &middot; HTML/CSS &middot; Ollama &middot; SQLite</p>
<br>
<p><span class="section-header">Repository</span></p>
<p><a href="https://github.com/PrabhakarRavichandran/SRS4DEV" target="_blank" rel="noopener noreferrer">github.com/PrabhakarRavichandran/SRS4DEV</a></p>
`.trim(),

  'projects/ddos-detection.md': `
<p><span class="cyan bold">DDoS Attack Detection &amp; Mitigation in SDN Using ML</span></p>
<p class="muted">─────────────────────────────────────────────────────────</p>
<p class="muted">Intel Unnati Industrial Training 2025</p>
<br>
<p><span class="section-header">Overview</span></p>
<p>A research and implementation project exploring machine learning-based
detection and mitigation of Distributed Denial-of-Service (DDoS) attacks
within Software-Defined Network environments.</p>
<br>
<p><span class="section-header">Problem addressed</span></p>
<p>Traditional DDoS detection relies on static rules that struggle to adapt
to evolving attack patterns. SDN's centralised control plane enables
dynamic, programmable responses — making it a suitable environment for
ML-driven traffic classification.</p>
<br>
<p><span class="section-header">Architecture</span></p>
<ul>
  <li>Network topology emulated with <span class="cyan">Mininet</span></li>
  <li>SDN control plane using <span class="cyan">Ryu Controller</span></li>
  <li>Traffic analysis and feature extraction from network flows</li>
  <li>Multiple ML classifiers compared for attack classification</li>
</ul>
<br>
<p><span class="section-header">ML approaches studied</span></p>
<p class="muted">Decision Tree &middot; K-Nearest Neighbours &middot; Logistic Regression</p>
<p class="muted">Naive Bayes &middot; Support Vector Machine &middot; Random Forest</p>
<br>
<p><span class="section-header">Technologies</span></p>
<p class="muted">Python &middot; Mininet &middot; Ryu Controller &middot; scikit-learn &middot; SDN</p>
<br>
<p><span class="section-header">Repository</span></p>
<p><a href="https://github.com/PrabhakarRavichandran/DDOS_ATTACK_DETECTION_AND_MITIGATION_IN_SDN_USING_ML" target="_blank" rel="noopener noreferrer">github.com/PrabhakarRavichandran/DDOS_ATTACK_DETECTION_…</a></p>
`.trim(),

  'projects/bookloop.md': `
<p><span class="cyan bold">BookLoop — Book Exchange &amp; Management Web App</span></p>
<p class="muted">──────────────────────────────────────────────────</p>
<br>
<p><span class="section-header">Overview</span></p>
<p>BookLoop is a web application focused on book-related functionality,
built with a standard HTML/CSS/JavaScript frontend. The project
explores browser-based data persistence via localStorage and includes
a Flask backend with a MySQL schema for server-side data handling.</p>
<br>
<p><span class="section-header">Frontend</span></p>
<ul>
  <li>HTML5 semantic structure</li>
  <li>CSS3 responsive layout and styling</li>
  <li>Vanilla JavaScript for interactivity</li>
  <li>localStorage for client-side data persistence</li>
</ul>
<br>
<p><span class="section-header">Backend</span></p>
<ul>
  <li>Flask (Python) web framework</li>
  <li>MySQL database schema</li>
</ul>
<br>
<p class="dim">Verify the repository for the current integration status of backend features.</p>
<br>
<p><span class="section-header">Technologies</span></p>
<p class="muted">HTML5 &middot; CSS3 &middot; JavaScript &middot; localStorage &middot; Flask &middot; MySQL</p>
<br>
<p><span class="section-header">Repository</span></p>
<p><a href="https://github.com/PrabhakarRavichandran/BookLoop" target="_blank" rel="noopener noreferrer">github.com/PrabhakarRavichandran/BookLoop</a></p>
`.trim(),

  'projects/morning-star.md': `
<p><span class="cyan bold">Morning Star Infra Projects — Business Website</span></p>
<p class="muted">──────────────────────────────────────────────</p>
<br>
<p><span class="section-header">Overview</span></p>
<p>A responsive website for a construction and infrastructure business.
The work included page structure design, responsive layout, technical
SEO implementation, sitemap preparation, robots.txt configuration,
and metadata setup for search-engine indexing.</p>
<br>
<p><span class="section-header">Work included</span></p>
<ul>
  <li>Responsive multi-page website development</li>
  <li>Technical SEO: meta tags, Open Graph, sitemap.xml, robots.txt</li>
  <li>Semantic HTML structure for search-engine readability</li>
  <li>Page-speed and accessibility considerations</li>
</ul>
<br>
<p><span class="section-header">Technologies</span></p>
<p class="muted">HTML5 &middot; CSS3 &middot; JavaScript &middot; Technical SEO</p>
<br>
<p><span class="section-header">Repository</span></p>
<p class="yellow">⚠ Public repository URL not yet available.</p>
<p class="dim">Repository link will be added when a verified public URL is available.</p>
`.trim(),

  'projects/other-projects.md': `
<p><span class="cyan bold">Other Selected Projects</span></p>
<p class="muted">──────────────────────</p>
<br>
<p><span class="section-header">Image-Based Species Recognition</span></p>
<p class="muted">A machine learning project for classifying species from images
using visual feature extraction and classification models.</p>
<br>
<p><span class="section-header">Zomato Review Analysis</span></p>
<p class="muted">Sentiment analysis and exploratory data analysis on restaurant
review data from Zomato, using Python and data visualisation libraries.</p>
<br>
<p><span class="section-header">Facebook Ads Optimization</span></p>
<p class="muted">Analysis of Facebook ad campaign data to identify patterns in
performance metrics and suggest optimisation strategies.</p>
<br>
<p><span class="section-header">Amazon User Segmentation</span></p>
<p class="muted">Customer segmentation analysis on Amazon user behaviour data
using clustering techniques.</p>
<br>
<p><span class="section-header">Calculator Application</span></p>
<p class="muted">A functional browser-based calculator built with HTML, CSS,
and JavaScript.</p>
<br>
<p><span class="section-header">Palindrome Checker</span></p>
<p class="muted">A utility application to check palindrome strings, implemented
as a web tool.</p>
<br>
<p class="dim">Visit <a href="https://github.com/PrabhakarRavichandran" target="_blank" rel="noopener noreferrer">github.com/PrabhakarRavichandran</a> for all repositories.</p>
`.trim(),

};

// ─── Resume configuration ─────────────────────────────────────────────────────
// Set RESUME_CONFIGURED to true and provide the correct path once the PDF is placed
// in the data/ directory.
export const RESUME = {
  configured: true,
  filename: 'prabhakar-r-resume.pdf',
  path: './data/prabhakar-r-resume.pdf',
};

// ─── Approved external links (open command) ───────────────────────────────────
export const APPROVED_LINKS = {
  github:   'https://github.com/PrabhakarRavichandran',
  linkedin: 'https://www.linkedin.com/in/prabhakar-ravichandran',
  srs4dev:  'https://github.com/PrabhakarRavichandran/SRS4DEV',
  ddos:     'https://github.com/PrabhakarRavichandran/DDOS_ATTACK_DETECTION_AND_MITIGATION_IN_SDN_USING_ML',
  bookloop: 'https://github.com/PrabhakarRavichandran/BookLoop',
  portfolio:'https://github.com/PrabhakarRavichandran/prabhakar-terminal-portfolio',
};
