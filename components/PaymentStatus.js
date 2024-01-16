import { useRouter } from 'next/router'

const PaymentStatus = ({ status }) => {
    const router = useRouter()

    if (status === "CO") {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
                <i className="fas fa-check-circle"></i>
                <p>Pago completado</p>
                <button onClick={() => router.push('/')}>Crear nuevo pago</button>
            </div>
        )
    }

    if (status === "EX") {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
                <i className="fas fa-clock"></i>
                <p>Pago expirado</p>
                <button onClick={() => router.push('/')}>Crear nuevo pago</button>
            </div>
        )
    }

    if (status === "CA") {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
                <i className="fas fa-times-circle"></i>
                <p>Pago cancelado</p>
                <button onClick={() => router.push('/')}>Crear nuevo pago</button>
            </div>
        )
    }

    if (status === "ER") {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
                <i className="fas fa-exclamation-circle"></i>
                <p>Error en el pago</p>
                <button onClick={() => router.push('/')}>Crear nuevo pago</button>
            </div>
        )
    }

    return null;
}

export default PaymentStatus;