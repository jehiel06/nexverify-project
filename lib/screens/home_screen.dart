import 'package:flutter/material.dart';
import 'scanner_screen.dart';
import '../widgets/custom_button.dart';

class HomeScreen extends StatelessWidget {
  final String phone;
  final String email;

  const HomeScreen({super.key, required this.phone, required this.email});

  @override
  Widget build(BuildContext context) {
    // Default points and rank
    int points = 0; 
    String rank = "BRONZE";

    return Scaffold(
      appBar: AppBar(
        title: const Text('Home'),
        actions: [
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 10),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text('Points: $points', style: const TextStyle(fontSize: 16)),
                Text('Rank: $rank', style: const TextStyle(fontSize: 16)),
              ],
            ),
          ),
        ],
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Welcome, $phone', style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold)),
            const SizedBox(height: 20),
            CustomButton(
              text: "Scan QR Code",
              onPressed: () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (_) => const ScannerScreen()),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}
