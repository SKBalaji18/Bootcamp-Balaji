import './style.css'

async function fetchStudents() {
  const response = await fetch('./data/students.json');
  return response.json();
}

async function renderTable() {
  const students = await fetchStudents();
  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Age</th>
        <th>Grade</th>
      </tr>
    </thead>
    <tbody>
      ${students.map(
        (student) => `
        <tr>
          <td>${student.id}</td>
          <td>${student.name}</td>
          <td>${student.age}</td>
          <td>${student.grade}</td>
        </tr>
      `
      ).join('')}
    </tbody>
  `;
  document.body.appendChild(table);
} 

renderTable();

