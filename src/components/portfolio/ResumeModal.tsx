import React from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink } from "lucide-react";

interface ResumeModalProps {
  children: React.ReactNode;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ children }) => {
  const resumePdf = "/lovable-uploads/David_Tellis_Resume.pdf";
  
  const handleDownload = () => {
    // Create a download link for the resume
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'David_Tellis_Resume.pdf';
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
          <DialogHeader className="flex flex-row justify-between items-center space-y-0">
            <div>
              <DialogTitle>Resume - David Tellis</DialogTitle>
              <DialogDescription className="sr-only">View and download David Tellis's resume</DialogDescription>
            </div>
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
                onClick={() => window.open(resumePdf, '_blank')}
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                Open in New Tab
              </Button>
            </div>
          </DialogHeader>
          
          <div className="border rounded-lg overflow-hidden bg-white">
            <iframe
              src={resumePdf}
              title="David Tellis Resume"
              className="w-full h-[70vh]"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;