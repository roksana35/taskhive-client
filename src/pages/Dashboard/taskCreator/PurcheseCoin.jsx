import { Link } from "react-router-dom";


const PurcheseCoin = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
            <div>
        <Link to={`/dashboard/payment-page/10`} className="card  bg-base-100 shadow-xl">
  <div className="card-body">
    <div className="card-actions justify-end">
      
    </div>
    <p>10 coins = 1 dollar.</p>
  </div>
</Link>
      </div>
      <div>
        <Link to={`/dashboard/payment-page/100`} className="card  bg-base-100 shadow-xl">
  <div className="card-body">
    <div className="card-actions justify-end">
      
    </div>
    <p> 100 coins = 9 dollars</p>
  </div>
</Link>
      </div>
      <div>
        <Link to={`/dashboard/payment-page/500`} className="card  bg-base-100  shadow-xl">
  <div className="card-body">
    <div className="card-actions justify-end">
      
    </div>
    <p> 500 coin = 19 dollars .</p>
  </div>
</Link>
      </div>
      <div>
        <Link to={`/dashboard/payment-page/1000`} className="card bg-base-100 shadow-xl">
  <div className="card-body">
    <div className="card-actions justify-end">
      
    </div>
    <p> 1000 coin = 39 dollar . </p>
  </div>
</Link>
      </div>

        </div>
        
    );
};

export default PurcheseCoin;