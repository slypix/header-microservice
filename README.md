# Header Parser Microservice
The header parser microservice returns a JSON object containing some user information namely IP address, browser language, and operating system.  

### API
* **Endpoint:** `https://slpx-headers.herokuapp.com/api`
* **Method:** `GET`

### Usage
**try it here:** [`https://slpx-headers.herokuapp.com/api`](https://slpx-headers.herokuapp.com/api)

### Example

```bash
# the following request:
  https://slpx-headers.herokuapp.com/api

# will return something like this:
  { 
    "ipaddress":"8.8.8.8",
    "language":"en-US",
    "software":"(Macintosh; Intel Mac OS X 10_11_3)"
  }
```