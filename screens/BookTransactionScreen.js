import React, { Component } from "react";
import { Text, View, TouchableOpacity, StyleSheet, Image } from "react-native";
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner'
import { TextInput } from "react-native-gesture-handler";

export default class TransactionScreen extends Component {
    constructor() {
        super()
        this.state = {
            hasCameraPermission: null,
            scanned: false,
            scannedData: '',
            buttonState: 'normal',
            scannedBookId:'',
            scannedStudentId:''
        }
    }
    getCameraPermission = async (id) => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission: status === 'granted',
            buttonState: id,
            scanned: false
        })
    }
    handleBarcodeScanned = async ({ type, data }) => {
        const {buttonState}=this.state
        if(buttonState==='bookId'){
            this.setState({
                scanned: true,
                scannedBookId: data,
                buttonState: 'normal',
            })
        }
        else if(buttonState==='studentId'){
            this.setState({
                scanned: true,
                scannedStudentId: data,
                buttonState: 'normal',
            })
        }
        
    }
    render() {
        const hasCameraPermissions = this.state.hasCameraPermission
        console.log(hasCameraPermissions)
        const scanned = this.state.scanned;
        const buttonState = this.state.buttonState
        if (buttonState !== 'normal' && hasCameraPermissions) {
            return (
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarcodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if (buttonState === 'normal') {
            return (
                <View style={styles.container}>
                    <View>
                    <Image source={require("../assets/booklogo.jpg")} style={{width:200, height:200}}/>
                    <Text style={{textAlign:'center',fontSize:30}}>Willy</Text>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputBox}
                            placeholder="Book Id"
                            value={this.state.scannedBookId}
                        />
                        <TouchableOpacity style={styles.scanButton} onPress={()=>{this.getCameraPermission('bookId')}}>
                            <Text style={styles.buttonText}>Scan</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inputView}>
                        <TextInput style={styles.inputBox}
                            placeholder="Student Id"
                            value={this.state.scannedStudentId}
                        />
                        <TouchableOpacity style={styles.scanButton} onPress={()=>{this.getCameraPermission('studentId')}}> 
                            <Text style={styles.buttonText}>Scan</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }

    }
}
const styles = StyleSheet.create({ container: { flex: 1, justifyContent: 'center', alignItems: 'center' }, displayText: { fontSize: 15, textDecorationLine: 'underline' }, scanButton: { backgroundColor: '#2196F3', padding: 10, margin: 10 }, buttonText: { fontSize: 15, textAlign: 'center', marginTop: 10 }, inputView: { flexDirection: 'row', margin: 20 }, inputBox: { width: 200, height: 40, borderWidth: 1.5, borderRightWidth: 0, fontSize: 20 }, scanButton: { backgroundColor: '#66BB6A', width: 50, borderWidth: 1.5, borderLeftWidth: 0 } });
