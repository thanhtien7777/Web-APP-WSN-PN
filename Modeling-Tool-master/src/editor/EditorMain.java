package editor;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

import editor.actions.ActionImport;
import editor.utils.DataImport;
import editor.views.EditorWindow;
import javafx.application.Application;
import javafx.stage.FileChooser;
import javafx.stage.Stage;
import javafx.stage.FileChooser.ExtensionFilter;

public class EditorMain extends Application {
	private static Stage stage;
	public EditorWindow editor;
	
	@Override
	public void start(Stage stage) throws Exception {
		setStage(stage);		
		new EditorWindow(stage);
	
			}

	public static Stage getStage() {
		return stage;
	}
	
	private void setStage(Stage stage) {
		EditorMain.stage = stage;
		
	}
	
	public static void main(String[] args) {
		launch(args);
	}
}