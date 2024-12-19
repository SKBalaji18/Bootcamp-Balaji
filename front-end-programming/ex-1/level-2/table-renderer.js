export function renderTableRows(students) {
    const studentTable = document.getElementById('student-table').querySelector('tbody');
    studentTable.innerHTML = ''; 
    
    students.forEach(student => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.age}</td>
        <td>${student.grade}</td>
      `;
      studentTable.appendChild(row);
    });
  }
  