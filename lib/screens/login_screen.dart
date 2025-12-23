import 'package:flutter/material.dart';
import '../services/otp_service.dart';
import 'home_screen.dart';
import '../widgets/custom_button.dart';

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController phoneController = TextEditingController();
  final TextEditingController otpController = TextEditingController();
  bool otpSent = false;

  void sendOtp() {
    String phone = phoneController.text.trim();

    if (phone.isEmpty || !RegExp(r'^[0-9]+$').hasMatch(phone)) {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Enter valid phone number")),
      );
      return;
    }

    setState(() {
      otpSent = true;
    });

    ScaffoldMessenger.of(context).showSnackBar(
      const SnackBar(content: Text("OTP sent (mock): 123456")),
    );
  }

  void verifyOtp() {
    if (OTPService.verifyOtp(otpController.text.trim())) {
      Navigator.pushReplacement(
        context,
        MaterialPageRoute(
          builder: (_) => HomeScreen(
            phone: phoneController.text.trim(),
            email: "user@example.com", // default email for now
          ),
        ),
      );
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(content: Text("Invalid OTP")),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text("Login")),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: [
            const SizedBox(height: 30),
            Icon(Icons.lock, size: 80, color: Colors.blue.shade700),
            const SizedBox(height: 20),
            const Text("Login with Phone Number", style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold)),
            const SizedBox(height: 30),
            TextField(
              controller: phoneController,
              keyboardType: TextInputType.phone,
              decoration: const InputDecoration(
                labelText: "Phone Number",
                prefixIcon: Icon(Icons.phone),
              ),
            ),
            const SizedBox(height: 20),
            CustomButton(text: "Send OTP", onPressed: sendOtp),
            const SizedBox(height: 20),
            if (otpSent) ...[
              TextField(
                controller: otpController,
                keyboardType: TextInputType.number,
                decoration: const InputDecoration(
                  labelText: "Enter OTP",
                  prefixIcon: Icon(Icons.message),
                ),
              ),
              const SizedBox(height: 20),
              CustomButton(
                text: "Verify OTP",
                onPressed: verifyOtp,
                color: Colors.green,
              ),
            ]
          ],
        ),
      ),
    );
  }
}
