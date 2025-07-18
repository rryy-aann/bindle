const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf8');
const lines = content.split('\n');

let currentSection = null;
let sections = {};
let total = 0;
let done = 0;

for (let line of lines) {
  line = line.trim();

  // Detect new section header
  if (line.startsWith('**') && line.endsWith('**')) {
    currentSection = line.replace(/\*\*/g, '').trim();
    if (!sections[currentSection]) {
      sections[currentSection] = { done: 0, total: 0 };
    }
    continue;
  }

  // Detect checklist item
  if (line.startsWith('[x]') || line.startsWith('[]')) {
    if (currentSection) {
      sections[currentSection].total++;
      total++;
      if (line.startsWith('[x]')) {
        sections[currentSection].done++;
        done++;
      }
    }
  }
}

// Helper for progress bar
const bar = (percent) => {
  const barLength = 30;
  const filled = Math.round((percent / 100) * barLength);
  return '█'.repeat(filled) + '░'.repeat(barLength - filled);
};

// Print results
for (const [section, data] of Object.entries(sections)) {
  const percent = data.total ? Math.round((data.done / data.total) * 100) : 0;
  console.log(`\n${section.toUpperCase()}`);
  console.log(`Progress: [${bar(percent)}] ${percent}% (${data.done} of ${data.total})`);
}

const overallPercent = total ? Math.round((done / total) * 100) : 0;
console.log(`\nTOTAL PROGRESS`);
console.log(`Progress: [${bar(overallPercent)}] ${overallPercent}% (${done} of ${total})`);
