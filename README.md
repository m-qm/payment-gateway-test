# Next.js Payment Gateway Integration

This project demonstrates the integration of a payment gateway using Next.js. It includes features like creating payments, monitoring payment status through websockets, and displaying payment summary.

## Table of Contents

- [Features](#features)
- [Technical Decisions](#technical-decisions)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Create Payment:** Initiate a payment with specified details such as amount, currency, and concept.
- **WebSocket Integration:** Monitor payment status in real-time using WebSocket communication.
- **Payment Summary:** Display a summary of the payment details along with a QR code for easy payment processing.
- **Payment Status:** Show different UI screens based on the payment status, like completed, expired, canceled, or in error.

## Technical Decisions

### Currency Choice: Ripple (XRP) vs. MetaMask

The decision to implement Ripple (XRP) instead of MetaMask was driven by [specific considerations]:

1. **Ripple Integration:** The project leverages Ripple (XRP) for payment processing. Ripple provides a fast and cost-effective cross-border payment solution with a focus on real-time gross settlement.

2. **Project Requirements:** Based on the project requirements and use case, Ripple was deemed suitable for the integration. MetaMask, commonly associated with Ethereum and ERC-20 tokens, was not necessary for this specific scenario.

3. **Simplicity and Efficiency:** Focusing on a single blockchain integration (Ripple) streamlined the development process, reducing complexity and potential issues associated with multi-chain integration.

## Getting Started

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/m-qm/payment-gateway-test.git

   ```

2. Install dependencies

``` 
    cd payment-gateway-test 
    npm install
```

3. Run the development server:

```
    npm run dev
```
Open http://localhost:3000 to view the application in your browser.


## Usage
Navigate to the create payment page.

Enter the required details: amount, currency, and concept.

Click "Continuar" to initiate the payment.

Follow the payment process, and monitor the payment status in real-time.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.


## License

This project is licensed under the MIT License.

