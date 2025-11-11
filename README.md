  <h1>MERN + Algorand Transaction App</h1>

  <p>A full-stack web application built with <strong>MERN (MongoDB, Express, React, Node.js)</strong> and integrated with the <strong>Algorand blockchain</strong>. Users can send ALGO and view transaction history. The frontend uses <strong>Vite</strong>, <strong>React</strong>, <strong>TypeScript</strong>, <strong>TailwindCSS</strong>, and <strong>ShadCN UI</strong> for components.</p>
  
  <h2 id="features">Features</h2>
  <ul>
    <li>Send ALGO to any Algorand account.</li>
    <li>View past transactions in a list.</li>
    <li>Uses Algorand TestNet via <strong>AlgoNode</strong>.</li>
    <li>Component-driven UI with <strong>ShadCN UI</strong> and <strong>TailwindCSS</strong>.</li>
    <li>TypeScript for type safety.</li>
  </ul>

  <h2 id="tech-stack">Tech Stack</h2>
  <ul>
    <li><strong>Frontend:</strong> React, Vite, TypeScript, TailwindCSS, ShadCN UI</li>
    <li><strong>Backend:</strong> Node.js, Express, TypeScript</li>
    <li><strong>Blockchain:</strong> Algorand TestNet, AlgoNode</li>
    <li><strong>Database:</strong> MongoDB (for transaction records)</li>
    <li><strong>HTTP Client:</strong> Axios</li>
  </ul>

  <h2 id="project-structure">Project Structure</h2>
  <pre>
frontend/vite-project/
├── src/
│   ├── components/
│   │   ├── TransactionForm.tsx
│   │   ├── TransactionList.tsx
│   │   └── StatusChecker.tsx
│   ├── pages/
│   │   └── Home.tsx
│   ├── App.tsx
│   └── main.tsx
├── tailwind.config.ts
├── tsconfig.json
└── vite.config.ts

backend/
├── controllers/
│   └── transactionController.ts
├── models/
│   └── Transaction.ts
├── routes/
│   └── transactionRoutes.ts
├── algodClient.ts
├── server.ts
└── tsconfig.json
  </pre>

  <h2 id="setup--installation">Setup & Installation</h2>
  <h3>1. Clone the Repository</h3>
  <pre>
git clone https://github.com/yourusername/mern-algorand.git
cd mern-algorand
  </pre>

  <h3>2. Backend Setup</h3>
  <pre>
cd backend
npm install
  </pre>
  <p>Make sure you have <strong>MongoDB</strong> running. Create a <code>.env</code> file:</p>
  <pre>
MONGO_URI=mongodb://localhost:27017/algorand_db
PORT=5000
  </pre>
  <p>Start the backend:</p>
  <pre>
npm run dev
  </pre>

  <h3>3. Frontend Setup</h3>
  <pre>
cd ../frontend/vite-project
npm install
npm run dev
  </pre>
  <p>Open browser at <code>http://localhost:5173</code> (Vite default).</p>

  <h2 id="backend-api-endpoints">Backend API Endpoints</h2>
  <table>
    <tr>
      <th>Method</th>
      <th>Endpoint</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>POST</td>
      <td>/api/algorand/send</td>
      <td>Send ALGO transaction</td>
    </tr>
    <tr>
      <td>GET</td>
      <td>/api/algorand/transactions</td>
      <td>Get all recorded transactions</td>
    </tr>
  </table>

  <p><strong>Request Example for Sending ALGO:</strong></p>
  <pre>
POST /api/algorand/send
{
  "senderMnemonic": "your 25-word mnemonic here",
  "to": "RECIPIENT_ADDRESS",
  "amount": 1.5,
  "note": "Optional note"
}
  </pre>

  <h2 id="usage">Usage</h2>
  <ol>
    <li>Start backend and frontend.</li>
    <li>On the frontend, enter:
      <ul>
        <li>Sender mnemonic</li>
        <li>Recipient address</li>
        <li>Amount of ALGO</li>
        <li>Optional note</li>
      </ul>
    </li>
    <li>Submit transaction.</li>
    <li>Transaction list updates with status.</li>
  </ol>


