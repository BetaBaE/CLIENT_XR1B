# CLIENT XR1B – Finance & Payments Dashboard

A role-based internal dashboard for managing suppliers, invoices, advances, virement orders and other treasury operations. Built on top of **React-Admin** and **Material-UI**, it provides CRUD resources, analytics (Recharts), and Excel/PDF export utilities.

---

## Tech Stack

| Layer             | Library / Tool                |
|-------------------|-------------------------------|
| UI Components     | React 18, Material-UI v5, react-icons |
| Admin Framework   | react-admin v5 + ra-data-simple-rest |
| Charts / Exports  | Recharts, xlsx / exceljs, json2xls |
| Alerts & Modals   | sweetalert2                   |
| Auth & Security   | Custom `authProvider.js` (token-based) |

---

## Local Development

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure API endpoint – create a **.env** file at project root:

   ```env
   REACT_APP_API_URL=http://localhost:3000
   ```

   (Keep `src/config.js` out of git; it just reads this env var.)

3. Start the dev server:

   ```bash
   npm start
   ```

   The app runs at `http://localhost:3000`.

---

## Roles & Permissions (excerpt)

| Role label (FR)           | Code in DB / JWT | Access scope |
|---------------------------|------------------|--------------|
| Admin                     | admin            | Full CRUD on every resource |
| Direction Générale        | direction générale | Global read-only + selected write |
| Superviseur Comptabilité  | superviseur comptabilite | Validate / edit accounting docs |
| Comptable                 | comptable        | Day-to-day data entry |
| Consultation Directeur    | consultation directeur | Read-only dashboards |

Permission checks live in `App.js` (to be refactored into a helper).

---

## Project Structure (simplified)

```
src/
  components/        Domain-driven resource folders (List, Edit, Create)
  authProvider.js    React-Admin authentication & role resolution
  config.js          Reads REACT_APP_API_URL (git-ignored)
  App.js             Admin wrapper + resource registry (≈950 LOC)
```

---

## Testing

Run Jest tests (none yet, contributions welcome):

```bash
npm test
```

---

## Production Build & Deployment

```bash
npm run build
```

The optimized bundle is generated in `build/`. Deploy it to any static host (Nginx, Netlify, S3, etc.). Ensure you set `REACT_APP_API_URL` in the server environment (e.g., Netlify UI).

---

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://10.111.1.95:3000](http://10.111.1.95:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
