📚 Skill-Sharing & Learning Platform

This is an interactive web-based platform designed for continuous learning and skill sharing. It empowers users to share their skills, track their learning progress, and connect with others in a collaborative environment. Whether you're learning to code, cook, or create crafts—Level Up provides a modern space for growth and inspiration.

🚀 Features
✅ Core Functionalities
- User Registration & OAuth 2.0 Authentication (via social media)
- Personalized Profile Management
- Follow/Unfollow Other Users
- Create & Share Skill Posts with images or short videos
- Track Learning Progress using templates and structured updates
- Post Likes & Comments
- Real-time Notifications
- Structured Learning Plans (Coming Soon)

🧩 Technology Stack

- **Backend:** Spring Boot (Java)
- **Frontend:** React
- **Database:** MySQL
- **Security:** Spring Security with OAuth 2.0
- **Version Control & CI/CD:** GitHub and GitHub Actions

🔒 Non-Functional Highlights

- Security: OAuth 2.0, RBAC, encrypted data
- Scalability: Optimized APIs, scalable architecture
- Performance: Fast API responses, indexed DB queries
- Usability: Mobile-friendly, intuitive UI
- Maintainability: Modular codebase, version-controlled
- Availability: Minimal downtime, reliable notifications
- Compatibility: Works across browsers and devices
- Extensibility: API ready for mobile app integration

📌 API Endpoints Overview
👤 User Management
- `POST /auth/login`
- `GET /users/{id}`
- `PUT /users/{id}`
- `DELETE /users/{id}`
- `POST /users/{id}/follow`
- `GET /users/{id}/followers`
- `GET /users/{id}/following`

### 📷 Skill Sharing
- `POST /posts/`
- `GET /posts/{id}`
- `PUT /posts/{id}`
- `DELETE /posts/{id}`

📈 Progress Updates
- `POST /progress-updates`
- `GET /progress-updates/{id}`
- `PUT /progress-updates/{id}`
- `DELETE /progress-updates/{id}`
- `GET /users/{id}/progress-updates`

💬 Comments & Likes
- `POST /posts/{postId}/like`
- `POST /posts/{postId}/comment`
- `GET /posts/{postId}/comments`
- `GET /posts/{postId}/likes`
- `PUT /comments/{commentId}`
- `DELETE /comments/{commentId}`
- `DELETE /posts/{postId}/comments/{commentId}`

🔔 Notifications
- `GET /notifications/{userId}`
- `GET /notifications/{userId}/unread`
- `POST /notifications/mark-read/{notificationId}`
- `POST /notifications/mark-all-read/{userId}`
- `DELETE /notifications/{notificationId}`
- `DELETE /notifications/clear/{userId}`
- `GET /notifications/{userId}/count`
- `POST /notifications/preferences/{userId}`
