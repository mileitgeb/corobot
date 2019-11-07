/**
  * Enumeration of motors.
  */
enum RBMotor
{
    //% block="left"
    Left,
    //% block="right"
    Right,
    //% block="both"
    Both
}

/**
  * Enumeration of directions.
  */
enum RBRobotDirection
{
    //% block="left"
    Left,
    //% block="right"
    Right
}

/**
  * Enumeration of line sensors.
  */
enum RBLineSensor
{
    //% block="left"
    Left,
    //% block="right"
    Right
}


/**
  * Enumeration of Robobit Models and Options
  */
enum RBModel
{
    //% block="v1"
    v1
}

/**
 * Ping unit for sensor
 */
enum RBPingUnit
{
    //% block="cm"
    Centimeters
}

/**
 * Pre-Defined pixel colours
 */
enum RBColors
{
    //% block=red
    Red = 0xff0000,
    //% block=orange
    Orange = 0xffa500,
    //% block=yellow
    Yellow = 0xffff00,
    //% block=green
    Green = 0x00ff00,
    //% block=blue
    Blue = 0x0000ff,
    //% block=indigo
    Indigo = 0x4b0082,
    //% block=violet
    Violet = 0x8a2be2,
    //% block=purple
    Purple = 0xff00ff,
    //% block=white
    White = 0xffffff,
    //% block=black
    Black = 0x000000
}

/**
 * Custom blocks
 */
/** //% weight=10 color=#0fbc11 icon="\uf1ba" */
//% weight=10 color=#e7660b icon="\uf1ba" block="CoRo Car"
namespace corocar
{
    let _model: RBModel;
    let larsson: number;
    let scandir: number;
    let ledCount = 8;
    let leftSpeed = 0;
    let rightSpeed = 0;
    let _scanning = false;
    let scanColor1 = 0xff0000;
    let scanColor2 = 0x0f0000;
    let scanColor3 = 0x030000;

    /**
      * Select Model of Robobit (Determines Pins used)
      *
      * @param model Model of Robobit buggy. v1
      */
    //% blockId="robobit_model" block="select CoRo Car model %model"
    //% weight=110
    export function select_model(model: RBModel): void
    {
        _model = model;
    }

    /**
      * Drive robot forward (or backward) at speed.
      * @param speed speed of motor between -1023 and 1023. eg: 600
      */
    //% subcategory=Motors
    //% group=Motors
    //% blockId="robobit_motor_forward" block="drive at speed %speed"
    //% speed.min=-1023 speed.max=1023
    //% weight=110
    export function drive(speed: number): void
    {
        motor(RBMotor.Both, speed);
    }

    /**
      * Drive robot forward (or backward) at speed for milliseconds.
      * @param speed speed of motor between -1023 and 1023. eg: 600
      * @param milliseconds duration in milliseconds to drive forward for, then stop. eg: 1000
      */
    //% subcategory=Motors
    //% group=Motors
    //% blockId="robobit_motor_forward_milliseconds" block="drive at speed %speed| for %milliseconds|(ms)"
    //% speed.min=-1023 speed.max=1023
    //% weight=131
    export function driveMilliseconds(speed: number, milliseconds: number): void
    {
        drive(speed);
        basic.pause(milliseconds);
        drive(0);
    }

    /**
      * Spin robot in direction at speed.
      * @param direction direction to spin.
      * @param speed speed of motor between 0 and 1023. eg: 600
      */
    //% subcategory=Motors
    //% group=Motors
    //% blockId="robobit_turn" block="spin %direction|at speed %speed"
    //% speed.min=0 speed.max=1023
    //% weight=109
    export function driveTurn(direction: RBRobotDirection, speed: number): void
    {
        if (speed < 0)
            speed = 0;
        if (direction == RBRobotDirection.Left)
        {
            motor(RBMotor.Left, -speed);
            motor(RBMotor.Right, speed);
        }
        else if (direction == RBRobotDirection.Right)
        {
            motor(RBMotor.Left, speed);
            motor(RBMotor.Right, -speed);
        }
    }

    /**
      * Turn robot in direction at speed for milliseconds.
      * @param direction direction to turn.
      * @param speed speed of motor between 0 and 1023. eg: 600
      * @param milliseconds duration in milliseconds to turn for, then stop. eg: 1000
      */
    //% subcategory=Motors
    //% group=Motors
    //% blockId="robobit_turn_milliseconds" block="spin %direction|at speed %speed| for %milliseconds|(ms)"
    //% speed.min=0 speed.max=1023
    //% weight=130
    export function driveTurnMilliseconds(direction: RBRobotDirection, speed: number, milliseconds: number): void
    {
        driveTurn(direction, speed)
        basic.pause(milliseconds)
        motor(RBMotor.Both, 0)
    }

    /**
      * Drive motor(s) forward or reverse.
      * @param motor motor to drive.
      * @param speed speed of motor eg: 600
      */
    //% subcategory=Motors
    //% group=Motors
    //% blockId="robobit_motor" block="drive %motor| motor at speed %speed"
    //% weight=100
    export function motor(motor: RBMotor, speed: number): void
    {
        let forward = (speed >= 0);
        let absSpeed = Math.abs(speed);
        if ((motor == RBMotor.Left) || (motor == RBMotor.Both))
            leftSpeed = absSpeed;
        if ((motor == RBMotor.Right) || (motor == RBMotor.Both))
            rightSpeed = absSpeed;
        if (speed > 1023)
        {
            speed = 1023;
        }
        else if (speed < -1023)
        {
            speed = -1023;
        }
        let realSpeed = speed;
        if (!forward)
        {
            if (realSpeed >= -200)
                realSpeed = (realSpeed * 19) / 6;
            else if (realSpeed >= -400)
                realSpeed = realSpeed * 2;
            else if (realSpeed >= -600)
                realSpeed = (realSpeed * 3) / 2;
            else if (realSpeed >= -800)
                realSpeed = (realSpeed * 5) / 4;
            realSpeed = 1023 + realSpeed; // realSpeed is negative
        }
        if ((motor == RBMotor.Left) || (motor == RBMotor.Both))
        {
            pins.analogWritePin(AnalogPin.P1, realSpeed);
            pins.digitalWritePin(DigitalPin.P12, forward ? 0 : 1);
	    pins.digitalWritePin(DigitalPin.P13, forward ? 1 : 0);
		
        }
        if ((motor == RBMotor.Right) || (motor == RBMotor.Both))
        {
            pins.analogWritePin(AnalogPin.P2, realSpeed);
            pins.digitalWritePin(DigitalPin.P16, forward ? 0 : 1);
	    pins.digitalWritePin(DigitalPin.P15, forward ? 1 : 0);
        }
    }

    /**
      * Read line sensor.
      *
      * @param sensor Line sensor to read.
      */
    //% subcategory=Sensors
    //% group=Sensors
    //% blockId="robobit_read_line" block="read line sensor %sensor"
    //% weight=80
    export function readLine(sensor: RBLineSensor): number
    {
        if (sensor == RBLineSensor.Left)
	{
            	return pins.analogReadPin(AnalogPin.P3);
        }
        else
	{
            	return pins.analogReadPin(AnalogPin.P4);   
        }
    }


    /**
    * Read distance from sonar module connected to accessory connector.
    *
    * @param unit desired conversion unit
    */
    //% subcategory=Sensors
    //% group=Sensors
    //% blockId="robobit_sonar" block="read sonar as %unit"
    //% weight=90
    export function sonar(unit: RBPingUnit): number
    {
        // send pulse
        let trig = DigitalPin.P0;
        let echo = DigitalPin.P8;
        let maxCmDistance = 500;
        let d=10;
        pins.setPull(trig, PinPullMode.PullNone);
        for (let x=0; x<10; x++)
        {
            pins.digitalWritePin(trig, 0);
            control.waitMicros(2);
            pins.digitalWritePin(trig, 1);
            control.waitMicros(10);
            pins.digitalWritePin(trig, 0);
            // read pulse
            d = pins.pulseIn(echo, PulseValue.High, maxCmDistance * 58);
            if (d>0)
                break;
        }
        /** switch (unit)
        *{
            *case RBPingUnit.Centimeters: Math.round(return d / 58);
            *case RBPingUnit.Inches: Math.round(return d / 148);
            *default: return d;
        }*/
        return Math.round(d/58);
    }

    function setPWM(): void
    {
        if ((leftSpeed < 400) || (rightSpeed < 400))
            pins.analogSetPeriod(AnalogPin.P0, 60000);
        else if ((leftSpeed < 600) || (rightSpeed < 600))
            pins.analogSetPeriod(AnalogPin.P0, 40000);
        else
            pins.analogSetPeriod(AnalogPin.P0, 30000);
    }
}
