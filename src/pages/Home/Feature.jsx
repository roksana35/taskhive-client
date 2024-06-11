

const Feature = () => {
    return (
        <div className="container mx-auto py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="feature-card">
            <img src="https://i.ibb.co/W3Mkqcx/29119178-Gold-coins-and-banknotes-3d-cartoon-style-icon.jpg" alt="Earn Coins Icon" className="w-20 h-20 mx-auto mb-4" />
            <p className="text-lg font-medium text-center">Earn Coins by Completing Tasks enables users to earn virtual currency by completing various activities within the platform. From completing surveys to engaging in challenges, users accumulate coins, fostering engagement and providing rewards for their efforts.</p>
          </div>
          {/* Feature 2 */}
          <div className="feature-card">
            <img src="https://i.ibb.co/tXc6JYm/4167275-18770.jpg" alt="Manage Tasks Icon" className="w-20 h-20 mx-auto mb-4" />
            <p className="text-lg font-medium text-center">Create and Manage Tasks empowers users to easily generate and oversee tasks within the platform. With intuitive tools, users can efficiently organize assignments, set deadlines, assign responsibilities, and track progress. This feature streamlines task management, enhancing productivity and collaboration</p>
          </div>
          {/* Feature 3 */}
          <div className="feature-card">
            <img src="https://i.ibb.co/BrwPZYh/16609.jpg" alt="Secure Payments Icon" className="w-20 h-20 mx-auto mb-4" />
            <p className="text-lg font-medium text-center">"Secure Base Payment" ensures peace of mind with its Stripe-based payment system. By leveraging Stripe's robust security measures, transactions are encrypted and protected against fraud, offering users a trustworthy and reliable payment experience.</p>
          </div>
          {/* Add more features as needed */}
        </div>
      </div>
    );
};

export default Feature;