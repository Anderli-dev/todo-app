# Simple todo app
## Frontend (src folder)
For the frontend, I use React, Redux, Axios and Bootstrap.
### React
Main logic implemented by React. I made most of the requests separately so that you can call them from anywhere. Separately made components:
    -Navigation bar.
    -Modal message.
    -Geting CSRF token.
### Redux
Redux showing messages about success.You can Make any kind of message and call from anywhere.
### Axios
Requests make by Axios.
### Bootstrapp
For styling used Bootstrapp and a little bit MatiralDesign.
## Backend (todo_api folder)
  For the backend, I use Django, Django REST framework and WhiteNoise.
### Django
Login and registration was done with django session authentication. Added model of task and use standert django user model. Also created some ***tests***.
### DRF
DRF is responsible for browsable API and serializing data.
### WhiteNoise
WhiteNoise is responsible for static files.
##Project deployed on Heroku!
