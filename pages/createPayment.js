import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Summary from '../components/Summary';
import PaymentStatus from '../components/PaymentStatus';
import { ClipLoader } from 'react-spinners'; // Import the ClipLoader component from react-spinners
import { ApiService } from '../services';
import { deviceId } from "../utils";

const CreatePayment = () => {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [currenciesList, setCurrenciesList] = useState([]);
  const [concept, setConcept] = useState('');
  const [showSummary, setShowSummary] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [amountError, setAmountError] = useState('');
  const [paymentUrl, setPaymentUrl] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [isLoading, setLoading] = useState(false); // Loading state

  // Fetch currencies list on component mount
  useEffect(() => {
    ApiService.getCurrenciesList(deviceId).then((data) => {
      setCurrenciesList(data);
    });
  }, []);

  const handlePaymentCompletion = async (status) => {
    setPaymentStatus(status);
    setShowSummary(false);
  };

  const handleContinue = async () => {
    setLoading(true); // Set loading to true when the button is clicked

    const selectedCurrencyInfo = currenciesList.find((currency) => currency.symbol === selectedCurrency);

    if (selectedCurrencyInfo) {
      const { min_amount, max_amount } = selectedCurrencyInfo;
      const amountNumeric = parseFloat(amount);
      const minAmountNumeric = parseFloat(min_amount);
      const maxAmountNumeric = parseFloat(max_amount);

      if (amountNumeric < minAmountNumeric || amountNumeric > maxAmountNumeric) {
        setAmountError(`El importe debe estar entre ${min_amount} y ${max_amount} ${selectedCurrencyInfo.symbol}`);
        setLoading(false); // Set loading back to false
        return;
      }
    }

    setAmountError('');

    try {
      const bitnovoOrder = await ApiService.createBitnovoOrder(parseFloat(amount), selectedCurrency, concept);
      const identifier = bitnovoOrder.identifier;
      setIdentifier(identifier);
      setPaymentStatus(bitnovoOrder.status);
      setPaymentUrl(bitnovoOrder.payment_uri);
      setShowSummary(true);
    } catch (error) {
      console.error('Error initiating payment:', error);
      setPaymentStatus('error');
      setShowSummary(true);
    } finally {
      setLoading(false); // Set loading back to false regardless of success or failure
    }
  };

  if (showSummary) {
    return (
      <Summary
        amount={amount}
        selectedCurrency={selectedCurrency}
        commerce="Semega"
        transactionDate={new Date().toLocaleString()}
        content={concept}
        identifier={identifier}
        paymentUrl={paymentUrl}
        expirationTime={300}
        setShowSummary={setShowSummary}
        setPaymentStatus={setPaymentStatus}
        handlePaymentCompletion={handlePaymentCompletion}
      />
    );
  }

  if (paymentStatus === "CO" || paymentStatus === "EX" || paymentStatus === "CA" || paymentStatus === "ER") {
    return (
      <PaymentStatus status={paymentStatus} />
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
    <div className="flex items-center justify-center bg-white flex-col">
      <div className="text-center primary-day-darker text-2xl font-bold font-Mulish leading-tight tracking-tight mb-2">
        Crear pago
      </div>

      <div className="w-[609px] p-8 bg-white rounded-md shadow border border-slate-200 flex-col justify-start items-start gap-8 inline-flex">
        <div className="h-20 flex-col justify-start items-start flex w-full">
          <label htmlFor="amount" className="primary-day-darker text-sm font-bold font-Mulish leading-tight tracking-tight">
            Importe a pagar
          </label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 border border-slate-200 rounded w-full"
          />
          {amountError && <p className="text-red-500 text-sm">{amountError}</p>}
        </div>

        <div className="self-stretch h-[84px]">
          <label htmlFor="currency" className="primary-day-darker text-sm font-bold font-Mulish leading-tight tracking-tight">
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

        <div className="h-20 flex-col justify-start items-start flex w-full">
          <label htmlFor="concept" className="primary-day-darker text-sm font-bold font-Mulish leading-tight tracking-tight">
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

        <div className="bg-primary-day-darker self-stretch h-14 px-6 py-[18px] rounded-md flex-col justify-center items-center gap-2.5 flex">
          {isLoading ? (
            <ClipLoader color="#C0CCDA"
             loading={true} size={20} />
            ) : (
            <button
              className={`text-center text-white text-base font-semibold font-Mulish leading-tight cursor-pointer`}
              onClick={handleContinue}
              disabled={!amount || !selectedCurrency || !concept}
            >
              Continuar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreatePayment;
