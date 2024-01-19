import React, { useState, useEffect } from "react";
import QRCodeSection from "../components/QRCodeSection";
import { ApiService } from "../services";
import { deviceId } from "../utils";
// web3

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
	handlePaymentCompletion,
}) => {
	const [remainingTime, setRemainingTime] = useState(expirationTime);
	const [paymentStatusUpdate, setPaymentStatusUpdate] = useState(null);
	const [orderInfo, setOrderInfo] = useState(null);
	const [isSmartQRToggled, setSmartQRToggled] = useState(true);
	const wsEndpoint = `wss://payments.pre-bnvo.com/ws/${identifier}`;
	const [orders, setOrders] = useState([]);
	useEffect(() => {
		const ordersList = async () => {
			try {
				const data = await ApiService.getOrders(deviceId);
				setOrders(data);
			} catch (error) {
				console.error("Error fetching orders:", error);
			}
		};
		ordersList();
	}, []);

	useEffect(() => {
		const fetchOrderInfo = async () => {
			try {
				const data = await ApiService.getOrderInfo(deviceId, identifier);
				setOrderInfo(data[0]);
			} catch (error) {
				console.error("Error fetching order info:", error);
			}
		};
		fetchOrderInfo();
	}, [deviceId, identifier]);

	useEffect(() => {
		const socket = new WebSocket(wsEndpoint);

		socket.onopen = () => {
			console.log("WebSocket connection established");
		};

		socket.onmessage = (event) => {
			const data = JSON.parse(event.data);
			console.log("WebSocket message received:", data);

			if (data.identifier === identifier) {
				setPaymentStatusUpdate(data.status);
				if (data.status === "CO") {
					handlePaymentCompletion();
					setPaymentStatus(data.status);
				}
				if (data.status === "EX") {
					setShowSummary(false);
				}
			}
		};

		socket.onerror = (error) => {
			console.error("WebSocket error:", error);
		};

		socket.onclose = (event) => {
			console.log("WebSocket connection closed:", event);
		};

		return () => {
			socket.close();
		};
	}, [
		wsEndpoint,
		identifier,
		setShowSummary,
		setPaymentStatus,
		handlePaymentCompletion,
	]);

	useEffect(() => {
		if (paymentStatusUpdate) {
			setPaymentStatus(paymentStatusUpdate);
		}
	}, [paymentStatusUpdate, setPaymentStatus]);

	useEffect(() => {
		const intervalId = setInterval(() => {
			setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	const toggleSmartQR = () => {
		setSmartQRToggled(!isSmartQRToggled);
	};



	return (
		<div className="w-full mx-auto flex items-center justify-center h-screen bg-white flex-col"
			style={
				{ maxWidth: "800px"}
			}
		>
			<div className="w-full flex flex-row gap-6">
				<div className="w-full p-8 bg-white rounded-md flex-col justify-start items-start gap-8 inline-flex">
					<div className="w-full flex-col gap-2 justify-between">
						<div className="primary-day-darker text-2xl font-bold font-Mulish leading-tight tracking-tight mb-2">
							Resumen del pedido
						</div>
						<div className="w-full flex flex-col primary-day-darker">
							<div className="flex flex-col gap-2 justify-between">
								<div
									className="flex flex-row items-center"
									style={{
										padding: "0.5rem 0",
									}}
								>
									<div className=" primary-day-darker text-m w-full">
										Importe
									</div>
										<p className="primary-day-darker  font-bold text-m" style={
											{
												width: "100%",
												justifyContent: "flex-end",
												display: "flex",
											}
										}>
											{amount} {selectedCurrency} 2
										</p>
								</div>
							</div>
							<div
								className="flex flex-row items-center"
								style={{
									padding: "0.5rem 0",
								}}
							>
								<div className="  text-m w-full">Comercio</div>
								<div>
									<p className="primary-day-darker  font-bold text-m" style={
										{
											width: "100%",
											justifyContent: "flex-end",
											display: "flex",
											textAlign: "end",
										}
									}>
										{commerce}
									</p>
								</div>
							</div>
							<div
								className="flex flex-row items-center"
								style={{
									padding: "0.5rem 0",
								}}
							>
								<div className="  text-m w-full">Fecha</div>
								<div>
									<p className="primary-day-darker  font-bold text-m" style={
										{
											width: "100%",
											justifyContent: "flex-end",
											display: "flex",
											textAlign: "end",
										}
									}>
										{transactionDate}
									</p>
								</div>
							</div>
							<div
								className="flex flex-row items-center"
								style={{
									padding: "0.5rem 0",
								}}
							>
								<div className="  text-m w-full">Contenido</div>
								<div
								>
									<p className="primary-day-darker  font-bold text-m" style={
										{
											width: "100%",
											justifyContent: "flex-end",
											display: "flex",
											textAlign: "end",
										}
									}>
										{content}
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="w-full flex flex-row gap-6 flex-col justify-start items-start gap-6 inline-flex">
					<div className="p-8 bg-white rounded-2xl flex-col justify-between items-start flex">
						<div className="text-center primary-day-darker text-2xl font-bold font-Mulish leading-tight tracking-tight mb-2">
							Realiza el pago
						</div>
						<QRCodeSection
							remainingTime={remainingTime}
							isSmartQRToggled={isSmartQRToggled}
							toggleSmartQR={toggleSmartQR}
							paymentUrl={paymentUrl}
							orderInfo={orderInfo}
							wsEndpoint={wsEndpoint}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Summary;
