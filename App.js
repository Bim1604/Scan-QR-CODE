import React, {Component} from 'react';
import {Alert, Button, Linking, Text, View} from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class ProductScanRNCamera extends Component {
  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
      },
    };
  }
  onBarCodeRead(scanResult) {
    if (scanResult.data != null) {
      if (!this.barcodeCodes.includes(scanResult.data)) {
        Linking.canOpenURL(scanResult.data).then(supported => {
          if (supported) {
            Linking.openURL(scanResult.data);
          } else {
            console.log("Can't open the URL: " + scanResult.data);
          }
        });
        console.log(scanResult.type);
        console.log(scanResult.data);
        Alert.alert(scanResult.data);
        this.barcodeCodes.push(scanResult.data);
        console.log(this.barcodeCodes);
      }
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          defaultTouchToFocus
          flashMode={this.state.camera.flashMode}
          mirrorImage={false}
          onBarCodeRead={this.onBarCodeRead.bind(this)}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          style={styles.preview}
          type={this.state.camera.type}
        />
        <View style={[styles.overlay, styles.topOverlay]}>
          <Text style={styles.scanScreenMessage}>Please scan the barcode.</Text>
        </View>
        <View style={[styles.overlay, styles.bottomOverlay]}>
          <Button
            onPress={() => {
              console.log('Reset clicked');
              this.barcodeCodes = [];
              console.log(this.barcodeCodes);
            }}
            style={styles.enterBarcodeManualButton}
            title="Reset Scan QR Code"
          />
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
