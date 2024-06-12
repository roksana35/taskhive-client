

const WorkSetion = () => {
    return (
        <div className="flex justify-between items-center">
      <div>
        <img src="register-icon.png" alt="Register Icon" className="w-12 h-12" />
        <p className="mt-2 text-lg">Register</p>
        <p className="text-gray-500">Create an account...</p>
      </div>
      <div>
        <img src="tasks-icon.png" alt="Tasks Icon" className="w-12 h-12" />
        <p className="mt-2 text-lg">Complete Tasks</p>
        <p className="text-gray-500">Browse available tasks...</p>
      </div>
      <div>
        <img src="rewards-icon.png" alt="Rewards Icon" className="w-12 h-12" />
        <p className="mt-2 text-lg">Earn Rewards</p>
        <p className="text-gray-500">Earn points for completing tasks...</p>
      </div>
    </div>
    );
};

export default WorkSetion;