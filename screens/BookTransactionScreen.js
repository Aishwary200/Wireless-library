import React, { Component } from "react";
import { Text, View,TouchableOpacity,StyleSheet } from "react-native";
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner'

export default class TransactionScreen extends Component{
    constructor(){
        super()
        this.state={
            hasCameraPermission:null,
            scanned:false,
            scannedData:'',
            buttonState:'normal'
        }
    }
    getCameraPermission=async()=>{
        const {status}=await Permissions.askAsync(Permissions.CAMERA)
        this.setState({
            hasCameraPermission:status==='granted',
            buttonState:'clicked',
            scanned:false
        })
    }
    handleBarcodeScanned=async({type,data})=>{
        this.setState({
            scanned:true,
            scannedData:data,
            buttonState:'normal'
        })
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermission
        console.log(hasCameraPermissions)
        const scanned=this.state.scanned;
        const buttonState=this.state.buttonState
        if(buttonState==='clicked' && hasCameraPermissions){
            return(
                <BarCodeScanner 
                onBarCodeScanned={scanned?undefined:this.handleBarcodeScanned}
                style={StyleSheet.absoluteFillObject}
                />
            )
        }
        else if(buttonState==='normal'){
            return(
                <View style={styles.container}>
                <Text style={styles.displayText}>
                    {hasCameraPermissions===true?this.state.scannedData:'request Camera Permission'} 
                </Text>
                <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermission}>
                <Text style={styles.displayText}>Scan Qr Code</Text>
                </TouchableOpacity>
    
                </View>
            )
        }
        
    }
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline'
    },
    scanButton:{
        backgroundColor:'#2196F3',
        padding:10,
        margin:10
    }
})