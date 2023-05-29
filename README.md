## Login
Firebase : sign-in-with google
* Response : 
    - Email
    - Username
	- Token

## VerifyLogin
* URL
    - ```/login```
* Method
    - POST
* Request Body
    - ``tokenfirebase`` as ``string``
* Response
```json
{
    "error": false,
    "message": "Succes Login",
    "tokenjwt" : 			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLXlqNXBjX0xBUkNfQWdLNjEiLCJpYXQiOjE2NDE3OTk5NDl9.flEMaQ7zsdYkxuyGbiXjEDXO8kuDTcI__3UjCwt6R_I"
    "username" : "Tono"
    "email" : "tono@gmail.com"
    "gambar" : "http//firebase/image/user/123"
}
```

## GetPoint
* URL
    - ```/point/{id}```
* Method
    - GET
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Request Body
    - ``id`` as ``string`` (Path)
* Response
```json
{
    "error": false,
    "message": "Succes Generate Point"
    "point" : "200"
}
```


## AddPoint
* URL
    - ```/point/{id}```
* Method
    - POST
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Request Body
    - ``id`` as ``string`` (Path)
    - ``point`` as ``int``
* Response
```json
{
    "error": false,
    "message": "Success Add Point"
    "point" : "400"
}
```

## SendSleepTime
* URL
    - ```/time/{id}```
* Method
    - POST
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Request Body
    - ``id`` as ``string`` (Path)
    - ``sleeptime`` as ``string``
    - ``endtime`` as ``string``
* Response
```json
{
    "error": false,
    "message": "Success Send Sleep Time"
}
```

## GetAllChallenge
* URL
    - ```/challenge```
* Method
    - GET
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Response
```json
{
    "error": false,
    "message": "Success Get Challenge List"
    "data" :  [
        {
            "id": 1,
            "name": "Tidur 7 Hari",
            "point": 200,
            "img": "https://halohalo",
        },
        {
            "id": 2,
            "name": "Tidur 30 Hari",
            "point": 1000,
            "img": "https://halotest",

        },
    ]

}
```
