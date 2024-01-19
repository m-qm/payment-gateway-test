import React from "react";
import QRCode from "qrcode.react";
import ToggleSwitch from "./ToggleSwitch";
import { formatTime } from "../utils";

const QRCodeSection = (
	{
		remainingTime,
		isSmartQRToggled,
		toggleSmartQR,
		paymentUrl,
		orderInfo,
	}
) => {

	return (
		<div className="flex flex-col gap-4">
			<div className="flex gap-4 p-2 justify-center items-center">
				<div className="font-bold primary-day-darker">Tiempo restante:</div>
				<div>
					{formatTime(remainingTime)}

				</div>
				{/* create toggle switch from smartQR to web3 */}
			</div>
			<div className="flex flex-col gap-4 p-8 justify-center items-center">
			<ToggleSwitch isChecked={isSmartQRToggled} onChange={toggleSmartQR} />

			{isSmartQRToggled ? (
				<div className="flex gap-4 p-2 items-center">
					<QRCode value={paymentUrl} />
				</div>
			) : (
				<div className="flex gap-4">
					<div className="flex flex-col gap-4 w-full">
						{/** metamask image here */}
						<img src="assets/metamask.png" alt="metamask"
							style={{ width: "200px" }} />
					</div>
				</div>
			)}
			</div>
			<div className="flex flex-col gap-4 items-center">
				<div className="text-sm primary-day-darker">
					Enviar {orderInfo?.crypto_amount} {orderInfo?.input_currency}
				</div>
				<div className="text-sm primary-day-darker">{orderInfo?.address}</div>
				<div className="text-sm primary-day-darker">{orderInfo?.tag_memo}</div>
			</div>
		</div>
	);
};

export default QRCodeSection;