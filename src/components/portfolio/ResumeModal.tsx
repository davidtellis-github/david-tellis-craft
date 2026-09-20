import React, { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

interface ResumeModalProps {
  children: React.ReactNode;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ children }) => {
  const resumePdf = "/lovable-uploads/david_23_4.pdf";
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadError, setLoadError] = useState<string | null>(null);

  const handleDownload = () => {
    // Create a download link for the resume
    const link = document.createElement('a');
    link.href = resumePdf;
    link.download = 'david_23_4.pdf';
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
          
          <div className="border rounded-lg overflow-auto bg-white h-[70vh] flex flex-col items-center">
            {loadError ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 p-6 text-center text-sm text-muted-foreground">
                <p>Couldn't preview the resume in-browser.</p>
                <Button onClick={() => window.open(resumePdf, "_blank")} size="sm">
                  Open in New Tab
                </Button>
              </div>
            ) : (
              <Document
                file={resumePdf}
                onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                onLoadError={(error) => setLoadError(error.message)}
                loading={
                  <div className="flex h-[70vh] items-center justify-center text-sm text-muted-foreground">
                    Loading resume…
                  </div>
                }
              >
                <Page
                  pageNumber={pageNumber}
                  width={800}
                  renderAnnotationLayer={false}
                />
              </Document>
            )}
          </div>

          {numPages && numPages > 1 && (
            <div className="flex items-center justify-center gap-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPageNumber((p) => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {pageNumber} of {numPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPageNumber((p) => Math.min(numPages, p + 1))}
                disabled={pageNumber >= numPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ResumeModal;
