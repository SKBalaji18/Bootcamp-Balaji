# Problem Definition

## Title: Antibody Characterization and Scoring Application

### Overview
I want to build a web-based application that makes it easy to characterize and score antibody candidates based on their molecular properties. The app will have a dynamic scorecard to display antibody data, a 3D visualization tool for structures, and features to customize how the data is displayed and analyzed.

---

## Users
### Who will use it?
- **Researchers and Scientists**: People working in fields like biotechnology and pharmacology.
- **Biotech Companies**: Organizations focusing on antibody R&D.
- **Educators**: Teachers and trainers in molecular biology.

### How will they use it?
- Researchers can upload or fetch antibody data to analyze.
- They’ll use the scorecard table to evaluate and compare antibody properties.
- They can click on a specific antibody to view its 3D structure in detail using Mol*.
- They’ll use customization options to highlight specific properties like charge or hydrophobicity in the 3D viewer.
- Filters and search tools will help users focus on specific datasets.
- The export feature will allow them to save filtered datasets for further offline use.

---

# Plan

## Step-by-Step Approach

### Phase 1: Research and Setup
- Research Mol* integration for 3D visualization.
- Review JSON data structure for the scorecard.
- Set up the Next.js project with the required folder and component structure.
- Plan component hierarchy: Scorecard table, 3D viewer, and controls.


### Phase 2: Scorecard Table Implementation
- Parse JSON data and display it in a table format.
- Add property-based colour coding for table scores.
- Implement interactivity: "View Structure" button for each row.
- Test the JSON rendering and table responsiveness.


### Phase 3: 3D Protein Viewer Integration
- Integrate Mol* for visualizing 3D structures.
- Enable fetching of 3D protein data when "View Structure" is clicked.
- Display the selected structure in a right-side panel or modal.
- Test the interaction between the scorecard and Mol* viewer.


### Phase 4: Visualization Controls
- Add form controls for customizing the 3D visualization (e.g., colouring by hydrophobicity or charge).
- Enable users to manipulate zoom, rotation, and rendering styles.
- Ensure real-time updates in the Mol* viewer when controls are changed.
- Test the form controls for usability and accuracy.


### Phase 5: Features Enhancements
- Discuss and clarify additional features provided by Raj.
- Implement feasible features like:
    - Dynamic property colouring in the 3D viewer.
    - Advanced filters or search functionality in the scorecard table.
    - Adding data export (e.g., CSV) for selected or filtered antibodies.
- Integrate these features into the application.


### Phase 6: Testing and Bug Fixes
- Conduct thorough testing of:
    - JSON data parsing and scorecard functionality.
    - Mol* integration and 3D visualization.
    - Form controls and additional features.
- Fix any identified bugs or UI issues.
- Optimize application performance.


---

## Milestones
1. Complete the project setup (Next.js and Tailwind CSS).
2. Create the scorecard table and connect it to JSON data.
3. Integrate the Mol* 3D viewer and link it with the scorecard.
4. Add customization controls for the 3D viewer.
5. Implement advanced features like filtering and exporting.
6. Finish testing, deploy the app, and prepare documentation.

---

# Exit Criteria
The project is done when:
- The scorecard displays antibody data dynamically and allows interaction.
- Users can visualize and manipulate 3D structures with customization options.
- Features like filtering, exporting, and dynamic property coloring are complete.
- Testing confirms everything works smoothly.
- All documentation is ready for users and developers.

---

# Project Deliverables
1. **Functional Application**:
   - The web application deployed on a public URL.
   - API endpoints for fetching antibody data and 3D structures.

2. **Documentation**:
   - User guide explaining how to use the application.
   - Developer setup guide for local installations.
   - Notes on implemented features and possible future upgrades.

3. **Export Options**:
   - CSV files for filtered datasets.

4. **Source Code**:
   - A clean and well-documented codebase.
   - Tests included for important features.

---

# Deployment and Usage
- I’ll deploy the application using docker container on the bootcamp.aganitha.ai server.
- Error handling will be added to make sure the app works well even with unexpected data or issues.
- The UI will be simple and intuitive so researchers can use it without needing much help.
- I’ll make sure it can handle more data and additional features in the future.
