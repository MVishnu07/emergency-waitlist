# Vishnu Malkapuram's Hospital Triage App Design Document

## Design Overview
The Hospital Triage App is designed to streamline the process of managing patient flow through an emergency department or clinic setting. It provides a user-friendly interface for healthcare providers to log in, sign up(to create a new account), input patient data, and view a list of patients waiting for care.

## Fonts
- **Primary Font**: Arial, sans-serif, known for its readability, is used throughout the app for a consistent and clean appearance.
- **Times New Roman**: Employed for all body text to differentiate it from headings and provide a comfortable reading experience for longer paragraphs.

## Colour Palette
- **User Interface**:
  - **Background**:  Light grey (#e7e2e2) provides a neutral canvas for content.
  - **Primary Color**: Green (#4CAF50) signifies health and is used for headers and interactive elements, with black text for contrast.
  - 
- **Admin Interface**:
    -**Dark Grey**: Used for the primary interface elements to denote seriousness and authority.
    -**Red Accents**: Used for alerts and urgent actions to draw attention.

## App Components
- **Titles**: "Hospital Triage - User" for the patient interface and "Hospital Triage - Admin" for the administrative interface, prominently displayed in Arial.
- **Buttons**: Rectangular with rounded edges, colored according to the page-specific palette, and featuring a bold, legible font.
- **Input Fields**: Outlined with sufficient padding, featuring placeholder text for guidance.
- **Patient Questionaire**: A form on the user page to collect data about the type of injury and pain level, with options presented in a clear and straightforward manner.
- **Admin Summary**: A dashboard on the admin page showcasing patient wait times and conditions, with interactive controls to adjust the urgency level and manage patient flow.

## Layout and Navigation
- A responsive, grid-based layout will be used to accommodate various devices, with a focus on mobile-first design.
- **Patient Form**: Positioned absolutely to be in the view's center, with increased width and automatic height for a spacious layout.

## Consistency
- **Visual Harmony**: The application will exhibit visual harmony by applying the same design principles across all screens. This includes a unified color scheme, consistent font sizes, and button styles that match throughout the app.
- **Predictable User Interactions**: Every interactive element will behave in a predictable manner. For instance, all buttons related to submission will not only share the same color but will also provide the same tactile feedback upon interaction, such as a confirmatory animation or sound.
- **Theme Consistency**: Themes and motifs pertinent to the medical and triage context, such as medical symbols, will be consistently represented to reinforce the app's purpose and assist with user orientation.

## Component Integration
- Consistent styling of input fields, buttons, and form elements, ensuring a uniform look and feel across the login and patient form.
- The navigation bar uses active and hover states to provide visual feedback to the user.
- The header combines text and imagery to present a clear brand identity at the top of the page.
- Tables on the waitlist are designed with readability in mind, featuring alternating row colors and clear borders.
- The entire application maintains a cohesive color scheme and font family (Arial), reinforcing the brand identity and ensuring visual harmony.
- The layout is responsive, with containers sized in percentages and positioned for adaptability across different devices.
- JavaScript functions linked at the end of the HTML document likely control the dynamic display of sections and interactions within the app.

## Functionality
-The web-based Hospital Triage App interface that allows users to log in, fill out a patient form, and view a waitlist. The login section captures username and password, while the patient form collects essential information such as name, age, birth date, gender, condition, and severity of the condition via text inputs, a date picker, a dropdown menu, and a range slider. The waitlist is displayed in a table format, showing patient IDs, names, genders, conditions, and severity levels. Navigation between these sections is facilitated by a top navigation bar, and the overall user interface is responsive, ensuring accessibility across various devices. The actual interaction logic, such as form submissions and dynamic content updates, would be managed by JavaScript, which is indicated to be linked but not shown in the provided code.
