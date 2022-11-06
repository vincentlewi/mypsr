export default function StripeButton(props) {
  let referenceList = {
    laundry1 : 1,
    laundry2 : 2,
    laundry3 : 3,
    laundry4 : 4,
    dryer1 : 5,
    dryer2 : 6,
    dryer3 : 7,
    dryer4 : 8
  }
  
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
              { id: referenceList.laundry1, quantity: 1 },
              { id: referenceList.laundry2, quantity: 1  },
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
