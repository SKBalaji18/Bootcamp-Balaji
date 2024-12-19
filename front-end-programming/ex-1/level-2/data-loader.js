export async function loadStudentData() {
    try {
      const response = await fetch('students.json');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error loading student data:', error);
      throw error;  // Re-throw the error to be handled later
    }
  }
  