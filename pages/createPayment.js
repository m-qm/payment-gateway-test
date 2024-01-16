// pages/createPayment.js
import { useSDK } from '@metamask/sdk-react';
import { useState, useEffect } from 'react';
import Select from 'react-select';
import Footer from '../components/Footer';
import Summary from '../components/Summary';
import { ApiService } from '../services';
import { deviceId } from "../utils";
// import metamask 


const CreatePayment = () => {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currenciesList, setCurrenciesList] = useState([]);
  const [concept, setConcept] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [amountError, setAmountError] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [tag, setTag] = useState('');
  const [wsConnectionOpen, setWsConnectionOpen] = useState(false);
  const [socket, setSocket] = useState(null);

  let createPaymentResult;
  // Fetch currencies list on component mount
  useEffect(() => {
    ApiService.getCurrenciesList(deviceId).then((data) => {
      setCurrenciesList(data);
    });
    
  }, []);

  const handleContinue = async () => {
    const selectedCurrencyInfo = currenciesList.find((currency) => currency.symbol === selectedCurrency);

    if (selectedCurrencyInfo) {
      const { min_amount, max_amount } = selectedCurrencyInfo;
  
      // Convert amount, min_amount, and max_amount to numbers for correct comparison
      const amountNumeric = parseFloat(amount);
      const minAmountNumeric = parseFloat(min_amount);
      const maxAmountNumeric = parseFloat(max_amount);
      
      if (amountNumeric < minAmountNumeric || amountNumeric > maxAmountNumeric) {
        setAmountError(`El importe debe estar entre ${min_amount} y ${max_amount} ${selectedCurrencyInfo.symbol}`);
        return;
      }
    }
  
    setAmountError('');
  
    try {

      const bitnovoOrder = await ApiService.createBitnovoOrder(parseFloat(amount), selectedCurrency, concept);
      // get identifier from bitnovoOrder
      const identifier = bitnovoOrder.identifier;
      setIdentifier(identifier);
      setPaymentStatus(bitnovoOrder.status);
      setPaymentUrl(bitnovoOrder.payment_uri);
      

      setShowSummary(true);
    } catch (error) {
      console.error('Error initiating payment:', error);
      setPaymentStatus('error');
      setShowSummary(true);
    } 
  };

  if (showSummary) {
    return (
      <Summary
        amount={amount}
        selectedCurrency={selectedCurrency}
        commerce="Your Commerce Name"
        transactionDate={new Date().toLocaleString()}
        content={concept}
        identifier={identifier}
        paymentUrl={paymentUrl}
        expirationTime={300}
        paymentStatus={paymentStatus}
      />
    );
  }

  const currencyOptions = currenciesList.map((currency) => ({
    value: currency.symbol,
    label: (
      <div className="flex items-center">
        <img src={currency.image} alt={currency.name} className="w-6 h-6 mr-2" />
        {currency.name}
      </div>
    ),
  }));

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 flex-col">
      <div className="w-100 h-100 p-8 bg-white rounded-2xl shadow border border-neutral-100 flex-col justify-center items-center gap-8 inline-flex">
        <div className="text-sky-950 text-3xl font-bold font-Mulish leading-[38px]">Crear pago</div>
        <div className="flex-col justify-start items-start gap-8 flex">
          <div className="h-20 flex-col justify-start items-start flex">
            <label htmlFor="amount" className="text-sky-950 text-sm font-bold font-Mulish leading-tight tracking-tight">
              Importe a pagar
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-2 border border-slate-200 rounded"
            />
            {amountError && <p className="text-red-500 text-sm">{amountError}</p>}
          </div>

          <div className="self-stretch h-[84px]">
            <label htmlFor="currency" className="text-sky-950 text-sm font-bold font-Mulish leading-tight tracking-tight">
              Seleccionar moneda
            </label>
            <Select
              id="currency"
              value={currencyOptions.find((option) => option.value === selectedCurrency)}
              onChange={(selectedOption) => setSelectedCurrency(selectedOption.value)}
              options={currencyOptions}
              className="mt-1"
            />
          </div>

          <div className="h-20 flex-col justify-start items-start flex">
            <label htmlFor="concept" className="text-sky-950 text-sm font-bold font-Mulish leading-tight tracking-tight">
              Concepto
            </label>
            <input
              type="text"
              id="concept"
              value={concept}
              onChange={(e) => setConcept(e.target.value)}
              className="p-2 border border-slate-200 rounded w-full"
            />
          </div>
        </div>

        <div className="self-stretch h-14 px-6 py-[18px] bg-blue-200 rounded-md flex-col justify-center items-center gap-2.5 flex">
          <div
            className={`text-center text-white text-base font-semibold font-Mulish leading-tight cursor-pointer ${
              !amount || !selectedCurrency || !concept ? 'opacity-50 pointer-events-none' : ''
            }`}
            onClick={handleContinue}
            disabled={!amount || !selectedCurrency || !concept}
          >
            Continuar
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreatePayment;