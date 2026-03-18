

# Task 1 & 10: getallbooks
```
curl "http://localhost:3000/"
```
async: 
```
curl "http://localhost:3000/async/books"
```

# Task 2 & 11: getbooksbyISBN (/isbn/:isbn)
```
curl "http://localhost:3000/isbn/1"
```
async: 
```
curl "http://localhost:3000/async/isbn/1"
```


# Task 3 & 12: getbooksbyauthor (/author/:author)
```
curl "http://localhost:3000/author/Chinua Achebe"
```
async: 
```
curl "http://localhost:3000/async/author/Chinua%20Achebe"
```

# Task 4 & 13: getbooksbytitle (/title/:title)
```
curl "http://localhost:3000/title/The Divine Comedy"
```
async: 
```
curl "http://localhost:3000/async/title/The%20Divine%20Comedy"
```


# Task 5: getbookreview (/review/:isbn)
```
curl "http://localhost:3000/review/1"
```


# Task 6: register (/register)
```
curl -X POST http://localhost:3000/register \
     -H "Content-Type: application/json" \
     -d '{"username": "zulkarnaen", "password": "secret"}'
```

# Task 7: login (/customer/login)
```
curl -X POST http://localhost:3000/customer/login \
     -H "Content-Type: application/json" \
     -d '{"username": "zulkarnaen", "password": "secret"}' \
     -c cookies.txt
```

# Task 8: reviewadded (/customer/auth/review/:isbn)
```
curl -X PUT "http://localhost:3000/customer/auth/review/1?review=This%20book%20is%20very%20good" \
     -b cookies.txt
```

# Task 9: deletereview (/customer/auth/review/:isbn)
```
curl -X DELETE "http://localhost:3000/customer/auth/review/1" \
     -b cookies.txt
```
