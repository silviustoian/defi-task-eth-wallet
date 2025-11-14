ETH Wallet – Web3.js Demo

This is a simple ETH wallet interface built as part of a technical test.
It demonstrates basic Web3.js usage, MetaMask integration, and a clean UI/UX flow.

⸻

🚀 Features

🔌 Connect Wallet
	•	Connects to MetaMask using window.ethereum
	•	Automatically loads the user’s active account

💰 View Balance
	•	Fetches and displays the current ETH balance for the connected wallet
	•	Balance updates after sending transactions

📤 Send ETH
	•	Simple form to send ETH to any valid address
	•	Uses eth_sendTransaction via MetaMask
	•	Displays status messages (sending, success, error)

📥 Receive ETH
	•	Shows the connected wallet address so users can receive funds

⸻

🛠️ Tech Stack
	•	React.js
	•	Web3.js
	•	MetaMask / window.ethereum provider