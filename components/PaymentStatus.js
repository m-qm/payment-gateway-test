
const PaymentStatus = ({ status }) => {

	if (status === "CO") {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
				<i className="fas fa-check-circle text-green-500"></i>
				<p>Pago completado</p>
			</div>
		)
	}

	if (status === "EX") {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
				<i className="fas fa-clock"></i>
				<p>Pago expirado</p>
				<Link href="/">Back to home</Link>
			</div>
		)
	}

	if (status === "CA") {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
				<i className="fas fa-times-circle"></i>
				<p>Pago cancelado</p>
			</div>
		)
	}

	if (status === "ER") {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
				<i className="fas fa-exclamation-circle"></i>
				<p>Error en el pago</p>
			</div>
		)
	}

	return null;
}

export default PaymentStatus;