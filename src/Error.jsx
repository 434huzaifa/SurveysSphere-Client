
const Error = ({ text=null,children }) => {
    return (
        <p className="text-center w-full text-red-700 font-bold">{text||<>{children}</>}</p>
    );
};

export default Error;