
import { PaymentIntent } from "./paymentService";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Add the missing jsPDF types
declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

interface ReceiptData {
  paymentDate: Date;
  paymentIntentId: string;
  bookingIds: string[];
  totalAmount: number;
  customerName?: string;
}

export const generateReceiptPdf = (receiptData: ReceiptData): string => {
  const doc = new jsPDF();
  const { paymentDate, paymentIntentId, bookingIds, totalAmount, customerName = "Valued Customer" } = receiptData;

  // Add letterhead
  doc.setFontSize(20);
  doc.setTextColor(41, 82, 106);
  doc.text("SnapLend", 20, 20);
  
  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text("Payment Receipt", 20, 30);
  
  doc.setFontSize(10);
  doc.text(`Date: ${paymentDate.toLocaleDateString()}`, 150, 20);
  doc.text(`Time: ${paymentDate.toLocaleTimeString()}`, 150, 27);
  
  // Add receipt details
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.text("Receipt Details", 20, 45);
  doc.line(20, 47, 190, 47);
  
  doc.text(`Customer Name: ${customerName}`, 20, 55);
  doc.text(`Transaction ID: ${paymentIntentId}`, 20, 63);
  doc.text(`Booking ID${bookingIds.length > 1 ? "s" : ""}: ${bookingIds.join(", ")}`, 20, 71);
  
  // Payment breakdown
  doc.text("Payment Details", 20, 85);
  doc.line(20, 87, 190, 87);
  
  const subtotal = totalAmount * 0.82;
  const tax = totalAmount * 0.18;
  
  const tableData = [
    ["Subtotal", `₹${subtotal.toFixed(2)}`],
    ["GST (18%)", `₹${tax.toFixed(2)}`],
    ["Total Amount", `₹${totalAmount.toFixed(2)}`]
  ];
  
  doc.autoTable({
    startY: 90,
    head: [["Description", "Amount"]],
    body: tableData,
    theme: "striped",
    headStyles: { fillColor: [41, 82, 106] },
    margin: { top: 20, left: 20, right: 20 }
  });
  
  // Footer
  const finalY = (doc as any).lastAutoTable.finalY + 20;
  doc.text("Thank you for choosing SnapLend!", 20, finalY);
  doc.text("For any queries, please contact support@snaplend.com", 20, finalY + 7);
  
  return doc.output("datauristring");
};

export const downloadReceipt = (receiptData: ReceiptData): void => {
  const pdf = generateReceiptPdf(receiptData);
  const link = document.createElement("a");
  link.href = pdf;
  link.download = `receipt-${receiptData.paymentIntentId.substring(0, 8)}.pdf`;
  link.click();
};
