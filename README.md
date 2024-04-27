
## API Documentation
The API is documented using Swagger UI. You can access the API documentation at **/api-docs** endpoint.

## How to Run
1. Clone this repository.
2. Install dependencies using `npm install`.
3. Copy and fill the necessary env variables from `.env.example` file.
4. Start the server using `npm start`.

## Environment Variables
Make sure to set the following environment variables:
- `MONGO_URI`: MongoDB database connection URI. Example: `mongodb://localhost:27017/mjollnir`
- `PORT`: Port number for the backend server (default is 3000).
- `ORIGIN_PORT`: Port number for the frontend server.
- `SESSION_SECRET`: Secret key for session management.
- `API_KEY`: Secret key for accessing OpenAPI functionalities.

## License
This project is licensed under the [MIT License](LICENSE).
