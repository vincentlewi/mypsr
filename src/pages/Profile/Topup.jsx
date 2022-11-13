import { useState } from "react";
import { db } from "../../components/firebase";
import { collection, getDocs, query, where, addDoc, onSnapshot, doc, updateDoc, increment } from "firebase/firestore";
import { useEffect } from "react";
import { useAuth } from '../../components/contexts/AuthContext';
import animation from "./7455-loading1.json"
import Lottie from "react-lottie";


export default function Topup(){
    const user = useAuth()
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(false);

    async function getActiveProducts(){
        const collectionRef = collection(db, 'products');
        const filteredCollection = query(collectionRef, where("active", "==", true))
        const docs = await getDocs(filteredCollection);
        const products = [];
        for await(const doc of docs.docs){
            const product = doc.data()
            product.id = doc.id
            const priceDocs = await getDocs(collection(doc.ref, 'prices')); 
            product.price = priceDocs.docs[0].data();
            product.priceId = priceDocs.docs[0].id;
            products.push(product)
        }
        return products
    }

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };
    
    useEffect(() => {
       async function getProducts(){
        const products = await getActiveProducts();
        setProducts(products)
       }
       getProducts()
    },[])


    async function createCheckoutSession(uid, item){
        setLoading(true)
        const checkoutSessionsRef = collection(db, `users/${uid}/checkout_sessions`);
        const { id } = await addDoc(checkoutSessionsRef, {
            mode: "payment",
            payment_method_types: ['card', 'paynow', 'grabpay'],
            success_url: `http://localhost:3000/mypsr/profile`,
            cancel_url: `http://localhost:3000/mypsr/home`,
            line_items:     
                [{
                    quantity: 1,
                    price: item.priceId
                }]
        })

        const cancelListening = onSnapshot(doc(db, `users/${uid}/checkout_sessions/${id}`),
        (snapshot) => {
            let url = snapshot.data().url;
            if(url){
                setLoading(false)
                cancelListening();
                window.location.href = url;
            }
        })

    }



    return(
        <div>
            { !loading && products ? <p>Choose how much you want !</p>: null }
            {loading ? <div><h1 className="text-center">Loading...</h1><Lottie options={defaultOptions} height={400} width={400}/>
            <h3 className="text-center">More coins for us?</h3>
            <h5 className="text-center">No more common cents for you </h5></div> :null}
            {!loading && products ? products.map((p) => {
                return(
                <button
                    className="createbtn" 
                    key={p.id}
                    onClick={()=>{
                        createCheckoutSession(user.user.uid, p)
                    }}>
                        {p.name}
                </button>)
            }):null}
        </div>  
        
    )
}