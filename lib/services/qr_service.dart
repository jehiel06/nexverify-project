class QRService {
  // Only this QR is valid
  static const String validQR = "NEXVERIFY-QR-2025";

  static bool verifyQR(String scannedValue) {
    return scannedValue == validQR;
  }
}
