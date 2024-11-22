import React from "react";
import ReceiptScanContents from "@/components/receiptScanContents";

const ReceiptScan: React.FC = () => {
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "2rem 0" }}>
        영수증 스캔 및 정보 확인
      </h1>
      <ReceiptScanContents />
    </div>
  );
};

export default ReceiptScan;
