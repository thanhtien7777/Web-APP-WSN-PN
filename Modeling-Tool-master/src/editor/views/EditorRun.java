package editor.views;

import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.IOException;
import java.net.ServerSocket;
import java.net.Socket;

import editor.utils.DataImport;
import editor.utils.InitializeData;
import javafx.event.ActionEvent;
import javafx.event.EventHandler;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.control.Button;
import javafx.scene.control.Dialog;
import javafx.scene.control.RadioButton;
import javafx.scene.control.ToggleGroup;
import javafx.scene.layout.AnchorPane;
import javafx.stage.Window;
import javafx.stage.WindowEvent;
import Converter.Converter;
import Converter.UnicastConverter;
import Converter.BroadcastConverter;
public class EditorRun extends Dialog<Object> {

	private InitializeData data;
	@FXML
	private AnchorPane root;
	@FXML
	private RadioButton unicast;
	@FXML
	private RadioButton broadcast;
	@FXML
	private Button run;
	
	private ToggleGroup buttonGroup;
	
	private FXMLLoader load;
	
	private Converter converter;
	
	private Window window;
	
	private EditorWindow editor;
	
	public EditorRun (EditorWindow editor) {
this.editor = editor;
		
		System.out.println("Server running...");
		try{
			ServerSocket server = new ServerSocket(1234);
			Socket socket=server.accept();
			DataInputStream in = new DataInputStream(socket.getInputStream());
			DataOutputStream out = new DataOutputStream(socket.getOutputStream());
			String nhan=in.readUTF();
			String //str = nhan.replaceAll("\\s+", " ");
				   //str = str.replaceAll("(^\\s+|\\s+$)", "");
				   str = nhan.replace("kwsn", "json");
				System.out.println("Da Nhan file " + str);	
			
			
			
			File f = new File("C:/Users/Jayce/workspace1/WebJava/savefile/"+nhan);
			if(f != null) {
				this.editor.getBoard().clear();
				DataImport.Import(f,this.editor);
			}
			
			
			
			out.writeUTF("Server da nhan duoc file " +str);
			
			
			socket.close();
		}
		catch(IOException e)
		{
			e.printStackTrace();
		}
		
		this.data = editor.getData();
		load = new FXMLLoader();
		load.setLocation(getClass().getResource("/res/Fxml/run.fxml"));
		load.setRoot(root);
		load.setController(this);
		try {
			load.load();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		this.setWidth(300);
		this.setHeight(100);
		this.window = this.getDialogPane().getScene().getWindow();
		this.buttonGroup = new ToggleGroup();
		this.initEvent();
		this.setTitle(EditorWindow.APP_NAME+" - Analyze");
		
		
	}
	
	
	
	public void Show() {
		//this.getDialogPane().setContent(this.load.getRoot());
		//this.show();
	}
	
	private void initEvent () {
		this.unicast.setToggleGroup(this.buttonGroup);
		this.broadcast.setToggleGroup(this.buttonGroup);
		this.unicast.setSelected(true);
		this.run.setOnAction(new EventHandler<ActionEvent>() {
			
			@Override
			public void handle(ActionEvent event) {
				// TODO Auto-generated method stub
				EditorRun.this.Run();
			}
		});
		this.window.setOnCloseRequest(new EventHandler<WindowEvent>() {
			
			@Override
			public void handle(WindowEvent event) {
				// TODO Auto-generated method stub
				EditorRun.this.window.hide();
			}
		});
		
		
		this.window.hide();
		EditorAnaly analyzer = new EditorAnaly();
		analyzer.Show();
		analyzer.setStatus(0);
		String baseDirectoryPath = System.getProperty("user.dir");
		//if(this.unicast.isSelected()) {
			//this.converter = new UnicastConverter(this.data.getTopologyData());
		//} else {
			this.converter = new BroadcastConverter(this.data.getTopologyData());
		//}
		java.io.File tempFolderPath = new java.io.File(baseDirectoryPath,"temp");
		if (!tempFolderPath.exists()) {
			tempFolderPath.mkdirs();
		}
		this.converter.Convert(tempFolderPath.getPath());
		//this.converter.outputPnmlFile(tempFolderPath.getPath());
		//this.converter.outputProcessFile(tempFolderPath.getPath());
		//this.converter.outputMinimizeProcessFile(tempFolderPath.getPath());
		analyzer.setStatus(1);
	}
	
	private void Run() {
		this.window.hide();
		EditorAnaly analyzer = new EditorAnaly();
		analyzer.Show();
		analyzer.setStatus(0);
		String baseDirectoryPath = System.getProperty("user.dir");
		//if(this.unicast.isSelected()) {
			//this.converter = new UnicastConverter(this.data.getTopologyData());
		//} else {
			this.converter = new BroadcastConverter(this.data.getTopologyData());
		//}
		java.io.File tempFolderPath = new java.io.File(baseDirectoryPath,"temp");
		if (!tempFolderPath.exists()) {
			tempFolderPath.mkdirs();
		}
		this.converter.Convert(tempFolderPath.getPath());
		//this.converter.outputPnmlFile(tempFolderPath.getPath());
		//this.converter.outputProcessFile(tempFolderPath.getPath());
		//this.converter.outputMinimizeProcessFile(tempFolderPath.getPath());
		analyzer.setStatus(1);
		
		
	}
}
