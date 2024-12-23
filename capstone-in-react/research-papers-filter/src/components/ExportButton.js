import JSZip from 'jszip';

const ExportButton = ({ filteredPapers }) => {
    const handleExport = () => {
      const zip = new JSZip();
      const csvContent = filteredPapers.map(paper => 
        `${paper.id},${paper.title},${paper.authors},${paper.year},${paper.venue},${paper.n_citation},${paper.abstract}`
      ).join('\n');
      zip.file('filtered_papers.csv', csvContent);
      zip.generateAsync({ type: 'blob' }).then(content => {
        const a = document.createElement('a');
        a.href = URL.createObjectURL(content);
        a.download = 'filtered_papers.zip';
        a.click();
      });
    };
  
    return <button onClick={handleExport}>Export Filtered Data</button>;
  };
  
  export default ExportButton;
  