import { Component, AfterViewInit } from '@angular/core';

import * as ScanditSDK from "scandit-sdk";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  public scanning = false;
  public inputValue: string;

  private scannerContainer: HTMLElement;
  private scanInput: HTMLElement;
  private picker: ScanditSDK.BarcodePicker;

  public ngAfterViewInit(): void {
    this.scannerContainer = document.getElementById("scandit-barcode-picker");
    this.scanInput = document.getElementById("scan-input");
    this.initializeScanner();
  }

  public scan(): void {
    this.startScanning();
  }

  private startScanning(): void {
    this.scanning = true;
    if (this.picker) {
      this.picker.resumeScanning();
    }
  }

  private stopScanning(): void {
    this.scanning = false;
    if (this.picker) {
      this.picker.pauseScanning();
    }
  }

  private initializeScanner(): void {
    // Configure the library and activate it with a license key
    const licenseKey = "AdwrHyTrP9BcHwwd7DiA2/oHuoXVKPXO6XMBobRVgnK6cn7lFX9L5EFh92fdX9hqKk2gLjJerKxBKyiRUikVOhZWQvfdd+oDvW0CSDpwz/6aV3AdglVbiHpg/9n5HNOB5VvCLJ5JL3g9SRDfYGUZo+F1NcCHVFIO9Ua9339qHJYxcDLFoSWyK3JHkC++ZwyW/HEb9Bgql1//VQ7OU34mwulhXLRgWXyyrUb/fZYk4dl9a9JtNXBmOwNw94rFeu/W7lvc7rBHkFk9V/WE6kQuDcEtNsCkQfZWBkjqYu5iZNPXa32pZVWhycxXwWkGfaBprG3XYDQsbf5HLKIX0CQmhsSbauQ/S6PsvUuoWssQ58PH6jEa8p+RtuSXBoxqyqT4RE4FROrBpVouWpMT1FBo1Po7vCC5Rh1AY8GaftQYBRYCjyrDnyERifj03gjoLK/wISEDTZI+fW7dXQv2yOSA0JFL3sX2neCk7SkkSQy0E8CKoV7J71aB7r7inEDw2dACt0e4W5zVxw2Z95WINUqqh16zxlWA4o2zn4vNvB2bVkRGMwcF1gAsOExyl2NBDaZLUw3E+7D/8QghGoNh6l9waLfEsz0q3EQnMaZr+6Ew976l4pWl7Pc3Cm1T8HtuBqS05w0++/CCuQQI84EuB1Ij5+rxxQJzjhB5nr1c7WD7I7SF6irJmhgvvbXBubqGXr7H9rw/W+ecUUDJr6deWmjMFguTFl+45s0cGrOpQFCg6T0cj9QOS5LWcCWryDp6L4DwsPQagqjaGkfi8x+rthF9I22RxyqIFl+vwXZoZvRvcd0xdh4HAc6eEIklq3neyhYtcFpwE4bd40yRx1I+uiLkFYOZuZCk3058vRuUfEWrX6zrYgaObyu4JSbnerGW/o4byQ+IXLur1X+oF6G3XklXkMKgbBeH27XzT0b3l6Pw8766onEpAlv0lZODWfOE484jYaRZEsd5W+NJyi84UE+p8QwPYw/ZgSplEoNuBb4U3iiN+zHcyQvTEpMhnhk56w==";

    ScanditSDK.configure(licenseKey, { engineLocation: "build/" });

    ScanditSDK.BarcodePicker.create(this.scannerContainer)
      .then(barcodePicker => {
        this.picker = barcodePicker;

        const scanSettings = new ScanditSDK.ScanSettings({
          enabledSymbologies: [

            ScanditSDK.Barcode.Symbology.EAN13

          ]
        });
        this.picker.applyScanSettings(scanSettings);

        this.picker.onScan(this.handleScan.bind(this));
        this.picker.onScanError(error => alert(error.message));
        this.picker.resumeScanning();
      })
      .catch(error => alert(error));
  }

  private handleScan(scanResult: ScanditSDK.ScanResult): void {
    this.stopScanning();
    this.inputValue = scanResult.barcodes[0].data;
  }
}
