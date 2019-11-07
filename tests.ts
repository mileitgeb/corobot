{
  // Drive 100 ms forward
  corocar.motor(BBMotor.All, 1023);
  basic.pause(100);

  // Drive 100 ms reverse
  corocar.motor(BBMotor.All, -1023);
  basic.pause(100);

  // Drive 100 ms forward on left and reverse on right
  corocar.motor(BBMotor.Left, 1023);
  corocar.motor(BBMotor.Right, -1023);
  basic.pause(100);

  // Read left and right line sensor
  basic.showNumber(corocar.readLine(BBLineSensor.Left));
  basic.showNumber(corocar.readLine(BBLineSensor.Right));

  // Read sonar values
  basic.showNumber(corocar.sonar(BBPingUnit.MicroSeconds));
  basic.showNumber(corocar.sonar(BBPingUnit.Centimeters));
  basic.showNumber(corocar.sonar(BBPingUnit.Inches));

}
