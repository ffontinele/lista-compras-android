package com.ffontinele.listadecompras;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.res.Configuration;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;

public class MainActivity extends Activity {
    private WebView webView;
    private static final int REQUEST_PICK_FILE = 101;
    private static final int REQUEST_SAVE_FILE = 102;
    private String pendingSaveContent = null;

    public class AndroidBridge {
        @JavascriptInterface
        public void openUrl(String url) {
            runOnUiThread(() -> {
                try {
                    Intent i = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
                    i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    startActivity(i);
                } catch (Exception e) {}
            });
        }

        @JavascriptInterface public void exitApp() { runOnUiThread(() -> finishAndRemoveTask()); }
        @JavascriptInterface public void minimizeApp() { runOnUiThread(() -> moveTaskToBack(true)); }

        @JavascriptInterface
        public void vibrate(long ms) {
            runOnUiThread(() -> {
                try {
                    Vibrator v = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
                    if (v == null || !v.hasVibrator()) return;
                    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                        v.vibrate(VibrationEffect.createOneShot(ms, VibrationEffect.DEFAULT_AMPLITUDE));
                    } else { v.vibrate(ms); }
                } catch (Exception e) {}
            });
        }

        @JavascriptInterface
        public void share(String text) {
            runOnUiThread(() -> {
                try {
                    Intent i = new Intent(Intent.ACTION_SEND);
                    i.setType("text/plain");
                    i.putExtra(Intent.EXTRA_TEXT, text);
                    startActivity(Intent.createChooser(i, "Compartilhar"));
                } catch (Exception e) {}
            });
        }

        // Opens the system "Save As" picker (Storage Access Framework).
        // Shows "This device" / local storage, plus Drive, OneDrive, etc.
        @JavascriptInterface
        public void saveFile(String filename, String content) {
            runOnUiThread(() -> {
                try {
                    pendingSaveContent = content;
                    Intent intent = new Intent(Intent.ACTION_CREATE_DOCUMENT);
                    intent.addCategory(Intent.CATEGORY_OPENABLE);
                    intent.setType("application/json");
                    intent.putExtra(Intent.EXTRA_TITLE, filename);
                    startActivityForResult(intent, REQUEST_SAVE_FILE);
                } catch (Exception e) {
                    webView.evaluateJavascript("window.showToast && window.showToast('Erro ao abrir seletor de salvamento')", null);
                }
            });
        }

        @JavascriptInterface
        public void pickFile() {
            runOnUiThread(() -> {
                try {
                    Intent intent = new Intent(Intent.ACTION_GET_CONTENT);
                    intent.setType("*/*");
                    intent.addCategory(Intent.CATEGORY_OPENABLE);
                    intent.putExtra(Intent.EXTRA_LOCAL_ONLY, false);
                    startActivityForResult(Intent.createChooser(intent, "Selecionar backup"), REQUEST_PICK_FILE);
                } catch (Exception e) {
                    webView.evaluateJavascript("window.__onFilePicked && window.__onFilePicked(null)", null);
                }
            });
        }
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == REQUEST_SAVE_FILE) {
            if (resultCode == RESULT_OK && data != null && pendingSaveContent != null) {
                Uri uri = data.getData();
                if (uri != null) {
                    try {
                        OutputStream os = getContentResolver().openOutputStream(uri);
                        if (os != null) {
                            os.write(pendingSaveContent.getBytes("UTF-8"));
                            os.close();
                            runOnUiThread(() -> webView.evaluateJavascript(
                                "window.showToast && window.showToast('Arquivo salvo com sucesso!')", null));
                        }
                    } catch (Exception e) {
                        runOnUiThread(() -> webView.evaluateJavascript(
                            "window.showToast && window.showToast('Erro ao salvar arquivo')", null));
                    }
                }
            }
            pendingSaveContent = null;
            return;
        }

        if (requestCode == REQUEST_PICK_FILE && resultCode == RESULT_OK && data != null) {
            Uri uri = data.getData();
            if (uri == null) return;
            try {
                InputStream is = getContentResolver().openInputStream(uri);
                if (is == null) return;
                BufferedReader reader = new BufferedReader(new InputStreamReader(is, "UTF-8"));
                StringBuilder sb = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) sb.append(line).append("\n");
                is.close();
                String content = sb.toString()
                    .replace("\\", "\\\\")
                    .replace("'", "\\'")
                    .replace("\n", "\\n")
                    .replace("\r", "");
                final String escaped = content;
                runOnUiThread(() -> webView.evaluateJavascript(
                    "window.__onFilePicked && window.__onFilePicked('" + escaped + "')", null));
            } catch (Exception e) {
                runOnUiThread(() -> webView.evaluateJavascript(
                    "window.__onFilePicked && window.__onFilePicked(null)", null));
            }
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        webView = new WebView(this);
        setContentView(webView);
        WebSettings s = webView.getSettings();
        s.setJavaScriptEnabled(true); s.setDomStorageEnabled(true);
        s.setAllowFileAccess(true); s.setAllowContentAccess(true);
        s.setDatabaseEnabled(true); s.setCacheMode(WebSettings.LOAD_DEFAULT);
        s.setMediaPlaybackRequiresUserGesture(false);
        webView.addJavascriptInterface(new AndroidBridge(), "AndroidBridge");
        boolean isDark = (getResources().getConfiguration().uiMode & Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES;
        webView.setWebViewClient(new WebViewClient() {
            @Override public void onPageFinished(WebView view, String url) {
                view.evaluateJavascript("window.__androidDarkMode = " + isDark + ";", null);
            }
        });
        webView.loadUrl("file:///android_asset/public/index.html");
    }

    @Override
    public void onBackPressed() {
        if (webView == null) { super.onBackPressed(); return; }
        webView.evaluateJavascript(
            "(function(){ if(typeof window.__androidBack==='function'){ window.__androidBack(); return 'handled'; } return 'default'; })()",
            result -> { if (result == null || result.equals("\"default\"")) { runOnUiThread(() -> MainActivity.super.onBackPressed()); } });
    }

    @Override
    public void onConfigurationChanged(Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
        boolean isDark = (newConfig.uiMode & Configuration.UI_MODE_NIGHT_MASK) == Configuration.UI_MODE_NIGHT_YES;
        if (webView != null) webView.evaluateJavascript(
            "window.__androidDarkMode=" + isDark + ";window.dispatchEvent(new Event('androidDarkModeChange'));", null);
    }
}
