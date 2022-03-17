import Navbar from "../globalComponents/Navbar";


const register = () => {
    return (
        <>
            <Navbar />
            <div className="m-auto w-25 mt-5">
                <form>
                    <div classNameName="form-group">
                        <label >Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div classNameName="form-group">
                        <label >Userame</label>
                        <input type="text" className="form-control" aria-describedby="usernameHelp" placeholder="Username" />
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" className="form-control" aria-describedby="passwordHelp" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 w-100">Submit</button>
                </form>
            </div>
        </>
    );
}

export default register;