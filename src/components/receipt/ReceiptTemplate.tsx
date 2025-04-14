
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";
import { Download, Printer, Share2 } from "lucide-react";
import React, { useState } from "react";
import { downloadReceipt } from "@/services/receiptService";

interface ReceiptTemplateProps {
  bookingIds: string[];
  totalAmount: number;
  paymentIntentId: string;
  paymentDate?: Date;
  customerName?: string;
}

export const ReceiptTemplate: React.FC<ReceiptTemplateProps> = ({
  bookingIds,
  totalAmount,
  paymentIntentId,
  paymentDate = new Date(),
  customerName = "Valued Customer",
}) => {
  const { toast } = useToast();
  const [expanded, setExpanded] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    toast({
      title: "Share options",
      description: "Share dialog would open here.",
    });
  };
  
  const handleDownload = () => {
    try {
      downloadReceipt({
        bookingIds,
        totalAmount,
        paymentIntentId,
        paymentDate,
        customerName
      });
      
      toast({
        title: "Receipt downloaded",
        description: "Your receipt has been downloaded successfully.",
      });
    } catch (error) {
      console.error("Error downloading receipt:", error);
      toast({
        title: "Download failed",
        description: "There was an error downloading your receipt. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card 
      className={`w-full max-w-2xl mx-auto bg-white shadow-lg p-8 cursor-pointer transition-all duration-300 ${expanded ? 'scale-105' : 'hover:scale-102'}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">SnapLend</h2>
          <p className="text-gray-500">Payment Receipt</p>
        </div>
        <div className="text-right">
          <p className="text-gray-500">{format(paymentDate, "dd MMM yyyy")}</p>
          <p className="text-gray-500">{format(paymentDate, "HH:mm:ss")}</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Customer Name:</span>
          <span className="font-medium">{customerName}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Transaction ID:</span>
          <span className="font-medium">{paymentIntentId}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">Booking ID{bookingIds.length > 1 ? "s" : ""}:</span>
          <span className="font-medium">{bookingIds.join(", ")}</span>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 mb-6">
        <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>₹{(totalAmount * 0.82).toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">GST (18%)</span>
            <span>₹{(totalAmount * 0.18).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold pt-2 border-t">
            <span>Total Amount</span>
            <span>₹{totalAmount.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-500 text-sm mt-8">
        <p>Thank you for choosing SnapLend!</p>
        <p className="mt-1">For any queries, please contact support@snaplend.com</p>
      </div>
      
      {expanded && (
        <div className="flex justify-center space-x-4 mt-6 pt-4 border-t border-gray-200">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              handlePrint();
            }}
          >
            <Printer className="mr-2 h-4 w-4" />
            Print Receipt
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              handleDownload();
            }}
          >
            <Download className="mr-2 h-4 w-4" />
            Download PDF
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600"
            onClick={(e) => {
              e.stopPropagation();
              handleShare();
            }}
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      )}
    </Card>
  );
};
