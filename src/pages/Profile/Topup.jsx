import { useState } from "react";
import { db } from "../../components/firebase";
import { collection, getDocs, query, where, addDoc, onSnapshot, doc, updateDoc, increment } from "firebase/firestore";
import { useEffect } from "react";
import { useAuth } from '../../components/contexts/AuthContext';


export default function Topup(){
    const user = useAuth()
    const [products, setProducts] = useState(null)

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


    
    useEffect(() => {
       async function getProducts(){
        const products = await getActiveProducts();
        setProducts(products)
       }
       getProducts()
    },[])


    async function createCheckoutSession(uid, item){
        const checkoutSessionsRef = collection(db, `users/${uid}/checkout_sessions`);
        const { id } = await addDoc(checkoutSessionsRef, {
            mode: "payment",
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
                cancelListening();
                window.location.href = url;
            }

        })

    }



    return(
        <div className="topup-modal">
            {products ? products.map((p) => {
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