package com.firstapp;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;

import com.facebook.react.modules.core.RCTNativeAppEventEmitter;
import com.microsoft.cognitiveservices.speech.audio.AudioConfig;
import com.microsoft.cognitiveservices.speech.SpeechConfig;
import com.microsoft.cognitiveservices.speech.PropertyId;
import com.microsoft.cognitiveservices.speech.SpeechRecognizer;
import com.microsoft.cognitiveservices.speech.OutputFormat;
import com.microsoft.cognitiveservices.speech.PropertyCollection;

import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

public class CalendarModule extends ReactContextBaseJavaModule {
    private ReactApplicationContext reactContext;
    CalendarModule(ReactApplicationContext context) {
        super(context);
        this.reactContext = context;
    }

    @Override
    public String getName() {
        return "CalendarModule";
    }

    @ReactMethod
    public void createCalendarEvent(String name,String location, Callback successCallback) {
        Log.d("CalendarModule","Create Event Called with name: "+name + " and location: " + location);
        successCallback.invoke("yay");
    }

    private MicrophoneStream microphoneStream;
    private MicrophoneStream createMicrophoneStream(){
        if (microphoneStream !=null){
            microphoneStream.close();
            microphoneStream=null;
        }

        microphoneStream = new MicrophoneStream();
        return microphoneStream;
    }

    @ReactMethod
    public void addListener(String Event){
        Log.d("CalendarModule","addListener Called");
    }

    @ReactMethod
    public void removeListeners(){
        Log.d("CalendarModule","removeListeners Called");
    }

    private void sendEvent(ReactContext reactContext,
                            String eventName, 
                            Object params){
        reactContext.getJSModule(RCTNativeAppEventEmitter.class)
            .emit(eventName,params);
    }

    private SpeechRecognizer speechRecognizer;

    @ReactMethod
    public void createRecognizer(String SpeechSubscriptionKey, String SpeechRegion, Callback successCallback){
        // Make sure to run permissions from react-native before coming here
        SpeechConfig speechConfig;
        try {
            speechConfig = SpeechConfig.fromSubscription(SpeechSubscriptionKey, SpeechRegion);
        } catch (Exception ex) {
            Log.e("CalendarModuleError","SubcriptionKey or Region is not correct");
            successCallback.invoke(1);
            return;
        }
        speechConfig.setOutputFormat(OutputFormat.Detailed);
        speechConfig.requestWordLevelTimestamps();
        final AudioConfig audioInput = AudioConfig.fromStreamInput(createMicrophoneStream());
        speechRecognizer = new SpeechRecognizer(speechConfig, audioInput);
        
        // Create map for params
        WritableMap payload = Arguments.createMap();
        // Put data to map
        payload.putString("something", "definitely something");
        
        //Attach Event Listeners
        speechRecognizer.recognizing.addEventListener((s,e)->{
//            Log.d("SpeechRecognizer",s);
//            Log.d("SpeechRecognizer",e);
//            Log.d("SpeechRecognizer",e.getResult().getOffset().toString());
//            Log.d("SpeechRecognizer",e.getResult().getProperties().getProperty(PropertyId.SpeechServiceResponse_JsonResult));
            Log.d("SpeechRecognizer",e.toString());
        });
        speechRecognizer.recognized.addEventListener((s,e)->{
//            Log.d("SpeechRecogniser","Recognized");
            PropertyCollection properties = e.getResult().getProperties();
            String property = properties.getProperty(PropertyId.SpeechServiceResponse_JsonResult);
            String prop2 = properties.getProperty(PropertyId.SpeechServiceResponse_RequestWordLevelTimestamps);
            Log.d("--------",property);
            Log.d("--------",prop2);
            // Put data to map
//            payload.putString("somethingElse", "new new new");
//            sendEvent(this.reactContext,"recognizedEvent",s);
        });
        speechRecognizer.canceled.addEventListener((s,e)->{
            Log.d("SpeechRecogniser","Canceled");
            // Stops recognition.
            speechRecognizer.stopContinuousRecognitionAsync();
        });
        speechRecognizer.sessionStopped.addEventListener((s,e)->{
            Log.d("SpeechRecogniser","stopped");
            speechRecognizer.stopContinuousRecognitionAsync();
        });
        
        
    }

    @ReactMethod
    public void startRecognition(Callback completionCallback){
        if (speechRecognizer == null){
            completionCallback.invoke(1);
        }

        speechRecognizer.startContinuousRecognitionAsync();
        completionCallback.invoke(0);
    }

    @ReactMethod
    public void stopRecognition(Callback completionCallback){
        if (speechRecognizer==null){
            completionCallback.invoke(1);
        }
        speechRecognizer.stopContinuousRecognitionAsync();
        completionCallback.invoke(0);
    }
}