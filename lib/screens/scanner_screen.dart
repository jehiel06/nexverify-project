import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';
import 'package:mobile_scanner/mobile_scanner.dart';
import 'success_screen.dart';

class ScannerScreen extends StatelessWidget {
  const ScannerScreen({super.key});

  @override
  Widget build(BuildContext context) {
    if (kIsWeb) {
      return Scaffold(
        appBar: AppBar(title: const Text("QR Scanner")),
        body: const Center(
          child: Text("QR scanner not supported on Web"),
        ),
      );
    }

    return Scaffold(
      appBar: AppBar(title: const Text("Scan QR Code")),
      body: MobileScanner(
        // removed allowDuplicates
        onDetect: (capture) {
          final List<Barcode> barcodes = capture.barcodes;
          final String? code = barcodes.isNotEmpty ? barcodes.first.rawValue : null;

          if (code != null && code.startsWith('http')) {
            Navigator.pushReplacement(
              context,
              MaterialPageRoute(builder: (_) => const SuccessScreen()),
            );
          } else {
            ScaffoldMessenger.of(context).showSnackBar(
              const SnackBar(content: Text("Invalid QR Code")),
            );
          }
        },
      ),
    );
  }
}
