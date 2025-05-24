"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Download,
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Remove the immediate worker initialization
let pdfjs: any = null;
let Document: any = null;
let Page: any = null;

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function PDFViewer({ isOpen, onClose, pdfUrl }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(1.0);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isCompatible, setIsCompatible] = useState(true);
  const [isPdfLoaded, setIsPdfLoaded] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const pdfContainerRef = useRef<HTMLDivElement>(null);

  // Check device compatibility
  useEffect(() => {
    const checkCompatibility = () => {
      // Check for modern CSS features
      const supportsModernCSS =
        CSS.supports("backdrop-filter", "blur(1px)") &&
        CSS.supports("overscroll-behavior", "contain") &&
        CSS.supports("scroll-behavior", "smooth");

      // Check for iOS version
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const iosVersion = isIOS
        ? parseInt(navigator.userAgent.match(/OS (\d+)_/)?.[1] || "0")
        : 0;

      // iOS 14 and below are considered incompatible
      const isCompatibleIOS = !isIOS || iosVersion >= 15;

      setIsCompatible(supportsModernCSS && isCompatibleIOS);
    };

    checkCompatibility();
  }, []);

  // Lazy load PDF.js only when needed
  useEffect(() => {
    if (isOpen && isCompatible && !isPdfLoaded) {
      const loadPdfJs = async () => {
        try {
          const pdfjsModule = await import("react-pdf");
          pdfjs = pdfjsModule.pdfjs;
          Document = pdfjsModule.Document;
          Page = pdfjsModule.Page;

          // Initialize worker after module is loaded
          pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.mjs`;
          setIsPdfLoaded(true);
        } catch (error) {
          console.error("Failed to load PDF.js:", error);
          setError(
            "Failed to load PDF viewer. Please try downloading instead."
          );
        }
      };

      loadPdfJs();
    }
  }, [isOpen, isCompatible, isPdfLoaded]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Memoize handlers
  const handleDownload = useCallback(() => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [pdfUrl]);

  const handleZoomIn = useCallback(() => {
    setScale((prev) => Math.min(prev + 0.1, 2));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((prev) => Math.max(prev - 0.1, 0.5));
  }, []);

  const handlePrevPage = useCallback(() => {
    setPageNumber((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setPageNumber((prev) => Math.min(prev + 1, numPages));
  }, [numPages]);

  const onDocumentLoadSuccess = useCallback(
    ({ numPages }: { numPages: number }) => {
      setNumPages(numPages);
      setError(null);
    },
    []
  );

  const onDocumentLoadError = useCallback((error: Error) => {
    setError("Failed to load PDF. Please try again later.");
    console.error("Error loading PDF:", error);
  }, []);


  // If device is not compatible, trigger download and close
  useEffect(() => {
    if (isOpen && !isCompatible) {
      handleDownload();
      onClose();
    }
  }, [isOpen, isCompatible, handleDownload, onClose]);

  if (!isOpen) return null;
  if (!isCompatible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="relative flex h-[90vh] w-[90vw] max-w-6xl flex-col rounded-lg bg-background p-4 shadow-2xl"
        >
          {/* Header */}
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Curriculum Vitae</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="flex items-center gap-2 rounded-md bg-transparent px-4 py-2 text-white hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download</span>
              </button>
              <button
                onClick={onClose}
                className="rounded-md p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div
            ref={pdfContainerRef}
            className="flex-1 overflow-auto rounded-lg border bg-blue-50 dark:bg-gray-900 p-4"
            style={{
              WebkitOverflowScrolling: "touch",
              overscrollBehavior: "contain",
              scrollBehavior: "smooth",
            }}
          >
            {error ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-red-500">{error}</p>
              </div>
            ) : !isPdfLoaded ? (
              <div className="flex h-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
              </div>
            ) : (
              <div className="min-h-full w-full flex items-center">
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={onDocumentLoadError}
                  className="flex flex-col items-start"
                  loading={
                    <div className="flex h-full items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                    </div>
                  }
                >
                  <div className="relative">
                    <Page
                      pageNumber={pageNumber}
                      scale={scale}
                      renderTextLayer={false}
                      renderAnnotationLayer={false}
                      className="shadow-lg"
                      loading={
                        <div className="flex h-full items-center justify-center">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                        </div>
                      }
                    />
                  </div>
                </Document>
              </div>
            )}
          </div>

          {/* Controls */}
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={pageNumber <= 1}
                className="rounded-md bg-gray-700 px-3 py-1 hover:bg-gray-800 disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="text-sm sm:text-base">
                Page {pageNumber} of {numPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={pageNumber >= numPages}
                className="rounded-md bg-gray-700 px-3 py-1 hover:bg-gray-800 disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleZoomOut}
                className="rounded-md bg-gray-700 p-2 hover:bg-gray-800"
                aria-label="Zoom out"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
              <span className="text-sm sm:text-base min-w-[60px] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                className="rounded-md bg-gray-700 p-2 hover:bg-gray-800"
                aria-label="Zoom in"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Mobile Touch Controls */}
          {isMobile && (
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2">
              <button
                onClick={handlePrevPage}
                disabled={pageNumber <= 1}
                className="text-white disabled:opacity-50"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <span className="text-white text-sm">
                {pageNumber}/{numPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={pageNumber >= numPages}
                className="text-white disabled:opacity-50"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
