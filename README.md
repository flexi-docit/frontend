# DocIt!

## Project Setup
```
Clone the master branch
cd frontend
npm install
```

### Start with hot-reloads for development
```
npm start
```

### Before committing
```
npm run format (Make sure you have prettier installed)
npm run lint (Make sure you have eslint installed)
```

### Notes for viewing pages
- Get a JWT token with the role you want (Team Lead, Module Lead, Developer)
- Edit `localstorage` in browser console, add `d-token` as Key and the JWT as Value
- Refresh the page
```