# CoRoCar
 Package for Microsoft Makecode

This library provides a Microsoft Makecode package for the CoRoCar

## Driving the robot    
The simplest way to drive the robot is by using the `driveMilliseconds(...)` and `driveTurnMilliseconds(...)` blocks.   
Note with `driveMilliseconds(...)`, you can specify a negative speed to reverse.   
```blocks
// Drive forward for 2000 ms
corocar.driveMilliseconds(1023, 2000)

// Drive backwards for 2000 ms
corocar.driveMilliseconds(-1023, 2000)

// Spin left for 200 ms
corocar.driveTurnMilliseconds(BBRobotDirection.Left, 1023, 200)

// Spin right for 200 ms
corocar.driveTurnMilliseconds(BBRobotDirection.Right, 1023, 200)
```   

These blocks are also available in non blocking version. The following example performs the same operation as above.   
```blocks
corocar.drive(1023)
basic.pause(1000)

corocar.drive(0)
basic.pause(1000)

corocar.driveTurn(BBRobotDirection.Left, 1023)
basic.pause(250)

corocar.driveTurn(BBRobotDirection.Right, 1023)
basic.pause(250)

corocar.drive(0)
```

## Driving the motor

If you want more fine grain control of individal motors, use `corocar.motor(..)` to drive motor either forward or reverse. The value
indicates speed and is between `-1023` to `1023`. Minus indicates reverse.

```blocks
// Drive 1000 ms forward
corocar.motor(BBMotor.All, 1023);
basic.pause(1000);

// Drive 1000 ms reverse
corocar.motor(BBMotor.All, -1023);
basic.pause(1000);

// Drive 1000 ms forward on left and reverse on right
corocar.motor(BBMotor.Left, 1023);
corocar.motor(BBMotor.Right, -1023);
basic.pause(1000);
```

## Read line sensor

The corocar (optionally) has two line-sensors: left and right. To read the value of the
sensors, use `corocar.readLine(..)` function.

```blocks
// Read left and right line sensor
let left = corocar.readLine(BBLineSensor.Left);
let right = corocar.readLine(BBLineSensor.Right);
```

## Read sonar value

If you have mounted the optional sonar sensor for the Robobit you can
also use the `corocar.sonar(..)` function to read the distance to obstacles.

```blocks
// Read sonar values
let v1 = corocar.sonar(BBPingUnit.MicroSeconds);
let v2 = corocar.sonar(BBPingUnit.Centimeters);
let v3 = corocar.sonar(BBPingUnit.Inches);
```

## Supported targets

* for PXT/microbit

## License

MIT
