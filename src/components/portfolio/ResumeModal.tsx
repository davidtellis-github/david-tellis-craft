import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

interface ResumeModalProps {
  children: React.ReactNode;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ children }) => {
  const resumeImage = "/lovable-uploads/51cba955-c59e-4315-b16f-3c235692a530.png";
  
  const handleDownload = () => {
    // Create a download link for the resume
    const link = document.createElement('a');
    link.href = resumeImage;
    link.download = 'David_Tellis_Resume.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] p-6">
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Resume - David Tellis</h2>
            <div className="flex gap-2">
              <Button 
                onClick={handleDownload}
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
              <Button 
                onClick={() => window.open(resumeImage, '_blank')}
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open in New Tab
              </Button>
            </div>
          </div>
          
          <div className="border rounded-lg overflow-hidden bg-white">
            <img
              src={resumeImage}
              alt="David Tellis Resume"
              className="w-full h-auto max-h-[70vh] object-contain"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;