# DocIt!

## Project Setup

```
npm install
```

### Start with hot-reloads for development

```
npm start
```

### Notes for viewing pages

- `ResetPassword.vue` - Comment out in `beforeCreate()`

```
if (!token || !JWTRegex.test(token)) {
    alert("Access denied");
    router.push("/");
}
```
