import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode, language }) => {
    return (
        <div className="code-editor-container" style={{ height: '400px', border: '1px solid var(--gray-300)', borderRadius: '0.375rem', overflow: 'hidden', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' }}>
            <Editor
                height="100%"
                language={language.toLowerCase()}
                value={code}
                onChange={(value) => setCode(value)}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                }}
            />
        </div>
    );
};

export default CodeEditor;
