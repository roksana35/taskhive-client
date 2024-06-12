import ShareSection from "../../Components/ShareSection";


const WorkSetion = () => {
  const steps=[
    {
      "id": "1",
      "title": "Register",
      "image": "https://i.ibb.co/02fpgSG/1510453-205562-OZJLQT-572.jpg",
      "description": "Create an account quickly and easily to get started on our platform. Join us today to access all features."
    },
    {
      "id": "2",
      "title": "Complete Tasks",
      "image": "https://i.ibb.co/2N88pZk/20124598-6218342.jpg",
      "description": "Browse and complete available tasks to earn rewards. Engage in various activities designed to match your skills and interests."
    },
    {
      "id": "3",
      "title": "Earn Rewards",
      "image": "https://i.ibb.co/g903y5y/7416541-4778.jpg",
      "description": "Earn points for every task you complete. Redeem your points for exciting rewards and incentives as you achieve more."
    }
  ]
  


  return (
    <div>
     <div className="mb-3 md:mb-6 ">
     <ShareSection heading={'Work Section'} subheading={'How It Works Section'}>

</ShareSection>
     </div>

<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {steps.map(step => (
        <div key={step.id} className="text-center">
          <img src={step.image} alt={`${step.title} Icon`} className="w-24 h-24 mx-auto" />
          <p className="mt-2 text-lg">{step.title}</p>
          <p className="text-gray-500">{step.description}</p>
        </div>
      ))}
    </div>

    </div>
    
  );


};

export default WorkSetion;