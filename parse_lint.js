const fs = require('fs');
const results = JSON.parse(fs.readFileSync('lint_results.json', 'utf8'));
results.forEach(res => {
    if (res.errorCount > 0) {
        console.log(`\nFILE: ${res.filePath}`);
        res.messages.forEach(msg => {
            if (msg.severity === 2) {
                console.log(`  [${msg.line}:${msg.column}] ${msg.message} (${msg.ruleId})`);
            }
        });
    }
});
