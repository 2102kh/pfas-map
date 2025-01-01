## Tekniska detaljer

Detta projekt är byggt med:
##Frontend: **React + TypeScript** (ansluter till backend-API för att hämta och skicka data).
            **Vite**används som byggverktyg för snabb utveckling och HMR (Hot Module Replacement)
##Backend:  **Express.js API, Firebase Functions** (hanterar autentisering, rollhantering och databasuppdateringar).
##Databas:  **Firebase Firestore** (lagrar PFAS-data och användarroller).
##Deployment:**Netlify**:https://sweden-pfas-data.netlify.app/ 


För att starta projektet lokalt, kör följande kommandon:
```bash
npm install
npm run dev




**Sweden PFAS Information Map**
##Projektbeskrivning
Sweden PFAS Information Map är en interaktiv webbapplikation som visualiserar PFAS-föroreningar i olika kommuner i Sverige. Den är byggd för att hjälpa forskare, kommuner och allmänheten att förstå och hantera denna miljöutmaning. PFAS är farliga kemikalier som kan påverka både miljö och människor, inklusive cancer.

##**Huvudsyfte:**

- Tillhandahålla en användarvänlig plattform för att visa och hantera PFAS-data.
- Hjälpa ansvariga myndigheter att fatta datadrivna beslut för bättre miljöpolitik.

## **Funktionalitet**

### **Frontend**
1. **Interaktiv karta:**
   - Visar PFAS-data för olika kommuner i Sverige.
   - Använder Leaflet.js för att visualisera data med färgkodade markörer baserade på föroreningsnivåer.

2. **Inloggningssystem:**
   - Administratörer och SuperAdmins kan logga in med Firebase Authentication.
   - Roller hanteras med Firebase Custom Claims.

3. **Adminpanel:**
   - Administratörer kan uppdatera PFAS-nivåer för specifika kommuner.
   - Visar den senaste uppdateringen för varje kommun.

4. **SuperAdmin-kontrollpanel:**
   - SuperAdmins kan godkänna eller neka nya administratörer.

### **Backend**
1. **Firebase Firestore:**
   - Realtidslagring av PFAS-data och användarroller.

2. **API-endpoints med Express.js:**
   - Skapa och hantera administratörer.
   - Hantera roller som "admin" och "superadmin".
   - Uppdatera PFAS-data.

### **Testning**
- **E2E-testning med Cypress:**
  - Testar användarflöden som inloggning, uppdatering av PFAS-data och administratörshantering.
  - Cypress används för att säkerställa att frontend och backend fungerar smidigt tillsammans.

---

## **Tech Stack**
- **Frontend:**
  - React med TypeScript för snabb och dynamisk UI-utveckling.
  - Leaflet.js för interaktiva kartor.
  - SCSS för modern och responsiv styling.

- **Backend:**
  - Node.js med Express.js för serverlogik.
  - Firebase Firestore för datalagring.
  - Firebase Authentication för säker inloggning och rollhantering.

- **Testning:**
  - Cypress används för E2E-testning.

- **Deployment:**
  - Frontend är hostad på Netlify.
  - Backend körs med hjälp av Firebase Functions.

---

## **Installation**

### **1. Förberedelser**
- **Krav:**
  - Node.js
  - Firebase-projekt med aktiverade tjänster: Authentication och Firestore.
  - Netlify för frontend-deployment.

### **2. Installation**
1. **Klona projektet:**
   ```bash
   git clone https://github.com/2102kh/pfas-map.git


2. **Installera beroenden:**
   ```bash
   npm install
   ```

3. **Konfigurera Firebase:**
   - Skapa en `.env`-fil och lägg till dina Firebase-konfigurationsnycklar:
     ```env
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
     VITE_FIREBASE_APP_ID=your_app_id
     ```

4. **Starta frontend:**
   ```bash
   npm run dev
   ```

5. **Deploy backend (Firebase Functions):**
   ```bash
   firebase deploy --only functions
   ```

---

## **API-dokumentation**

| **Funktion**              | **Backend**        | **Frontend (använder backend)** | **Kommentar**                                          |
|---------------------------|--------------------|----------------------------------|-------------------------------------------------------|
| Registrera Admin          | ✅                 | ✅                               | Skickar POST till backend för             hantering.             |
| Sätta SuperAdmin          | ✅                 | ✅                               | Endast hantering via backend.                        |
| Godkänna Admin            | ✅                 | ✅                               | Används av SuperAdmin via frontend.                  |
| Uppdatera PFAS-nivå       | ✅                 | ✅                               | Logiken har flyttats till backend för säkerhet.      |
| Hämta alla städer         | ❌                 | ✅                               | Finns endast i frontend – bör övervägas att flyttas. |

---

## **Testning**

### **1. E2E-testning med Cypress**
Cypress används för att testa följande funktioner:
1. **Admin-login:** Säkerställer att admins kan logga in korrekt.
2. **Uppdatering av PFAS-data:** Testar att PFAS-nivåer kan uppdateras och att ändringarna sparas korrekt.
3. **Godkännande av admins:** SuperAdmins kan godkänna nya administratörer.

### **Kommandon för testning**
1. Installera Cypress:
   ```bash
   npm install cypress --save-dev
   ```
2. Starta Cypress:
   ```bash
   npx cypress open
   ```
3. Kör tester:
   - Välj tester från Cypress GUI.

---

## **Framtida Förbättringar**
- Implementera en funktion för att visa historik av PFAS-ändringar (inklusive datum och användare).
- Förbättra användargränssnittet för mobilanvändare.
- Flytta fler frontend-funktioner till backend för ökad säkerhet.



