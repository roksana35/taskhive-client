

const ShareSection = ({heading,subheading}) => {
    return (
        <div className="md:w-4/12 mx-auto text-center my-8">
            <p className="text-yellow-500">--- {subheading}---</p>
            <p className="text-3xl border-y-4 p-4 uppercase ">{heading}</p>
        </div>
    );
};

export default ShareSection;