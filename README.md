
# Car Rental Reservation System

This backend server is designed for a car reservation system where users can book cars, and admins manage the cars and user reservations. The project uses Node.js with JWT (JSON Web Token) for authentication, ensuring that users and admins can only perform actions authorized by their roles.

## Key Features:

- ### **User Roles:**   Two types of users Admin and User

- **Admin**

    - Add new cars to the system.
    - Update or delete car details.
    - Handle car returns and calculate total rental costs.

 - **User**

     - Browse and book available cars.   
     - View and manage their bookings.

 ## Authentication:

   - #### JWT Authentication is used to secure the routes:

        - Admin and User access is role-based.
        - Admins have additional privileges to manage car-related data.


 ## Admin Capabilities: 

  - **Add a Car**: Admins can add new cars to the system with details like model, type, rental price, and availability.
  - **Update/Delete Car:** Admins can update or delete car details from the inventory.
- **Receive Returned Cars:** When a user returns a car, admins calculate the total rental cost based on booking details. 

## User Capabilities:

- **Book a Car:** Users can browse available cars and book the car of their choice for a selected duration.
- **View Bookings:** Users can view their past and current bookings.

## Tech Stack:
  
  - **Backend:**  Node.js, Express.js, TypeScript.
  - **Authentication:** JSON Web Token (JWT).
  - **Database:** MongoDB.

## Package Used:

- **bcryptjs:** For hashing user passwords.
- **cors:** To handle Cross-Origin Resource Sharing, allowing requests from different domains.
- **dotenv:** For managing environment variables (e.g., JWT secret, database configurations).
- **http-status:** Provides named HTTP status codes to make your responses more readable.
- **nodemon:** A development tool that automatically restarts the server when changes are made to the source code.

## API Endpoints:

  - **Authentication**
     - ***api/auth/signin(POST):*** Login as admin and user.
  
 - **Admins:**
   - ***api/cars(POST):*** Add new car.
   - ***api/cars/:id(PUT):*** Update car details.
   - ***api/cars/:id(DELETE):*** Delete a car.
   - ***api/bookings(GET):*** To get all bookings.
   - ***api/cars/return(PUT):*** To return the car.

  - **Users:** 
       
     - ***api/auth/signup(POST):*** To create new user.
     - ***api/cars(GET):*** To get all the cars.
     - ***api/cars/:id(GET):*** To get single car details.
     - ***api/bookings(POST):*** To Create a new booking.
     - ***api/bookings/my-bookings(GET):*** To access his own booking.


