<img width="356" height="789" alt="Screenshot 2026-05-10 184139" src="https://github.com/user-attachments/assets/19c4ebdd-31b7-49e5-8ea0-5ea1e49f3ec5" /># PsyCare — AI-Powered Mental Wellness Platform

PsyCare is a digital mental wellness platform designed to make emotional support and mental health resources more accessible. It combines mental health assessments, AI-based analysis, guided wellness activities, and appointment-related features in one application.

> **Disclaimer:** PsyCare is an educational project and does not replace professional medical advice, diagnosis, treatment, or emergency mental health services.

## Features

- **User Authentication:** User access and profile management.
- **Mental Health Assessment:** Questionnaire-based assessment and ML-supported results.
- **AI/ML Integration:** Machine learning-based analysis for mental health-related data.
- **Doctor Appointments:** Doctor listing, appointment booking, and confirmation workflows.
- **Wellness Activities:** Breathing exercises, meditation, journaling, affirmations, art therapy, and stress-relief activities.
- **Payment Integration:** Razorpay-related payment workflows.
- **PDF Services:** PDF-related functionality.
- **Translation Support:** Translation service integration.
- **User-Friendly Interface:** Organized screens for assessments, activities, profiles, and results.

## Tech Stack

| Category | Technologies |
|---|---|
| Frontend | React Native, Expo, TypeScript |
| Styling | Tailwind CSS configuration |
| Backend | Node.js |
| Authentication and Cloud Services | Firebase |
| Database Services | Supabase |
| Machine Learning | Python, scikit-learn |
| Payment Gateway | Razorpay |
| Version Control | Git and GitHub |

## Project Structure

```text
Psycare/
├── app/                     # Application screens and navigation
│   ├── (tabs)/              # Tab-based screens
│   ├── assessment.tsx       # Mental health assessment
│   ├── doctors.tsx          # Doctor listing
│   ├── meditation.tsx       # Meditation activity
│   ├── breathing-exercise.tsx
│   ├── payment.tsx          # Payment workflow
│   └── results.tsx          # Assessment results
├── components/              # Reusable UI and activity components
├── contexts/                # Application context
├── hooks/                   # Custom React hooks
├── lib/                     # Firebase configuration
├── services/                # ML, payment, PDF, and translation services
├── utils/                   # Utility functions
├── backend/                 # Node.js backend
├── ml-backend/              # Python ML service and training scripts
├── psycare_ml_package/      # ML models, datasets, and application files
├── supabase/                # Database migrations
├── app.json                 # Expo configuration
├── package.json             # Project dependencies and scripts
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js and npm
- Git
- Python and pip for the ML backend
- Expo Go or a suitable simulator
- Required Firebase and Supabase configurations
- Razorpay test credentials for payment testing

### 1. Clone the Repository

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
cd Psycare
```

Replace `<YOUR_GITHUB_REPOSITORY_URL>` with your actual GitHub repository URL.

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Configure the environment variables required by the application and its backend services.

Depending on your implementation, these may include:

- Firebase configuration
- Supabase project URL and key
- Razorpay test credentials
- ML backend service URL

**Important:** Never upload private API keys, passwords, service-account credentials, or secret payment keys to GitHub.

### 4. Start the Application

For an Expo application, run:

```bash
npx expo start
```

Follow the terminal instructions to open the application in Expo Go or a compatible simulator.

If your configured frontend uses a different development command, refer to the scripts in `package.json`.

## Running the Backend

The repository contains separate Node.js and Python backend-related directories.

### Node.js Backend

Open the backend directory:

```bash
cd backend
npm install
```

Run the start command defined in that directory's `package.json`. Configure the required environment variables before starting the service.

### Machine Learning Backend

Install the Python dependencies listed in the relevant `requirements.txt` file:

```bash
pip install -r requirements.txt
```

Run the appropriate Python entry point after checking its configuration and required dependencies.

The frontend and backend service URLs must point to the correct local or deployed endpoints.

## Machine Learning Component

PsyCare includes Python scripts, datasets, and saved model files for mental-health-related analysis.

The ML component is intended to support assessment and informational feedback. Its predictions should not be treated as a clinical diagnosis.

For reliable results, evaluate the model using suitable metrics, validate the input data, and document the dataset and training process.

## Security and Privacy

Mental health information is sensitive. Before deploying PsyCare:

- Protect user accounts and restricted routes.
- Validate incoming data.
- Use HTTPS for deployed services.
- Store secrets securely in environment variables or a secret manager.
- Configure database access permissions appropriately.
- Obtain consent before collecting or processing personal information.
- Avoid publishing private datasets or sensitive user information.
- Clearly explain the limitations of AI-generated results.



## Demonstration
<img width="352" height="789" alt="Screenshot 2026-05-10 182843" src="https://github.com/user-attachments/assets/7abc636f-53bd-4aea-8c1d-a056f544f2bf" />

<img width="352" height="790" alt="Screenshot 2026-05-10 182854" src="https://github.com/user-attachments/assets/24747afa-a464-4e44-acb8-2da2ed5e920e" />

<img width="356" height="793" alt="Screenshot 2026-05-10 182933" src="https://github.com/user-attachments/assets/2137fbb6-e6a9-4910-be2b-b066c8c1735a" />

<img width="356" height="790" alt="Screenshot 2026-05-10 182944" src="https://github.com/user-attachments/assets/e2fac24c-eb47-4cd3-b176-67b58a24a499" />

<img width="353" height="784" alt="Screenshot 2026-05-10 183726" src="https://github.com/user-attachments/assets/aa7e6524-0e92-4547-ac0a-42b4beeeacb1" />

<img width="356" height="789" alt="Screenshot 2026-05-10 184139" src="https://github.com/user-attachments/assets/91eaa9a4-b351-481c-bc68-c8fca795d98a" />


<img width="359" height="780" alt="Screenshot 2026-05-10 184146" src="https://github.com/user-attachments/assets/63614ac0-8d0b-414a-80e9-d0280fbbe042" />

<img width="353" height="785" alt="Screenshot 2026-05-10 184200" src="https://github.com/user-attachments/assets/f7d5ae6c-112d-4604-8c99-9da7fe51a012" />


<img width="353" height="778" alt="Screenshot 2026-05-10 184220" src="https://github.com/user-attachments/assets/be910169-6da0-4d65-8eaf-bb12de948a39" />

<img width="353" height="788" alt="Screenshot 2026-05-10 184737" src="https://github.com/user-attachments/assets/f3e0ddfb-6fe3-4320-b426-c8396112fdca" />


<img width="349" height="790" alt="Screenshot 2026-05-10 184749" src="https://github.com/user-attachments/assets/5f0f3c8c-b1f8-43d7-a51d-d5d78c480eea" />

<img width="355" height="787" alt="Screenshot 2026-05-10 184809" src="https://github.com/user-attachments/assets/1dc286a9-4822-482a-8031-72cf367f4834" />


<img width="354" height="786" alt="Screenshot 2026-05-10 184831" src="https://github.com/user-attachments/assets/416fb1ea-c356-4ba9-bfde-5ae9550db1a3" />

<img width="354" height="786" alt="Screenshot 2026-05-10 184831" src="https://github.com/user-attachments/assets/b26694f5-11ea-4130-86e2-e6dd53a362a6" />


<img width="354" height="785" alt="Screenshot 2026-05-10 184842" src="https://github.com/user-attachments/assets/1006122b-5cfe-496c-8be2-6c22a891d9dc" />

<img width="350" height="788" alt="Screenshot 2026-05-10 184928" src="https://github.com/user-attachments/assets/aea9830e-fb69-4230-8951-e1e901338693" />



