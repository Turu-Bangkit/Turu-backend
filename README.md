## Login
Firebase : Sign In with Google
* Response :  
	- token

## VerifyLogin
* URL
    - ```/login```
* Method
    - POST
* Request 
    - ``token`` as ``string``
* Response
```json
{
    "error": false,
    "message": "Login Success !",
    "uid": 13243140290,
    "username" : "Tono",
    "email" : "tono@gmail.com",
    "picture" : "https://image/user/123",
    "jwtToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLXlqNXBjX0xBUkNfQWdLNjEiLCJpYXQiOjE2NDE3OTk5NDl9.flEMaQ7zsdYkxuyGbiXjEDXO8kuDTcI__3UjCwt6R_I"
}
```

## Logout
* URL
    - ```/logout```
* Method
    - POST
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Response
```json
{
    "message": "Logout Success !",
    "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1c2VyLXlqNXBjX0xBUkNfQWdLNjEiLCJpYXQiOjE2NDE3OTk5NDl9.flEMaQ7zsdYkxuyGbiXjEDXO8kuDTcI__3UjCwt6R_I"
}
```



## GetPoint
* URL
    - ```/point/{uid}```
* Method
    - GET
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Request
    - ``uid`` as ``string`` (Path)
* Response
```json
{
    "error": false,
    "message": "Success Generate Point"
    "point" : "200"
}
```


## AddPoint
* URL
    - ```/point/{uid}```
* Method
    - POST
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Request
    - ``uid`` as ``string`` (Path)
    - ``point`` as ``int``
* Response
```json
{
    "error": false,
    "message": "Success Add Point"
    "point" : "400"
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
    "message": "Success Get All Challenge"
    "data" :  [
        {
            "id": 1,
            "name": "Tidur 7 Hari",
            "image": "https://halohalo",
            "desc": "this is description",
            "point": 200,
            "start_time" : "21:00",
            "end_time" : "05:00",
            "days" : 7
        },
        {
            "id": 2,
            "name": "Tidur 14 Hari",
            "image": "https://halohalo2",
            "desc": "this is description",
            "point": 500,
            "start_time" : "21:00",
            "end_time" : "05:00",
            "days" : 14
        },
    ]

}
```


## ChooseChallenge
* URL
    - ```/chooseChallenge/{uid}```
* Method
    - POST
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Request
     - ``uid`` as ``string`` (Path)
    - ``idChallenge`` as ``string``


* Response
```json
{
    "error": false,
    "message": "Success Register Challenge"
}
```

## GetStatusChallenge
* URL
    - ```/statusChallenge/{uid}```
* Method
    - GET
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Request
     - ``uid`` as ``string`` (Path)

* Response
```json
{
    "error": false,
    "message": "Success Get Status Challenge"
    "data" : {
        "level_user" : 1,
        "start_rules_time" : 169453845,
        "end_rules_time" :  169481235,
        "max_level" : 7,
        "idChallenge" : 1
    }
}
```


## UpdateLevel
* URL
    - ```/updateLevel/{uid}```
* Method
    - POST
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Request
     - ``uid`` as ``string`` (Path)
     - ``level`` as ``int``

* Response
```json
{
    "error": false,	
    "message": "Success Update Level"
}
```

## GetDetailChallenge
* URL
    - ```/challenge/{idChallenge}```
* Method
    - GET
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Response
```json
{
    "error": false,
    "message": "Success Get Detail Challenge"
    "data" :  
        {
            "id": 1,
            "name": "Tidur 7 Hari",
            "image": "https://halohalo",
            "desc": "this is description",
            "point": 200,
            "start_time" : "21:00",
            "end_time" : "05:00",
            "days" : 7
        },
}
```


## GetAllCatalog
* URL
    - ```/catalog```
* Method
    - GET
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Response
```json
{
    "error": false,
    "message": "Success Get All Catalog"
    "data" :  [
        {
            "id" : 1,
            "name": "Pulsa Rp. 5000",
            "image": "https://lalalala",
            "price": 5000,
            "point": 500,
        },
        {
            "id" : 2,
            "name": "Pulsa Rp. 10000",
            "img": "https://lalalala2",
            "price": 10000,
            "point": 1000,
        },
 {
            "id" : 3,
            "name": "Pulsa Rp. 20000",
            "img": "https://lalalala3",
            "price": 20000,
            "point": 2000,
        },
    ]
}
```

## GetDetailCatalog
* URL
    - ```/catalog/{idCatalog}```
* Method
    - GET
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Response
```json
{
    "error": false,
    "message": "Success Get Detail Catalog"
    "data" :  
        {
	    "id" : 1,
            "name": "Pulsa Rp. 5000",
            "img": "https://lalalala",
            "price": 5000,
            "point": 500,
        },
}
```

## ExchangePoint
* URL
    - ```/exchangePoint/{uid}```
* Method
    - POST
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Request
     - ``uid`` as ``string`` (Path)
     - ``idCatalog`` as ``int``

* Response
```json
{
    "error": false,	
    "message": "Success Exchange Point"
}
```

## StartSleep
* URL
    - ```/startsleep/{uid}```
* Method
    - POST
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Request
     - ``uid`` as ``string`` (Path)

* Response
```json
{
    "error": false,	
    "message": "Happy Sleeping"
}
```

## GetIsSleeping
* URL
    - ```/issleeping/{uid}```
* Method
    - GET
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Request
    - ``uid`` as ``string`` (Path)
* Response
```json
{
    "error": false,
    "issleeping": 1
}
```

## StopSleep
* URL
    - ```/stopsleep/{uid}/{success}```
* Method
    - POST
* Headers
    - ``Authorization`` : ``Bearer <token>``
* Request
     - ``uid`` as ``string`` (Path)
     - ``success`` as ``int``
* Response
```json
{
    "error": false,
    "message": "Success Update Sleeping",
}
```
