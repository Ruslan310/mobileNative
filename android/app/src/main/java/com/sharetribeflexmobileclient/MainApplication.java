package com.sharetribeflexmobileclient;

import io.github.mr03web.softinputmodemodule.SoftInputModePackage;
import android.app.Application;

import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.horcrux.svg.SvgPackage;
import com.reactcommunity.rnlanguages.RNLanguagesPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.krazylabs.OpenAppSettingsPackage;
import com.airbnb.android.react.maps.MapsPackage;
import io.sentry.RNSentryPackage;
import com.mands.reactnativedevmenu.DevMenuPackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;

import com.gettipsi.stripe.StripeReactPackage;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
          new StripeReactPackage(),
          new RNGestureHandlerPackage(),
          new SplashScreenReactPackage(),
          new ReanimatedPackage(),
          new SvgPackage(),
          new RNLanguagesPackage(),
          new VectorIconsPackage(),
          new PickerPackage(),
          new OpenAppSettingsPackage(),
          new MapsPackage(),
          new RNSentryPackage(),
          new DevMenuPackage(this),
          new RNCWebViewPackage(),
          new SoftInputModePackage() 
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
