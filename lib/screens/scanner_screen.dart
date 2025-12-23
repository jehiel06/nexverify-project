import 'package:flutter/material.dart';
import 'package:flutter/foundation.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

class ScannerScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Prevent crash on Web
    if (kIsWeb) {
      return Scaffold(
        appBar: AppBar(title: const Text('Scan QR')),
        body: const Center(
          child: Text(
            'QR Scanner not supported on Web.\nRun on Android Emulator.',
            textAlign: TextAlign.center,
          ),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Scan QR')),
      body: MobileScanner(
        onDetect: (BarcodeCapture capture) {
          final List<Barcode> barcodes = capture.barcodes;

          if (barcodes.isEmpty) {
            Navigator.pushReplacementNamed(context, '/error');
            return;
          }

          final String? code = barcodes.first.rawValue;

          if (code != null && code.startsWith('http')) {
            Navigator.pushReplacementNamed(context, '/success');
          } else {
            Navigator.pushReplacementNamed(context, '/error');
          }
        },
      ),
    );
  }
}
