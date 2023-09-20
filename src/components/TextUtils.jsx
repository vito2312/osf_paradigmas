export function renderLineNumbers(inputText) {
    const lines = inputText.split('\n');
    return lines.map((_, index) => <div key={index + 1}>{index + 1}</div>);
}

