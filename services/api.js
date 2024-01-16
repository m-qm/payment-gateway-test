import axios from "axios";

const API_BASE_URL = "https://payments.pre-bnvo.com/api/v1/";
const deviceId = '4cc86c78-29ed-4ca5-b165-fb2e7b22ee29';

const api = axios.create({
  baseURL: API_BASE_URL
});

export const getCurrenciesList = async deviceId => {
  try {
    const response = await api.get("currencies", {
      headers: {
        "X-Device-Id": deviceId
      }
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createPayment = async (deviceId, data) => {
  try {
    const response = await api.post("orders", data, {
      headers: {
        "X-Device-Id": deviceId
      }
    });

    console.log("response", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrderInfo = async (deviceId, paymentId) => {
  try {
    const response = await api.get(`orders/info/${paymentId}`, {
      headers: {
        "X-Device-Id": deviceId
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getOrders = async (deviceId) => {
  try {
    const response = await api.get("orders/", {
      headers: {
        "X-Device-Id": deviceId
      }
    });
    console.log("response", response);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createBitnovoOrder = async (
  fiatAmount,
  currencySymbol,
  description
) => {
  const body = JSON.stringify({
    expected_output_amount: fiatAmount,
    input_currency: currencySymbol,
    fiat: "EUR",
    notes: description
  });

  try {
    const response = await api.post("orders/", body, {
      headers: {
        "Content-Type": "application/json",
        "X-Device-Id": deviceId
      }
    });

    console.log("response BT order", response);

    return response.data;
  } catch (error) {
    throw error;
  }
};
