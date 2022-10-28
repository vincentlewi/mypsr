export default function GuestForm(){
    return(
        <>
        <h5>Key in all the details necessary for registration</h5>
        <form action="">
            <label htmlFor="guestname">Name<input type="text" id='guestname'/></label><br />
            <label htmlFor="guestid">Student ID or IC Number<input type="text" id='guestid'/></label><br />
            <label htmlFor="guestemail">Email<input type="email" id='guestemail'/></label><br />
            <label htmlFor="guestpurpose">Purpose of Visit<input type="text" id='guestpurpose'/></label><br />
            <label htmlFor="addfavorite"><input type="checkbox" name="" id="addfavorite" />Add to Favorites</label>
        </form>
        </>
        
    )
}