import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ title, backPath }: { title?: string; backPath?: string }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };
  return (
    <div className="border-b border-white/20 bg-white/90 px-6 py-4 backdrop-blur-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <button
            className="mr-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100"
            onClick={handleBack}
          >
            <ArrowLeft color="#4b5563" width={18} height={18} />
          </button>
          <h1 className="text-lg font-bold text-gray-800">{title}</h1>
        </div>
        <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-gray-100">
          <i className="ri-settings-3-line text-lg text-gray-600"></i>
        </div>
      </div>
    </div>
  );
};

export default Header;
