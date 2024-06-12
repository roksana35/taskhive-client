import ShareSection from "../../Components/ShareSection";


const Feature = () => {
  const feature=[
    {
      "id": "1",
      "title": "Earn Coins by Completing Tasks",
      "image": "https://i.ibb.co/HhpXKT7/3290580-487330-PH2-DJJ-120.jpg",
      "description": "Earn Coins by Completing Tasks enables users to earn virtual currency by completing various activities within the platform. From completing surveys to engaging in challenges, users accumulate coins, fostering engagement and providing rewards for their efforts."
    },
    {
      "id": "2",
      "title": "Create and Manage Tasks",
      "image": "https://i.ibb.co/WKNM67V/4059849-2144812.jpg",
      "description": "Create and Manage Tasks empowers users to easily generate and oversee tasks within the platform. With intuitive tools, users can efficiently organize assignments, set deadlines, assign responsibilities, and track progress. This feature streamlines task management, enhancing productivity and collaboration."
    },
    {
      "id": "3",
      "title": "Secure Base Payment",
      "image": "https://i.ibb.co/mhXZHXh/1268062-161008-OVAZ4-D-753.jpg",
      "description": "Secure Base Payment ensures peace of mind with its Stripe-based payment system. By leveraging Stripe's robust security measures, transactions are encrypted and protected against fraud, offering users a trustworthy and reliable payment experience."
    }
  ]
  
    return (
        <div className="container mx-auto py-12">
          <ShareSection heading={' Features Section'} subheading={'feature of website'}></ShareSection>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-4 gap-4">
        {
          feature.map(item=>(
            <div key={item.id} className="card  bg-base-100 shadow-xl">
  <figure><img src={item.image} alt="Shoes"  className="w-[300px] h-[250px]"/></figure>
  <div className="card-body">
    <h2 className="card-title">{item.title}</h2>
    <p>{item.description}</p>
    
  </div>
</div>
          ))
        }
        </div>
      </div>
    );
};

export default Feature;