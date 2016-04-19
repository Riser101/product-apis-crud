
**NodeJS v4.1.0** and **MongoDB  v3.0.7**
## Installation
Run `bash install` in the project root directory.

## Config
	{
		"httpPort":3000,
		"mongodb":{
			"host":"127.0.0.1",
			"port":27017,
			"db":"ajs"
		}
	}

## APIs
### /users
This route creates new users.

**Method : Post**

Sample Request:

	{
		"email":"sampleEmail@gmail.com",
		"password":"samplePassword"	
	}						    
Sample Response:
	
	{
      "data": {
        "id": {
          "result": {
            "ok": 1,
            "n": 1
          },
          "ops": [
            {
              "email": "yousuf@bms.com",
              "password": "b24331b1a138cde62aa1f679164fc62f",
              "ts": {
                "insISO": 1460990570,
                "insHRF": "April 18, 2016",
                "updISO": 1460990570,
                "updHRF": "April 18, 2016"
              },
              "_id": "5714f26c65968aa018cb947a"
            }
          ],
          "insertedCount": 1,
          "insertedIds": [
            "5714f26c65968aa018cb947a"
          ]
        }
      },
      "error": {
        "code": 0,
        "text": "Successfully added the user"
      }
    }
			
### /login
This route logs-in a registered user

**Method : Post**

Sample Request:

	{
    	"email":"yousuf@bms.com",
    	"password":"abc@123"
	} 	          

Sample Response:

    {
      "data": {
        "id": ""
      },
      "error": {
        "code": 0,
        "text": "you're logged-in successfully"
      }
    }

### /add
This route adds a product.

**Method : Post**

Sample Request:
    
    {
        "email":"yousuf@bms.com",
        "password":"abc@123",
        "product":"macbook"
    }
Sample Response:

    {
      "data": {
        "id": {
          "result": {
            "ok": 1,
            "n": 1
          },
          "ops": [
            {
              "product": "macbook",
              "_id": "5714f3a265968aa018cb947b"
            }
          ],
          "insertedCount": 1,
          "insertedIds": [
            "5714f3a265968aa018cb947b"
          ]
        }
      },
      "error": {
        "code": 0,
        "text": "Successfully added your product"
      }
    }

### /delete
This route deletes a product.

**Method:Post**

Sample Request:							    
	
	{
    	"email":"yousuf@bms.com",
    	"password":"abc@123",
    	"id":"5714f48165968aa018cb947c"
	}

Sample Response:
	
    {
      "data": {
        "id": {
          "ok": 1,
          "n": 1
        }
      },
      "error": {
        "code": 0,
        "text": "Successfully deleted your product"
      }
    }

### /edit
This routes edits an already added product.

**Method:Post**

Sample Request:							    
	
	{
    	"email":"yousuf@bms.com",
	    "password":"abc@123",
   	    "id":"5714f3a265968aa018cb947b",
        "product":"iphone"
	}
	
Sample Response:		
	
	    {
      "data": {
        "id": {
          "value": {
            "_id": "5714f3a265968aa018cb947b",
            "product": "iphone"
          },
          "lastErrorObject": {
            "updatedExisting": true,
            "n": 1
          },
          "ok": 1
        }
      },
      "error": {
        "code": 0,
        "text": "Successfully edited your product"
      }
    }
### /search
This route search's for a product in the database.

**Method:Post**

Sample Request:							    
	
	{
    	"email":"yousuf@bms.com",
   	    "password":"abc@123",
    	"id":"5714f3a265968aa018cb947b"
	}

Sample Response:		
    
    {
      "data": {
        "id": true
      },
      "error": {
        "code": 0,
        "text": "Found your product"
      }
    }					    
## Error Codes

| Error Code                            | Description                                 |
|---------------------------------------|---------------------------------------------|
| 1000                                  | You are not registered. Please register first|
| 1001									 | Failed to add your product
| 1002                                  |  Invalid email or password  |
| 1003									 | Failed to delete your product                          |
| 1004                            |Invalid productID: You must send a 24 character hex productID          |
| 1005					                 |Unable to delete your product. Please try again.               |
| 1006                                  | Your product not found.   |
| 1007 								     | Unable to edit your product. Please try again.                       |
| 1008 									 | Unable to add user. Please try again.           |
| 1009									 | Something went wrong, please try again later               |	|	






