const Groq = require('groq-sdk');

const getGroqClient = () => {
    if (!process.env.GROQ_API_KEY || process.env.GROQ_API_KEY.trim() === '' || process.env.GROQ_API_KEY === 'your_groq_api_key_here') {
        return null;
    }
    return new Groq({ apiKey: process.env.GROQ_API_KEY });
};

const GROQ_MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

exports.generateCodeExplanation = async (code, language) => {
    const groq = getGroqClient();

    // ── REAL AI via Groq Llama ──────────────────────────────────────────────
    if (groq) {
        console.log(`Using Groq Llama model: ${GROQ_MODEL}`);
        try {
            const prompt = `You are an expert code reviewer. Analyze the following ${language} code and respond ONLY with a valid JSON object (no markdown, no extra text) with these exact fields:
{
  "summary": "A clear 1-2 sentence summary of what this code does",
  "lineByLine": ["Explanation for each significant line or block"],
  "complexity": "Time and Space complexity analysis, e.g. O(n) Time, O(1) Space",
  "issues": ["List of potential bugs or bad practices, empty array if none"],
  "improvements": ["List of concrete improvement suggestions"],
  "optimizedCode": "The refactored/optimized version of the code as a string"
}

Code to analyze (${language}):
\`\`\`${language}
${code}
\`\`\`

Respond with JSON only.`;

            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: 'system',
                        content: 'You are an expert code analysis assistant. You always respond with valid JSON only, no markdown code blocks, no extra text.',
                    },
                    { role: 'user', content: prompt },
                ],
                model: GROQ_MODEL,
                temperature: 0.3,
                max_tokens: 2048,
            });

            const raw = completion.choices[0].message.content.trim();

            // Strip markdown code fences if the model included them
            const jsonStr = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim();
            const parsed = JSON.parse(jsonStr);

            // Normalise field names in case the model uses slightly different keys
            return {
                summary: parsed.summary || parsed.explanation || '',
                lineByLine: Array.isArray(parsed.lineByLine) ? parsed.lineByLine : (parsed.line_by_line || []),
                complexity: parsed.complexity || parsed.complexityAnalysis || '',
                issues: Array.isArray(parsed.issues) ? parsed.issues : [],
                improvements: Array.isArray(parsed.improvements) ? parsed.improvements : [],
                optimizedCode: parsed.optimizedCode || parsed.optimized_code || '',
            };
        } catch (error) {
            console.error('Groq AI Service Error:', error.message);
            throw new Error('Failed to generate explanation via Groq: ' + error.message);
        }
    }

    // ── ENHANCED MOCK (no API key) ──────────────────────────────────────────
    console.log('No GROQ_API_KEY found — using enhanced mock response');

    const codeLines = code.split('\n').filter(line => line.trim());
    const lineCount = codeLines.length;

    // Detect code purpose
    let purpose = '';
    if (code.includes('% 2') && (code.toLowerCase().includes('even') || code.toLowerCase().includes('odd'))) {
        purpose = 'checks whether a number is even or odd using the modulo operator';
    } else if (code.toLowerCase().includes('fibonacci')) {
        purpose = 'calculates Fibonacci sequence numbers';
    } else if (code.toLowerCase().includes('prime')) {
        purpose = 'checks if a number is prime';
    } else if (code.toLowerCase().includes('sort')) {
        purpose = 'sorts elements in a collection';
    } else if (code.toLowerCase().includes('search') || code.includes('find')) {
        purpose = 'searches for elements in a data structure';
    } else if (code.toLowerCase().includes('reverse')) {
        purpose = 'reverses the order of elements';
    } else if (/for.*length|while.*</.test(code)) {
        purpose = 'iterates through a collection or performs repeated operations';
    } else if (code.includes('class ') && code.includes('main')) {
        purpose = 'defines a program entry point and executes core logic';
    } else {
        purpose = 'performs computational operations and data manipulation';
    }

    const lineByLine = codeLines.slice(0, Math.min(15, codeLines.length)).map((line, index) => {
        const trimmed = line.trim();
        const lineNum = index + 1;

        if (trimmed.includes('class ')) {
            const className = trimmed.match(/class\s+(\w+)/)?.[1] || 'unknown';
            return `Line ${lineNum}: Defines the class '${className}'`;
        }
        if (trimmed.includes('public static void main')) {
            return `Line ${lineNum}: Main method — program entry point`;
        }
        if (trimmed.includes('function ') || trimmed.includes('def ') || trimmed.match(/^\w+\s+\w+\s*\(/)) {
            const funcName = trimmed.match(/(?:function|def)\s+(\w+)/)?.[1] || 'unknown';
            return `Line ${lineNum}: Declares function '${funcName}'`;
        }
        if (trimmed.match(/\b(int|String|double|float|let|const|var|auto)\b/)) {
            const varMatch = trimmed.match(/(?:int|String|double|float|let|const|var|auto)\s+(\w+)\s*=\s*(.+?)[;,)]/);
            if (varMatch) return `Line ${lineNum}: Initializes '${varMatch[1]}' = ${varMatch[2].trim()}`;
            return `Line ${lineNum}: Variable declaration`;
        }
        if (trimmed.startsWith('if')) {
            const cond = trimmed.match(/if\s*\((.+?)\)/)?.[1];
            return `Line ${lineNum}: Conditional — evaluates '${cond || 'condition'}'`;
        }
        if (trimmed.startsWith('else')) return `Line ${lineNum}: Else branch`;
        if (trimmed.startsWith('for') || trimmed.startsWith('while')) return `Line ${lineNum}: Loop iteration`;
        if (trimmed.includes('return')) {
            const val = trimmed.match(/return\s+(.+?);/)?.[1];
            return `Line ${lineNum}: Returns ${val ? `'${val}'` : 'value'}`;
        }
        if (trimmed.includes('cout') || trimmed.includes('printf') || trimmed.includes('System.out') || trimmed.includes('console.log') || trimmed.includes('print(')) {
            return `Line ${lineNum}: Outputs result to console`;
        }
        if (trimmed === '}' || trimmed === '};') return `Line ${lineNum}: Closes code block`;
        return `Line ${lineNum}: ${trimmed.substring(0, 70)}${trimmed.length > 70 ? '...' : ''}`;
    });

    const hasLoops = /\bfor\b|\bwhile\b|\bforEach\b/.test(code);
    const hasNestedLoops = (code.match(/for[\s\S]*?for|while[\s\S]*?while/g) || []).length > 0;
    const hasRecursion = /recursive|recursion/.test(code.toLowerCase());

    let complexity;
    if (hasRecursion) complexity = 'O(2^n) Time, O(n) Space — recursive calls';
    else if (hasNestedLoops) complexity = 'O(n²) Time, O(1) Space — nested loops';
    else if (hasLoops) complexity = 'O(n) Time, O(1) Space — single loop';
    else complexity = 'O(1) Time, O(1) Space — direct operations';

    return {
        summary: `This ${language} program ${purpose}. It contains ${lineCount} line${lineCount !== 1 ? 's' : ''} of code.`,
        lineByLine: lineByLine.length > 0 ? lineByLine : [`Line 1: ${language} code snippet`],
        complexity,
        issues: [
            code.includes('var ') ? "Using 'var' — prefer 'let' or 'const'" : null,
            code.length > 500 ? 'Code is long — consider modular design' : null,
        ].filter(Boolean),
        improvements: [
            'Add error handling for edge cases',
            'Add descriptive comments explaining the algorithm',
        ],
        optimizedCode: `// Optimized ${language} version\n${code.split('\n').slice(0, Math.min(8, code.split('\n').length)).join('\n')}${code.split('\n').length > 8 ? '\n// ... (remaining implementation)' : ''}`,
    };
};
