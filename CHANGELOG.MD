# CHANGELOG.md

#Contributors
* Auna Walton  

# Overall 
* Added routing between Auth, Home, Groups, and MyGroups views 

# Auth 
* Incorporated Firebase Auth into authentication service 
* Created a login/register shared, stateless `AuthForm` component 
* Created an Auth service to manage all queries 
* Created a User Model with query and utility methods 

# Views 
* Created a search view (Home) to allow the user to enter their info: origin, destination, time of departure. 
* Created a browse view (Groups) to show the groups that apply to the user input 
* Created a group preview card view -- stateless component

# Data/Apis
* Write/Read from Firebase Firestore db for application 
* Created models and services to communicate between database and view. 

# Style 
* Added Skeleton styling components to each view using Bootstrap Grid and Material UI 
