import { useState, useEffect } from "react";
import { ApiService } from "../services";
import QRCode from "qrcode.react";
import { deviceId } from "../utils";

const Summary = ({
  amount,
  selectedCurrency,
  commerce,
  transactionDate,
  content,
  identifier,
  paymentUrl,
  expirationTime,
  setShowSummary,
  setPaymentStatus,
  handlePaymentCompletion
}) => {
  const [remainingTime, setRemainingTime] = useState(expirationTime);
  const [paymentStatusUpdate, setPaymentStatusUpdate] = useState(null);
  const [orderInfo, setOrderInfo] = useState(null);

  // debugging purposes only
  const [orders, setOrders] = useState(null);

  const [isSmartQRToggled, setSmartQRToggled] = useState(true);

  const wsEndpoint = `wss://payments.pre-bnvo.com/ws/${identifier}`;

  useEffect(() => {
    const ordersList = async () => {
      await ApiService.getOrders(deviceId).then(data => {
        setOrders(data);
      });
    };
    ordersList();
  }, []);

  // fetch order info

  useEffect(() => {
    const orderInfo = async () => {
      await ApiService.getOrderInfo(deviceId, identifier).then(data => {
        setOrderInfo(data[0]);
      });
    };
    orderInfo();
  }
    , [deviceId, identifier]);


  // connect to websocket

  useEffect(() => {
    const socket = new WebSocket(wsEndpoint);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = event => {
      const data = JSON.parse(event.data);

      console.log("WebSocket message received:", data);


      if (data.identifier === identifier) {
        setPaymentStatusUpdate(data.status);
        // Render completed payment page when payment is completed
        if (data.status === "CO") {
          handlePaymentCompletion();
          // update payment status
          setPaymentStatus(data.status);
        }
        // handle expired payment
        if (data.status === "EX") {
          setShowSummary(false);
        }
      }
    };


    socket.onerror = error => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = event => {
      console.log("WebSocket connection closed:", event);
    };

    return () => {
      socket.close();
    };
  }, [wsEndpoint, identifier, setShowSummary, setPaymentStatus]);

  // Update payment status when paymentStatusUpdate changes

  useEffect(() => {
    if (paymentStatusUpdate) {
      setPaymentStatus(paymentStatusUpdate);
    }
  }, [paymentStatusUpdate, setPaymentStatus]);

  const toggleSmartQR = () => {
    setSmartQRToggled(!isSmartQRToggled);
  };


  useEffect(() => {
    // Update remaining time every second
    const intervalId = setInterval(() => {
      setRemainingTime(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
      <div className="grid grid-cols-2 w-full max-w-2xl p-8 bg-white rounded-2xl shadow border border-neutral-100 gap-8">
        <div className="flex flex-col gap-4">

          <div className="text-sky-950 text-3xl font-bold font-'Mulish' leading-[38px]">
            Resumen del pedido
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <div className="font-bold">Amount in Euros:</div>
              <div>
                {amount}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-bold">Selected Coin:</div>
              <div>
                {selectedCurrency}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-bold">Commerce:</div>
              <div>
                {commerce}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-bold">Transaction Date:</div>
              <div>
                {transactionDate}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-bold">Content:</div>
              <div>
                {content}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="font-bold">Remaining Time:</div>
                <div>
                  {formatTime(remainingTime)}
                </div>
              </div>

              {/* Display payment status */}
              <div className="flex gap-4">
                <div className="font-bold">Payment Status:</div>
                <div>
                  {paymentStatusUpdate || orderInfo?.status}
                </div>
              </div>

              {/* Add Smart QR / Web3 toggle component from tailwind */}

              <div className="flex gap-4">
                <div className="font-bold">Toggle Smart QR / Web3:</div>
                <button
                  onClick={toggleSmartQR}
                  className={`px-4 py-2 rounded-md ${isSmartQRToggled ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                >
                  {isSmartQRToggled ? 'Smart QR' : 'Web3'}
                </button>
              </div>

              {isSmartQRToggled ? (
                <div className="flex gap-4">
                  <div className="font-bold">Smart QR:</div>
                  <div>
                    <QRCode value={paymentUrl} />
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <div className="font-bold">Web3:</div>
                  <div>
                    {wsEndpoint}
                  </div>
                </div>
              )}

              <div>
                <div className="text-sm text-gray-500">
                  Enviar {orderInfo?.crypto_amount} {orderInfo?.input_currency}
                </div>
                <div className="text-sm text-gray-500">
                  {orderInfo?.address}
                </div>
                <div className="text-sm text-gray-500">
                  {orderInfo?.tag_memo}
                </div>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="font-bold">Web3:</div>
              <div>
                {wsEndpoint}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
