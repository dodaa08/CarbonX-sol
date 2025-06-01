interface PurpleBlobProps {
    className?: string;
  }
  
  const PurpleBlob: React.FC<PurpleBlobProps> = ({ className }) => {
    return (
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className={`absolute w-[300px] h-[300px] z-0 ${className}`}
      >
        <path
          fill="#A259FF"
          d="M48.4,-57.7C62.4,-44.9,73,-29.2,75.2,-12.2C77.3,4.9,71.1,22.9,60.1,35.8C49,48.6,33,56.3,16.3,61.4C-0.3,66.5,-17.6,68.9,-30.6,61.5C-43.5,54.1,-52.1,36.8,-57.1,19.6C-62.1,2.5,-63.4,-14.5,-57.5,-28.6C-51.6,-42.7,-38.6,-53.9,-23.8,-65.1C-9,-76.2,8.5,-87.2,24.3,-83.4C40.1,-79.6,55.3,-61.5,48.4,-57.7Z"
          transform="translate(100 100)"
        />
      </svg>
    );
  };
  
  export default PurpleBlob;
  