# Job Connect

Job Connect is a comprehensive job portal application built using the MERN stack (MongoDB, Express.js, React.js, Node.js). It is a platform where employers can post job listings and job seekers can apply for jobs, making the recruitment process seamless and efficient.


## Table of Contents


- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)


## Features

- **Job Listings**: Employers can post new job openings with details such as title, description, requirements, open positions and salary. 
- **Job Search**: Job seekers can search for jobs based on job role, location, and other salary
- **User Authentication**: Secure authentication for both job seekers and employers.
- **Profile Management**: Users can create and manage their profiles, including uploading resumes and profiles.
- **Application Tracking**: Job seekers can track the status of their applications.
- **Admin Panel / Recruiter Panel**: Admins can manage users, jobs, and site content.




## Technology Stack

- **Frontend**: React.js, Material-UI
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **Styling**: CSS, 
## Installation
- Node.js
- npm or yarn
- MongoDB
- Vite+React
- Typescript


### Steps

1. **Clone the repository**:
    ```bash
    git clone https://github.com/lucyy123/job-portal-app.git
    cd Job-Portal-app
    ```

2. **Install dependencies**:
    ```bash
    # Install backend dependencies
    cd server
    npm install
    
    # Install frontend dependencies
    cd ../client
    npm install
    ```

3. **Environment Variables**:
   - Create a `.env` file in the `backend` directory.
   - Add the following variables:
     ```env
     PORT=4000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

4. **Run the application**:

   - **Backend**:
     ```bash
     cd backend
     npm run dev
     ```

   - **Frontend**:
     ```bash
     cd ../frontend
     npm run dev
     ```

5. **Access the application**:
   - Visit `http://localhost:5173` for the frontend.
   - The backend will run on `http://localhost:5000`.

## Usage

1. **Register**: Sign up as a job seeker or a recruiter/employer.
2. **Post Jobs**: Employers can post job listings.
3. **Apply for Jobs**: Job seekers can search and apply for jobs.
4. **Manage Profile**: job seekers can mange his profiles.
## API Endpoints

- **User Authentication**:
  - `POST /api/v1/user/new/register`: /Register a new user.
  - `POST /api/v1/user/new/login`: Log in a user.
  - `GET /api/v1/user/logout`: Logout a user.

- **Job Management**:
  - `GET /api/v1/job/all/jobs`: Fetch all jobs.
  - `POST /api/v1/job//create/new`: Create a new job (Employer only).
  - `GET /api/v1/jobs/:id`: Get job details.

**There are more routes which are waiting for you :)**:
  

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-branch-name`.
5. Open a pull request.
## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
## Contact

- **Monis Khan**: [monisykhan@gmail.com](mailto:your.email@example.com)
- **LinkedIn**: [Monis Khan](https://www.linkedin.com/in/MonisKhan199)






