import { Camera } from "lucide-react";
import { Component } from "react";
// import "../App.css";
// import "../common/style/common.style.css";

const CLOUDNAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const UPLOADPRESET = import.meta.env.VITE_CLOUDINARY_PRESET as string;

interface CloudinaryUploadWidgetProps {
  uploadImage: (url: string) => void;
}

declare global {
  interface Window {
    cloudinary: {
      createUploadWidget: (
        options: {
          cloudName: string;
          uploadPreset: string;
        },
        callback: (error: unknown, result: { event: string; info: { secure_url: string } }) => void,
      ) => {
        open: () => void;
      };
    };
  }
}

class CloudinaryUploadWidget extends Component<CloudinaryUploadWidgetProps> {
  componentDidMount() {
    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUDNAME,
        uploadPreset: UPLOADPRESET,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          document.getElementById("uploadedimage")?.setAttribute("src", result.info.secure_url);
          this.props.uploadImage(result.info.secure_url);
        }
      },
    );

    document.getElementById("upload_widget")?.addEventListener(
      "click",
      () => {
        myWidget.open();
      },
      false,
    );
  }

  render() {
    return (
      <div className="mt-6 rounded-xl border border-white/20 bg-white/90 p-4 shadow-lg backdrop-blur-sm">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">사진 (선택)</h3>
        <button
          id="upload_widget"
          className="flex w-full cursor-pointer flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-gray-300 p-8 text-center transition-colors hover:border-blue-400"
        >
          <Camera color="#9ca3af" />
          <p className="text-gray-600">사진을 업로드하려면 클릭하세요</p>
          <p className="text-sm text-gray-400">JPG, PNG 파일을 지원합니다</p>
        </button>
      </div>
    );
  }
}

export default CloudinaryUploadWidget;
