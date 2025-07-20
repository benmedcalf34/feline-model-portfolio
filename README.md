# Outline

My approach for tackling the assigned tasks would be to start with a simple frontend-only web application that provides basic functionality for a feline modeling agency. From there, I would begin to design the database schema, taking into consideration the types of data that need to be stored for this application. In this case, some of that data would be users, models, and appointments. I would then design tables around each of these data points, ensuring that each data point has its own table or tables, but that they can be related to each other when necessary. Finally, I would design an API with endpoints that take into account what actions users on the platform would need to have the ability to perform. In the case of this application, actions include creating a user, logging in, getting information on the feline models, making an appointment request, adding a new feline model, and others. 

My responses to each of the assigned tasks are located in Q1.md, Q2.md, and Q3.md, but will also be listed below.

Immediate next steps I would take would be to first fully implement the backend, database, and API as they currently are. From there I would implement JWT-based authentication and session handling before deploying the application using Vercel. Finally I would implement additional features such as an advanced search, and tidy up the UI with the help of Tailwind or Bootstrap.

# Q1: Front-End Design
## Explanation
For the front-end, I built a simple webapp with Next.js that displays feline models and their associated information in separate blocks, that can each be clicked in order to book an appointment. The components are currently somehwat unstructured, as all frontend logic is handled in a single file. This is due to the simplicity of the app itself, and one of the first things that I would change when scaling up the application would be to split larger components into separate files in order to provide more modularity. Additional features I would build would be an advanced search at the top of the page that can filter models by their characteristics (length, weight, breed, etc), a way to click between popups for the feline models without having to close the current popup and reopen a new one, and a login/auth system using JWT.

# Q2: DB Design
## Explanation
    I structured the table design for this application in a way that I believe would be straightforward for people to read and understand as well as scale well as more data is added. The business logic I considered was mainly about how can the fewest man hours be wasted bringing someone up to speed on how the tables relate to each other, and which tables should be associated with what data type so as to best reduce bloat as the application is scaled-up. Growth of the database should be handled fairly well with the current design as long as the indices and keys on each table are relevant to the most queried data points, allowing fast queries and low responsetime even as more data is added. The biggest challenge I ran into when designing the DB was how to limit what type of data users can alter. It would not make good business or security sense to allow people to make appointments, be able to add new models, or edit model information without some form of login and verification, so my solution was to design basic tables for user accounts and auth, as well as tables for roles and privileges, so that certain features could be locked to only the privileged users. Double-booking can be prevented by only allowing users to request appontments that re within a model's listed time slots as well aa times with a model's availability that re not already requested.
    
## Table `models` - DT: Tracks feline models
    model_id | int
    model_name | varchar
    model_breed | varchar
    model_fur_color | varchar
    model_eye_color | varchar
    model_weight | varchar
    model_length | varchar
    created_ts | timestamp
    last_updated_ts | timestamp
    user_id | int // id of the user who added the model. -1 for admin or default model

## Table `users` - DT: Tracks users who have created an account
	user_id | int
	username | varchar
	password | varchar // hashed and salted
	role_id | int
	created_ts | timestamp
	last_updated_ts | timestamp

## Table `model_appointments` - DT: Tracks model appointments and what users they are associated with
	model_id | int
	user_id | int
	start_time | timestamp
	end_time | timestamp
	appointment_past | tinyint // whether the appointment time has passed
	
## Table `user_sessions` - DT:  Tracks user sessions
	session_id | int
	user_id | int
	login_time | timestamp
	logout_time | timestamp
	last_updated_ts | timestamp

## Table `change_tracking` - DT: Tracks changes to users, feline models, appointments, privileges, etc
    change_id | int
    change_ts | timestamp
    user_id | int // id of user that made the change. -1 for admin
    item_id | int // id of item being changed
    change_type_id | int // insert, update, or delete
    data_before_change | varchar
    data_after_change | varchar

## Table `roles` - CD: Roles a user can have
    role_id | int
    role_dsc | varchar
    created_ts | timestamp

## Table `privileges` - CD: Privileges available that can be assigned to roles
	privilege_id | int
	privilege_dsc | varchar
	enabled | tinyint
	created_ts | timestamp

## Table `role_privilege` - DT: Maps roles to associated privileges
	role_id | int
	privilege_id | int
	created_ts | timestamp

# Q3: API Endpoints
## Explanation
    For the API portion of this app, I designed 6 endpoints, 2 each relating to model, users, and appointments. I used Next.js's inbuilt App Router for the writing and structure of the API endpoints. Each type of data point (model, user, and appointment) has its own routing through this API, and although they are not fully implemented, completing them and building more endpoints on top of the pre-existing ones would be straightforward, which is why I structured them as such. Error handling is fairly standard withwrapping each endpoint in a try/catch and returning a detailed error message for easier debugging. For auth, I would opt to use JWT as it offers stateless authentication, which will reduce backend load and server calls which will be beneficial as the application is scaled up. Booking and workflows can be handled by only allowing users to select times when a model is available when requesting an appointment. This can be accomplished by keeping track of what time slots each model is availabale for as well as times that they have already been booked for an appointment. React provides a calendar library, which I have used some basic functionality of in this project, and Next.js can integrate with payment processors such as PayPal or Stripe for payment processing. The biggest challenge I ran into was deciding how to structure the API routing. With Next.js App Router, a single file can make multiple calls, but determining which data each endpoint should access is important. That is why I structured the endpoints as I did, with each associating with a different type of data.
## `create_user`
    Accepts {user, password} in request body, hashes password and adds new user, returns 200 on success
## `verify_user`
    Accepts {user, password} in request body, hashes password and checks credentials against created users, returns 200 on success
## `get_appointments`
    Accepts {modelId} in request body, checks available appointments for requested cmodel, resturns array of appointment objects
## `book_appointment`
    Accepts {modelId, time} in request body, inserts new appointment for the requested model, returns 200 on success
## `get_models`
    Returns all models
## `add_model`
    Accepts {name, breed, color, weight, length, eyeColor, photo} of new model request, returns 200 on success