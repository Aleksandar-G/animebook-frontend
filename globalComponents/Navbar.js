import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link href="/">
                <a className="navbar-brand">Navbar</a>
            </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link href="/">
                        <a className="nav-item nav-link active" href="#">Home</a>
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;