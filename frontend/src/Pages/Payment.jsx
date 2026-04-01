import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Payment = ()=>{
const {amount} = useParams();
  // const [responseId, setResponseId] = useState("");
  const navigate = useNavigate();


    // Load the Razorpay SDK
  const loadScript = async (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };


  const createRazorPayOrder = async (amount) => {
    try {
      const payload = {
        amount: amount,
        currency: "INR",
      };

      const result = await fetch('http://localhost:4000/payment/create-order', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const response = await result.json();

      if (response.success && response.order) {
        handleRazorPayScreen(
          response.order.id,
          response.order.amount
        );
      } else {
        alert("Error in creating order, please check the server response");
      }
    } catch (error) {
      console.log("Error in creating order", error);
    }
  };



  const handleRazorPayScreen = async (orderId, amount) => {
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!response) {
      alert("Razorpay SDK failed to load, please check the console for errors");
      return;
    }

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: amount,
      currency: "INR",
      name: "Wolvenstitch a clothing brand",
      description: "Payment for order",
      order_id: orderId,
      handler: async function (response) {
        console.log(response);

        const result = await fetch('http://localhost:4000/payment/fetch-payment', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
          }),
        })
        const paymentSaved = await result.json();
        if(paymentSaved.success){
            console.log(paymentSaved);
            navigate('/');
        }
      },
      prefill: {
        name: localStorage.getItem("userName") || "Customer Name",
        email: localStorage.getItem("userEmail") || "customer@gmail.com",
        contact: localStorage.getItem("userPhone") || "9976543210",
      },
      theme: {
        color: "#ffffff",
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  useEffect(() => {
    createRazorPayOrder(amount);
  }, [amount]);




    return (
        <div className="mainContainer flex justify-center items-center h-[60vh]">
      <span className="loading loading-infinity loading-xl"></span>
    </div>
    
    )
}
