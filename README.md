# Dynamik experiment app

## Requirement
- jsPsych 7.3.4

## Features for crowdsourcing
- Security Enhancements (Anti-Hacking Measures)
  - Data Encryption:
    - Implemented Caesar cipher, string splitting and concatenation, and XOR encryption for layered security.
    - Utilized obfuscation libraries to make the code harder to reverse-engineer.
    - Applied variable renaming libraries to further complicate code analysis.
- Improved Explainability and UI Design
  - Color-Coded Feedback:
    - Incorporated intuitive color schemes (green for "good," red for "bad") to enhance user understanding.
    - Applied universal design principles by selecting colorblind-friendly palettes to improve accessibility.
- Development and Deployment Optimization (Vue.js)
  - Addressed discrepancies between the build directory structure and the deployment directory structure to streamline the deployment process.

## Screenshots
![スクリーンショット 2024-09-13 11 44 31](https://github.com/user-attachments/assets/65ac07d6-fc23-45d2-8677-33c93eea0629)
![スクリーンショット 2024-09-13 11 47 44](https://github.com/user-attachments/assets/3de157e8-ce9b-49e9-a230-2187496bdece)
![スクリーンショット 2024-09-13 11 48 10](https://github.com/user-attachments/assets/ca163231-c93f-494f-82cc-c059df226020)
![スクリーンショット 2024-09-13 11 52 42](https://github.com/user-attachments/assets/f8f3e856-40ae-4d21-8e8b-02bfa447324d)
![スクリーンショット 2024-09-13 11 52 04](https://github.com/user-attachments/assets/f0074fab-566f-4b0c-88e6-95a3db8a86e7)
![スクリーンショット 2024-09-13 11 53 04](https://github.com/user-attachments/assets/d355c7ce-830b-4c27-9455-2534decaa54d)


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Encryption

```
node encryptQuestions.js 
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
