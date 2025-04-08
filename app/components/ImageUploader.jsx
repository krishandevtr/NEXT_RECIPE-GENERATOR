// app/components/ImageUploader.jsx
import { useState, useRef } from 'react';
import { Camera } from 'lucide-react';

export default function ImageUploader({ setImageData }) {
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result);
      setImageData(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-orange-500 transition-colors"
        onClick={() => fileInputRef.current.click()}
      >
        {previewUrl ? (
          <div className="relative">
            <img 
              src={previewUrl} 
              alt="Ingredient preview" 
              className="max-h-64 mx-auto rounded-lg"
            />
            <button
              type="button"
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                setPreviewUrl(null);
                setImageData(null);
              }}
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="py-8">
            <Camera className="mx-auto h-12 w-12 text-gray-400 mb-2" />
            <p className="text-gray-600">Click to upload a photo of your ingredients</p>
            <p className="text-gray-400 text-sm mt-1">or drag and drop</p>
          </div>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
          capture="environment"
        />
      </div>
      
      <p className="text-sm text-gray-500">
        Take a photo of all the ingredients you have available, and our AI will analyze what's in the image.
      </p>
    </div>
  );
}
