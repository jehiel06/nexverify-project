class OTPService {
  static const String mockOtp = "123456";

  // Mock OTP verification
  static bool verifyOtp(String enteredOtp) {
    return enteredOtp == mockOtp;
  }
}
