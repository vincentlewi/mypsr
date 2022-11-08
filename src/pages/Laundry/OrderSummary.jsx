export default function OrderSummary(props){
    let laundry = props.laundrySlot
    let dryer = props.dryerSlot
    let total = 0
    if(laundry !== ''){
        total += 3
    }
    if(dryer !== ''){
        total += 3
    }
    return(
        <div>
            <h3>Order Summary</h3>
            <table>
                <tr>
                   <td>Services</td>
                   <td>Prices</td>
                </tr>
                {laundry?<tr><td>Laundry - Machine {laundry.slice(-1)} </td><td>$3.00</td></tr>:null}
                {dryer?<tr><td>Dryer - Machine {dryer.slice(-1)}</td><td>$3.00</td></tr>:null}
                
                {total > 0 ? <tr>
                    <th>Total Amount</th>
                    <th>${total}.00</th>
                </tr>: null}
            </table>
        </div>
    )
}