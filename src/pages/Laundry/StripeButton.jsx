export default function StripeButton(props) {
  console.log("==RENDER in StripeButton.jsx==")
  return (
    <button
      className="createbtn"
      onClick={() => {
        fetch("http://localhost:8080/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },  
          body: JSON.stringify({
            items: [  
              { id: 1, quantity: 1 },
              { id: 2, quantity: 1  },
            ],
          }),
        })
          .then((res) => {
            if (res.ok) return res.json();
            return res.json().then((json) => Promise.reject(json));
          })
          .then(({ url }) => {
            window.location = url;
          })
          .catch((e) => {
            console.error(e.error);
          });
      }}
    >
      PAYMENT BUTTON HERE
    </button>
  );
}
