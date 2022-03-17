import Navbar from "../globalComponents/Navbar";


const login = () => {
    return (
        <>
            <Navbar />
            <div className="m-auto w-25 mt-5">
                <form>
                    <div classNameName="form-group">
                        <label >Email address</label>
                        <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label >Password</label>
                        <input type="password" className="form-control" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary mt-3 w-100">Submit</button>
                </form>
            </div>
        </>
    );
}

export default login;