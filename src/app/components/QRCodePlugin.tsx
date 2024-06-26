import { Html5QrcodeScanner, Html5QrcodeScanType } from "html5-qrcode";
import { useEffect } from "react";

const qrcodeRegionId = "html5qr-code-full-region";
interface Props {
  fps: number;
  qrbox: number;
  aspectRatio?: number;
  disableFlip: boolean;
  verbose?: boolean;
  qrCodeSuccessCallback: any;
}
const createConfig = (props: Props) => {
  let config = {
    fps: 0,
    qrbox: 350,
    aspectRatio: 1,
    disableFlip: false,
    supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA],
  };
  if (props.fps) {
    config.fps = props.fps;
  }
  if (props.qrbox) {
    config.qrbox = props.qrbox;
  }
  if (props.aspectRatio) {
    config.aspectRatio = props.aspectRatio;
  }
  if (props.disableFlip !== undefined) {
    config.disableFlip = props.disableFlip;
  }
  return config;
};

const QRCodePlugin = (props: Props) => {
  useEffect(() => {
    const config = createConfig(props);
    const verbose = props.verbose === true;
    if (!props.qrCodeSuccessCallback) {
      throw "qrCodeSuccessCallback is required callback.";
    }
    const html5QrcodeScanner = new Html5QrcodeScanner(
      qrcodeRegionId,
      config,
      verbose
    );
    html5QrcodeScanner.render(props.qrCodeSuccessCallback, () => {
      console.log("Error");
    });

    return () => {
      html5QrcodeScanner.clear().catch((error) => {
        console.error("Failed to clear html5QrcodeScanner. ", error);
      });
    };
  }, []);

  return <div id={qrcodeRegionId} className="border-0 outline-none" />;
};

export default QRCodePlugin;
